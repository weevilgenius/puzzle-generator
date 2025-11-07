# Save and Load Feature Analysis

## Overview

This document analyzes requirements and approaches for implementing save/load functionality
in the puzzle generator. The goal is to enable users to preserve and restore complete puzzle
configurations, including generator settings, custom pieces, and optional user modifications.

## What Needs to Be Saved

### Core State (Essential)

Based on `PuzzlePage.ts` state structure, the following must be saved to recreate a puzzle:

#### 1. Global Options
- **Dimensions**: `canvasWidth`, `canvasHeight`, `aspectRatio`
- **Seed**: `seed` (number) - critical for reproducibility
- **Piece Size**: `distance` (target piece size in pixels)
- **Visual Settings**: `color`, `drawPoints`, `pointColor`

#### 2. Border Configuration
- **Shape Type**: `borderShape` ('rectangle' | 'circle' | 'ellipse' | 'rounded-rect')
- **Parameters**: `borderCornerRadius` (for rounded rectangles)

#### 3. Generator Configurations
Four generator slots, each containing:
- **Selected Generator**: `name` (GeneratorName string)
- **Configuration**: `config` object (extends `GeneratorConfig`)

Specific generators:
- `generators.point` - Point generation strategy
- `generators.piece` - Piece generation strategy
- `generators.placement` - Tab placement strategy
- `generators.tab` - Tab generation strategy

**Example Config Data**:
```typescript
{
  point: {
    name: "PoissonPointGenerator",
    config: { name: "PoissonPointGenerator" }
  },
  piece: {
    name: "VoronoiPieceGenerator",
    config: {
      name: "VoronoiPieceGenerator",
      whimsyMode: "simple+merge",
      eliminationThreshold: 20,
      minFragmentSizeRatio: 0.3
    }
  },
  placement: {
    name: "SimpleTabPlacementStrategy",
    config: {
      name: "SimpleTabPlacementStrategy",
      tabSize: 0.2,
      minEdgeLength: 20
    }
  },
  tab: {
    name: "TraditionalTabGenerator",
    config: {
      name: "TraditionalTabGenerator",
      jitter: 50,
      heightToWidthRatio: 80
    }
  }
}
```

#### 4. Custom Pieces (Whimsy)
Array of `CustomPiece` objects (`src/geometry/types.ts:200-218`):
```typescript
{
  id: string,                    // "custom-{timestamp}-{random}"
  name?: string,                 // User-friendly name
  path: PathCommand[],           // Closed path shape
  transform: {                   // Position, rotation, scale
    position: [x, y],
    rotation: number,            // radians
    scale: [scaleX, scaleY]
  },
  created: string,               // ISO-8601 timestamp
  modified?: string              // ISO-8601 timestamp
}
```

**Storage Characteristics**:
- Fully serializable as JSON
- Contains complete geometry (PathCommand array)
- Includes all transforms needed for placement

### Optional State (Debatable)

#### 5. Background Image

**Current Storage**:
- Blob URL (`state.backgroundImageUrl`) - **Not serializable**
- Filename (`state.backgroundImageName`) - Serializable

**Options**:

**A) Store as Base64 Data URL**
- Convert image file to base64 string
- Embed directly in saved state
- **Size Impact**: ~33% larger than original file
  - Example: 1MB JPG → 1.33MB base64 string
  - 5MB image → 6.67MB save file

**B) Store Filename Only**
- Save only the filename as reference
- Require user to re-upload on load
- Validate dimensions match

**C) No Storage**
- Treat background as view-only aid
- Not part of "puzzle definition"
- User re-uploads if needed

#### 6. Seed Point Editing Mode (Optional Feature)

**Current Behavior** (`src/geometry/PuzzleMaker.ts:130-163`):
- User drags seed point in UI → triggers full rebuild
- Modified positions stored in `puzzle.seedPoints` array
- **Does NOT persist** in separate state
- Lost when regenerating puzzle (e.g., changing generator config)

**Recommended Approach: Global "Edit Seed Points" Mode**

Add an explicit mode toggle that switches between algorithmic generation and edited placement.

