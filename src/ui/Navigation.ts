// Navigation menu component for routing between pages
import m from 'mithril';

// Webawesome components
import '@awesome.me/webawesome/dist/components/button/button.js';
import '@awesome.me/webawesome/dist/components/button-group/button-group.js';

// CSS for navigation
import './Navigation.css';

export const Navigation: m.Component = {
  view: () => {
    const currentRoute = m.route.get();

    return m("nav.navigation", [
      m("div.nav-links", m('wa-button-group', [
        m('wa-button', {
          appearance: currentRoute === '/puzzle' ? 'filled' : 'outlined',
          variant: 'neutral',
          size: 'small',
          onclick: () => m.route.set('/puzzle'),
        }, "Puzzle Generator"),
      ])),
    ]);
  },
};

export default Navigation;
