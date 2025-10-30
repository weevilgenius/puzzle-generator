# Converting Puzzle Rendering to Paper.js

**Created**: 2025-10-29
**Status**: In Progress (Phases 1-3 Complete)

---

## Executive Summary

This document analyzes the current puzzle rendering system and provides a detailed plan to convert it from the raw Canvas 2D API to Paper.js, following the successful pattern established by the PathEditor component.

### Key Benefits of Conversion

1. **Future features enabled**: Pan/zoom, piece selection, highlighting, layers, grouping
2. **Better interaction**: Built-in hit testing, selection, and event handling
3. **Cleaner code**: Paper.js abstracts away low-level canvas operations
4. **Easier development**: Scene graph model simplifies adding/removing elements
5. **Consistent architecture**: Aligns with PathEditor's proven approach

**Note**: Performance considerations are secondary to the features enabled by Paper.js. The scene graph model and interactive capabilities are the primary motivation.

### Estimated Scope

- **Medium complexity implementation** (~800-1200 lines in new component)
- **Low risk** - PathEditor validates the approach works well
- **Parallel development** - New component alongside existing Puzzle.ts with separate route

---

## Current Architecture Analysis

### Puzzle.ts (Main Component)

**File**: `src/ui/Puzzle.ts` (403 lines)

**Current Rendering Approach**:
- Mithril closure component with canvas element
- Uses `drawPuzzle()` from PuzzleMaker to render geometry
- Manual hit testing for vertex and seed point dragging
- Direct canvas coordinate manipulation for mouse events
- Canvas cleared and redrawn on every update

**Key Features**:
- Vertex dragging (moves puzzle vertices directly)
- Seed point dragging (triggers puzzle regeneration)
- Hover detection with cursor feedback
- Touch and mouse event handling
- Throttled regeneration during drag (50ms)
- Background image support

**State Management**:
```typescript
const state = {
  canvas: HTMLCanvasElement | null,
  isDragging: boolean,
  draggedVertexId: VertexID,
  draggedSeedPointId: PieceID,
  lastRegenerationTime: number,
  pendingRegeneration: number | null,
  documentMouseMove: function | null,
  documentMouseUp: function | null,
}
```

### PuzzleMaker.ts (Rendering Logic)

**File**: `src/geometry/PuzzleMaker.ts` (lines 152-301)

**Current Rendering Approach**:
- `drawPuzzle()` function takes: puzzle, canvas, color, optional pointColor
- Raw Canvas 2D API operations
- Batched drawing for efficiency (single `beginPath()` for all edges)
- Debug mode with per-piece colored boundaries

**Rendering Steps**:
1. Clear canvas with `clearRect()`
2. Iterate through all edges in the puzzle
3. For each edge, draw its `heLeft` half-edge (to avoid duplicates)
4. Handle two segment types:
   - **Line segments**: `ctx.lineTo(destination)`
   - **Bezier curves**: `ctx.bezierCurveTo(p1, p2, p3)` using edge's `segments` array
5. Stroke the entire path at once
6. Draw problem indicators (red circles) if present
7. Draw seed points (blue circles) if enabled

**Edge Traversal Logic**:
```typescript
// For each unique Edge:
const he = puzzle.halfEdges.get(edge.heLeft);
ctx.moveTo(he.origin[0], he.origin[1]);

if (he.segments && he.segments.length > 0) {
  // Draw custom tab geometry
  for (const segment of he.segments) {
    switch (segment.type) {
      case 'bezier': ctx.bezierCurveTo(...);
      case 'line': ctx.lineTo(...);
    }
  }
} else {
  // Draw straight line to destination
  ctx.lineTo(destination[0], destination[1]);
}
```

### Data Structures

**PuzzleGeometry** (from `src/geometry/types.ts`):
```typescript
interface PuzzleGeometry {
  created: string;
  seed: number;
  width: number;
  height: number;
  pieceSize: number;
  pointConfig: GeneratorConfig;
  pieceConfig: GeneratorConfig;
  placementConfig: GeneratorConfig;
  tabConfig: GeneratorConfig;
  seedPoints: Vec2[];
  vertices: Vertex[];         // Array of [x, y] points
  boundary: VertexID[];       // Vertex IDs forming boundary
  borderPath: PathCommand[];  // Border shape definition
  pieces: Map<PieceID, Piece>;
  edges: Map<EdgeID, Edge>;
  halfEdges: Map<HalfEdgeID, HalfEdge>;
  problems?: Vec2[];          // Intersection points
}
```

**Half-Edge Data Structure**:
```typescript
interface HalfEdge {
  id: HalfEdgeID;
  origin: Vec2;               // Start point
  twin: HalfEdgeID;           // Opposite direction (-1 for boundary)
  next: HalfEdgeID;           // Next half-edge in loop
  prev: HalfEdgeID;           // Previous half-edge in loop
  edge: EdgeID;               // Parent edge
  piece: PieceID;             // Owner piece
  segments?: EdgeSegment[];   // Optional tab geometry
}

interface Edge {
  id: EdgeID;
  heLeft: HalfEdgeID;         // One direction
  heRight: HalfEdgeID;        // Other direction (-1 for boundary)
  tabs?: TabPlacement[];      // Tab metadata
}
```