**State Changes**:
```typescript
interface PageState {
  // ...
  seedPointMode: 'generate' | 'edit';
  editedSeedPoints?: Vec2[];  // Only used when mode is 'edit'
}
```

**UI Behavior**:

*Generate Mode (default)*:
- Point generator picker **enabled**
- Seed point dragging **disabled** (or prompts to switch to edit mode)
- Normal generator configuration workflow

*Edit Mode*:
- Point generator picker **disabled/grayed out** with message: "Using edited seed points"
- Seed point dragging **enabled**
- Button: "Reset to Generator" (returns to generate mode)
- When entering edit mode: captures current puzzle's seed points as starting state

**Integration with Existing Infrastructure**:

The system already supports this via `PuzzleGenerationOptions.seedPoints`:
```typescript
// In PuzzlePage, when building puzzle:
const seedPoints = state.seedPointMode === 'edit'
  ? state.editedSeedPoints
  : undefined;  // undefined triggers generation

await buildPuzzle({
  // ... other options
  pointConfig: state.generators.point.config,  // Ignored if seedPoints provided
  seedPoints: seedPoints,  // Bypasses point generator when provided
});
```

**Workflow Example**:
1. User generates puzzle with PoissonPoint generator → 100 points
2. User clicks "Edit Seed Points" button
   - Mode switches to 'edit'
   - Current points copied to `state.editedSeedPoints`
   - Point generator UI disabled/grayed out
   - Seed point dragging enabled
3. User drags seed points → updates `state.editedSeedPoints` → puzzle rebuilds
4. User changes piece generator or tab settings → still uses edited seed points
5. User clicks "Reset to Generator" → returns to generate mode with point generator active

**Save Format**:
```typescript
{
  puzzle: {
    // ...
    seedPointMode: 'edit',
    editedSeedPoints: [[100, 150], [200, 175], ...],

    // Point generator config saved but ignored when in edit mode
    generators: {
      point: { name: 'PoissonPointGenerator' },
      // ...
    }
  }
}
```

**Benefits**:
- **Explicit mode** - User understands they've switched from algorithmic to edited
- **Clear UI affordance** - Point generator section visibly disabled in edit mode
- **Uses existing infrastructure** - `seedPoints` parameter already bypasses generation
- **Persistence** - Edited points saved and restored across sessions
- **No generator changes needed** - All logic in PuzzlePage state management

**Terminology Note**: Uses "Edit" rather than "Manual" since the UI only allows moving existing generated points, not creating new ones from scratch.

**Alternative Approaches**:

*Option B: Seed Point Overrides (Delta Storage)*
```typescript
{
  seedPointOverrides?: {
    [index: number]: [x, y]  // Only store modified points
  }
}
```
- Smaller storage footprint (only deltas)
- More complex: must apply overrides after generation
- Loses position if point count changes

*Option C: No Persistence*
- Treat edits as temporary
- Simpler implementation
- Less useful for users wanting to preserve custom layouts

#### 7. Manual Vertex Modifications

**Current Behavior**:
- PuzzleRenderer supports vertex dragging visually
- Modified positions persist in `puzzle.vertices` array until puzzle regeneration
- Lost when any generator config changes (triggers rebuild)

**Persistence Options**:

**Option A: Save Complete Geometry**

Include the full `PuzzleGeometry` structure in save files, which automatically captures all vertex edits.

*What Gets Saved*:
- All vertex positions (including manual edits)
- Complete half-edge topology (`pieces`, `edges`, `halfEdges`, `boundary`)
- All tab geometry (Bezier curve segments)
- Generator configs (for reference/regeneration)

*Size Impact*:
- **Config-only save**: 1-5 KB
- **With geometry**: 30-60 KB for typical 100-piece puzzle
  - Vertices: ~400 × 20 bytes = 8KB
  - Topology: 5-10KB
  - Tab segments (Bezier curves): 20-40KB
  - Total: ~10-60× larger, but still reasonable

