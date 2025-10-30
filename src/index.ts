// Application entry point with routing
import m from 'mithril';

// UI parts
import GitHubCorner from './ui/GitHubCorner';
import Navigation from './ui/Navigation';

// Pages
import PuzzlePage from './pages/PuzzlePage';
import PuzzlePaperPage from './pages/PuzzlePaperPage';
import TestPage from './pages/TestPage';

// Webawesome components
import { registerIconLibrary } from '@awesome.me/webawesome/dist/webawesome.js';
import "@awesome.me/webawesome/dist/styles/themes/default.css";

// CSS for this component
import './index.css';

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
  view: (vnode) => {
    return [
      m(GitHubCorner, {
        link: "https://github.com/weevilgenius/puzzle-generator",
      }),
      m(Navigation),
      vnode.children,
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

// Set up routing
m.route(document.body, "/puzzle", {
  "/puzzle": {
    render: () => m(Layout, m(PuzzlePage)),
  },
  "/puzzle-paper": {
    render: () => m(Layout, m(PuzzlePaperPage)),
  },
  "/test": {
    render: () => m(Layout, m(TestPage)),
  },
});
