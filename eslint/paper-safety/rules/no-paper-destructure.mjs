
// Forbid destructuring of constructors anywhere (it’s a common source of “detached” constructors).
const NAMES = new Set([
  "Path", "Group", "Point", "Color", "Raster", "Size", "Tool", "Segment", "Layer", "Project",
]);

export default {
  meta: {
    type: "suggestion",
    docs: { description: "Do not destructure Paper constructors; always use scope.X." },
    schema: [],
    messages: {
      noDestructure: "Do not destructure Paper constructor {{name}}. Use scope.{{name}} directly.",
    },
  },
  create(context) {
    return {
      VariableDeclarator(node) {
        if (node.id.type !== "ObjectPattern") return;
        for (const prop of node.id.properties) {
          if (prop.type !== "Property") continue;
          const key = prop.key;
          if (key.type !== "Identifier") continue;
          if (NAMES.has(key.name)) {
            context.report({ node: prop, messageId: "noDestructure", data: { name: key.name } });
          }
        }
      },
    };
  },
};
