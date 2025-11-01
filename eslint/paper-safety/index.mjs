// ESM plugin entry
import noPaperGlobal from "./rules/no-paper-global.mjs";
import requireScopeQualifiedNews from "./rules/require-scope-qualified-news.mjs";
import noPaperDestructure from "./rules/no-paper-destructure.mjs";

export default {
  rules: {
    "no-paper-global": noPaperGlobal,
    "require-scope-qualified-news": requireScopeQualifiedNews,
    "no-paper-destructure": noPaperDestructure,
  },
};
