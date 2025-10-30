# Path Editor Component Requirements

**Last Updated**: 2025-10-28
**Status**: Requirements Definition

---

## Overview

This document defines the requirements for a reusable path editor component that allows users to create and edit vector paths interactively. The component will be used across multiple features in the puzzle generator including custom tab shapes, whimsey pieces, and custom border shapes.

### Technology Selection

Based on previous testing and evaluation, **Paper.js** has been selected as the underlying graphics library. Paper.js provides:
- Built-in path manipulation and rendering
- Bezier curve support with control handles
- Touch and mouse event handling
- SVG import/export capabilities
- Scene graph with groups and layers

---

## Component Purpose

The `PathEditor` component will provide a familiar, professional-grade path editing experience for puzzle designers. It must:

1. **Create paths from scratch** - Support both open and closed paths with line and curve segments
2. **Edit existing paths** - Load and modify paths defined by the application
3. **Import SVG files** - Parse and convert SVG paths to the application's data model
4. **Export to application format** - Convert Paper.js paths to `PathCommand[]` arrays
5. **Support puzzle-specific workflows** - Optimize for creating precise geometric shapes needed for puzzle cutting

---

## Minimum Viable Product Features

### 1. Path Creation

**Drawing Mode**:
- Click to add straight line segments (corner points)
- Click and drag to add smooth curve segments with bezier handles
- Preview the next segment before placing (dashed line or distinctive style)
- Snap to the initial point when mouse is close to enable closing the path
- Visual feedback when near snap distance (highlight first point, show snap indicator)
- Automatically create smooth curves with control points tangent to previous segment
- Support both open paths (line with endpoints) and closed paths (closed loop)

**Smooth Curve Creation**:
- When dragging while adding a point, create symmetric bezier handles
- Calculate initial handle length/direction to maintain smooth flow from previous segment
- Both `handleIn` and `handleOut` should be generated for consistent editing experience

### 2. Path Editing

**Edit Mode** (default mode when path data exists):
- Click to select anchor points
- Drag to move selected anchor points
- Click and drag bezier control handles to adjust curve shape
- Shift + Click to insert a new point on an existing path segment
- Delete/Backspace key to remove selected point(s)
- Double-click on a point to toggle between line segment and curve segment
- Shift + Drag to constrain movement to horizontal/vertical axes (or 45° angles)
- Handle symmetric bezier control (dragging one handle affects opposite handle)

**Mode Switching**:
- Edit mode is the default when a path exists (from `initialPath` or after drawing)
- Drawing mode is automatically enabled when there is no path data:
  - On initial load with no `initialPath`
  - After clearing the canvas
- No explicit mode toggle button required
- Component automatically switches to edit mode after closing a path or after first point is placed

**Selection**:
- Visual indication of selected elements (anchor points, handles)
- Only one point selected at a time in MVP (multi-select is future enhancement)
- Deselect by clicking on empty canvas area

### 3. SVG Import

**Supported SVG Features**:
- Parse SVG path `d` attribute (M, L, C, Q commands)
- Convert to simplified data model (MoveTo, LineTo, CurveTo)
- Import single paths initially (multiple paths in future)
- Handle coordinate transformations (translate, scale to fit canvas)
- Arc commands (A) from SVG will be converted to bezier approximations (Paper.js limitation)

**Unsupported SVG Features** (to be simplified/ignored):
- Gradients, patterns, filters
- Text elements
- Groups (initially - may support in future)
- Complex styling (stroke-width, fill patterns, etc.)
- Clipping paths
- Animations

**Import UX**:
- File picker or drag-and-drop interface
- Preview before accepting imported path
- Option to clear existing path before import
- Error handling for malformed SVG files

### 4. Visual Feedback

**Drawing Mode**:
- Show preview segment from last point to cursor (dashed line)
- Highlight first point when mouse is within snap distance
- Show bezier handle preview while dragging to create curve
- Cursor changes to indicate drawing mode (crosshair or pen icon)

**Edit Mode**:
- Larger hit areas for anchor points (easier to click/drag)
- Different colors/sizes for selected vs unselected points
- Show bezier handles only for selected points (or all points - TBD)
- Handle endpoints rendered as small circles or squares
- Cursor changes based on hover state:
  - Default arrow over empty space
  - Move cursor (four arrows) over anchor point
  - Pointer/hand cursor over handle endpoint
  - Crosshair when Shift is held (insert point mode)

**Tooltips/Hints**:
- Contextual text hints at top or bottom of canvas
- Display current mode ("Drawing Mode", "Edit Mode")
- Show keyboard shortcuts when relevant ("Shift: Insert Point", "Delete: Remove Point")
- Coordinate display for precise positioning (optional)