*Pros*:
- Vertex edits automatically preserved (no extra code)
- Exact puzzle state captured (pixel-perfect reproduction)
- Fast load (no regeneration needed)
- Generator evolution doesn't break old saves
- Simple implementation (serialize existing structure)

*Cons*:
- Larger files (30-60KB vs 1-5KB)
- Geometry becomes stale if configs change
- Redundant (geometry derivable from configs)
- Maps require conversion for JSON serialization

*Technical Note*:
```typescript
// Maps don't serialize to JSON directly
function serializeGeometry(puzzle: PuzzleGeometry) {
  return {
    ...puzzle,
    pieces: Array.from(puzzle.pieces.entries()),
    edges: Array.from(puzzle.edges.entries()),
    halfEdges: Array.from(puzzle.halfEdges.entries()),
  };
}

function deserializeGeometry(saved: any): PuzzleGeometry {
  return {
    ...saved,
    pieces: new Map(saved.pieces),
    edges: new Map(saved.edges),
    halfEdges: new Map(saved.halfEdges),
  };
}
```

**Option B: Selective Geometry Inclusion**

Save geometry in file downloads, skip in auto-save:

*File Download (explicit save)*:
- Include full geometry
- Use case: archival, sharing finished puzzles
- Vertex edits preserved
- Larger file acceptable

*LocalStorage auto-save*:
- Configs only
- Smaller storage footprint
- Vertex edits lost on reload (acceptable as temporary tweaks)
- User can "Download" to preserve edits

*Pros*:
- Clear user model: "Download preserves everything, auto-save preserves settings"
- Efficient auto-save (no storage bloat)
- Vertex preservation when needed
- Simple implementation (no conditional logic)

*Cons*:
- Different behavior between auto-save and file save
- Requires user to explicitly download to preserve vertex edits

**Option C: "Edit Vertices" Mode**

Similar to "Edit Seed Points" mode (section 6):
- Explicit mode toggle
- Track which vertices have been modified
- Persist only deltas or full vertex array

*Pros*:
- Consistent with seed point approach
- Explicit user intent
- Can preserve edits across regeneration

*Cons*:
- More complex implementation
- Requires tracking original vs edited positions
- UI complexity (mode switching)

**Recommendation**: Start with **Option B (Selective Geometry)** in Phase 2:
- Simple implementation
- Preserves vertex edits when users explicitly save
- Efficient auto-save
- Can evolve to Option A or C if users need more

Current "edits lost on regeneration" behavior is acceptable complexity tradeoff for now.

### Not Required (Config-Only Saves)

The following state does NOT need to be saved in **config-only saves** (but may be included in geometry-inclusive saves):

- **Generated Geometry** (`puzzle.vertices`, `puzzle.pieces`, `puzzle.halfEdges`)
  - Can be regenerated from seed + configs
  - See section 7 for discussion of optionally including geometry

- **UI State** (`dirty`, `geometryProblems`, `customPieceEditorOpen`, etc.)
  - Transient view state
  - Always reset on load

- **Computed Values** (`aspectRatio`)
  - Derived from other saved values

## Storage Approaches

### Option 1: File Download (JSON)

