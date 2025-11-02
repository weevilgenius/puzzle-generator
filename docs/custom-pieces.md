# Custom Pieces (Whimsies) Feature Design

## Overview

This document outlines the design and implementation plan for adding custom pieces (called "whimsies" or "whimsy pieces") to the puzzle generator. Custom pieces are user-designed shapes that appear exactly once in the puzzle, with procedurally generated pieces flowing around them.

## Requirements Summary

1. **User-defined shapes**: Users can draw or import custom piece shapes using the PathEditor component
2. **Validation**: Each custom piece must be a closed, non-self-intersecting path with visual feedback for invalid pieces
3. **Management UI**: A dedicated section in puzzle controls showing all custom pieces with add/edit/duplicate/delete capabilities
4. **Placement & manipulation**: Users can position, scale, and rotate each custom piece on the puzzle canvas
5. **Pipeline integration**: PieceGenerators must account for custom pieces and generate procedural pieces around them
6. **Single appearance**: Each custom piece appears exactly once in the final puzzle. If a user wishes to have multiple identical pieces, they can duplicate an existing one and position it separately.

## Architecture & Data Structures

### Custom Piece Type Definition

```typescript
// In src/geometry/types.ts

/**
 * A puzzle piece defined by the user. Unlike procedurally generated pieces,
 * custom pieces have explicit geometry and transformations that persist across
 * puzzle regenerations.
 */
export interface CustomPiece {
  /** Unique identifier for this custom piece */
  id: string;

  /** Optional user-friendly name */
  name?: string;

  /** The path defining the piece shape (must be closed and non-self-intersecting) */
  path: PathCommand[];

  /** Spatial transformation applied to the piece */
  transform: CustomPieceTransform;

  /** Creation timestamp */
  created: DateString;
}

/**
 * Spatial transformation for positioning a custom piece on the puzzle.
 */
export interface CustomPieceTransform {
  /** Position of the piece's center point */
  position: Vec2;

  /** Rotation angle in radians */
  rotation: number;

  /** Scale factors for x and y axes */
  scale: Vec2;
}
```

### Integration with Puzzle Generation

```typescript
// Extend PuzzleGenerationOptions in src/geometry/PuzzleMaker.ts
export interface PuzzleGenerationOptions {
  // ... existing fields ...

  /** Custom pieces defined for this puzzle */
  customPieces?: CustomPiece[];
}

// Extend PieceGeneratorRuntimeOptions in src/geometry/generators/piece/PieceGenerator.ts
export interface PieceGeneratorRuntimeOptions {
  // ... existing fields ...

  /** Custom pieces that procedural pieces must flow around */
  customPieces?: CustomPiece[];
}

// Extend PuzzleGeometry to store custom pieces
export interface PuzzleGeometry extends PuzzleTopology {
  // ... existing fields ...

  /** Custom pieces defined for this puzzle */
  customPieces?: CustomPiece[];
}
```

## Key Design Decisions

### 1. Storage Strategy: Separate Transformations

**Decision**: Store transformations separately from the original path geometry.

**Rationale**:
- Easier to modify transformations without recalculating geometry
- Cleaner separation between shape definition and placement
- Supports future "virtual whimsy" concept for piece editing
- Simplifies caching of transformed polygons
- Better matches standard graphics transform patterns

**Alternative Considered**: Modifying internal geometry directly would be simpler initially but would complicate undo/redo and future piece editing features.

### 2. Validation Approach

**Decision**: Implement validation in a separate layer, keeping PathEditor general-purpose.

**Implementation**:
- PathEditor remains flexible (supports both open and closed paths)
- Validation layer (`src/utils/pathValidation.ts`) checks:
  - Path is closed (first point equals last point)
  - No self-intersections (Bentley-Ottmann or sweep-line algorithm)
- Visual feedback shown in the custom piece editor UI
- Invalid pieces cannot be added to the collection

### 3. PieceGenerator Integration Strategy

Each piece generator must handle custom pieces according to its algorithm:

