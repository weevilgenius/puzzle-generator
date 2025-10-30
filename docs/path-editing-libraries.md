# Path Editor Library Evaluation

## Overview

This document evaluates JavaScript/TypeScript libraries for implementing a graphical path editor component to support:
- Defining whimsy pieces
- Creating custom tab styles
- Defining custom puzzle borders

## Requirements

### Essential
- Define paths with line segments and bezier curves
- Edit existing shapes including bezier control points
- TypeScript support or TypeScript-friendly

### Nice to Have
- Arc support
- Mobile/touch support
- SVG import/export
- Active maintenance and community

## Library Comparison

### Paper.js

**Type**: Canvas-based vector graphics library

**Pros**:
- Mature, well-documented library with comprehensive path editing capabilities
- Full SVG import/export support (since 2012)
  - `project.importSVG(svg)` / `item.importSVG(svg)`
  - `project.exportSVG()` / `item.exportSVG()`
- Built-in mouse and touch handlers for interactive editing
- Excellent bezier curve support with handles and control points
- Path smoothing and simplification features
- Strong community with extensive documentation and examples
- Works with cubic bezier curves (internally converts quadratic to cubic)

**Cons**:
- Canvas-based rather than pure SVG/DOM manipulation
- Adds ~100KB to bundle size
- Development appears less active (last major updates several years ago)

**Touch Support**: Yes - mouse handlers work with touchscreens

**SVG Support**: Excellent - full import/export with advanced features (gradients, clipping)

**Documentation**: http://paperjs.org/

---

### Konva.js

**Type**: Canvas library for 2D drawing

**Pros**:
- Official sandbox demo for "Modify Curves with Anchor Points"
- Explicit touch support documented: "Use your mouse or finger to drag and drop the anchor points"
- Supports touch events: touchstart, touchmove, touchend, tap, dbltap, etc.
- Active development with recent implementations (2024-2025)
- Good TypeScript support
- Multiple approaches for bezier curves:
  - `Konva.Line` with bezier property
  - `Konva.Path` with SVG data
  - `Konva.Shape` for custom drawing

**Cons**:
- Canvas-based, not pure SVG
- Bezier curve implementation noted as "challenging" for complex use cases
- Less extensive path manipulation features compared to Paper.js
- Would need custom implementation for full path editor

**Touch Support**: Yes - comprehensive touch event support

**SVG Support**: Good - can use SVG path data via `Konva.Path`

**Documentation**: https://konvajs.org/

---

### Fabric.js

**Type**: Canvas object model library with SVG support

**Pros**:
- Interactive object model on top of canvas
- SVG-to-canvas and canvas-to-SVG parser
- Vector-focused drawing objects (easily transformable)
- Good community with many examples
- Can implement bezier control points via custom code using fabric.Circle objects
- Recent activity (GitHub gist updated February 2024)

**Cons**:
- Bezier control point editing not built into core - requires custom implementation
- Canvas-based rather than pure SVG
- More complex to set up interactive path editing compared to Paper.js

**Touch Support**: Has touch support, but less explicitly documented than Konva

**SVG Support**: Good - bidirectional SVG conversion

**Documentation**: http://fabricjs.com/

---

### Two.js

**Type**: Renderer-agnostic 2D drawing API

**Pros**:
- Renders to multiple contexts: WebGL, canvas2d, **and SVG**
- Same API works across all rendering contexts
- Keeps track of drawn objects for later modification
- Can rotate, scale, translate objects
- Smaller than other libraries

**Cons**:
- Less extensive path editing features
- Smaller community and fewer examples
- Would require significant custom implementation for interactive bezier editing

**Touch Support**: Should work via standard event handlers

**SVG Support**: Excellent - native SVG rendering option

**Documentation**: https://two.js.org/

---

### SVG.js / Snap.svg

**Type**: Pure SVG manipulation libraries

**Pros**:
- Works directly with SVG DOM elements (no canvas conversion)
- SVG.js is small and fast with nearly full SVG spec coverage
- Snap.svg supports newest SVG features (masking, clipping, patterns, gradients)
- Zero dependencies (Snap.svg)
- Good for projects that want to stay in SVG space