### 5. Canvas Controls

**Zoom**:
- Mouse wheel to zoom in/out
- Zoom centered on cursor position
- Zoom limits (min: 10%, max: 1000% or similar)
- Zoom level display (optional)

**Pan**:
- Spacebar + Drag to pan canvas
- Cursor changes to hand/grab icon during pan
- Keep path visible within canvas bounds when possible

**Canvas Bounds**:
- Respect component width/height attributes
- Optional background (white, checkerboard, custom)
- Optional border around canvas area

### 6. Styling and Appearance

**Path Rendering**:
- Stroke color controlled via component attribute
- Stroke width: 2-3px for visibility
- No fill required for paths (puzzle cuts are outlines)
- Dark mode support via component attribute (affects UI elements, grid, background)

**Rationale**: Puzzle cuts are primarily about shape, not appearance. Stroke color and dark mode are configurable to fit the application's theme, but extensive styling controls are not needed and would complicate the UI unnecessarily.

---

## Detailed Control Scheme

The component should provide a control scheme familiar to users of Adobe Illustrator, Inkscape, Figma, and similar vector editing tools.

### Mouse and Keyboard Interactions

| Action | Drawing Mode | Edit Mode |
|--------|-------------|-----------|
| **Click** | Add corner point (line segment) | Select anchor point |
| **Click + Drag** | Add smooth point with curve | Move selected anchor point |
| **Drag handle** | N/A | Edit bezier curve shape |
| **Shift + Click** | N/A | Insert new point on path segment |
| **Delete / Backspace** | N/A | Remove selected point |
| **Double Click** | N/A | Toggle point type (corner ↔ smooth) |
| **Shift + Drag** | Constrain curve angle (optional) | Constrain movement to axis |
| **Wheel Scroll** | Zoom in/out | Zoom in/out |
| **Space + Drag** | Pan canvas | Pan canvas |
| **Escape** | Cancel current path segment (optional) | Deselect all |
| **Enter** | Close path (optional) | N/A |

### Cursor Changes

| Context | Cursor |
|---------|--------|
| Drawing mode (default) | Crosshair or pen icon |
| Drawing mode near first point (snap) | Crosshair with close-loop indicator |
| Edit mode (default) | Arrow pointer |
| Edit mode over anchor point | Move cursor (four arrows) |
| Edit mode over bezier handle | Pointer or hand |
| Shift held in edit mode | Crosshair (insert point) |
| Spacebar held | Hand/grab (pan) |
| During drag (pan or move) | Grabbing/closed-hand |

### Special Behaviors

**Snap to First Point** (Drawing Mode):
- Calculate distance from cursor to first point of current path
- If distance < threshold (e.g., 10-15 pixels), enable snap
- Visual feedback: enlarge first point, show connection preview
- On click: close path and enter edit mode automatically

**Smooth Curve Creation** (Drawing Mode):
- When dragging after clicking, calculate tangent from previous segment
- Set initial `handleOut` direction based on tangent angle
- Set `handleOut` length proportional to drag distance
- Create symmetric `handleIn` on the same point for consistent editing
- For the previous segment, add/update `handleOut` to create smooth transition

**Constrained Movement** (Edit Mode + Shift):
- When Shift is held during drag, constrain point movement
- Snap to horizontal/vertical axes (0°, 90°)
- Optional: snap to 45° diagonals
- Show visual guide (line) indicating constraint axis

---

## Technical Requirements

### Component Architecture

**Component Type**: Mithril closure component (`m.ClosureComponent<PathEditorAttrs>`)

**File Organization**:

Given the complexity of this component, it will be organized as a directory with multiple files rather than a single monolithic file:

```
src/ui/PathEditor/
├── index.ts           # Main component export and Mithril rendering
├── geometry.ts        # Path conversion (Paper.js ↔ PathCommand[])
├── interaction.ts     # Mouse/touch event handling and tools
├── constants.ts       # Types and tweakable constants
└── [others as needed] # Additional utilities for maintainability
```

**File Responsibilities**:

- **`index.ts`**:
  - Export `PathEditorAttrs` interface
  - Export the Mithril component as default export
  - Component lifecycle management (`oncreate`, `onupdate`, `onremove`)
  - Main rendering logic
  - Usage: `import PathEditor from './ui/PathEditor'`

- **`geometry.ts`**:
  - `paperPathToPathCommands(path: paper.Path): PathCommand[]`
  - `pathCommandsToPaperPath(commands: PathCommand[]): paper.Path`
  - Component-specific geometric calculations (snap detection, handle placement)
  - Note: General-purpose geometry utilities should go in `src/geometry/utils.ts` instead