#### VoronoiPieceGenerator Strategy:
1. Convert custom pieces to polygons (apply transforms)
2. Generate Voronoi diagram from seed points as usual
3. For each Voronoi cell:
   - Check if it overlaps any custom piece polygon
   - If overlapping: clip the Voronoi cell against custom piece boundaries
   - If fully contained: skip this cell entirely
4. Custom pieces become their own pieces in the final topology

#### RectangularPieceGenerator Strategy:
1. Convert custom pieces to polygons (apply transforms)
2. Generate grid as usual
3. For each grid cell:
   - Check overlap with custom pieces
   - If overlapping: clip or subdivide the cell
   - If fully contained: skip this cell
4. Custom pieces become their own pieces in the final topology

**Common Helpers Needed** (in `src/geometry/customPieces.ts`):
- `customPieceToPolygon(piece: CustomPiece): Vec2[]` - Apply transforms and flatten to polygon
- `checkCustomPieceOverlap(cell: Vec2[], customPieces: CustomPiece[]): CustomPiece[]` - Find overlapping pieces
- `subtractCustomPieces(cell: Vec2[], customPieces: CustomPiece[]): Vec2[][] | null` - Clip cell against custom pieces
- `createPieceFromCustom(custom: CustomPiece, topology: PuzzleTopology): Piece` - Convert custom piece to Piece

## UI Components

### 1. Whimsy Manager (`src/ui/WhimsyManager.ts`)

A section in the main puzzle controls showing all custom pieces.

**Features**:
- Grid/list view of custom piece tiles (thumbnails)
- Add button above the grid → Opens CustomPieceEditor modal with empty canvas
- Each tile is clickable and shows:
  - Thumbnail preview of the shape
  - Piece name (editable inline or in editor)
  - Visual indicator when selected (border/highlight)
- Button toolbar below the grid (enabled when a piece is selected):
  - Edit (also activated by double click) → Opens CustomPieceEditor with existing path
  - Duplicate → Creates copy with incremented name
  - Delete → Deletes (with confirmation)
  - Position → Activates positioning mode on canvas

**State Management**:
```typescript
interface CustomPieceManagerState {
  pieces: CustomPiece[];
  selectedPieceId: string | null;
  editingPieceId: string | null;
}
```

### 2. Whimsy Editor (`src/ui/WhimsyEditor.ts`)

A modal or dedicated page for creating/editing custom pieces.

