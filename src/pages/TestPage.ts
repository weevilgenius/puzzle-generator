// Test page for developing and testing new features
import m from 'mithril';
import type { PathCommand } from '../geometry/types';
import PathEditor from '../ui/PathEditor';
import { parseSVGFile } from '../geometry/svgUtils';
import { fitPathToCanvas } from '../geometry/utils';
import type MithrilViewEvent from '../utils/MithrilViewEvent';

// import our CSS
import "./TestPage.css";

/**
 * Test page component for PathEditor
 */
export const TestPage: m.ClosureComponent<unknown> = () => {
  const state = {
    // Path to initialize the editor with (only set by Clear/Load buttons)
    initialPathToLoad: [] as PathCommand[],
    // Current path data for display only
    pathCommands: [] as PathCommand[],
    pathDataDisplay: 'No path data yet',
    // File input element for SVG import
    svgInputElement: undefined as HTMLInputElement | undefined,
    // Import status
    importStatus: '' as string,
  };

  /**
   * Handle path changes from the PathEditor component
   */
  const handlePathChanged = (path: PathCommand[]) => {
    // Update display data only - don't feed back to initialPath
    state.pathCommands = path;
    state.pathDataDisplay = JSON.stringify(path, null, 2);
  };

  /**
   * Clear the path and reset the editor
   */
  const clearPath = () => {
    state.initialPathToLoad = [];
    state.pathCommands = [];
    state.pathDataDisplay = 'No path data yet';
    // Force a redraw to reset the PathEditor
    m.redraw();
  };

  /**
   * Load a sample path for testing
   * Includes a mix of lines and curves to test editing functionality
   */
  const loadSamplePath = () => {
    const samplePath: PathCommand[] = [
      {
        type: "move",
        p: [
          469.48276150227287,
          198.61914195331622,
        ],
      },
      {
        type: "line",
        p: [
          147.27539529214673,
          525.2460501911088,
        ],
      },
      {
        type: "bezier",
        p1: [
          119.6268609401618,
          551.2189519643504,
        ],
        p2: [
          149.62606858643616,
          580,
        ],
        p3: [
          178.36644877954177,
          551.7150560673149,
        ],
      },
      {
        type: "line",
        p: [
          206.99671887066515,
          523.5384839302747,
        ],
      },
      {
        type: "line",
        p: [
          241.34793037003863,
          560.4031774534698,
        ],
      },
      {
        type: "line",
        p: [
          264.8072838080452,
          537.7816545144234,
        ],
      },
      {
        type: "line",
        p: [
          232.96958275167054,
          503.43044775157955,
        ],
      },
      {
        type: "line",
        p: [
          252.23977895834645,
          484.99810098998205,
        ],
      },
      {
        type: "line",
        p: [
          268.15862475000426,
          500.91691362593315,
        ],
      },
      {
        type: "line",
        p: [
          287.4288209566801,
          483.32241157288445,
        ],
      },
      {
        type: "line",
        p: [
          273.1856361629428,
          466.5657068630892,
        ],
      },
      {
        type: "line",
        p: [
          296.07185058171,
          443.34292886551395,
        ],
      },
      {
        type: "line",
        p: [
          330.2814730038454,
          480.0802571096493,
        ],
      },
      {
        type: "line",
        p: [
          357.19242550437104,
          453.43183149484946,
        ],
      },
      {
        type: "line",
        p: [
          323.7943979441297,
          416.6172978193763,
        ],
      },
      {
        type: "line",
        p: [
          501.07659759926975,
          235.32345658662825,
        ],
      },
      {
        type: "bezier",
        p1: [
          501.07659759926975,
          235.32345658662825,
        ],
        p2: [
          558.04932730116,
          263.8097503896305,
        ],
        p3: [
          597.4275549500016,
          248.7287824622282,
        ],
      },
      {
        type: "bezier",
        p1: [
          636.805782598843,
          233.64776716953054,
        ],
        p2: [
          670.3190972878429,
          209.35060217868192,
        ],
        p3: [
          675.3461181738405,
          165.78319835239148,
        ],
      },
      {
        type: "bezier",
        p1: [
          680.3731390598382,
          122.21579452610115,
        ],
        p2: [
          659.4273055378894,
          78.6484143824585,
        ],
        p3: [
          625.9138961182989,
          49.324204822964475,
        ],
      },
      {
        type: "bezier",
        p1: [
          592.4005340640038,
          20,
        ],
        p2: [
          537.9412437571693,
          20.837830498960273,
        ],
        p3: [
          499.4008608168767,
          39.27018673361687,
        ],
      },
      {
        type: "bezier",
        p1: [
          460.8604778765839,
          57.70254770480301,
        ],
        p2: [
          438.239021248951,
          92.89158496660718,
        ],
        p3: [
          437.40117180387267,
          127.24280120251018,
        ],
      },
      {
        type: "bezier",
        p1: [
          436.5633223587943,
          161.59402217494272,
        ],
        p2: [
          469.4827615022728,
          198.61914195331644,
        ],
        p3: [
          469.4827615022728,
          198.61914195331644,
        ],
      },
      {
        type: "line",
        p: [
          469.48276150227287,
          198.61914195331622,
        ],
      },
    ];
    state.initialPathToLoad = samplePath;
    state.pathCommands = samplePath;
    state.pathDataDisplay = JSON.stringify(samplePath, null, 2);
    m.redraw();
  };

  /**
   * Handle SVG file import
   */
  const handleSVGImport = (e: Event & MithrilViewEvent) => {
    e.redraw = false;

    if (!state.svgInputElement) return;

    const file = state.svgInputElement.files?.[0];
    if (!file) return;

    // Check file type
    if (file.type !== 'image/svg+xml' && !file.name.endsWith('.svg')) {
      state.importStatus = 'Error: Please select an SVG file';
      m.redraw();
      return;
    }

    // Read the file
    const reader = new FileReader();
    reader.onload = (event) => {
      const svgContent = event.target?.result as string;
      if (!svgContent) {
        state.importStatus = 'Error: Could not read file';
        m.redraw();
        return;
      }

      // Parse the SVG
      const parseResult = parseSVGFile(svgContent);
      if (!parseResult) {
        state.importStatus = 'Error: Could not parse SVG path';
        m.redraw();
        return;
      }

      // Fit the path to canvas
      const fittedPath = fitPathToCanvas(parseResult.commands, 800, 600);

      // Load into editor
      state.initialPathToLoad = fittedPath;
      state.pathCommands = fittedPath;
      state.pathDataDisplay = JSON.stringify(fittedPath, null, 2);

      // Show warning if compound path was detected
      if (parseResult.warning) {
        state.importStatus = `Warning: ${parseResult.warning}`;
      } else {
        state.importStatus = `Imported: ${file.name}`;
      }
      m.redraw();
    };

    reader.onerror = () => {
      state.importStatus = 'Error: Failed to read file';
      m.redraw();
    };

    reader.readAsText(file);

    // Clear the input so the same file can be imported again
    state.svgInputElement.value = '';
  };

  return {
    view: () => {
      return m(".page", [
        m("h1", "Path Editor"),
        m("p", "Testing the PathEditor component."),

        m(".test-page", [
          // PathEditor component
          m(".test-area", [
            m(PathEditor, {
              width: 800,
              height: 600,
              initialPath: state.initialPathToLoad,
              onPathChanged: handlePathChanged,
              strokeColor: '#000000ff',
            }),
          ]),

          // Controls
          m(".controls", [
            m("h2", "Controls"),
            m(".button-group", [
              m("button", {
                onclick: clearPath,
                style: "background: #f44336;",
              }, "Clear Canvas"),

              m("button", {
                onclick: loadSamplePath,
                style: "background: #4CAF50;",
              }, "Load Sample Path"),

              // SVG Import button
              m("button", {
                onclick: () => {
                  if (state.svgInputElement) {
                    state.svgInputElement.click();
                  }
                },
                style: "background: #2196F3;",
              }, "Import SVG"),

              // Hidden file input for SVG import
              m('input[type=file]', {
                style: { display: 'none' },
                accept: '.svg,image/svg+xml',
                oncreate: ({ dom }) => {
                  state.svgInputElement = dom as HTMLInputElement;
                },
                onchange: handleSVGImport,
              }),
            ]),

            // Import status message
            state.importStatus && m("p", {
              style: `margin-top: 0.5rem; color: ${
                state.importStatus.startsWith('Error') ? '#f44336' :
                  state.importStatus.startsWith('Warning') ? '#FF9800' :
                    '#4CAF50'
              };`,
            }, state.importStatus),

            m(".instructions", [
              m("h3", { style: "margin-top: 1rem;" }, "Instructions:"),
              m("p", "The editor has two modes:"),
              m("ul", { style: "margin: 0.5rem 0;" }, [
                m("li", m("strong", "Drawing Mode"), ": Click to add points (straight lines), or click-drag to add points with smooth bezier curves"),
                m("ul", { style: "margin-left: 1rem;" }, [
                  m("li", "Move near the first point to see a green circle indicator - click to close the path"),
                  m("li", "Closing the path automatically switches to Edit mode"),
                  m("li", "Or click ", m("strong", "End Drawing"), " to finish without closing"),
                ]),
                m("li", m("strong", "Editing Mode"), ":"),
                m("ul", { style: "margin-left: 1rem;" }, [
                  m("li", "Click anywhere on the path to select it and show all vertices"),
                  m("li", "Click a specific vertex to select it (turns blue), then drag to move it"),
                  m("li", "Drag curve handles to adjust curve shape"),
                  m("li", "Hold ", m("strong", "Shift"), " and click on the path to insert a new point"),
                  m("li", "Select a vertex and press ", m("strong", "Delete"), " or ", m("strong", "Backspace"), " to remove it"),
                  m("li", "Click empty space to deselect"),
                ]),
                m("li", "The mode indicator below the canvas shows the current mode"),
              ]),
              m("h3", { style: "margin-top: 1rem;" }, "Pan and Zoom:"),
              m("ul", { style: "margin: 0.5rem 0;" }, [
                m("li", "Hold ", m("strong", "Spacebar"), " and drag to pan the canvas"),
                m("li", "Use ", m("strong", "mouse wheel"), " to zoom in/out (zooms toward cursor position)"),
                m("li", "Use the ", m("strong", "Zoom dropdown"), " to select preset zoom levels (25%, 50%, 100%, 200%, 400%)"),
                m("li", "Click the ", m("strong", "Recenter button"), " to reset view to 100% zoom and center position"),
              ]),
            ]),
          ]),

          // Path data display
          m(".data-display", [
            m("h2", "Path Data"),

            m("h3", "PathCommand[] Format:"),
            m("textarea", {
              readonly: true,
              value: state.pathDataDisplay,
              rows: 15,
              style: "font-family: monospace; font-size: 12px; width: 100%;",
            }),
          ]),

        ]),
      ]);
    },
  };
};

export default TestPage;