- **`interaction.ts`**:
  - Paper.js Tool initialization and event handlers
  - Mouse/touch event processing (onMouseDown, onMouseDrag, onMouseUp, onMouseMove)
  - Mode-specific tool behavior (drawing vs editing)
  - Cursor management
  - Keyboard event handling

- **`constants.ts`**:
  - Component-specific types (not exported to parent)
  - Tweakable constants (snap threshold, handle size, colors)
  - Default values for optional attributes

**State Management**:
- Internal state object for Paper.js instances, mode, selection, etc.
- Minimal state exposure to parent components
- Event callbacks for path changes

**Lifecycle Management**:
- `oncreate`: Initialize Paper.js, setup canvas, load initial path
- `onupdate`: Handle attribute changes (if path is updated externally)
- `onremove`: Clean up Paper.js resources, event listeners

### Code Quality

**TypeScript**:
- Full type safety with explicit return types
- Interface for all component attributes
- JSDoc comments on exported interfaces and public methods
- No use of `any` type (use `unknown` if necessary)

**Style Conventions**:
- Follow project conventions from `AGENTS.md`:
  - camelCase for variables and functions
  - PascalCase for types and interfaces
  - `PathEditorAttrs` for component props (extending `m.Attributes`)
  - Arrow functions for internal helpers
  - No emoji in code

**Linting and Compilation**:
- Must pass `pnpm exec tsc --noEmit` without errors
- Must pass `pnpm run lint` without errors
- Must pass `pnpm run build` successfully

### Paper.js Integration

**Initialization**:
```typescript
oncreate: ({ dom }) => {
  const canvas = dom.querySelector('canvas');
  paper.setup(canvas);
  // Initialize tools, paths, event handlers
}
```

**Conversion Utilities**:
- `paperPathToPathCommands(path: paper.Path): PathCommand[]`
- `pathCommandsToPaperPath(commands: PathCommand[]): paper.Path`
- Handle coordinate system differences (absolute vs relative)
- Handle bezier control points (Paper.js uses relative offsets)

**Resource Cleanup**:
```typescript
onremove: () => {
  // Remove Paper.js project and event listeners
  paper.project.remove();
}
```

---

## Component Interface

### Component Attributes

```typescript
/**
 * Attributes for the PathEditor component.
 */
interface PathEditorAttrs extends m.Attributes {
  /**
   * Optional initial path to load into the editor.
   * If provided, the path will be displayed and made editable.
   * If undefined, the editor starts with an empty canvas.
   *
   * Note: The format of this parameter is still under discussion.
   * Options include:
   * - Single PathCommand array: PathCommand[]
   * - Multiple paths: PathCommand[][]
   * - Paper.js compatible format
   */
  initialPath?: PathCommand[] | PathCommand[][];

  /**
   * Callback invoked when the path changes.
   * Called after mouse up, point deletion, or other path modifications.
   *
   * @param path - The updated path as PathCommand array(s)
   */
  onPathChanged: (path: PathCommand[] | PathCommand[][]) => void;

  /**
   * Width of the editor canvas in pixels.
   */
  width: number;

  /**
   * Height of the editor canvas in pixels.
   */
  height: number;

  /**
   * Optional boundary constraints for the path.
   * If provided, visual indicators or validation may prevent
   * path creation outside these bounds.
   */
  bounds?: {
    width: number;
    height: number;
  };

  /**
   * Optional: Stroke color for the path.
   * Default: '#2196F3' (blue)
   */
  strokeColor?: string;

  /**
   * Optional: Enable dark mode styling.
   * Affects background, UI elements, and selection colors.
   * Default: false
   */
  darkMode?: boolean;
}
```

### Usage Example

```typescript
// In a parent component or page
m(PathEditor, {
  width: 800,
  height: 600,
  initialPath: existingBorderPath,
  onPathChanged: (newPath) => {
    // Update application state with new path
    state.customBorder = newPath;
  },
  bounds: {
    width: 800,
    height: 600,
  },
  strokeColor: '#FF5722',  // Optional: custom stroke color
  darkMode: state.isDarkMode,  // Optional: enable dark mode styling
})
```

---

## Constraints and Scope

### In Scope for MVP

✅ Single path editing (one path at a time)
✅ Line and cubic bezier curve segments
✅ Basic SVG import (path elements only, arcs converted to bezier)
✅ Open and closed paths
✅ Zoom and pan
✅ Snap to first point (close path)
✅ Basic editing operations (move, insert, delete points)
✅ Keyboard shortcuts (Delete, Escape, Shift modifiers)
✅ Smooth curve creation with tangent handles
✅ Basic visual feedback and cursor changes
✅ Configurable stroke color and dark mode support
✅ Automatic mode switching (drawing when empty, editing when path exists)