**Cons**:
- No built-in interactive path editing or control point manipulation
- Would require substantial custom implementation
- Less suitable for complex interactive editing compared to canvas libraries

**Touch Support**: Via standard DOM event handlers

**SVG Support**: Native - this is their core purpose

**Documentation**:
- https://svgjs.dev/
- http://snapsvg.io/

---

## Open Source Path Editor Examples

### Vector.js
- Interactive demonstrations of cubic/quadratic bezier curves
- Four control points for controlling curve shape
- Educational/demo quality
- https://vectorjs.org/

### Paths (by jxnblk)
- React-based SVG path editor
- Exposes path command syntax in reactive UI
- No tool palette - direct command editing
- Good reference implementation
- https://github.com/jxnblk/paths

### Recent GitHub Projects
Several TypeScript-based path editors found:
- React + TypeScript implementations (2022-2024)
- Vue3 + TypeScript + Vite implementations (2024)
- Path visualization tools (updated December 2024)
- Check GitHub topics: `svg-path` and `svg-editor` with TypeScript filter

---

## Recommendations

### Option 1: Paper.js

**Best for**: Getting a full-featured path editor working quickly

**Rationale**:
- Most mature solution with comprehensive path editing features out of the box
- Proven SVG import/export capabilities
- Touch support built-in
- Extensive documentation and examples
- Lower development effort - many features already implemented

**Trade-offs**:
- Canvas-based (but with SVG conversion) - less ideal for pure SVG workflow
- Slightly larger bundle size
- Less active recent development

**Implementation Path**:
1. Install Paper.js and TypeScript types (`@types/paper`)
2. Create canvas element for editing
3. Use Paper.js tools API for interactive editing
4. Export to SVG path data for integration with existing codebase
5. Consider creating a wrapper component to convert between your `PathCommand` type and Paper.js format

---

### Option 2: Konva.js + Custom Implementation

**Best for**: Full control with modern TypeScript support

**Rationale**:
- Active development and modern codebase
- Official touch support documentation
- Good TypeScript support
- Can build exactly what you need

**Trade-offs**:
- Requires custom implementation of path editor UI
- More development effort than Paper.js
- Canvas-based

**Implementation Path**:
1. Use Konva's anchor point example as starting point
2. Build custom UI for adding/removing path segments
3. Implement control point editing for bezier curves
4. Add SVG import/export layer

---

### Option 3: Build Custom SVG Editor

**Best for**: Maximum flexibility and pure SVG workflow

**Rationale**:
- Complete control over implementation
- Stays in SVG/DOM space (no canvas conversion)
- Can integrate tightly with existing codebase
- Use existing `PathCommand` types directly

**Trade-offs**:
- Most development effort
- Need to implement all interaction logic
- Touch handling requires careful implementation

**Implementation Path**:
1. Use existing `DrawingControl` component as foundation
2. Add bezier curve support to drawing
3. Implement control point editing mode
4. Add visual handles for control points (SVG circles/paths)
5. Handle touch events carefully for mobile support
6. Reference open source examples (Vector.js, jxnblk/paths) for UI patterns

---

## Additional Considerations

### Bundle Size
- Paper.js: ~100KB
- Konva.js: ~60KB
- Fabric.js: ~90KB
- Two.js: ~30KB
- SVG.js: ~10KB

### TypeScript Support
- Konva.js: Built-in TypeScript definitions
- Two.js: DefinitelyTyped definitions available
- Paper.js: DefinitelyTyped definitions available
- Fabric.js: Built-in TypeScript definitions
- SVG.js: Built-in TypeScript definitions

### Integration with Existing Codebase

Your codebase already has:
- `PathCommand` union type (MoveTo, LineTo, CurveTo, ArcTo)
- SVG export functionality

Any chosen solution will need to:
1. Convert between library's path format and your `PathCommand` type
2. Integrate with existing `GeneratorConfig` system
3. Provide serializable config for reproducible results
4. Export to your SVG generation pipeline

---

## Phased Implementation Proposal (Paper.js)

### Phase 1: Proof of Concept - Evaluate Paper.js Suitability