**Implementation**:
```typescript
function savePuzzleState(state: PageState): void {
  const saveData = {
    version: "1.0.0",
    created: new Date().toISOString(),
    puzzle: {
      seed: state.seed,
      dimensions: {
        width: state.canvasWidth,
        height: state.canvasHeight,
      },
      pieceSize: state.distance,
      visual: {
        color: state.color,
        drawPoints: state.drawPoints,
        pointColor: state.pointColor,
      },
      border: {
        shape: state.borderShape,
        cornerRadius: state.borderCornerRadius,
      },
      generators: {
        point: state.generators.point.config,
        piece: state.generators.piece.config,
        placement: state.generators.placement.config,
        tab: state.generators.tab.config,
      },
      customPieces: state.customPieces,
      // Optional:
      backgroundImage?: backgroundImageBase64,
      backgroundImageName?: state.backgroundImageName,
      seedPointOverrides?: extractSeedPointOverrides(),
    }
  };

  const blob = new Blob([JSON.stringify(saveData, null, 2)], {
    type: 'application/json'
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `puzzle-${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(url);
}
```

**Load Implementation**:
```html
<input type="file" accept=".json" onchange={handleLoadFile} />
```
```typescript
function handleLoadFile(e: Event): void {
  const file = (e.target as HTMLInputElement).files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    const saveData = JSON.parse(e.target.result as string);
    restorePuzzleState(saveData);
  };
  reader.readAsText(file);
}
```

#### Pros
- **User Control**: User manages their own files
- **Unlimited Storage**: No browser quota limits
- **Portability**: Share puzzles across devices/users
- **Version Control Friendly**: JSON diffs work well
- **Backup**: Standard file backup workflows apply
- **No Privacy Concerns**: Data stays local
- **Multiple Puzzles**: Natural organization via filesystem

#### Cons
- **Extra Step**: User must explicitly download/upload
- **File Management**: User responsible for organizing files
- **Discoverability**: Less obvious than auto-save
- **No Cross-Device Sync**: Manual transfer required

### Option 2: LocalStorage

**Implementation**:
```typescript
const STORAGE_KEY = 'puzzleGenerator:savedState';
const RECENT_PUZZLES_KEY = 'puzzleGenerator:recentPuzzles';

function savePuzzleState(state: PageState): void {
  const saveData = createSaveData(state);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(saveData));
}

function loadPuzzleState(): SaveData | null {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : null;
}

// Optional: Multiple saved puzzles
function saveNamedPuzzle(name: string, state: PageState): void {
  const recent = JSON.parse(localStorage.getItem(RECENT_PUZZLES_KEY) || '[]');
  recent.unshift({
    name,
    timestamp: Date.now(),
    data: createSaveData(state)
  });
  // Keep last 10
  localStorage.setItem(RECENT_PUZZLES_KEY, JSON.stringify(recent.slice(0, 10)));
}
```

#### Pros
- **Auto-Save**: Can persist state automatically (e.g., on change)
- **Seamless UX**: State restored on page reload
- **Simple Implementation**: Built-in browser API
- **Fast Access**: Synchronous, no file I/O
- **Recent Puzzles**: Can implement "history" list

#### Cons
- **Size Limits**: 5-10MB per origin (varies by browser)
  - With base64 images, could hit limits quickly
  - ~3-7 puzzles with 1MB images
- **Not Portable**: Tied to single browser/device
- **Data Loss Risk**: User clearing browser data loses everything
- **Single User**: Doesn't work for sharing
- **Security**: Accessible to all scripts on domain
- **No Sync**: Doesn't transfer between devices

### Option 3: IndexedDB

**Implementation**:
```typescript
async function savePuzzleState(state: PageState): Promise<void> {
  const db = await openDB('puzzleGenerator', 1, {
    upgrade(db) {
      db.createObjectStore('puzzles', { keyPath: 'id' });
    },
  });

  await db.put('puzzles', {
    id: 'current',
    timestamp: Date.now(),
    data: createSaveData(state),
  });
}

// With background image as Blob (not base64)
async function savePuzzleWithImage(
  state: PageState,
  imageBlob?: Blob
): Promise<void> {
  const db = await openDB('puzzleGenerator', 1);
  await db.put('puzzles', {
    id: 'current',
    timestamp: Date.now(),
    data: createSaveData(state),
    backgroundImage: imageBlob,  // Store as Blob, not base64
  });
}
```

#### Pros
- **Large Storage**: ~50% of available disk space (hundreds of MB+)
- **Structured Data**: Store Blobs natively (no base64 conversion)
- **Better Performance**: Async, doesn't block UI
- **Multiple Puzzles**: Natural key-value store
- **Transactions**: Atomic operations
- **Size Efficient**: Store images as Blobs (~25% smaller than base64)

#### Cons
- **More Complex**: Requires library (e.g., idb) or verbose API
- **Still Not Portable**: Same device/browser limitation
- **Data Loss Risk**: Same as localStorage
- **Overkill**: For simple single-state save, localStorage is simpler

### Option 4: Hybrid Approach

**Implementation Strategy**:
1. **Auto-save to LocalStorage**: Persist current state on changes
2. **Manual Export**: "Download" button → JSON file
3. **Manual Import**: "Upload" button → Restore from JSON
4. **Background Images**: Optional checkbox on export

```typescript
// Auto-save (debounced)
const debouncedSave = debounce((state: PageState) => {
  localStorage.setItem('puzzleGenerator:autoSave', JSON.stringify(
    createSaveData(state, { includeBackground: false })
  ));
}, 1000);