### Out of Scope for MVP

❌ Multiple path editing (multiple shapes on canvas simultaneously)
❌ Multi-point selection and manipulation
❌ Advanced SVG features (gradients, filters, text)
❌ Boolean operations (union, subtract, intersect)
❌ Undo/redo
❌ Rulers and measurement tools
❌ Touch gestures (two-finger pan, pinch-to-zoom)
❌ Groups and layers
❌ Path alignment and distribution tools
❌ "Smooth" vs "corner" point type controls (all points are effectively corners with independent curve control points)
❌ Symmetry and mirror tools
❌ Path effects and filters
❌ Native arc segment support (arcs in SVGs are converted to bezier approximations)
❌ Explicit mode toggle button (mode is automatic based on path state)

---

## Future Improvements (Polish and Advanced Features)

The following features may be added in the future:

**Undo/Redo System**:
- History stack for path operations
- Keyboard shortcuts (Ctrl+Z, Ctrl+Shift+Z or Ctrl+Y)
- UI indicators showing undo/redo availability
- Limit history depth to prevent memory issues

**Grid and Snapping**:
- Optional background grid with configurable spacing
- Snap-to-grid toggle with visual feedback
- Snap threshold setting
- Grid color and opacity controls

**Rulers**:
- Horizontal and vertical rulers along canvas edges
- Tick marks and measurements in pixels or custom units
- Coordinate origin marker
- Ruler color theme

**Smooth vs Corner Points**:
- Explicit UI to set point type (context menu or button)
- Corner points: independent `handleIn` and `handleOut` control
- Smooth points: symmetric/aligned handles for C1 continuity
- Visual distinction between point types

**Boolean Operations** (Advanced):
- Union (combine two paths)
- Subtract (cut one path from another)
- Intersect (keep only overlapping area)
- Exclude (remove overlapping area)
- Requires two-path selection and UI for operation selection

**Mobile/Touch Support**:
- Two-finger pan gesture
- Pinch-to-zoom gesture
- Touch-friendly hit areas (larger touch targets)
- Long-press for context menus or mode switching
- Touch-specific visual feedback

**Multiple Paths**:
- Support editing multiple paths on the same canvas
- Path selection (click to select active path)
- Path list/layer panel
- Show/hide individual paths
- Reorder paths (z-index)

**Puzzle-Specific Features**:
- Whimsey piece templates (load common shapes like animals, letters)
- Symmetry constraints for balanced tab shapes
- Copy/mirror path segments for symmetric designs
- Validate path suitability for puzzle cutting (no sharp corners, minimum feature size)
- Preview path as tab on edge or as puzzle piece

**Arc Segment Support**:
- Native `ArcTo` command support in the `PathCommand` data model
- While `ArcTo` exists in the application's type system (primarily for circular/elliptical puzzle borders), Paper.js has limited arc support
- Component will convert arcs to cubic bezier approximations for editing
- When exporting, arcs may remain as bezier curves or be detected/simplified back to arcs
- This is acceptable since arcs are mainly used for borders created by other generators, not for custom tab/whimsey shapes

**Path Simplification**:
- Reduce point count while maintaining shape
- Configurable tolerance for simplification algorithm
- Useful for imported SVG with excessive detail

**Keyboard Shortcuts**:
- Full keyboard accessibility (tab navigation, arrow keys for point movement)
- Customizable keyboard shortcuts
- Shortcut reference modal or tooltip
- Vim-style command mode (optional, advanced)

**Export Enhancements**:
- Export to multiple formats (SVG, PDF, DXF for CNC/laser cutters)
- Export with configurable precision
- Batch export of multiple paths
- Include metadata (creation date, author, puzzle name)

---

## Open Questions and Design Decisions

### 1. Mode Control: Automatic Mode Switching

**Decision**: Mode is managed automatically by the component based on path state.

**Behavior**:
- Edit mode is the default when a path exists
- Drawing mode is automatically enabled when there is no path data (on init or after clear)
- No explicit mode toggle button
- Component automatically switches to edit mode after first point is placed or path is closed

**Rationale**:
- Simpler UX - users don't need to think about mode switching
- Natural workflow - draw when empty, edit when something exists
- Reduces UI complexity
- Matches user expectations from other vector editors

**Future Consideration**: If advanced use cases require explicit mode control, the `mode` and `onModeChanged` attributes can be added later without breaking existing usage.

### 2. PathCommand Format: Single vs Multiple Paths