**Goal**: Build a minimal viable editor to validate that Paper.js meets the project's needs.

**Scope**:
- Install Paper.js and TypeScript types (`@types/paper`)
- Create a simple standalone page with a canvas element
- Implement basic path drawing:
  - Click to add points (straight line segments)
  - Click and drag to add bezier curves with control handles
- Enable editing mode to move anchor points and adjust bezier handles
- Add a "Clear" button to reset the canvas
- Display the raw Paper.js path data in a text area
- Export path as SVG path data string

**Success Criteria**:
- Can draw paths with mix of lines and bezier curves
- Can edit anchor points and control handles intuitively
- Can export to SVG path data
- Touch events work on mobile devices (manual testing)
- Paper.js feels responsive and suitable for the use cases

**Deliverables**:
- Update page in `src/pages/TestPage.ts`
- Minimal UI with canvas and basic controls
- Documentation of findings and any limitations discovered

**Estimated Effort**: 4-8 hours

---

### Phase 2: PathCommand Integration

**Goal**: Bridge Paper.js with the existing `PathCommand` type system.

**Scope**:
- Create utility functions to convert between Paper.js paths and `PathCommand[]` arrays
  - `paperPathToPathCommands(path: paper.Path): PathCommand[]`
  - `pathCommandsToPaperPath(commands: PathCommand[]): paper.Path`
- Handle all path command types: MoveTo, LineTo, CurveTo
- Add ArcTo support if Paper.js provides arc capabilities (or document limitation)
- Write unit tests for conversion functions
- Update the test page to show both Paper.js and `PathCommand` representations side-by-side

**Success Criteria**:
- Bidirectional conversion works correctly
- Can import existing puzzle borders into Paper.js editor
- Exported `PathCommand[]` integrates with existing geometry pipeline
- Edge cases handled (empty paths, single points, closed vs open paths)

**Deliverables**:
- `src/geometry/paperjs-integration.ts` with conversion utilities
- Unit tests for conversion functions
- Updated test page demonstrating round-trip conversion

**Estimated Effort**: 6-10 hours

---

### Phase 3: Reusable Path Editor Component

**Goal**: Create a production-ready Mithril component for path editing.

**Scope**:
- Create `src/ui/PathEditor/PathEditor.ts` Mithril component
- Implement component with `PathEditorAttrs`:
  - `initialPath?: PathCommand[]` - optional starting path
  - `onPathChanged: (path: PathCommand[]) => void` - callback for changes
  - `width: number` and `height: number` - editor dimensions
  - `bounds?: { width: number; height: number }` - optional boundary box
  - `showGrid?: boolean` - optional background grid
- Add toolbar with common tools:
  - Pen tool (add points/curves)
  - Selection tool (move/edit points)
  - Delete point tool
  - Undo/redo functionality
- Add visual feedback:
  - Highlight selected points
  - Show control handles for bezier curves
  - Visual boundary indicators if bounds provided
- Implement proper lifecycle management (setup/teardown Paper.js)

**Success Criteria**:
- Component is self-contained and reusable
- Can be dropped into any page with minimal configuration
- Works with Mithril's lifecycle and redraw system
- Properly cleans up Paper.js resources on component removal
- Responsive to parent container size changes

**Deliverables**:
- `src/ui/PathEditor/` directory with component and types
- Component documentation with usage examples
- Integration example in test page

**Estimated Effort**: 12-16 hours

---

### Phase 4: Integration Points

**Goal**: Integrate the path editor into existing puzzle generator features.

**Scope**:
- **Custom Puzzle Borders**:
  - Update `BorderShapePicker.ts` to add "Custom" option
  - When selected, show path editor with current border
  - Update border when path changes
- **Custom Tab Styles** (future):
  - Create tab generator that uses custom path for tab shape
  - Add path editor to tab generator config UI
- **Whimsy Pieces** (future):
  - Design system for defining whimsy piece shapes
  - Integrate path editor for whimsy shape definition

**Phase 4A - Custom Borders Only**:
- Focus on getting custom borders working end-to-end
- Add "Custom Shape" to border shape picker
- Show path editor in modal or expandable panel
- Save custom border to puzzle config
- Render custom border in preview