// On every state change:
debouncedSave(state);

// Manual export UI:
<button onclick={() => exportToFile(state, {
  includeBackground: state.exportIncludeBackground
})}>
  Download Puzzle
</button>

<label>
  <input type="checkbox"
    checked={state.exportIncludeBackground}
    onchange={...} />
  Include background image (larger file)
</label>
```

#### Pros
- **Best of Both**: Auto-save convenience + portability
- **User Choice**: Background image optional on export
- **Resilience**: Multiple backup paths
- **Flexibility**: Different workflows for different needs

#### Cons
- **Implementation Complexity**: Two systems to maintain
- **Potential Confusion**: Multiple sources of truth
- **Sync Issues**: Auto-save vs manual save could diverge

## Recommendations

### Recommended Approach: Hybrid (Option 4)

**Primary: LocalStorage Auto-Save**
- Auto-save current state on every change (debounced 1-2 seconds)
- Restore on page load (with "New Puzzle" button to clear)
- **Configs only**: generators, seed, custom pieces, dimensions, visual settings
- **Exclude** background images (too large, 5-10MB quota)
- **Exclude** geometry (vertices, edges, topology - regenerate from configs)
- File size: ~1-5 KB per save

**Secondary: File Export/Import**
- "Download Puzzle" button → JSON file
- **Phase 1**: Configs only (same as auto-save)
- **Phase 2**: Optional checkboxes:
  - "Include background image as base64" (unchecked by default)
  - "Include puzzle geometry" (preserves vertex edits) (unchecked by default)
- "Load Puzzle" button → File picker → Restore state
- Support for drag-and-drop JSON files
- File size: 1-5 KB (configs), 30-60 KB (with geometry), 1-5 MB (with background)

**Manual Modifications**:
- **Seed Points**: "Edit Seed Points" mode (Phase 2) - see section 6
  - Explicit mode toggle
  - Persists edited points in both auto-save and file export
- **Vertices**: Selective geometry inclusion (Phase 2) - see section 7
  - File downloads can optionally include full geometry
  - Auto-save excludes geometry (acceptable tradeoff)
  - Current "edits lost on regeneration" behavior is reasonable for now

### Generator Config Introspection

**Key Insight**: Generator configs are introspectively serializable - the save system doesn't need to know about specific generator properties.

**How It Works**:
1. All `GeneratorConfig` objects extend the base interface with `[key: string]: unknown`
2. Simply serialize the entire config object: `JSON.stringify(state.generators.point.config)`
3. On load, merge with current defaults to handle missing/new properties

**Implementation**:
```typescript
// Save - completely generic
function saveGeneratorConfigs(state: PageState) {
  return {
    point: state.generators.point.config,
    piece: state.generators.piece.config,
    placement: state.generators.placement.config,
    tab: state.generators.tab.config,
  };
}

// Load - merge with defaults
function loadGeneratorConfig(
  savedConfig: GeneratorConfig,
  registry: GeneratorRegistry<unknown>
): GeneratorConfig {
  // Check if generator exists
  const metadata = registry.getUIMetadata(savedConfig.name);
  if (!metadata) {
    console.warn(`Generator "${savedConfig.name}" not found`);
    const fallback = registry.getAvailableGenerators()[0];
    return registry.getDefaultConfig(fallback.name);
  }

  // Merge: defaults provide new properties, saved values override existing
  const defaults = registry.getDefaultConfig(savedConfig.name);
  return { ...defaults, ...savedConfig };
}
```

**Benefits**:
- **Zero Maintenance**: Adding properties to generators requires no save/load changes
- **Forward Compatible**: New properties automatically get defaults
- **Backward Compatible**: Old save files work with new generators (merge adds defaults)
- **Generator Independence**: Save system is completely decoupled from generator internals

**Example Evolution**:
```typescript
// Generator v1.0 save file
{"name": "TraditionalTabGenerator", "jitter": 50}

