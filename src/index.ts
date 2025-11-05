// Application entry point with routing
import m from 'mithril';

// UI parts
import GitHubCorner from './ui/GitHubCorner';

// Pages
import PuzzlePage from './pages/PuzzlePage';

// Webawesome components
import { registerIconLibrary } from '@awesome.me/webawesome/dist/webawesome.js';
import "@awesome.me/webawesome/dist/styles/themes/default.css";

// CSS for this component
import './index.css';

// Lit (used by Web Awesome components) generates spurious update warnings in development mode only
// this does not affect production builds
if (import.meta.env.DEV) {
  console.log('silencing lit update warnings');
  const { LitElement } = await import('lit');
  LitElement.disableWarning?.('change-in-update');
}


// detect light/dark mode
function configureDarkLightTheme() {
  const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
  function manageDarkLightTheme() {
    if (darkModeQuery.matches) {
      document.documentElement.classList.add('wa-dark');
    } else {
      document.documentElement.classList.remove('wa-dark');
    }
  }
  manageDarkLightTheme();
  darkModeQuery.addEventListener('change', manageDarkLightTheme);
}
configureDarkLightTheme();

// Layout component that wraps all pages with navigation and GitHub corner
const Layout: m.Component = {
  view: () => {
    return [
      m(GitHubCorner, {
        link: "https://github.com/weevilgenius/puzzle-generator",
      }),
      // m(Navigation),
      // vnode.children,
      m(PuzzlePage),
    ];
  },
};

// Configure Webawesome icons to use Material Symbols
registerIconLibrary('material', {
  resolver: (name) => {
    const match = name.match(/^(.*?)(_(rounded|sharp))?$/);
    if (match) {
      return `https://cdn.jsdelivr.net/npm/@material-symbols/svg-400@0.32.0/${match[3] ?? 'outlined'}/${match[1]}.svg`;
    }
    return '';
  },
  mutator: (svg) => svg.setAttribute('fill', 'currentColor'),
});

// Ask Mithril to render the page, our componet gets placed into the root element.
// Mithril will rerender automatically after DOM event handlers defined in component
// views and also whenever m.redraw() is called.
m.mount(document.body, Layout);

// optional routing for multiple pages
// m.route(document.body, "/", {
//   "/": {
//     render: () => m(Layout, m(PuzzlePage)),
//   },
//   "/test": {
//     render: () => m(Layout, m(TestPage)),
//   },
// });