**Success Criteria**:
- User can draw custom border shape
- Custom border appears in puzzle preview
- Custom border is used in puzzle generation
- Configuration is serializable (can save/load)
- Custom border exports correctly to SVG

**Deliverables**:
- Updated `BorderShapePicker.ts` with custom option
- Integration with `PuzzlePage.ts` state management
- Example custom borders for testing

**Estimated Effort**: 8-12 hours (Phase 4A only)

---

### Phase 5: Polish and Advanced Features

**Goal**: Add quality-of-life features and refinements.

**Scope**:
- Keyboard shortcuts (delete key, escape, etc.)
- Zoom and pan controls for detailed editing
- Snap-to-grid functionality
- Symmetry tools (mirror, rotate)
- Path simplification (reduce point count)
- Import from SVG files
- Export to SVG files
- Touch gesture support (pinch-to-zoom, two-finger pan)
- Undo/redo history with UI indicators
- Path validation and error feedback
- Performance optimization for complex paths
- Accessibility features (keyboard-only editing)

**Success Criteria**:
- Editor feels polished and professional
- Advanced features are discoverable but not overwhelming
- Performance remains good with complex paths (100+ points)
- Works well on both desktop and mobile

**Deliverables**:
- Enhanced `PathEditor` component with advanced features
- User documentation
- Keyboard shortcut reference

**Estimated Effort**: 16-24 hours

---

### Total Estimated Effort
- **Phase 1**: 4-8 hours (proof of concept)
- **Phase 2**: 6-10 hours (integration layer)
- **Phase 3**: 12-16 hours (reusable component)
- **Phase 4A**: 8-12 hours (custom borders)
- **Phase 5**: 16-24 hours (polish and advanced features)

**Total**: 46-70 hours across all phases

**Minimum Viable Product** (Phases 1-3): 22-34 hours

---

### Risk Mitigation

**Risk**: Paper.js doesn't meet requirements
- **Mitigation**: Phase 1 is specifically designed to discover this early
- **Fallback**: Document issues and evaluate Konva.js or custom implementation

**Risk**: Performance issues with Paper.js on mobile
- **Mitigation**: Test on mobile devices during Phase 1
- **Fallback**: Add performance optimizations or simplify UI for mobile

**Risk**: Complex conversion between Paper.js and `PathCommand` format
- **Mitigation**: Phase 2 focuses entirely on this problem
- **Fallback**: May need to extend `PathCommand` type or accept some limitations

**Risk**: Integration complexity with Mithril lifecycle
- **Mitigation**: Phase 3 isolates component integration concerns
- **Fallback**: Use simpler integration pattern (e.g., manual DOM updates)

---

### Decision Points

After each phase, evaluate:

**After Phase 1**:
- Is Paper.js suitable? If no → evaluate alternatives
- Are there showstopper issues? If yes → document and reassess
- Should we proceed to Phase 2? If yes → continue

**After Phase 2**:
- Is conversion tractable? If no → consider simplifying path model
- Are there data fidelity issues? If yes → address before Phase 3
- Should we proceed to Phase 3? If yes → continue

**After Phase 3**:
- Is component reusable enough? If no → refactor before integration
- Are there Mithril integration issues? If yes → resolve before Phase 4
- Should we proceed to Phase 4? If yes → continue

**After Phase 4A**:
- Does custom border feature work end-to-end? If yes → consider expanding to tabs/whimsy
- Should we prioritize Phase 5 or Phase 4B/4C? Depends on user needs

This phased approach allows for early validation and course correction while building toward a comprehensive path editing solution.

---

## Paper.js Capabilities Summary

During Phase 1 evaluation, the following questions were explored to understand the division of responsibility between Paper.js and custom code:

### Q1: Snapping to Beginning Point (Close Path)

**Answer**: Mostly our code (~70-80%)

**Paper.js provides**:
- `path.closed = true` or `path.closePath()` - actually closes the path (trivial one-liner)
- Automatic rendering of closed path with proper geometry

