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
    /** User uploaded image */
    imageUrl: null as string | null,
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
        m("h1", "Puzzle Generator"),

        m(".puzzle-stack", [
          // canvas rendering the current puzzle
          m('canvas.puzzle', {
            width: state.canvasWidth,
            height: state.canvasHeight,
          }),
          // user uploaded image
          m("img.background", {
            width: state.canvasWidth,
            height: state.canvasHeight,
            src: state.imageUrl,
          }),
        ]),

        // controls
        m(".controls", [
          m("button.rebuild", {
            onclick: () => {
              rebuildVoronoi();
            },
          }, "Rebuild"),
          m("input[type=file]#image-upload", {
            accept: "image/*",
            onchange: (e: Event) => {
              const file = (e.target as HTMLInputElement).files?.[0];
              if (file?.type.startsWith("image/")) {
                // clear any previous image
                if (state.imageUrl) {
                  URL.revokeObjectURL(state.imageUrl);
                }
                state.imageUrl = URL.createObjectURL(file);
              }
            },
          }),
        ]),
      ]);
    }, // view()
  };
};


// Ask Mithril to render the page, our componet gets placed into the root element.
// Mithril will rerender automatically after DOM event handlers defined in component
// views and also whenever m.redraw() is called.
m.mount(document.body, Page);