**Decision**: Use `PathCommand[]` for MVP.

**Rationale**:
- MVP supports single path only
- Simpler and matches current codebase usage
- Future versions may support multiple paths with `PathCommand[][]` overload

**Migration Path**: When multi-path support is added:
```typescript
initialPath?: PathCommand[] | PathCommand[][];
onPathChanged: (path: PathCommand[] | PathCommand[][]) => void;
```

### 3. Handle Visibility

**Decision**: Show handles only for selected point in MVP.

**Rationale**:
- Cleaner UI with less visual clutter
- Performance benefit for complex paths
- Adequate for editing workflow (select point to see/edit handles)

**Future Enhancement**: Add "Show All Handles" toggle for users who prefer to see full path structure.

### 4. Multi-Select Support

**Decision**: Single selection only in MVP.

**Rationale**:
- Simpler to implement
- Sufficient for basic editing workflow
- Multi-select adds significant complexity

**Future Enhancement**:
- Shift-click to add/remove from selection
- Click-drag marquee selection
- Group transformations (move/scale/rotate multiple points)
- Delete removes all selected points

### 5. Undo/Redo Support

**Decision**: Defer to post MVP.

**Rationale**:
- MVP focus is core editing functionality
- Undo/redo adds significant complexity (history stack, state snapshots, memory management)
- Can be added later without breaking existing functionality
- Users can work around absence by reloading `initialPath` if needed


---

## Success Criteria

The PathEditor component will be considered successful if:

1. **Usable**: Users familiar with vector editing tools (Illustrator, Inkscape, Figma) can use the component without documentation
2. **Functional**: All MVP features work as specified without major bugs
3. **Performant**: Remains responsive with paths containing 50-100 points
4. **Integrated**: Converts cleanly between Paper.js and `PathCommand[]` format
5. **Extensible**: Architecture supports future enhancements
6. **Tested**: Passes TypeScript compilation, linting, and build steps
7. **Documented**: JSDoc comments on all public interfaces, usage examples provided
8. **Reusable**: Can be dropped into any page with minimal configuration

---

## Implementation Phases

This component is being developed in phases to minimize risk and validate the architecture early:

### Phase 1 ✅ (Complete): Paper.js Proof of Concept

**Objective**: Validate that Paper.js meets the project's needs for interactive path editing.

**Deliverables**:
- Minimal editor in `src/pages/TestPage.ts`
- Basic drawing (click to add points, drag to create curves)
- Basic editing (move anchor points, edit bezier handles)
- SVG export validation
- Paper.js + Mithril integration confirmed working

**Status**: Complete. Phase 1 successfully validated Paper.js as the right choice.

---

### Phase 2 ✅ (Complete): Architecture Validation

**Objective**: Validate that the component architecture works with Paper.js + Mithril + TestPage rendering with minimal features. Focus on structure, not features.

**Deliverables**:
- ✅ Component structure in `src/ui/PathEditor/` directory with multi-file organization
  - `index.ts`: Component export and Mithril lifecycle
  - `geometry.ts`: Path conversion utilities (MoveTo/LineTo only)
  - `interaction.ts`: Basic mouse event handling
  - `constants.ts`: Types and constants
- ✅ Render PathEditor component in TestPage
- ✅ **Drawing mode**: Click to add multiple points with straight lines
- ✅ **Edit mode**: Drag anchor points to move them
- ✅ **Mode control**: "End Drawing" button to switch from draw to edit mode
- ✅ **Automatic mode switching**: Draw mode when empty, edit mode when path exists
- ✅ PathCommand conversion: `paperPathToPathCommands()` and `pathCommandsToPaperPath()` for MoveTo/LineTo only
- ✅ `onPathChanged` callback working correctly
- ✅ Component attributes: `width`, `height`, `initialPath`, `onPathChanged`, `strokeColor`
- ✅ TypeScript compilation, linting, and build passing
- ✅ Increased vertex point size for better visibility (`handleSize = 8`)

**Explicitly Deferred**:
- ❌ Pan and zoom
- ❌ Cursor changes
- ❌ Keyboard shortcuts
- ❌ Bezier curves
- ❌ SVG import
- ❌ Close path / snap to first point
- ❌ Point insertion/deletion
- ❌ Visual polish

**Status**: Complete. Architecture validated, component integrated into TestPage, basic drawing and editing functionality working.

---

### Phase 3 ✅ (Complete): Bezier Curve Support

**Objective**: Add curve creation and editing capabilities.