**We would write**:
- Snap detection logic (calculate distance from mouse to first point)
- Snap threshold determination (e.g., 10-15 pixels)
- Visual feedback when near first point (highlight, larger dot, snap indicator)
- Preview line adjustment to snap to exact position
- State management (prevent adding more points after closing)
- UX decisions (auto-close on click? special cursor? allow unclosing?)

**Takeaway**: The closing itself is trivial in Paper.js, but all the intelligent UX around *when* and *how* to close is custom code.

---

### Q2: Modifier Keys and Editor Behavior (Illustrator/Inkscape Controls)

**Answer**: Mostly our code (~85-95%)

**Paper.js provides**:
- `event.modifiers` object with boolean flags:
  - `event.modifiers.shift`
  - `event.modifiers.control` / `command`
  - `event.modifiers.alt` / `option`
  - `event.modifiers.space`

**We would write**:
- **All behavior logic**:
  - Shift: constrain angles (45°, 90°), constrain to axis, uniform scaling
  - Alt: draw from center, duplicate while dragging, toggle smooth/corner
  - Ctrl: add to selection, precision mode
  - Combinations: Shift+Alt, Ctrl+Shift with compound behaviors
- **Tool state machines**:
  - Pen tool: click vs click-drag, smooth vs corner points
  - Selection tool: move vs rotate vs scale
  - Handle behavior: broken vs aligned vs symmetric
- **Complex interactions**:
  - Click for corner, drag for smooth (Illustrator pen tool)
  - Alt-drag handle to break symmetry
  - Shift-drag to constrain angles
  - Ctrl-click to add point on path
- **Visual feedback**: cursor changes, constraint previews, snap targets
- **Keyboard shortcuts**: tool switching, undo/redo, delete

**Takeaway**: Paper.js gives raw key state; Illustrator's entire interaction design (~20+ years of UX) is custom logic. This is the **biggest chunk of custom code** for a full editor.

---

### Q3: Path Modifications (Insert/Delete Points, Line↔Curve Conversion)

**Answer**: Mixed (~60% our code, 40% Paper.js)

**Paper.js provides**:
- `path.insert(index, point)` - insert segment at index
- `segment.remove()` - remove segment
- `path.getLocationAt(offset)` / `path.getLocationOf(point)` - find location on path
- `path.divideAt(location)` - split path, creating new segment
- `segment.handleIn` / `segment.handleOut` - direct handle manipulation
- Direct array access: `path.segments[i]`, `path.curves[i]`

**We would write**:
- **Insertion logic**: hit detection, calculate exact curve point, preserve curve shape with good handle values
- **Deletion logic**: keyboard events, selection state updates, handle smoothing of neighbors
- **Line↔Curve conversion**: UI triggering, algorithm for handle placement (tangent, length = 1/3 segment?)
- **UX decisions**: where to click to insert, visual preview, auto-smoothing on delete

**Example ratios**:
- Delete a point: 80% Paper.js (`segment.remove()` does the work)
- Insert a point: 50/50 (Paper.js has primitives, we calculate position/handles)
- Convert line to curve: 30% Paper.js, 70% ours (we decide handle algorithm)

**Takeaway**: Paper.js is **more helpful here** than with modifier keys, but smart behavior is still our responsibility.

---

### Q4: UI Features (Rulers, Grid, Palettes, Cursors)

**Answer**: Almost entirely our code (~90-95%)

Paper.js is a **canvas graphics library**, not a **UI framework**. Application-level UI is outside its scope.

**Paper.js provides**:
- `paper.view.viewSize` - canvas dimensions
- `paper.view.center` - center point
- `paper.view.zoom` - zoom level
- `paper.view.matrix` - transformation matrix
- `paper.Color` - color representation
- Coordinate system math

**We would write**:
- **Rulers** (~100-150 lines): render marks/numbers, tick spacing based on zoom, units, coordinate display
- **Snap to Grid** (~80-100 lines): render grid, snapping math (`Math.round(pos/gridSize)*gridSize`), toggle, visual feedback
- **Color Palettes** (~200+ lines): entire UI (swatches, picker, storage), apply to paths (`path.strokeColor = ...`)
- **Custom Cursors** (~20-30 lines): CSS (`canvas.style.cursor = ...`), logic for which cursor when, cursor assets
- **Zoom/Pan** (~60-80 lines): scroll wheel handling, pinch gestures, zoom to fit, spacebar pan
- **Guides/Smart Guides** (~150-200 lines): alignment detection, rendering, snap-to-guide