// Generator v1.1 adds "smoothness" property with default 0.5
// Load automatically produces:
{"name": "TraditionalTabGenerator", "jitter": 50, "smoothness": 0.5}

// Generator v2.0 removes "jitter", adds "variance"
// Old saves still load (extra properties ignored):
{"name": "TraditionalTabGenerator", "variance": 0.3}  // jitter discarded
```

### File Format Specification

**Version 1.0 Schema**:
```typescript
interface PuzzleSaveFile {
  // Metadata
  version: string;                    // "1.0.0"
  created: string;                    // ISO-8601 timestamp
  appVersion?: string;                // Puzzle generator version

  // Puzzle Configuration
  puzzle: {
    // Global Options
    seed: number;
    dimensions: {
      width: number;
      height: number;
    };
    pieceSize: number;

    // Visual Settings
    visual: {
      color: string;
      drawPoints: boolean;
      pointColor: string;
    };

    // Border
    border: {
      shape: 'rectangle' | 'circle' | 'ellipse' | 'rounded-rect';
      cornerRadius?: number;
    };

    // Generators
    generators: {
      point: GeneratorConfig;
      piece: GeneratorConfig;
      placement: GeneratorConfig;
      tab: GeneratorConfig;
    };

    // Custom Pieces
    customPieces: CustomPiece[];

    // Optional Features
    seedPointMode?: 'generate' | 'edit';  // Defaults to 'generate' if omitted
    editedSeedPoints?: Array<[number, number]>;  // Only used when mode is 'edit'
    backgroundImage?: string;          // base64 data URL
    backgroundImageName?: string;

    // Optional: Complete Geometry (file downloads only, not auto-save)
    // Preserves vertex edits and exact puzzle state
    // See section 7 for detailed discussion
    geometry?: {
      vertices: Vertex[];
      pieces: Array<[PieceID, Piece]>;     // Converted from Map
      edges: Array<[EdgeID, Edge]>;        // Converted from Map
      halfEdges: Array<[HalfEdgeID, HalfEdge]>;  // Converted from Map
      boundary: EdgeID[];
    };
  };
}
```

### Implementation Phases

**Phase 1: Core Save/Load (Essential)**
- LocalStorage auto-save (configs only, exclude background & geometry)
- File download (configs only initially)
- File upload with restoration
- Restore all generator configs
- Restore custom pieces
- UI: "Download" and "Load" buttons
- Validation on load (check generator names exist, merge with defaults)

**Phase 2: Enhanced Features (Nice-to-Have)**
- **Geometry inclusion in file downloads** (preserves vertex edits) - see section 7
- Optional background image in export (checkbox)
- "Edit Seed Points" mode with persistence (see section 6)
- "Recent Puzzles" list in UI (from localStorage)

**Phase 3: Advanced Features (Future)**
- Puzzle library UI (manage multiple saved puzzles)
- Export to different formats (SVG with embedded config)
- Cloud sync (requires backend)
- Share via URL (requires backend or large URL encoding)

### Migration Strategy

**Versioning**:
- Include `version` field in save format
- Allow future schema changes with migration functions:
```typescript
function migrateSaveData(data: any): PuzzleSaveFile {
  if (!data.version) {
    // Migrate from pre-versioned format
    return migrateV0toV1(data);
  }
  if (data.version === "1.0.0") {
    return data;
  }
  // Future migrations...
}
```

**Generator Changes**:
- If a generator name in save file doesn't exist, fall back to first available
- Warn user: "Generator 'FooGenerator' not found, using 'BarGenerator' instead"
- If config properties don't exist, use defaults from UI metadata

### Background Image Decision Matrix

| Use Case | Include in Save? | Reasoning |
|----------|------------------|-----------|
| **Auto-Save (LocalStorage)** | No | Too large, fills quota quickly |
| **File Export (Default)** | No | Keep files small and portable |
| **File Export (Optional)** | Yes (checkbox) | User choice for archival |
| **Sharing Puzzles** | Depends | Usually no; let recipient provide their own image |
| **Archival** | Yes | Complete snapshot |

**Recommended Default**: Exclude background images
- Most users treat background as temporary visual aid
- Dramatically reduces file size (1KB vs 1MB+)
- Easier sharing and version control
- User can re-upload if needed
- Dimensions are saved, so correct image can be validated

**When to Include**:
- User explicitly checks "Include background image" on export
- Archival/"freeze this exact puzzle" workflow
- Tutorial/example puzzles for distribution

### Edge Cases and Validation

**On Load, Validate**:
1. **Generator Existence**: All referenced generators are registered
   - Fallback: Use first available generator of that type
   - Warn user in UI
2. **Config Schema**: All required config properties exist
   - Fallback: Use defaults from UI metadata
3. **Dimensions**: If background image provided, validate dimensions match
   - Error: "Background image dimensions don't match saved puzzle dimensions"
4. **Custom Piece IDs**: No duplicate IDs
   - Fix: Regenerate IDs on load
5. **Version Compatibility**: Support migration from older versions

**Error Handling**:
```typescript
interface LoadResult {
  success: boolean;
  warnings: string[];
  errors: string[];
  data?: PuzzleSaveFile;
}

