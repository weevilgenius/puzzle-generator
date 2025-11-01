import { ESLintUtils } from "@typescript-eslint/utils";

// Constructors we care about by name (fallback when type info isn't available)
const NAMES = new Set([
  "Path", "Group", "Point", "Color", "Raster", "Size", "Tool", "Segment", "Layer", "Project",
]);

export default ESLintUtils.RuleCreator(() => "")({
  meta: {
    type: "problem",
    docs: { description: "Instantiate Paper constructors via a scope (new scope.X), not bare." },
    schema: [],
    messages: {
      needScope: "Instantiate Paper {{ctor}} via a scope: new scope.{{ctor}}(...).",
    },
  },
  defaultOptions: [],
  create(context) {
    const services = ESLintUtils.getParserServices(context, true); // may throw if no type info
    const checker = services?.program?.getTypeChecker?.();

    function isPaperCtorByType(id) {
      if (!checker || !id) return false;
      try {
        const tsNode = services.esTreeNodeToTSNodeMap.get(id);
        const sym = checker.getSymbolAtLocation(tsNode);
        if (!sym) return false;

        const decls = sym.getDeclarations?.() || [];
        // Heuristic: the constructor symbol comes from the 'paper' module or has a fully qualified name like 'paper.Path'
        return decls.some((d) => {
          const src = d.getSourceFile().fileName;
          if (src.includes("/node_modules/paper/")) return true;
          const fq = checker.getFullyQualifiedName(sym);
          return /\bpaper(\.|\$).*?(Path|Group|Point|Color|Raster|Size|Tool|Segment|Layer|Project)\b/.test(fq);
        });
      } catch {
        return false;
      }
    }

    return {
      NewExpression(node) {
        // new Identifier(...)
        if (node.callee.type === "Identifier") {
          const name = node.callee.name;

          // Name-based quick hit
          if (NAMES.has(name)) {
            context.report({ node, messageId: "needScope", data: { ctor: name } });
            return;
          }

          // Type-aware: identifier resolves to a paper.* constructor symbol
          if (isPaperCtorByType(node.callee)) {
            context.report({ node, messageId: "needScope", data: { ctor: name } });
          }
        }

        // new paper.Path(...) (caught by rule #1 too, but keep redundancy)
        if (node.callee.type === "MemberExpression") {
          const obj = node.callee.object;
          const prop = node.callee.property;
          if (obj.type === "Identifier" && obj.name === "paper" && prop.type === "Identifier" && NAMES.has(prop.name)) {
            context.report({ node, messageId: "needScope", data: { ctor: prop.name } });
          }
        }
      },
    };
  },
});