**Key Insight**: The puzzle uses a half-edge data structure for topology, but rendering only needs to draw each unique Edge once by consistently choosing `edge.heLeft`.

---

## PathEditor Success Pattern

### How PathEditor Uses Paper.js

**File Organization**:
```
src/ui/PathEditor/
├── index.ts          # Component, lifecycle, Paper.js setup
├── geometry.ts       # PathCommand ↔ Paper.js conversion
├── mouseHandling.ts  # Tools, events, interaction
├── constants.ts      # Types and constants
└── PathEditor.css    # Scoped styles
```

**Paper.js Setup** (index.ts:112-158):
```typescript
const initializePaper = (canvas: HTMLCanvasElement, attrs) => {
  paper.setup(canvas);
  state.canvas = canvas;

  // Ensure view matches CSS size
  paper.view.viewSize = new paper.Size(attrs.width, attrs.height);

  // Create path objects
  state.path = new paper.Path();
  state.path.strokeColor = new paper.Color(strokeColor);
  state.path.strokeWidth = DEFAULT_STROKE_WIDTH;

  // Setup tools and event handlers
  tool = setupMouseHandling(state, onPathChanged, onZoomChanged);
};
```

**Lifecycle Management**:
- **oncreate**: Initialize Paper.js, create paths, setup tools
- **onupdate**: Handle attribute changes (color, path data)
- **onremove**: Clean up Paper.js project, remove event listeners

**Interaction Pattern** (mouseHandling.ts):
- Paper.js Tool for mouse events (`onMouseDown`, `onMouseDrag`, `onMouseUp`, `onMouseMove`)
- Raw DOM events for pan/zoom to avoid coordinate feedback loop
- Hit testing with `path.hitTest(point, { segments: true, handles: true, stroke: true })`
- Selection visualization automatic via Paper.js (`segment.selected = true`)

