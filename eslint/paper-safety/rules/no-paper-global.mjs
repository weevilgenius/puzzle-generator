// Disallow paper.* global API usage (Path, Group, Tool, install, etc.)
export default {
  meta: {
    type: "problem",
    docs: { description: "Disallow paper.* global API usage; use a PaperScope instance." },
    schema: [],
    messages: {
      // Normal constructors / members (Path, Group, Color, etc.)
      noPaperGlobal: "Use a PaperScope instance (e.g. scope.{{name}}) instead of global {{member}}.",
      // PaperScope itself needs a different suggestion
      noPaperScopeCtor: "Do not using the global {{member}} here. Create a scope in your factory and pass it in.",
    },
  },
  create(context) {
    const sourceCode = context.getSourceCode();

    function isDisabledHere(node) {
      // Respect eslint-disable-next-line if you want exceptions per site.
      const comments = sourceCode.getCommentsBefore(node);
      return comments.some((c) =>
        /eslint-disable-next-line/.test(c.value) && /paper-safety\/no-paper-global/.test(c.value)
      );
    }

    return {
      // paper.* global API
      MemberExpression(node) {
        if (node.object?.type !== "Identifier" || node.object.name !== "paper") return;
        if (isDisabledHere(node)) return;

        const prop =
          node.property.type === "Identifier"
            ? node.property.name
            : sourceCode.getText(node.property);

        const member = `paper.${prop}`;

        if (prop === "PaperScope") {
          context.report({
            node,
            messageId: "noPaperScopeCtor",
            data: { member },
          });
        } else {
          context.report({
            node,
            messageId: "noPaperGlobal",
            data: { name: prop, member },
          });
        }
      },
      // paper.install()
      CallExpression(node) {
        const callee = node.callee;
        if (
          callee?.type === "MemberExpression" &&
          callee.object.type === "Identifier" &&
          callee.object.name === "paper" &&
          callee.property.type === "Identifier" &&
          callee.property.name === "install"
        ) {
          if (!isDisabledHere(node)) {
            context.report({
              node,
              messageId: "noPaperGlobal",
              data: { name: "install", member: "paper.install" },
            });
          }
        }
      },
    };
  },
};