**Takeaway**: Paper.js gives coordinate primitives and canvas drawing, but all application UI/UX is your responsibility. Very different from Figma's plugin API or Adobe SDKs with built-in UI components.

For a full editor, you'd likely build:
- HTML/CSS overlays for rulers, palettes, panels
- Paper.js canvas for artwork
- JavaScript to coordinate between them

---

### Q5: Primitives Beyond Paths (Groups, Layers, Symbols)

**Answer**: Mostly Paper.js (~70-80%)

This is where Paper.js is **surprisingly comprehensive**! It has a full scene graph system.

**Paper.js provides**:
- **Groups** (`paper.Group`):
  - Create: `new paper.Group([item1, item2])`
  - Hierarchy: `group.addChild()`, `item.parent`, `item.children`
  - Transform entire group: `group.rotate(45)`, `group.scale(2)`
  - Selection: `group.selected = true` (selects all children)

- **Layers** (`paper.Layer`):
  - Multiple layers: `new paper.Layer()`
  - Stack order: `layer.bringToFront()`, `layer.sendToBack()`
  - Active layer: `paper.project.activeLayer`
  - Visibility/locking: `layer.visible`, `layer.locked`

- **Compound Paths** (`paper.CompoundPath`):
  - Boolean operations: union, subtract, intersect, exclude
  - Multiple sub-paths with holes (donut shapes)

- **Symbols/Instances**:
  - Define once: `new paper.Symbol(item)`
  - Place many: `symbol.place(position)`
  - Efficient memory for repeated elements

- **Additional primitives**:
  - `paper.Raster` - bitmap images
  - `paper.PointText` - text rendering
  - `paper.Shape.Circle`, `paper.Shape.Rectangle` - optimized shapes

- **Scene graph features**:
  - Hit testing respects hierarchy
  - Transforms propagate through hierarchy
  - Bounds calculation includes children
  - Iteration utilities

**We would write** (~30-40%):
- **Layers panel UI**: list view, visibility toggles, lock icons, drag-drop reordering
- **Layer naming**: user-facing organization
- **Selection logic**: which layer to add to, group enter/exit modes, select all in layer
- **Application state**: active layer tracking, undo/redo for layer operations
- **Data model conversion**: if adding to puzzle generator, convert hierarchy to `PathCommand[]`, serialize for save/load

**Takeaway**: Paper.js is **much more than a path library** - it's a full vector graphics scene graph. This is a major strength vs raw Canvas APIs.

For the puzzle generator:
- Probably don't need layers (exporting flat SVG)
- **Groups** could organize pieces
- **Compound paths** could be useful for whimsy pieces with holes

The hierarchy is mostly built-in; you'd write the **UI for managing it** (layers panel, grouping commands, etc.).

---

## Overall Division of Responsibility

### Paper.js Strengths (What It Does Well)
- Canvas rendering and automatic view updates
- Path data structures and manipulation
- Mathematical operations (point math, transforms)
- Hit testing infrastructure
- Selection visualization
- Scene graph (groups, layers, hierarchy)
- SVG import/export
- Coordinate system utilities

### Custom Code Requirements (What You Must Build)
- **All application UX/behavior** (~60-80% of a full editor)
- Interaction design decisions (when/how things happen)
- Tool state machines and mode switching
- Complex gesture handling
- Application UI (panels, palettes, toolbars)
- Integration with application data model
- Domain-specific features (puzzle-specific logic)

### The Pattern
Think of Paper.js as:
- **Graphics engine** + **primitives** (like a game engine's renderer)
- You build: **application shell** + **tools** + **UI** + **behavior**

Paper.js is intentionally low-level for interaction design - it provides powerful primitives without imposing a specific editing UX, so you can design exactly the behavior you want.