**Deliverables**:
- ✅ Click-drag to create smooth bezier curves
- ✅ Symmetric handle generation (`handleIn` and `handleOut`)
- ✅ Edit bezier handles in edit mode (drag control points)
- ✅ Show handles only for selected point (Paper.js automatic selection visualization)
- ✅ Update `paperPathToPathCommands()` and `pathCommandsToPaperPath()` to support CurveTo
- ✅ Visual feedback: control handles shown via Paper.js selection system

**Implementation Notes**:
- Draw mode: Click adds straight lines, click-drag creates smooth bezier curves with symmetric handles
- Handles are automatically calculated during drag with configurable multiplier (`DRAG_HANDLE_MULTIPLIER = 0.5`)
- Edit mode: Handles are shown automatically by Paper.js when a point is selected
- Handle detection uses Paper.js `hitTest` with `handles: true` option
- Handle dragging sets absolute position relative to segment point

**Curve Smoothing Algorithm**:

The implementation uses a point nomenclature for clarity:
- **A**: Point before B (if it exists)
- **B**: End of current shape (previous last point)
- **C**: Mouse down point (new segment just added)
- **D**: Current drag position

When drawing a curve from B→C influenced by drag to D:

1. **C's handles** (new segment): Set parallel to drag direction C→D
   - `handleOut = vectorCD × DRAG_HANDLE_MULTIPLIER`
   - `handleIn = vectorCD × -DRAG_HANDLE_MULTIPLIER`

2. **B's handleOut** (previous segment): Ensures smooth connection
   - **If A→B was a curve**: Set B.handleOut tangent to B.handleIn (colinear for C1 continuity)
     - Direction: opposite of B.handleIn
     - Length: based on B→C distance
   - **If A→B was a line**: Set B.handleOut parallel to line direction A→B
     - Maintains tangency between line and curve

This approach ensures:
- **Line → Curve**: Curve starts tangent to the line direction
- **Curve → Curve**: Smooth tangent continuity (C1 continuous)
- **Curve → Line**: Previous curve's handleOut is cleared, creating sharp transition

**Refinements During Phase 3**:

1. ✅ **Fixed tangency loss during drag**: Initial implementation lost tangency when dragging because handles were being recalculated incorrectly. Fixed by understanding Paper.js handle model:
   - `handleIn`: Controls curve coming INTO a point (from previous segment)
   - `handleOut`: Controls curve going OUT of a point (to next segment)
   - C's handles should be based on drag direction (C→D), not segment direction (B→C)

2. ✅ **Fixed degenerate curves appearing as straight lines**: Early versions created bezier curves with control points collinear with the segment line, making them appear straight. Fixed by:
   - Ensuring C's handles are based on drag direction, not line direction
   - Setting B's handleOut correctly for proper bezier geometry
   - Different logic for Line→Curve vs Curve→Curve transitions

3. ✅ **Fixed Curve→Line conversion**: When clicking after a curve, the previous curve's `handleOut` is now cleared to ensure a straight line segment.

4. ✅ **Fixed line segments becoming curves**: Only modify previous segment handles if it was already drawn as a curve (check for `handleIn` existence).

5. ✅ **Improved vertex selection on curved paths**: Added prioritized hit testing with stroke detection
   - Priority 1: Handles (for precise control point editing)
   - Priority 2: Vertices (for anchor point selection)
   - Priority 3: Stroke (click anywhere on path to select it and show all vertices)
   - Priority 4: Empty space (deselect all)

6. ✅ **Fixed Clear Canvas state management**: Handle empty-to-empty array transitions correctly in onupdate lifecycle.

7. ✅ **Separated test harness data flow**: Prevented feedback loops between `initialPath` and `onPathChanged` by separating `initialPathToLoad` (for input) from `pathCommands` (for display).

8. ✅ **Code clarity improvements**: Renamed variables to use consistent A/B/C/D nomenclature, factored out `DRAG_HANDLE_MULTIPLIER` constant.

9. ✅ **Fixed invisible handles being draggable**: In edit mode with nothing selected, invisible curve handles could sometimes be dragged (especially near line vertices due to selection priority). Fixed by only enabling handle hit testing when handles are actually visible (when a segment is selected or path is fully selected). This prevents accidental curve conversion and ensures line segments remain lines until explicitly converted.

**Status**: Complete. Bezier curves work smoothly in both creation and editing modes, with intuitive selection, clean state management, and proper tangent continuity for both Line→Curve and Curve→Curve transitions.

---

### Phase 4 ✅ (Complete): Pan and Zoom

**Objective**: Add pan and zoom functionality for better canvas navigation.

