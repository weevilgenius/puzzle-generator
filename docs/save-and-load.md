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

#### 6. Manual Seed Point Modifications

**Current Behavior** (`src/geometry/PuzzleMaker.ts:130-163`):
- User drags seed point in UI → triggers full rebuild
- Modified positions stored in `puzzle.seedPoints` array
- **Does NOT persist** in separate state
- Lost when regenerating puzzle (e.g., changing generator config)

**Storage Options**:

**A) Save Modified Seed Points**
```typescript
{
  seedPointOverrides?: {
    [pieceId: string]: [x, y]  // Only store modified points
  }
}
```
- Small storage footprint
- Preserves user intent
- Apply on load: generate points, then apply overrides

**B) Save All Final Seed Points**
```typescript
{
  seedPoints: Array<[x, y]>     // Complete array from puzzle.seedPoints
}
```
- Captures exact state
- Bypasses point generator on load
- Larger storage, but complete

**C) No Storage**
- Treat manual edits as temporary
- Lost on save/load (same as current regeneration behavior)
- Simpler implementation

#### 7. Manual Vertex Modifications

**Current Status**: Not yet implemented in UI
- PuzzleRenderer supports vertex dragging visually
- No callback to persist changes
- Would require similar approach to seed points

**Recommendation**: Defer until feature is implemented

### Not Required

The following state does NOT need to be saved:

- **Generated Geometry** (`puzzle.vertices`, `puzzle.pieces`, `puzzle.halfEdges`)
  - Can be regenerated from seed + configs
  - Very large (complete half-edge data structure)
  - Would bloat save files significantly

- **UI State** (`dirty`, `geometryProblems`, `customPieceEditorOpen`, etc.)
  - Transient view state
  - Reset on load

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
- **Exclude** background images from auto-save (too large)
- **Include** everything else: generators, seed, custom pieces

**Secondary: File Export/Import**
- "Download Puzzle" button → JSON file with all settings
- Checkbox: "Include background image as base64" (unchecked by default)
- "Load Puzzle" button → File picker → Restore state
- Support for drag-and-drop JSON files

**Manual Modifications**:
- **Recommended**: Save modified seed points
  - Store only overrides (delta from generated points)
  - Small storage footprint
  - Preserves user intent
- **Alternative**: Save all final seed points if override tracking is complex

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

    // Optional
    seedPointOverrides?: Record<string, [number, number]>;
    backgroundImage?: string;          // base64 data URL
    backgroundImageName?: string;
  };
}
```

### Implementation Phases

**Phase 1: Core Save/Load (Essential)**
- LocalStorage auto-save (exclude background)
- File download/upload (exclude background)
- Restore all generator configs
- Restore custom pieces
- UI: "Download" and "Load" buttons

**Phase 2: Enhanced Features (Nice-to-Have)**
- Optional background image in export (checkbox)
- Seed point override tracking and restoration
- "Recent Puzzles" list in UI (from localStorage)
- Validation on load (check generator names exist)

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
1. **LocalStorage auto-save**: Current state (no background image)
2. **File download**: JSON export with optional base64 background
3. **File upload**: Restore from JSON
4. **Save seed point overrides**: Preserve manual edits
5. **Exclude background by default**: Keep files small
6. **Version field**: Enable future migrations
7. **Validation**: Graceful degradation for missing generators

**Estimated Impact**:
- **File Size (no background)**: 1-5 KB typical
- **File Size (with background)**: 1-5 MB typical (depends on image)
- **LocalStorage Usage**: <10 KB per auto-save
- **Implementation Effort**: ~2-3 days for Phase 1

This approach balances user convenience (auto-save), portability (file export), and flexibility (optional background images) while maintaining the project's static SPA architecture.