**Features**:
- PathEditor component for drawing/editing the shape
- Import SVG button (uses PathEditor's SVG import)
- Real-time validation with visual feedback
- Name input field
- Save/Cancel buttons
- Validation status indicator (checkmark or error icon)

**Validation Display**:
- Green checkmark: Valid closed path with no self-intersections
- Red X with message: "Path must be closed" or "Path cannot intersect itself"
- Highlight self-intersection points on the canvas

### 3. Whimsy Positioning (integrated into PuzzleRenderer)

Custom piece positioning is integrated directly into the PuzzleRenderer component using Paper.js layers.

**Unified Paper.js Scene Architecture**:
```typescript
const paperLayers = {
  puzzle: new paper.Layer(),          // Procedural pieces
  customPieces: new paper.Layer(),    // Custom pieces (always visible)
  customHandles: new paper.Layer(),   // Transform handles (show/hide)
  seedPoints: new paper.Layer(),      // Seed points (show/hide)
  problems: new paper.Layer(),        // Geometry problem indicators
};

type InteractionMode =
  | 'viewing'
  | 'editingVertices'
  | 'editingSeedPoints'
  | 'positioningCustomPiece';
```

**Benefits of Unified Scene**:
- Shared coordinate system (no conversion needed)
- Unified zoom/pan behavior
- Efficient hit testing across all layers
- Single event handling system
- Better visual integration

**Extended PuzzleRenderer Props**:
```typescript
interface PuzzleRendererAttrs extends m.Attributes {
  // ... existing props
  customPieces?: CustomPiece[];
  interactionMode?: InteractionMode;
  selectedCustomPieceId?: string | null;

  onCustomPieceTransformed?: (id: string, transform: CustomPieceTransform) => void;
  onCustomPieceSelected?: (id: string | null) => void;
}
```

**Interaction States**:
- `idle` - No piece selected in positioning mode
- `selected` - Piece selected, handles visible
- `dragging` - Translating piece position (preview only, no regeneration)
- `rotating` - Rotating around center (preview only)
- `scaling` - Scaling via handles (preview only)
- On mouse up: Triggers puzzle regeneration with new transform

**Rendering & Interaction**:
- Custom pieces rendered in dedicated layer with applied transforms
- Transform handles (rotation, scale) rendered in separate layer
- Paper.js hit testing determines which piece/handle is clicked
- During drag: Transform updates in real-time (visual preview only)
- On mouse up: Callback triggers puzzle regeneration with procedural pieces flowing around new custom piece positions

### 4. Thumbnail Generation

**Approach**:
- Create small off-screen canvas (e.g., 100x100px)
- Render PathCommand array to canvas
- Compute bounds of path, scale to fit thumbnail
- Export as data URL for display in tiles

**Helper Function** (`src/utils/thumbnails.ts`):
```typescript
function generateCustomPieceThumbnail(
  path: PathCommand[],
  width: number,
  height: number
): string
```

## Implementation Phases

### Phase 1: Foundation & Data Structures
- ✅ Define CustomPiece and related types in `src/geometry/types.ts`
- ✅ Create `src/geometry/customPieces.ts` with helper functions
- ✅ Extend PuzzleGenerationOptions and PuzzleGeometry
- ✅ Add customPieces to PuzzlePage state

### Phase 2: Validation
- ✅ Implement `src/utils/pathValidation.ts`:
  - `isPathClosed(path: PathCommand[]): boolean`
  - `findSelfIntersections(path: PathCommand[]): Vec2[]`
  - `validateCustomPiece(path: PathCommand[]): ValidationResult`

### Phase 3: UI - Whimsy Editor
- ✅ Create `src/ui/WhimsyEditor.ts` modal component
- ✅ Integrate PathEditor with validation feedback
- ✅ Implement SVG import functionality
- ✅ Add name input and save/cancel actions
- ✅ Connect to PuzzlePage state (add/edit callbacks)

### Phase 4: UI - Whimsy Manager
- [ ] Create `src/ui/WhimsyManager.ts` component
- [ ] Implement thumbnail generation (`src/utils/thumbnails.ts`)
- [ ] Build tile view
- [ ] Add piece selection state management
- [ ] Create add/edit/duplicate/delete/position control buttons that apply to selected tile
- [ ] Integrate with PuzzlePage controls section

### Phase 5: UI - Canvas Positioning (Integrated into PuzzleRenderer)
- [ ] Extend PuzzleRenderer to support custom piece rendering
  - [ ] Create Paper.js layer architecture (puzzle, customPieces, customHandles, etc.)
  - [ ] Add `interactionMode` state management
  - [ ] Extend PuzzleRendererAttrs with customPieces, selectedCustomPieceId, callbacks
- [ ] Implement custom piece layer rendering
  - [ ] Render custom pieces with transforms applied
  - [ ] Show/hide based on interaction mode
- [ ] Implement transform handles layer
  - [ ] Rotation handle (circular handle at radius from center)
  - [ ] Scale handles (corner/edge handles on bounding box)
  - [ ] Show handles only for selected custom piece in positioning mode
- [ ] Implement positioning interactions
  - [ ] Selection via hit testing (click to select)
  - [ ] Drag to translate (preview only, updates transform in real-time)
  - [ ] Drag rotation handle to rotate (preview only)
  - [ ] Drag scale handles to scale (preview only)
  - [ ] On mouse up: Fire `onCustomPieceTransformed` callback
- [ ] Add visual feedback during manipulation
  - [ ] Highlight overlaps with red outline during drag
  - [ ] Show current transform values (rotation angle, scale factor)
- [ ] Coordinate regeneration workflow
  - [ ] PuzzlePage listens to `onCustomPieceTransformed` callback
  - [ ] On callback: Update customPiece transform in state
  - [ ] Trigger puzzle regeneration with updated custom pieces
  - [ ] Procedural pieces flow around custom pieces at new positions
- [ ] Add flip horizontal/vertical controls (future feature idea)
- [ ] Note: Allow all placements (including overlaps). Validation flags issues visually via problem checker

### Phase 6: Pipeline Integration - Voronoi
- [ ] Modify VoronoiPieceGenerator to accept customPieces
- [ ] Implement custom piece polygon conversion
- [ ] Add overlap detection for Voronoi cells
- [ ] Implement cell clipping against custom pieces
- [ ] Create pieces from custom piece geometry
- [ ] Test with various custom piece configurations

### Phase 7: Pipeline Integration - Rectangular
- [ ] Modify RectangularPieceGenerator to accept customPieces
- [ ] Add overlap detection for grid cells
- [ ] Implement cell clipping/subdivision
- [ ] Test with rectangular grids and custom pieces

### Phase 8: Tab Generation
- [ ] Ensure tabs are not generated on custom piece boundaries
- [ ] Handle tab placement at custom piece / procedural piece interfaces
- [ ] Test tab generation with mixed piece types

### Phase 9: Polish & Edge Cases
- [ ] Handle custom pieces near puzzle boundaries
- [ ] Validate custom piece size constraints (not too large/small)
- [ ] Add keyboard shortcuts for custom piece manipulation
- [ ] Improve performance for many custom pieces
- [ ] Add undo/redo for custom piece operations
- [ ] Export/import custom piece definitions

## Technical Challenges & Solutions

### 1. Self-Intersection Detection

**Challenge**: Detecting self-intersections in bezier curves is computationally expensive.

**Solution**:
- Flatten bezier curves to line segments (using Paper.js or custom flattening)
- Apply sweep-line algorithm to detect line segment intersections
- Trade-off: precision vs performance (adjustable tolerance)
- Cache validation results (revalidate only on path changes)

**Library Options**:
- Paper.js `path.getIntersections(path)` - built-in, may be sufficient
- Implement Bentley-Ottmann algorithm for guaranteed O((n + k) log n) performance
- Use `polygon-clipping` library's built-in intersection detection

### 2. Polygon Clipping for Custom Pieces

**Challenge**: Procedural piece cells need robust clipping against custom piece boundaries.

**Solution**:
- Already using `polygon-clipping` library (Martinez polygon clipping)
- Convert custom pieces to polygons (flatten curves)
- Use "difference" operation: `procedural_cell - custom_piece_polygon`
- Handle resulting multi-polygons (union operator if necessary)

**Implementation**:
```typescript
function subtractCustomPieces(
  cell: Vec2[],
  customPieces: CustomPiece[]
): Vec2[][] | null {
  let result = [cell];

  for (const customPiece of customPieces) {
    const customPolygon = customPieceToPolygon(customPiece);
    result = polygon.difference(result, [customPolygon]);

    if (result.length === 0) {
      return null; // Cell fully contained in custom pieces
    }
  }

  return result;
}
```

### 3. Transform Application & Caching

**Challenge**: Applying transforms to paths/polygons repeatedly is expensive.

**Solution**:
- Cache transformed polygons using custom piece ID + transform hash
- Invalidate cache when transform changes
- Use Paper.js Item.transform for efficient canvas rendering

```typescript
interface TransformCache {
  customPieceId: string;
  transformHash: string;
  polygon: Vec2[];
}

function getTransformedPolygon(
  piece: CustomPiece,
  cache: Map<string, TransformCache>
): Vec2[] {
  const hash = hashTransform(piece.transform);
  const cached = cache.get(piece.id);

  if (cached && cached.transformHash === hash) {
    return cached.polygon;
  }

  const polygon = applyTransform(
    flattenPath(piece.path),
    piece.transform
  );

  cache.set(piece.id, {
    customPieceId: piece.id,
    transformHash: hash,
    polygon,
  });

  return polygon;
}
```

### 4. Paper.js Layer Lifecycle & Management

**Challenge**: With unified Paper.js scene, need clear rules for what gets cleared/recreated when.

**Solution**: Define clear ownership and lifecycle for each layer:

```typescript
// Layer ownership and lifecycle rules:
const layerLifecycle = {
  puzzle: {
    owner: 'PuzzleRenderer',
    recreate: 'on every puzzle regeneration',
    persist: false,
    note: 'Cleared and rebuilt when puzzle.seed or generators change'
  },
  customPieces: {
    owner: 'PuzzleRenderer',
    recreate: 'when customPieces prop changes',
    persist: true,
    note: 'Persists across puzzle regenerations, updated only when custom pieces added/removed/transformed'
  },
  customHandles: {
    owner: 'PuzzleRenderer',
    recreate: 'when selectedCustomPieceId changes',
    persist: false,
    note: 'Cleared when mode changes or selection changes'
  },
  seedPoints: {
    owner: 'PuzzleRenderer',
    recreate: 'when puzzle changes or visibility toggles',
    persist: false,
    note: 'Existing behavior, shown when drawPoints prop is true'
  },
  problems: {
    owner: 'PuzzleRenderer',
    recreate: 'when geometry check completes',
    persist: false,
    note: 'Existing behavior, shown when problems exist'
  }
};
```

**Regeneration Workflow**:
1. User drags custom piece handle → Transform updates in customPieces layer (fast preview)
2. On mouse up → `onCustomPieceTransformed` callback fires
3. PuzzlePage updates customPiece in state
4. PuzzlePage triggers puzzle regeneration by updating seed or calling buildPuzzle
5. PuzzleRenderer's `onupdate` lifecycle:
   - Detects puzzle prop changed → Clear and recreate `puzzle` layer
   - Detects customPieces prop changed → Update `customPieces` layer (reapply transforms)
   - Keep `customHandles` layer intact (still in positioning mode)
6. User sees procedural pieces flowing around new custom piece positions

**Mode Switching**:
- When entering `positioningCustomPiece` mode: Show customHandles layer
- When exiting mode: Hide customHandles layer, optionally deselect
- Other layers unaffected by mode changes

### 5. Seed Point Filtering

**Challenge**: Seed points inside custom pieces should not generate procedural pieces.

**Solution**:
- Filter seed points before passing to PieceGenerator
- Check if point is inside any custom piece polygon
- Alternative: Let PieceGenerator handle it (more flexible)

**Recommendation**: Handle in PieceGenerator for flexibility and algorithm-specific optimizations.

### 6. Canvas Interaction Complexity

**Challenge**: Implementing rotation/scale handles with good UX is complex.

**Solution - Rotation**:
- Show circular handle at fixed radius from piece center
- On drag: calculate angle from center to mouse, update rotation
- Visual feedback: show rotation angle, snap to 15° increments with Shift key

**Solution - Scale**:
- Show 8 handles around bounding box (4 corners, 4 edges)
- Corner handles: uniform or non-uniform scale (with Shift for uniform)
- Edge handles: scale along one axis
- Maintain aspect ratio by default

**Simplified Alternative for MVP**:
- Phase 1: Only translation (drag to move)
- Phase 2: Add rotation (single handle)
- Phase 3: Add scale (corner handles only)
- Future: Full transform editing with on-canvas widgets

### 7. Tab Placement at Boundaries

**Challenge**: Tab placement at interface between custom and procedural pieces.

**Solution**:
- Mark custom piece edges with a flag (e.g., `isCustomPiece: boolean` in Edge)
- TabPlacementStrategy skips custom piece edges
- Procedural pieces can have tabs on edges adjacent to custom pieces
- Custom pieces never have tabs (or have special simplified tabs)

**Edge Case**: What if custom piece is very small? Tabs might not fit.
- Add validation: minimum custom piece size
- Or: Skip tab generation on small edges (already done by TabGenerator)

## Future Extensions

### 1. Virtual Whimsies for Piece Editing

**Concept**: When user manually adjusts a procedurally generated piece vertex, internally convert it to a "virtual custom piece" to preserve the edit across regenerations.

**Implementation**:
- Intercept vertex drag events on procedural pieces
- On drag end: extract piece polygon, create CustomPiece with flag `isVirtual: true`
- Regenerate puzzle with this virtual custom piece
- User sees edited piece persist when changing seed/algorithm
- Virtual custom pieces can be promoted to real custom pieces (saved to library)

### 2. Whimsy Library

**Features**:
- Save custom pieces to SVG, browser storage or export as JSON
- Import custom piece collections
- Predefined templates (animals, objects, letters, numbers)

### 3. Flip/Mirror Transformations

**Features**:
- Flip custom pieces horizontally or vertically during positioning
- Useful for creating variations from a single design
- Store flip state in transform (e.g., `flip: { horizontal: boolean, vertical: boolean }`)
- Apply flip before other transformations (scale, rotate, translate)
- UI: Add flip buttons to positioning toolbar or context menu

## Testing Strategy

### Unit Tests
- Path validation (closed, self-intersection)
- Transform application (position, rotation, scale)
- Polygon conversion (flatten paths correctly)
- Overlap detection (custom piece vs procedural cell)
- Clipping operations (difference, intersection)

### Integration Tests
- Add custom piece via UI → appears in manager
- Edit custom piece → changes reflected in puzzle
- Delete custom piece → removed from puzzle
- Regenerate puzzle → custom pieces persist with transforms

### Visual Regression Tests
- Screenshot puzzles with various custom pieces
- Ensure custom pieces render correctly
- Verify procedural pieces flow around custom pieces

### Performance Tests
- Measure generation time with 0, 1, 5, 10 custom pieces
- Ensure acceptable performance (< 2s for typical puzzle)
- Profile bottlenecks (clipping, validation, rendering)

## Open Questions

### Q1: Transformation Storage vs Geometry Modification

**Question**: Should transformations be stored separately or applied to the geometry?

**Answer**: Store separately (see Design Decision #1). Allows for easier manipulation and future features.

---

### Q2: Tab Generation on Custom Piece Edges

**Question**: Should custom pieces have tabs where they meet procedural pieces?

**Answer**: No. Whimsies (the initial use-case for custom pieces) are meant to be visually recognizable shapes. Tabs make this recognition much more difficult. If the user wants tab-like structures, they can define them as part of the custom piece.

---

### Q3: Whimsy Positioning Workflow

**Question**: Should custom pieces be positioned before or after generation? On a separate canvas or overlay?

**Answer**: Custom pieces are positioned POST-generation, integrated into PuzzleRenderer using a unified Paper.js scene.

**Architecture**:
- PuzzleRenderer uses Paper.js layers for different elements (procedural pieces, custom pieces, handles, etc.)
- Custom pieces rendered in the same coordinate space as procedural pieces
- Benefits: shared zoom/pan, unified hit testing, no coordinate conversion needed

**User Workflow**:
1. User creates/selects custom piece from CustomPieceManager
2. User clicks "Position" button to enter positioning mode
3. Custom piece appears on the puzzle canvas (initially centered or at default position)
4. User manipulates the piece (drag to move, handles to rotate/scale)
5. During manipulation: Transform updates in real-time as visual preview
6. On mouse up: Puzzle regenerates with procedural pieces flowing around custom piece
7. User sees immediate feedback with new puzzle layout

**Performance Consideration**:
- During drag/rotate/scale: Only update transform preview (fast)
- On mouse up: Trigger full puzzle regeneration (may take 100-500ms)
- This provides smooth interaction while keeping puzzle generation responsive

**Mode Management**:
- PuzzlePage tracks `interactionMode` state
- When mode is `positioningCustomPiece`, PuzzleRenderer shows transform handles and enables positioning interactions
- Other modes (`viewing`, `editingVertices`, `editingSeedPoints`) remain available

---

### Q4: Multiple Whimsies Overlapping

**Question**: What if user positions two custom pieces overlapping each other?

**Answer**: Allow the placement but flag it visually. Consistent with the application's general validation approach (allow any user action, highlight potential issues):
- User can position custom pieces anywhere, including overlapping positions
- During drag, show visual feedback (e.g., red outline) when overlap is detected
- After positioning, the problem checker validates and highlights overlaps like other geometry issues
- User can choose to fix the overlap or proceed with the invalid state

**Future**: Allow user to designate the union/difference/intersection of overlapping pieces as a single piece.

---

### Q5: Whimsy Size Limits

**Question**: Should there be min/max size constraints on custom pieces?

**Answer**: Yes, for practical reasons: minimum 20x20 pixels (smaller pieces are too fiddly, tiny details won't resolve when puzzle is cut), maximum 80% of puzzle area (leaves a little space for procedural pieces). Unlike most validation issues, this one can be a hard constraint.

---

### Q6: Undo/Redo for Whimsys

**Question**: Should custom piece operations (add, edit, delete, transform) support undo/redo?

**Answer**: Yes, but defer to polish phase. Implement simple state history:
- Store array of PuzzlePage states (snapshots)
- Limit history depth (e.g., 20 operations)
- Keyboard shortcuts: Cmd/Ctrl+Z (undo), Cmd/Ctrl+Shift+Z (redo)
- Applies to all puzzle operations, not just custom pieces

---

## File Organization Summary

### New Files
- `src/geometry/types.ts` - Add CustomPiece types (modify existing)
- `src/geometry/customPieces.ts` - Helper functions for custom pieces
- `src/ui/CustomPieceManager.ts` - Management UI component
- `src/ui/CustomPieceEditor.ts` - Editor modal/page component
- `src/utils/pathValidation.ts` - Path validation utilities
- `src/utils/thumbnails.ts` - Thumbnail generation
- `src/utils/transforms.ts` - Transform application utilities

### Modified Files
- `src/geometry/PuzzleMaker.ts` - Add customPieces to options
- `src/geometry/generators/piece/PieceGenerator.ts` - Add customPieces to runtime options
- `src/geometry/generators/piece/VoronoiPieceGenerator.ts` - Handle custom pieces
- `src/geometry/generators/piece/RectangularPieceGenerator.ts` - Handle custom pieces
- `src/ui/PuzzleRenderer/index.ts` - Add custom piece layers, positioning interactions, and interactionMode support
- `src/pages/PuzzlePage.ts` - Add custom pieces state, UI section, and interactionMode management

### Dependencies to Consider
- May need additional Paper.js utilities
- Consider path simplification library (simplify.js) for performance

## Success Criteria

The custom pieces feature will be considered complete when:

1. [ ] Users can create custom pieces by drawing or importing SVG paths
2. [ ] Validation prevents invalid pieces (open paths, self-intersecting) with clear feedback
3. [ ] Custom pieces can be positioned, rotated, and scaled on the puzzle canvas
4. [ ] Multiple custom pieces can be managed (add, edit, delete) through the UI
5. [ ] Procedural piece generation correctly flows around custom pieces
6. [ ] Custom pieces appear exactly once in the generated puzzle
7. [ ] Tabs are handled correctly at custom/procedural piece boundaries
8. [ ] Performance remains acceptable with up to 10 custom pieces
9. [ ] Custom pieces persist across puzzle regenerations (seed changes, algorithm changes)
10. [ ] Documentation and code comments explain the feature for future maintenance

## Conclusion

The custom pieces feature represents a significant enhancement to the puzzle generator, allowing users to create personalized puzzles with recognizable shapes. The design balances complexity with maintainability by:

- Leveraging existing components (PathEditor, Paper.js rendering)
- Using proven patterns (half-edge topology, generator pipeline)
- Separating concerns (validation, transformation, rendering)
- Planning for future extensions (virtual whimsies, piece editing)

The phased implementation approach allows for incremental progress and testing, reducing risk while building toward a feature-complete solution.