**Deliverables**:
- ✅ **Pan**: Spacebar+drag to pan canvas
- ✅ **Zoom**: Mouse wheel to zoom in/out, centered on cursor position
- ✅ **Zoom control**: Dropdown with preset zoom levels (25%, 50%, 100%, 200%, 400%). Show zoom percentage when using mouse wheel.
- ✅ **Recenter button**: Click to reset the zoom to 100% and return the view to center.

**Implementation Notes**:

1. **Pan Implementation**:
   - Uses raw DOM mouse events (`mousedown`, `mousemove`, `mouseup`) instead of Paper.js tool events
   - Tracks mouse position in screen coordinates (`clientX`, `clientY`)
   - Calculates delta manually and applies via `paper.view.translate()`

2. **Zoom Implementation**:
   - Mouse wheel event listener on canvas element
   - Zoom limits: 10% (MIN_ZOOM) to 1000% (MAX_ZOOM)
   - Zoom step: 10% per wheel event
   - Uses `paper.view.scale(zoomFactor, cursorPosition)` to zoom centered on cursor

3. **Canvas Setup**:
   - Canvas size set via CSS (`style` attribute) rather than canvas element attributes
   - Paper.js manages internal buffer size for retina display support
   - Explicitly set `paper.view.viewSize` after setup to ensure correct logical dimensions

**Critical Issue Discovered - Paper.js Mouse Event Feedback Loop**:

When implementing panning, we initially attempted to use `paper.view.translate()` inside Paper.js's `onMouseDrag` event handler. This created a **feedback loop** that caused severe jittering and coordinate scaling issues:

1. Paper.js calculates `event.delta` based on the current view transformation
2. Calling `paper.view.translate()` modifies the view transformation
3. Paper.js recalculates the next `event.delta` based on the *new* transformation
4. This caused alternating positive/negative deltas and jittery, non-1:1 movement

