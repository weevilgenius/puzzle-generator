import m from 'mithril';
import { generateVoronoi, renderToCanvas } from "./shared/geometry";

// include our CSS
import './index.css';

// page component
const Page: m.ClosureComponent<unknown> = () => {

  // component state
  const state = {
    seed: 1234,
    /** Width of canvas in pixels */
    canvasWidth: 800,
    /** Height of canvas in pixels */
    canvasHeight: 600,
    /** Minimum distance between control points (pixels) */
    distance: 40,
    /** Canvas HTML element */
    canvas: null as HTMLCanvasElement | null,
  };

  function rebuildVoronoi() {
    if (!state.canvas) return;
    const { voronoi } = generateVoronoi(state.canvasWidth, state.canvasHeight, state.distance, state.seed);
    renderToCanvas(voronoi, state.canvas);
  }

  // Mithril component
  return {

    // component lifecycle: called after our DOM element is created and attached
    oncreate: ({ dom }) => {
      state.canvas = dom.querySelector<HTMLCanvasElement>("canvas");
      rebuildVoronoi();
    },

    // component lifecycle: render our output
    view: () => {

      return m(".container", [
        m('canvas', {
          width: state.canvasWidth,
          height: state.canvasHeight,
        }),
        m("button.rebuild", {
          onclick: () => {
            rebuildVoronoi();
          },
        }, "Rebuild"),
      ]);
    }, // view()
  };
};


// Ask Mithril to render the page, our componet gets placed into the root element.
// Mithril will rerender automatically after DOM event handlers defined in component
// views and also whenever m.redraw() is called.
m.mount(document.body, Page);