**Critical Lesson Learned** (path-editing.md:772-784):
> When implementing panning, we initially attempted to use `paper.view.translate()` inside Paper.js's `onMouseDrag` event handler. This created a **feedback loop** that caused severe jittering and coordinate scaling issues.
>
> **Solution**: Use raw DOM mouse events for panning instead of Paper.js tool events. This keeps mouse tracking in screen coordinates (which don't change with view transformations) and eliminates the feedback loop.
>
> **Lesson**: Avoid modifying Paper.js view transformations from within Paper.js tool event handlers.

**Geometry Conversion** (geometry.ts):
- `paperPathToPathCommands()`: Converts Paper.js path → PathCommand[]
- `pathCommandsToPaperPath()`: Converts PathCommand[] → Paper.js path
- Handles MoveTo, LineTo, CurveTo (ArcTo logged as warning)
- Converts between absolute control points and Paper.js relative handles

---

## Conversion Strategy

### Development Approach: Parallel Implementation

**Decision**: Develop a new `PuzzlePaper` component alongside the existing `Puzzle.ts` component, rather than converting in place. This approach:
- Allows testing without affecting existing functionality
- Enables easy comparison and validation
- Provides a safe rollback path
- Permits gradual feature addition and refinement
- Creates a new Mithril route for development and testing

### Phase 1: Setup and Infrastructure

**Goal**: Create new component structure, lift shared utilities, set up Paper.js rendering foundation

**Tasks**:
1. Create new component directory `src/ui/PuzzlePaper/`
2. Lift `paperPathToPathCommands()` and `pathCommandsToPaperPath()` from PathEditor to `src/geometry/paperUtils.ts`
3. Split `PuzzleMaker.ts` → create new `PuzzleRenderer.ts` for Paper.js rendering
4. Create new Mithril route `/puzzle-paper` for development
5. Set up multi-file component structure (following PathEditor pattern)
6. Initialize Paper.js in component lifecycle
7. Update PathEditor imports to use new `paperUtils.ts` location

**New Component Structure**:
```
src/ui/PuzzlePaper/
├── index.ts          # Component export, lifecycle, Paper.js setup
├── rendering.ts      # Paper.js rendering logic (uses PuzzleRenderer)
├── interaction.ts    # Mouse/touch events, hit testing, drag handling
├── constants.ts      # Component types and constants
└── PuzzlePaper.css   # Scoped component styles
```

**New Rendering Module**:
```
src/geometry/
├── PuzzleMaker.ts        # Generation only (buildPuzzle, rebuild functions)
├── PuzzleRenderer.ts     # NEW: Paper.js rendering (all draw functions)
└── paperUtils.ts         # NEW: Shared Paper.js utilities (lifted from PathEditor)
```

**Component State**:
```typescript
const state = {
  // ... existing fields ...

  // Paper.js additions
  paperPath: paper.Path | null,        // Main puzzle outline
  seedPointItems: paper.Group | null,  // Group for seed point circles
  problemItems: paper.Group | null,    // Group for problem indicators
}
```

**Paper.js Setup**:
```typescript
// In oncreate
const canvas = dom.querySelector<HTMLCanvasElement>("canvas.puzzle");
paper.setup(canvas);
paper.view.viewSize = new paper.Size(attrs.width, attrs.height);

// Create groups for different visual layers
state.paperPath = new paper.Path();
state.seedPointItems = new paper.Group();
state.problemItems = new paper.Group();
```

**Routing Setup** (src/index.ts):
```typescript
// Add new route for Paper.js version
m.route(document.body, "/", {
  "/": PuzzlePage,
  "/test": TestPage,
  "/puzzle-paper": PuzzlePaperPage,  // NEW: Development route
});
```

**Success Criteria**:
- New component structure created
- Paper.js initialized and renders basic test content
- PathEditor still works with refactored paperUtils.ts
- New route accessible for testing
- PuzzleMaker.ts successfully split (generation in PuzzleMaker, rendering in PuzzleRenderer)

**✅ COMPLETED - 2025-10-29**

All success criteria met:
- Created `src/ui/PuzzlePaper/` with multi-file structure (index.ts, rendering.ts, interaction.ts, constants.ts, PuzzlePaper.css)
- Created `src/geometry/paperUtils.ts` with shared Paper.js utilities
- Created `src/geometry/PuzzleRenderer.ts` for Paper.js rendering functions
- Created `/puzzle-paper` route and `PuzzlePaperPage.ts`
- Updated `Navigation.ts` to include new route
- PathEditor successfully refactored to use shared `paperUtils.ts`
- All TypeScript compilation and linting passes
- Build succeeds

---

### Phase 2: Convert Edge Rendering

**Goal**: Replace Canvas 2D edge drawing with Paper.js paths

**Tasks**:
1. Create `drawPuzzleWithPaper()` function in PuzzleMaker.ts
2. Build Paper.js path from puzzle edges, one path per piece
3. Handle both line and bezier segments
4. Match existing visual style (stroke color, width)
5. Test side-by-side with old rendering

**New Function** (PuzzleMaker.ts):
```typescript
/**
 * Draws puzzle geometry using Paper.js
 * @returns The Paper.js Path object representing the puzzle
 */
export function drawPuzzleWithPaper(
  puzzle: PuzzleGeometry,
  strokeColor: string
): paper.Path {
  const path = new paper.Path();
  path.strokeColor = new paper.Color(strokeColor);
  path.strokeWidth = 1;

  // Iterate through all unique edges
  for (const edge of puzzle.edges.values()) {
    const he = puzzle.halfEdges.get(edge.heLeft);
    if (!he) continue;

    // Create a sub-path for this edge
    const edgePath = new paper.Path();
    edgePath.moveTo(new paper.Point(he.origin[0], he.origin[1]));

    if (he.segments && he.segments.length > 0) {
      // Draw custom tab geometry
      for (const segment of he.segments) {
        addSegmentToPaperPath(edgePath, segment);
      }
    } else {
      // Draw straight line to destination
      const destination = getHalfEdgeDestination(he, puzzle);
      edgePath.lineTo(new paper.Point(destination[0], destination[1]));
    }

    // Add this edge to the main path
    path.addSegments(edgePath.segments);
    edgePath.remove();  // Clean up temporary path
  }

  return path;
}

/**
 * Add a single EdgeSegment to a Paper.js path
 */
function addSegmentToPaperPath(
  path: paper.Path,
  segment: EdgeSegment
): void {
  switch (segment.type) {
    case 'line':
      path.lineTo(new paper.Point(segment.p[0], segment.p[1]));
      break;
    case 'bezier':
      // Paper.js cubicCurveTo takes: handle1, handle2, endPoint
      path.cubicCurveTo(
        new paper.Point(segment.p1[0], segment.p1[1]),
        new paper.Point(segment.p2[0], segment.p2[1]),
        new paper.Point(segment.p3[0], segment.p3[1])
      );
      break;
  }
}

/**
 * Get the destination point of a half-edge
 */
function getHalfEdgeDestination(
  he: HalfEdge,
  puzzle: PuzzleGeometry
): Vec2 {
  if (he.twin !== -1) {
    const twinHe = puzzle.halfEdges.get(he.twin)!;
    return twinHe.origin;
  } else {
    const nextHe = puzzle.halfEdges.get(he.next)!;
    return nextHe.origin;
  }
}
```

**Update Puzzle.ts**:
```typescript
// In oncreate and onupdate, replace:
drawPuzzle(attrs.puzzle, state.canvas!, attrs.color, attrs.pointColor);

// With:
if (state.paperPath) {
  state.paperPath.remove();
}
state.paperPath = drawPuzzleWithPaper(attrs.puzzle, attrs.color);
drawSeedPoints(attrs.puzzle, state.seedPointItems!, attrs.pointColor);
drawProblems(attrs.puzzle, state.problemItems!);
```

**Success Criteria**: Puzzle renders identically to before, but using Paper.js instead of Canvas 2D API.

**✅ COMPLETED - 2025-10-29**

All success criteria met with architectural refinement:
- Implemented `drawPuzzleWithPaper()` in `PuzzleRenderer.ts`
- Handles both line and bezier segments correctly
- Matches visual style (stroke color, width = 1)
- Side-by-side comparison with `/puzzle` shows identical rendering
- All TypeScript compilation and linting passes
- Build succeeds

**Architectural Decision: Per-Piece Paths vs. Per-Edge Paths**

After initial implementation with per-edge paths (CompoundPath with child paths for each edge), we refactored to use **per-piece paths** for better support of future interactive features.

**Final Implementation:**
```typescript
export function drawPuzzleWithPaper(
  puzzle: PuzzleGeometry,
  strokeColor: string
): paper.Group {
  const group = new paper.Group();

  // 1. Border path (from puzzle.borderPath commands)
  const borderPath = pathCommandsToPaperPath(puzzle.borderPath);
  borderPath.data.isBorder = true;
  group.addChild(borderPath);

  // 2. One path per piece (traversing boundary via half-edges)
  for (const piece of puzzle.pieces.values()) {
    const piecePath = createPiecePath(piece, puzzle);
    piecePath.data.pieceId = piece.id;  // For future selection
    group.addChild(piecePath);
  }

  return group;
}
```

**Trade-offs:**
- ✅ **Easy piece selection/highlighting** - Each piece is a distinct Paper.js Path with `pieceId` metadata
- ✅ **Simple transformations** - Moving/rotating pieces is trivial
- ✅ **Better hit testing** - Paper.js can identify which piece was clicked
- ✅ **Future features enabled** - Exploded view, piece grouping, layers
- ❌ **Duplicate edge rendering** - Internal edges drawn twice (once per adjacent piece)
- ❌ **Higher memory usage** - More Path objects than edge-based approach
- ⚠️ **SVG export independence** - Paper.js is view-layer only; existing SVG export maintains "cut once" rule

**Rationale:**
Paper.js is strictly a rendering/view layer. The underlying geometry structures remain the source of truth for SVG export. Since we have an efficient algorithm that converts geometry to SVG while maintaining the "cut once" rule (critical for laser cutting), there's no benefit to constraining the view layer for export purposes. The per-piece approach prioritizes interactivity over rendering efficiency, which aligns with the project's goals.

---

### Phase 3: Convert Seed Points and Problem Indicators

**Goal**: Render seed points and problem indicators with Paper.js

**Tasks**:
1. Create `drawSeedPoints()` helper function
2. Create `drawProblems()` helper function
3. Use Paper.js circles (`paper.Path.Circle`)
4. Group items for easy removal/update

**Helper Functions** (PuzzleMaker.ts):
```typescript
/**
 * Draw seed points (piece centers) as circles
 */
export function drawSeedPoints(
  puzzle: PuzzleGeometry,
  group: paper.Group,
  color?: string
): void {
  // Clear existing circles
  group.removeChildren();

  if (!color) return;

  // Draw each seed point
  for (const piece of puzzle.pieces.values()) {
    const [x, y] = piece.site;
    const circle = new paper.Path.Circle(new paper.Point(x, y), 3);
    circle.fillColor = new paper.Color(color);
    group.addChild(circle);
  }
}

/**
 * Draw problem indicators (red circles) at intersection points
 */
export function drawProblems(
  puzzle: PuzzleGeometry,
  group: paper.Group
): void {
  // Clear existing indicators
  group.removeChildren();

  if (!puzzle.problems || puzzle.problems.length === 0) return;

  // Draw each problem point
  for (const problemPoint of puzzle.problems) {
    const [x, y] = problemPoint;
    const circle = new paper.Path.Circle(new paper.Point(x, y), 8);
    circle.strokeColor = new paper.Color('red');
    circle.strokeWidth = 2;
    group.addChild(circle);
  }
}
```

**Success Criteria**: Seed points and problem indicators render correctly with Paper.js.

**✅ COMPLETED - 2025-10-29**

All success criteria met:
- `drawSeedPoints()` function created in `PuzzleRenderer.ts`
- `drawProblems()` function created in `PuzzleRenderer.ts`
- Both use `paper.Path.Circle` for rendering
- Items grouped in `paper.Group` for easy removal/update
- Seed points store `pieceId` in `path.data` for future hit testing
- Visual appearance matches Canvas 2D version

**Note:** These helper functions were implemented during Phase 1 infrastructure setup as part of the initial `PuzzleRenderer.ts` module creation.

---

### Phase 4: Implement Paper.js Hit Testing

**Goal**: Use Paper.js hit testing for all interactive elements

**Decision**: Embrace Paper.js hit testing rather than manual distance calculations. This provides better foundation for future features like piece selection and hover highlighting.

**Current Hit Testing** (Puzzle.ts:66-124):
- `isNearDraggableItem()`: Checks distance to seed points and vertices
- `getDragTarget()`: Returns closest seed point or vertex
- Uses manual distance calculation with `distanceSq()`

**Paper.js Approach**:
```typescript
/**
 * Create invisible Paper.js items for hit testing
 */
const createHitTestItems = (puzzle: PuzzleGeometry) => {
  // Create circles for vertices (invisible, just for hit testing)
  const vertexItems = new paper.Group();
  for (let i = 0; i < puzzle.vertices.length; i++) {
    const [x, y] = puzzle.vertices[i];
    const circle = new paper.Path.Circle(new paper.Point(x, y), 5);
    circle.fillColor = new paper.Color('transparent');
    circle.opacity = 0;  // Invisible but still hit-testable
    circle.data.vertexId = i;  // Store vertex ID
    vertexItems.addChild(circle);
  }

  // Create circles for seed points (only if visible)
  const seedPointItems = new paper.Group();
  if (attrs.pointColor) {
    for (const piece of puzzle.pieces.values()) {
      const [x, y] = piece.site;
      const circle = new paper.Path.Circle(new paper.Point(x, y), 5);
      circle.data.pieceId = piece.id;  // Store piece ID
      // These are visible so they're already created in drawSeedPoints
      // Just add data.pieceId to existing circles
    }
  }

  return { vertexItems, seedPointItems };
};

/**
 * Perform hit testing using Paper.js
 */
const handleMouseDown = (e: MouseEvent) => {
  const rect = state.canvas!.getBoundingClientRect();
  const point = new paper.Point(
    e.clientX - rect.left,
    e.clientY - rect.top
  );

  // Convert screen coordinates to Paper.js view coordinates
  const viewPoint = paper.view.viewToProject(point);

  // Hit test for seed points first (higher priority)
  if (attrs.pointColor) {
    const seedHit = state.seedPointItems!.hitTest(viewPoint, {
      fill: true,
      tolerance: 5
    });
    if (seedHit?.item.data.pieceId !== undefined) {
      state.draggedSeedPointId = seedHit.item.data.pieceId;
      state.isDragging = true;
      return;
    }
  }

  // Hit test for vertices
  const vertexHit = state.vertexItems!.hitTest(viewPoint, {
    fill: true,
    tolerance: 5
  });
  if (vertexHit?.item.data.vertexId !== undefined) {
    state.draggedVertexId = vertexHit.item.data.vertexId;
    state.isDragging = true;
    return;
  }
};
```

**Foundation for Future Features**:
Paper.js hit testing enables:
- **Piece selection**: Click to select entire piece (hit test piece path)
- **Hover highlighting**: Show piece outline on mouse over
- **Precise vertex selection**: No distance calculations needed
- **Layer-aware interaction**: Hit test respects z-order and visibility

**Success Criteria**:
- Vertex dragging works with Paper.js hit testing
- Seed point dragging works with Paper.js hit testing
- Hit testing is accurate at all zoom levels
- Foundation ready for piece selection and hover features

---

### Phase 5: Integration and Comparison Testing

**Goal**: Ensure Paper.js version matches existing functionality and is ready for new features

**Tasks**:
1. Test vertex dragging
2. Test seed point dragging with throttled regeneration
3. Test hover detection and cursor changes
4. Test background image rendering
5. Test with different puzzle sizes and piece counts
6. Test with different generators (Voronoi, Grid, etc.)
7. Test with different tab generators
8. Test problem visualization
9. Side-by-side comparison with original Puzzle.ts
10. Evaluate performance (not critical, but measure for baseline)

**Compatibility Checks**:
- Ensure background image still renders below puzzle (CSS layering)
- Verify touch events still work
- Test with isDirty flag (geometry being regenerated)
- Test with different window sizes
- Verify behavior matches original component

**Success Criteria**:
- All existing functionality works with Paper.js
- Visual parity with original component
- No critical performance issues (baseline established)
- Ready for enhanced features (pan/zoom, piece selection)

---

### Phase 6: Enhanced Features

**Goal**: Add features enabled by Paper.js that would be difficult with Canvas 2D

**Priority Features**:
1. **Pan and Zoom**
   - Mouse wheel zoom (like PathEditor)
   - Spacebar + drag to pan
   - Zoom controls (dropdown with presets)
   - Recenter button

2. **Piece Selection and Highlighting**
   - Click to select a piece (highlight with different color/stroke)
   - Show piece information (piece ID, neighbor count, etc.)
   - Multi-select with Shift+click (future)

3. **Hover Effects**
   - Highlight piece outline on mouse over
   - Show cursor feedback

4. **Layers and Organization**
   - Separate layers for pieces, vertices, seed points, problems
   - Show/hide layers individually
   - Z-order management

**Future Considerations**:
- Smooth animations for vertex dragging
- Piece rotation/translation (for puzzle solving UI)
- Exploded view (pieces separated slightly)
- SVG export (if "cut once" rule can be maintained - needs investigation)

**Paper.js Optimization Ideas**:
```typescript
// Cache Paper.js objects instead of recreating on every update
const state = {
  // ... existing fields ...

  // Cache for Paper.js paths (keyed by edge ID)
  edgePaths: Map<EdgeID, paper.Path>,

  // Cache for piece paths (keyed by piece ID)
  piecePaths: Map<PieceID, paper.Path>,
};

// Only recreate paths that changed
const updatePuzzleRender = (puzzle: PuzzleGeometry) => {
  for (const edge of puzzle.edges.values()) {
    const existingPath = state.edgePaths.get(edge.id);
    if (existingPath) {
      // Update existing path instead of recreating
      updateEdgePath(existingPath, edge, puzzle);
    } else {
      // Create new path
      const newPath = createEdgePath(edge, puzzle);
      state.edgePaths.set(edge.id, newPath);
    }
  }
};
```

**SVG Export Constraint**:
Paper.js provides `paper.project.exportSVG()`, but we must verify it maintains the critical rule: **each edge between two pieces is only cut once**. The current SVG export code carefully ensures this by iterating unique edges. If Paper.js export doesn't maintain this property by default, we'll need to:
1. Use custom SVG generation from PuzzleGeometry (not Paper.js export), OR
2. Post-process Paper.js SVG output to merge duplicate paths, OR
3. Carefully construct Paper.js scene graph to avoid duplicates

**Success Criteria**:
- Pan and zoom work smoothly
- Piece selection and highlighting implemented
- Hover effects provide clear feedback
- Features demonstrate value of Paper.js approach
- SVG export maintains "cut once" rule (if implemented)

---

## Technical Considerations

### Canvas Size and Resolution

**Current Approach**: Canvas element size matches CSS size (1:1 pixel ratio)

**Paper.js Approach**: Paper.js automatically handles retina displays by scaling the internal canvas buffer while maintaining logical coordinates.

**Setup**:
```typescript
// Puzzle.ts view()
m('canvas.puzzle', {
  style: {
    width: `${attrs.width}px`,
    height: `${attrs.height}px`,
  },
})

// Puzzle.ts oncreate
paper.setup(canvas);
paper.view.viewSize = new paper.Size(attrs.width, attrs.height);
```

### Coordinate Systems

**Canvas 2D API**: Direct pixel coordinates
**Paper.js**: View coordinates (automatically handles zoom/pan transforms)

**Mouse Event Conversion**:
```typescript
// Current (Canvas 2D):
const coords: Vec2 = [
  e.clientX - rect.left,
  e.clientY - rect.top
];

// Paper.js equivalent:
const point = new paper.Point(
  e.clientX - rect.left,
  e.clientY - rect.top
);
const viewPoint = paper.view.viewToProject(point);
```

### Rendering Performance

**Canvas 2D Approach**: Batch all edges into single path, stroke once
**Paper.js Approach**: Maintain scene graph with individual items

**Performance Comparison**:
- **Canvas 2D**: Lower memory, faster for static rendering
- **Paper.js**: Higher memory, faster for interactive updates, better for complex interactions

**Performance Philosophy**:
Performance is **not a major concern** compared to the features enabled by Paper.js. The primary motivation is:
1. Pan/zoom capability
2. Piece selection and highlighting
3. Layers and grouping
4. Easier addition of interactive features

**Optimization Strategy**:
1. Start with simple approach (create all paths every render)
2. Measure performance with typical puzzle sizes (50-200 pieces)
3. Accept reasonable performance trade-offs for feature gains
4. Optimize only if performance becomes problematic

**Expected Performance**: Should be acceptable for typical puzzle sizes (<500 pieces). Paper.js is well-optimized for vector graphics, and modern browsers handle canvas rendering efficiently.

### Background Image Rendering

**Current Approach**: HTML `<img>` element behind canvas in `.puzzle-stack` div

**Paper.js Approach**: Keep existing approach, or optionally use Paper.js Raster

**Recommendation**: Keep existing HTML `<img>` approach. Simpler, better browser support, no need to load image into Paper.js.

### Debug Mode

**Current Approach**: `debugMode` boolean toggles per-piece colored rendering

**Paper.js Approach**: Can maintain debug mode with Paper.js by creating separate paths per piece with different colors:

```typescript
if (debugMode) {
  for (const piece of puzzle.pieces.values()) {
    const piecePath = createPieceOutline(piece, puzzle);
    piecePath.strokeColor = DEBUG_COLORS[piece.id % DEBUG_COLORS.length];
    piecePath.dashArray = [5, 5];
    piecePath.strokeWidth = 2;
  }
}
```

---

## Implementation Path

### Approved Approach: Parallel Development

**Decision**: Develop new `PuzzlePaper` component alongside existing `Puzzle.ts` with separate route.

**Benefits**:
- Testing without affecting existing functionality
- Easy A/B comparison and validation
- Safe rollback path (keep old component)
- Permits gradual feature addition
- No risk to production functionality

**Estimated Time**:
1. **Phase 1** (3-4 hours): Setup structure, lift utilities, split PuzzleMaker, create route
2. **Phase 2** (3-4 hours): Implement edge rendering with Paper.js
3. **Phase 3** (2-3 hours): Implement seed points and problem indicators
4. **Phase 4** (3-4 hours): Implement Paper.js hit testing and drag handlers
5. **Phase 5** (2-3 hours): Integration testing, comparison with original
6. **Phase 6** (4-6 hours): Add enhanced features (pan/zoom, piece selection)

**Total Estimated Time**: 17-24 hours for full implementation with enhanced features

---

## Risks and Mitigation

### Risk: Performance Regression

**Likelihood**: Low
**Impact**: Medium
**Mitigation**:
- Benchmark before and after conversion
- Use Paper.js profiling tools
- Implement caching if needed
- Can optimize path simplification

### Risk: Visual Differences

**Likelihood**: Medium
**Impact**: Low
**Mitigation**:
- Side-by-side screenshot comparison during development
- Test with various puzzle configurations
- Match stroke widths, colors, anti-aliasing exactly
- Test on multiple browsers/devices

### Risk: Touch Event Breakage

**Likelihood**: Low
**Impact**: Medium
**Mitigation**:
- Keep existing touch event handling
- Paper.js doesn't interfere with native touch events
- Test on mobile devices early

### Risk: Coordinate System Confusion

**Likelihood**: Medium
**Impact**: Medium
**Mitigation**:
- Review PathEditor's handling of coordinates (proven approach)
- Use `paper.view.viewToProject()` for all mouse coordinates
- Document coordinate conversion in code comments
- Add unit tests for coordinate transformations

---

## Benefits vs. Effort Analysis

### Immediate Benefits (Phases 1-5)

✅ **Cleaner rendering code**: -150 lines of manual Canvas 2D operations
✅ **Proven pattern**: Follows PathEditor's successful approach
✅ **Better architecture**: Scene graph vs. immediate mode
✅ **Easier debugging**: Can inspect Paper.js items in console

### Future Benefits (Phase 6+)

✅ **Piece selection**: Click to select/highlight a puzzle piece
✅ **Hover effects**: Highlight piece on hover
✅ **Export to SVG**: `paper.project.exportSVG()` for vector output
✅ **Animations**: Smooth transitions for vertex dragging
✅ **Zoom/Pan**: Easy to add canvas navigation (like PathEditor)
✅ **Easier enhancements**: Adding features like piece rotation, piece exploding view

### Effort Required

- **Core conversion** (Phases 1-5): ~8-12 hours
- **Optional polish** (Phase 6): ~2-4 hours
- **Total**: 10-16 hours

### Recommendation

**Proceed with conversion** if any of the following are true:
1. Planning to add interactive features (piece selection, highlighting, etc.)
2. Want to unify rendering architecture with PathEditor
3. Want to enable SVG export of generated puzzles
4. Current Canvas 2D code is difficult to maintain

**Defer conversion** if:
1. Current rendering works well and no new features planned
2. Performance is critical and micro-optimizations needed
3. Team is unfamiliar with Paper.js

---

## Code Organization

### Approved File Structure

**Geometry Layer** (Split PuzzleMaker):
```
src/geometry/
├── PuzzleMaker.ts          # Generation logic ONLY
│   ├── buildPuzzle()                    # Unchanged
│   ├── rebuildPuzzleWithUpdatedSeedPoint()  # Unchanged
│   └── [drawPuzzle() remains for Puzzle.ts]
├── PuzzleRenderer.ts       # NEW: Paper.js rendering
│   ├── drawPuzzleWithPaper()
│   ├── drawSeedPoints()
│   ├── drawProblems()
│   ├── createPiecePath()
│   ├── createEdgePath()
│   └── helper functions
├── paperUtils.ts           # NEW: Shared Paper.js utilities
│   ├── paperPathToPathCommands()  # Lifted from PathEditor
│   ├── pathCommandsToPaperPath()  # Lifted from PathEditor
│   └── conversion helpers
```

**Component Layer** (Multi-file component):
```
src/ui/
├── Puzzle.ts                    # UNCHANGED: Original Canvas 2D version
├── PuzzlePaper/                 # NEW: Paper.js version (following PathEditor pattern)
│   ├── index.ts                 # Component export, lifecycle, setup
│   ├── rendering.ts             # Rendering logic (calls PuzzleRenderer)
│   ├── interaction.ts           # Mouse/touch events, hit testing, dragging
│   ├── constants.ts             # Types and constants
│   └── PuzzlePaper.css          # Component styles
├── PathEditor/                  # Modified to use paperUtils.ts
│   ├── index.ts
│   ├── geometry.ts              # Update imports to use paperUtils.ts
│   ├── mouseHandling.ts
│   └── ...
```

**Page Layer**:
```
src/pages/
├── PuzzlePage.ts               # UNCHANGED: Uses Puzzle.ts
├── PuzzlePaperPage.ts          # NEW: Uses PuzzlePaper component
└── TestPage.ts                 # Unchanged
```

**Rationale**:
- Separates generation (PuzzleMaker) from rendering (PuzzleRenderer)
- Multi-file component structure for complexity management
- Shared utilities prevent duplication
- Original component untouched for safety

---

## Decisions Made

1. **Keep Canvas 2D version?**
   - ✅ **YES** - Original Puzzle.ts remains untouched
   - New PuzzlePaper component developed in parallel
   - Both accessible via separate routes

2. **Use Paper.js hit testing or manual distance checks?**
   - ✅ **Paper.js hit testing**
   - Better foundation for future features
   - Consistent with PathEditor approach
   - Easier to extend for piece selection/highlighting

3. **Add zoom/pan to the puzzle canvas?**
   - ✅ **YES** - Phase 6 priority feature
   - Consistent with PathEditor
   - Essential for large puzzles
   - Natural fit with Paper.js view transformations

4. **Split PuzzleMaker.ts?**
   - ✅ **YES** - Create separate PuzzleRenderer.ts
   - Clean separation: generation vs. rendering
   - Easier to maintain and test
   - Supports future rendering backends if needed

5. **Multi-file component structure?**
   - ✅ **YES** - Follow PathEditor pattern
   - Given complexity of future features (input handling, layers, selection)
   - Organize as `src/ui/PuzzlePaper/` directory
   - Separate concerns: lifecycle, rendering, interaction

## Open Questions

1. **Should we cache Paper.js objects or recreate each render?**
   - Start simple (recreate), measure performance
   - Optimize only if needed based on real usage

2. **Should we support SVG export via Paper.js?**
   - Requires maintaining "cut once" rule (critical for laser cutting)
   - Investigate if Paper.js export preserves edge uniqueness
   - May need custom export logic from PuzzleGeometry

3. **Should we eventually replace original Puzzle.ts?**
   - Keep both initially
   - Evaluate after Paper.js version is mature
   - Consider user preferences, performance data

4. **What other Paper.js features should we explore?**
   - Animations and transitions
   - Advanced layer effects
   - Piece rotation/transformation for solving UI
   - Interactive piece assembly

---

## Testing Strategy

### Unit Tests

Currently no unit tests exist. Consider adding:
- ✅ PathCommand → Paper.js path conversion
- ✅ Paper.js path → PathCommand conversion (can reuse PathEditor's geometry.ts)
- ✅ Coordinate transformations
- ✅ Hit testing accuracy

### Visual Regression Tests

1. Generate reference images with current Canvas 2D rendering
2. Generate comparison images with Paper.js rendering
3. Use image diffing to verify pixel-perfect match
4. Test with multiple puzzle configurations:
   - Small puzzles (10 pieces)
   - Medium puzzles (50 pieces)
   - Large puzzles (200 pieces)
   - Different generators (Voronoi, Grid)
   - Different tab shapes

### Integration Tests

1. Vertex dragging behavior
2. Seed point dragging with regeneration
3. Hover detection and cursor changes
4. Background image rendering
5. Touch events on mobile devices
6. Performance with large puzzles

---

## Conclusion

Implementing a new Paper.js-based puzzle renderer is a **medium-effort, low-risk enhancement** that enables significant future features while preserving the existing Canvas 2D code during implementation.

### Key Takeaways

1. **PathEditor validates the approach** - Paper.js works well with Mithril
2. **Feature-driven decision** - Pan/zoom, selection, layers justify the approach
3. **Parallel development** - New component alongside original = low risk
4. **Scene graph model** - Essential for complex interactions and layering
5. **Multi-file structure** - Manages complexity for enhanced features
6. **Clean architecture** - Split generation (PuzzleMaker) from rendering (PuzzleRenderer)

### Implementation Plan Summary

**✅ APPROVED** - Proceed with parallel development approach

1. **Phase 1**: Setup structure, lift utilities, split PuzzleMaker, create route
2. **Phase 2**: Implement edge rendering with Paper.js
3. **Phase 3**: Implement seed points and problem indicators
4. **Phase 4**: Implement Paper.js hit testing and drag handlers
5. **Phase 5**: Integration testing, comparison with original
6. **Phase 6**: Add enhanced features (pan/zoom, piece selection, hover effects)

### Key Decisions

✅ Develop new PuzzlePaper component (not convert existing)
✅ Create separate Mithril route for development/testing
✅ Split PuzzleMaker.ts → PuzzleMaker (generation) + PuzzleRenderer (rendering)
✅ Use multi-file component structure (like PathEditor)
✅ Embrace Paper.js hit testing (better foundation)
✅ Prioritize features over performance optimization
✅ SVG export only if "cut once" rule can be maintained

### Expected Outcome

A powerful new puzzle rendering system that:
- Enables pan/zoom for navigating large puzzles
- Supports piece selection and highlighting
- Provides foundation for layers and grouping
- Makes future enhancements easier to implement
- Maintains backward compatibility via separate route
- Demonstrates Paper.js benefits for potential full migration

---

## References

- **PathEditor component**: `src/ui/PathEditor/` (working Paper.js implementation)
- **path-editing.md**: Phase 4 details on pan/zoom implementation
- **PuzzleMaker.ts**: Current rendering logic (lines 152-301)
- **Puzzle.ts**: Current component implementation
- **Paper.js docs**: http://paperjs.org/
- **Half-edge data structure**: `src/geometry/types.ts`