function loadPuzzleFile(jsonString: string): LoadResult {
  const result: LoadResult = {
    success: false,
    warnings: [],
    errors: [],
  };

  try {
    const data = JSON.parse(jsonString);
    const migrated = migrateSaveData(data);

    // Validate generators
    if (!PointGeneratorRegistry.has(migrated.puzzle.generators.point.name)) {
      result.warnings.push(`Point generator '${migrated.puzzle.generators.point.name}' not found`);
      // Use fallback
    }

    result.success = true;
    result.data = migrated;
  } catch (e) {
    result.errors.push(`Failed to parse file: ${e.message}`);
  }

  return result;
}
```

## Summary

**Recommended Implementation**:

*Phase 1 - Core Save/Load*:
1. **LocalStorage auto-save**: Configs only (generators, seed, custom pieces, dimensions)
2. **File download**: JSON export (configs only initially)
3. **File upload**: Restore from JSON with validation and defaults merging
4. **Generator introspection**: Fully automatic, zero maintenance for new generator properties
5. **Version field**: Enable future migrations
6. **Validation**: Graceful degradation for missing generators

*Phase 2 - Enhanced Features*:
7. **Optional geometry in file exports**: Checkbox to include full puzzle geometry (preserves vertex edits)
8. **Optional background in file exports**: Checkbox to include base64 background image
9. **Edit Seed Points mode**: Explicit mode toggle for persistent seed point editing
10. **Recent Puzzles list**: UI for managing multiple saved puzzles from localStorage

**Estimated Impact**:
- **LocalStorage auto-save**: 1-5 KB (configs only, fits quota easily)
- **File download (config-only)**: 1-5 KB (Phase 1)
- **File download (with geometry)**: 30-60 KB for 100-piece puzzle (Phase 2)
- **File download (with background)**: 1-5 MB depending on image (Phase 2)
- **Implementation Effort**: ~2-3 days for Phase 1, ~3-5 days total for Phase 2

**Key Design Decisions**:
- **Auto-save excludes geometry**: Regenerate from configs on reload (acceptable tradeoff)
- **File exports can include geometry**: User choice via checkbox (preserves vertex edits when needed)
- **Background images optional**: Default unchecked to keep files small
- **Edit modes explicit**: Separate "Edit Seed Points" mode with clear UI affordances
- **Generator independence**: Save system completely decoupled from generator implementations

This approach balances user convenience (auto-save), portability (file export), flexibility (optional inclusions), and performance (small auto-saves) while maintaining the project's static SPA architecture.
