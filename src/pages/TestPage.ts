// Test page for developing and testing new features
import m from 'mithril';
import type { PathCommand } from '../geometry/types';
import PathEditor from '../ui/PathEditor';

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
      { type: 'move', p: [100, 150] },
      // Straight line across the top
      { type: 'line', p: [300, 150] },
      // Curved segment down and to the right (control points create an S-curve)
      { type: 'bezier', p1: [350, 180], p2: [350, 280], p3: [300, 350] },
      // Curved segment across the bottom (smooth curve)
      { type: 'bezier', p1: [250, 380], p2: [150, 380], p3: [100, 350] },
      // Curved segment back to start (completes the shape)
      { type: 'bezier', p1: [70, 300], p2: [70, 200], p3: [100, 150] },
    ];
    state.initialPathToLoad = samplePath;
    state.pathCommands = samplePath;
    state.pathDataDisplay = JSON.stringify(samplePath, null, 2);
    m.redraw();
  };

  return {
    view: () => {
      return m(".page", [
        m("h1", "Path Editor - Phase 4 Pan and Zoom"),
        m("p", "Testing the PathEditor component with pan and zoom support."),

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
            ]),

            m(".instructions", [
              m("h3", { style: "margin-top: 1rem;" }, "Instructions:"),
              m("p", "The editor has two modes:"),
              m("ul", { style: "margin: 0.5rem 0;" }, [
                m("li", m("strong", "Drawing Mode"), ": Click to add points (straight lines), or click-drag to add points with smooth bezier curves"),
                m("li", "Stay in drawing mode until you click the ", m("strong", "End Drawing"), " button"),
                m("li", m("strong", "Editing Mode"), ":"),
                m("ul", { style: "margin-left: 1rem;" }, [
                  m("li", "Click anywhere on the path to select it and show all vertices"),
                  m("li", "Click a specific vertex to select it, then drag to move it"),
                  m("li", "Drag curve handles to adjust curve shape"),
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

          // Phasestatus
          m(".findings", [
            m("h2", "Implementation Status"),
            m("h3", { style: "margin-top: 1rem;" }, "Phase 4 - Pan and Zoom:"),
            m("ul", [
              m("li", "✅ Spacebar + drag to pan"),
              m("li", "✅ Mouse wheel to zoom (centered on cursor)"),
              m("li", "✅ Zoom dropdown with preset levels"),
              m("li", "✅ Recenter button to reset view"),
            ]),
          ]),
        ]),
      ]);
    },
  };
};

export default TestPage;
