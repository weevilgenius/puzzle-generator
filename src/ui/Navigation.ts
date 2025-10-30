// Navigation menu component for routing between pages
import m from 'mithril';
import MithrilViewEvent from '../utils/MithrilViewEvent';

// Webawesome components
import '@awesome.me/webawesome/dist/components/radio/radio.js';
import '@awesome.me/webawesome/dist/components/radio-group/radio-group.js';
import WaRadioGroup from '@awesome.me/webawesome/dist/components/radio-group/radio-group.js';

// CSS for navigation
import './Navigation.css';

export const Navigation: m.Component = {
  view: () => {
    const currentRoute = m.route.get();

    return m("nav.navigation", [
      m("div.nav-links",
        m('wa-radio-group', {
          orientation: "horizontal",
          value: currentRoute,
          onchange: (e: Event & MithrilViewEvent) => {
            e.redraw = false;
            const target = e.target as WaRadioGroup;
            m.route.set(String(target.value));
          },
        }, [
          m('wa-radio', {
            appearance: 'button',
            value: '/puzzle',
          }, "Puzzle Generator"),

          m('wa-radio', {
            appearance: 'button',
            value: '/puzzle-paper',
          }, "Puzzle (Paper.js)"),

          m('wa-radio', {
            appearance: 'button',
            value: '/test',
          }, "Test Harness"),
        ])
      ),
    ]);
  },
};

export default Navigation;
