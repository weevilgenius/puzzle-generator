import m from 'mithril';
import Puzzle from './ui/Puzzle';

// include our CSS
import './index.css';

// page component
const Page: m.ClosureComponent<unknown> = () => {

  // component state
  const state = {
    /** Random seed */
    seed: new Date().getTime() % 10240,
    /** Width of canvas in pixels */
    canvasWidth: 800,
    /** Height of canvas in pixels */
    canvasHeight: 600,
    /** Minimum distance between control points (pixels) */
    distance: 40,
    /** Color of pieces */
    color: "#333333",
    /** User uploaded image */
    imageUrl: undefined as string | undefined,
  };

  // Mithril component
  return {

    // component lifecycle: render our output
    view: () => {

      return m(".page", [
        m("h1", "Puzzle Generator"),
        m(".container", [

          // render the puzzle
          m(Puzzle, {
            width: state.canvasWidth,
            height: state.canvasHeight,
            distance: state.distance,
            seed: state.seed,
            color: state.color,
            imageUrl: state.imageUrl,
          }),

          // puzzle generation controls
          m(".controls", [
            m("label.button", [
              "Choose Image",
              m("input[type=file]#image-upload", {
                accept: "image/*",
                style: { display: "none" },
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
            m("label", [
              "Seed: ",
              m("input[type=number]", {
                value: state.seed,
                onchange: (e: Event) => {
                  state.seed = parseInt((e.target as HTMLInputElement).value);
                },
              }),
            ]),
            m("label", [
              "Piece size: ",
              m("input[type=number]", {
                value: state.distance,
                onchange: (e: Event) => {
                  state.distance = parseInt((e.target as HTMLInputElement).value);
                },
              }),
            ]),
            m("label", [
              "Color: ",
              m("input[type=color]", {
                value: state.color,
                onchange: (e: Event) => {
                  state.color = (e.target as HTMLInputElement).value;
                },
              }),
            ]),
          ]), // .controls

        ]), // .container
      ]);
    }, // view()
  };
};


// Ask Mithril to render the page, our componet gets placed into the root element.
// Mithril will rerender automatically after DOM event handlers defined in component
// views and also whenever m.redraw() is called.
m.mount(document.body, Page);