**Solution**: Use raw DOM mouse events for panning instead of Paper.js tool events. This keeps mouse tracking in screen coordinates (which don't change with view transformations) and eliminates the feedback loop.

**Lesson Learned**: Avoid modifying Paper.js view transformations (`translate`, `scale`, `center`) from within Paper.js tool event handlers (`onMouseDown`, `onMouseDrag`, `onMouseMove`, etc.). Use raw DOM events for view manipulation to prevent coordinate system feedback loops.

**Status**: Complete. Pan and zoom functionality working smoothly with no jitter or scaling issues at all zoom levels and on retina displays.

---

### Phase 5 ✅ (Complete): Additional Core Interactions

**Objective**: Add remaining editing interactions and visual polish.

**Deliverables**:
- ✅ **Cursor feedback**: Appropriate cursors for different contexts (crosshair, move, pointer, grab)
  - Crosshair in draw mode and when Shift is held in edit mode (insert point mode)
  - Move cursor over anchor points
  - Pointer cursor over handles and path stroke
  - Grab/grabbing cursor when spacebar is held for panning
  - Copy cursor when near first point (snap to close)
- ✅ **Keyboard shortcuts**:
  - Delete/Backspace: Remove selected point (requires at least 3 segments in path)
  - Shift: Enable insert point mode in edit mode
- ✅ **Close path**: Snap to first point when nearby with visual indicator
  - Green circle indicator appears around first point when within snap threshold (15px)
  - Preview line shows connection to first point
  - Click to close path and automatically switch to edit mode
- ✅ **Point insertion**: Shift+Click on segment to insert new point
  - Crosshair cursor when Shift is held in edit mode
  - Click anywhere on path stroke to insert a new anchor point at that location
  - Newly inserted point is automatically selected
- ✅ **State tracking**: Added `isShiftPressed` and `isNearFirstPoint` state flags

**Explicitly Deferred**:
- ❌ Escape: Deselect all
- ❌ Shift+Drag: Constrain movement to axes
- ❌ Point type toggle: Double-click to toggle between line and curve segment
- ❌ Component attributes: `darkMode`, `bounds`
- ❌ Curve-aware point insertion (inserting point on curve currently creates zero-length handles, which disrupts visual continuity)

**Implementation Notes**:
- Cursor management centralized in `updateCursor()` function with priority-based logic
- Snap detection in `updatePreviewPath()` uses Paper.js `getDistance()` for accuracy
- Point insertion uses Paper.js hit testing with `strokeHit.location` for precise placement
- Selection state is now preserved across mouse up events (only cleared by explicit actions)
- Snap indicator is a Paper.js Circle that is shown/hidden as needed

**Status**: Complete. Core editing interactions are functional and intuitive. Advanced features deferred to future phases.

---

### Phase 6: SVG Import

**Objective**: Enable loading existing SVG paths for editing.

**Deliverables**:
- Parse SVG path `d` attribute (M, L, C, Q, A commands)
- Convert arc commands to bezier approximations
- File picker or drag-and-drop UI
- Scale/translate imported paths to fit canvas
- Error handling for malformed SVG

**Success Criteria**: Can import simple SVG paths, paths are editable, coordinates are correctly transformed.

---

### Phase 7: Integration

**Objective**: Integrate PathEditor into puzzle generator workflows.

**Deliverables**:
- Custom border shape editing in PuzzlePage
- Tab shape library (allow editing default tab generators)
- Whimsey piece creation interface
- Save/load custom shapes to browser storage or export as JSON

**Success Criteria**: Users can create custom borders, edit tab shapes, and create whimsey pieces using the PathEditor component.

---

### Phase 8: Future Enhancements

**Objective**: Add polish and advanced features as needed.

**Possible Features**:
- Undo/redo system
- Grid and snap-to-grid
- Multi-point selection
- Boolean operations (union, subtract, intersect)
- Touch gestures (pinch-to-zoom, two-finger pan)
- Multiple paths on same canvas
- Rulers and measurement tools
- Path simplification
- Advanced export formats (DXF, PDF)

**Prioritization**: Based on user feedback and actual needs.

---

This requirements document defines the scope for the PathEditor MVP component. **Phases 1-4 are complete**, with remaining phases to be implemented as needed.

---

## Known Issues and Follow-Up Items

This section tracks issues discovered during implementation that need further investigation or refinement.

### Selection Visualization (Paper.js) ✅ (Resolved)

**Issue**: The vertex point selection visualization was counterintuitive:
- When no points were selected (`fullySelected = true`), all vertices appeared filled in blue
- The blue color was Paper.js's selection indicator, not the stroke color
- This created confusion about what was selected

**Resolution**: Changed selection behavior to only show the currently selected vertex:
- In edit mode, no vertices are selected by default
- Only the clicked vertex is shown with blue selection indicator
- Clicking empty space deselects all vertices
- This aligns better with Paper.js's selection model and provides clear visual feedback

**Implementation**:
- Removed automatic `fullySelected = true` in edit mode
- Mouse down: deselect all segments, then select only the clicked segment
- Click empty space: deselect all segments
- Result: Clean appearance with clear selection state

**Related Files**:
- `src/ui/PathEditor/interaction.ts:127-142` (updated selection logic)
- `src/ui/PathEditor/index.ts:101-112,141-155` (removed fullySelected initialization)

### Clear Canvas State Management ✅ (Resolved)

**Issue**: Clear Canvas button after drawing would update the Path Data display but not clear the canvas. The issue occurred when transitioning from a drawn path to an empty path:
- User draws a path (e.g., 2 points)
- User clicks Clear Canvas
- Path data display shows "No path data yet" but canvas still shows the drawn path
- The problem was specific to clearing after drawing; clearing after loading a sample path worked correctly

**Root Cause**: The `onupdate` lifecycle hook's change detection logic used reference comparison and length comparison to detect `initialPath` changes. When both the previous and current `initialPath` were empty arrays (length 0), even with different references, the change detection would return early and not trigger the canvas update. This meant the empty-to-empty transition (Clear Canvas after drawing) was not detected.

**Resolution**: Enhanced change detection to handle empty-to-empty transitions:
```typescript
const lengthChanged = prevLength !== currLength;
const bothEmptyButDifferent = prevLength === 0 && currLength === 0;

if (!lengthChanged && !bothEmptyButDifferent) {
  return;
}
```

The `bothEmptyButDifferent` check ensures that when both arrays are empty (length 0) but have different references, the change is detected and the canvas is properly cleared.

**Additional Context**: This issue was discovered alongside a related fix to the test harness data flow. The TestPage component was initially passing `state.pathCommands` as `initialPath`, creating a feedback loop. The fix separated concerns:
- `initialPathToLoad`: Only set by Clear/Load buttons, passed as `initialPath` prop
- `pathCommands`: Only for display, updated by `onPathChanged` callback

This separation prevented circular updates, and the `bothEmptyButDifferent` check completed the fix to handle Clear Canvas correctly in all scenarios.

**Related Files**:
- `src/ui/PathEditor/index.ts:213-220` (change detection logic)
- `src/pages/TestPage.ts:14-15,33-38` (test harness data flow separation)

---

## References

- **path-editing-libraries.md** - Initial exploration of library options for path editing. Discussion of capabilities of paper.js
- **path-editing-phase1-findings.md** - Result of initial paper.js exploration in Phase 1
- **src/geometry/types.ts** - PathCommand type definitions
- **AGENTS.md** - Project conventions and coding standards
- **Paper.js Documentation** - http://paperjs.org/
