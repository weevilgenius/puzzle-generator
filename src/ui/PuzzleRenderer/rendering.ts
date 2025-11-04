/**
 * Rendering logic for PuzzleRenderer component using Paper.js
 */

import { createPaperContext, assertPaperReady, withPaper } from '../../utils/paperScope';
import {
  drawPuzzleWithPaper,
  drawSeedPoints,
  drawProblems,
} from '../../geometry/PuzzleRenderer';
import type { PuzzleGeometry, CustomPiece, PathCommand } from '../../geometry/types';
import type { PuzzleRendererState } from './constants';
import { measureSync } from '../../utils/performance';

/**
 * Initialize Paper.js on a canvas element with an isolated scope
 */
export function initializePaper(
  canvas: HTMLCanvasElement,
  width: number,
  height: number,
  state: PuzzleRendererState
): void {
  // Create an isolated Paper.js scope for this renderer
  state.paperCtx = createPaperContext(canvas, width, height);

  // Verify context was created successfully
  if (!state.paperCtx) {
    console.error('PuzzleRenderer: Failed to create Paper.js context');
  }
}

/**
 * Render the puzzle geometry using Paper.js
 */
export function renderPuzzle(
  state: PuzzleRendererState,
  puzzle: PuzzleGeometry,
  color: string,
  pointColor?: string
): void {
  // Use this renderer's isolated Paper.js scope
  if (!state.paperCtx) {
    console.error('PuzzleRenderer: Cannot render - Paper.js context not initialized');
    return;
  }

  measureSync('Paper.js Rendering', () => {
    withPaper(state.paperCtx!, 'PuzzleRenderer:renderPuzzle', () => {
      const paperScope = state.paperCtx!.scope;

      // Check if Paper.js is ready before creating objects
      if (!assertPaperReady(paperScope, 'PuzzleRenderer:renderPuzzle')) {
        console.error('PuzzleRenderer: Paper.js not ready - canvas may have been replaced');
        return;
      }

      // Activate puzzle layer for rendering procedural pieces
      if (state.puzzleLayer) {
        state.puzzleLayer.activate();
      }

      // Remove existing path if present
      if (state.paperPath) {
        state.paperPath.remove();
        state.paperPath = null;
      }

      // Draw the puzzle edges using this scope's context
      state.paperPath = drawPuzzleWithPaper(puzzle, color, state.paperCtx!);

      // Activate vertices layer and create/update vertex circles
      if (state.verticesLayer) {
        state.verticesLayer.activate();
      }
      createVertexItems(puzzle, state);

      // Activate seed points layer and draw seed points if enabled
      if (state.seedPointsLayer) {
        state.seedPointsLayer.activate();
      }
      if (state.seedPointItems && state.paperCtx) {
        drawSeedPoints(puzzle, state.seedPointItems, pointColor, state.paperCtx);
      }

      // Activate problems layer and draw problem indicators if present
      if (state.problemsLayer) {
        state.problemsLayer.activate();
      }
      if (state.problemItems && state.paperCtx) {
        drawProblems(puzzle, state.problemItems, state.paperCtx);
      }

      // Explicitly trigger an update on the isolated scope's view
      paperScope.view.update();
    });
  });
}

/**
 * Create Paper.js layer architecture for different visual elements
 *
 * LAYER ARCHITECTURE (rendering order from bottom to top):
 * =========================================================
 *
 * 1. puzzleLayer
 *    - Contains the procedurally generated puzzle pieces and border
 *    - Contains backgroundRaster (if user uploaded an image)
 *    - Contains paperPath group: border outline and all piece path segments
 *    - Rendered first so puzzle appears behind all other elements
 *
 * 2. customPiecesLayer
 *    - Contains custom pieces (whimsies) overlaid on the puzzle
 *    - Each custom piece is rendered as a Path with applied transforms
 *    - Selected pieces are highlighted with blue stroke and thicker line
 *    - Unselected pieces match puzzle styling (no fill, same color/stroke)
 *
 * 3. customHandlesLayer
 *    - Contains transform handles for the currently selected custom piece
 *    - Includes bounding box (dashed blue rectangle)
 *    - Includes 4 corner scale handles (white circles with blue stroke)
 *    - Includes rotation handle (circle above top center, connected by dashed line)
 *    - All handles rotate with the piece but maintain constant visual size
 *    - Cleared when no custom piece is selected
 *
 * 4. seedPointsLayer
 *    - Contains seedPointItems group with seed point indicators
 *    - Seed points mark the centers of procedurally generated pieces
 *    - Only visible when pointColor is specified
 *
 * 5. verticesLayer
 *    - Contains vertexItems group with vertex circles
 *    - Vertices are the control points on piece edges
 *    - Shown on hover when in vertex editing mode
 *
 * 6. problemsLayer
 *    - Contains problemItems group with problem indicators
 *    - Highlights geometry issues detected by the problem checker
 *    - Rendered on top so issues are always visible
 */
export function createPaperLayers(state: PuzzleRendererState): void {
  // Use this renderer's isolated Paper.js scope
  if (!state.paperCtx) {
    console.error('PuzzleRenderer: Cannot create layers - Paper.js context not initialized');
    return;
  }

  withPaper(state.paperCtx, 'PuzzleRenderer:createPaperLayers', () => {
    const paperScope = state.paperCtx!.scope;

    // Check if Paper.js is ready before creating objects
    if (!assertPaperReady(paperScope, 'PuzzleRenderer:createPaperLayers')) {
      console.error('PuzzleRenderer: Paper.js not ready - canvas may have been replaced');
      return;
    }

    // Create layers in bottom-to-top order
    state.puzzleLayer = new paperScope.Layer();
    state.customPiecesLayer = new paperScope.Layer();
    state.customHandlesLayer = new paperScope.Layer();
    state.seedPointsLayer = new paperScope.Layer();
    state.verticesLayer = new paperScope.Layer();
    state.problemsLayer = new paperScope.Layer();

    // Create groups within their respective layers
    state.puzzleLayer.activate();
    state.backgroundRaster = null;
    state.paperPath = null;

    state.seedPointsLayer.activate();
    state.seedPointItems = new paperScope.Group();

    state.problemsLayer.activate();
    state.problemItems = new paperScope.Group();

    state.verticesLayer.activate();
    state.vertexItems = new paperScope.Group();

    // Activate puzzle layer by default for rendering
    state.puzzleLayer.activate();
  });
}

/**
 * Update the background image raster
 * @param state - The PuzzleRenderer state
 * @param imageUrl - The image URL to display, or undefined to remove
 * @param width - The canvas width
 * @param height - The canvas height
 */
export function updateBackgroundImage(
  state: PuzzleRendererState,
  imageUrl: string | undefined,
  width: number,
  height: number
): void {
  // Use this renderer's isolated Paper.js scope
  if (!state.paperCtx) {
    console.error('PuzzleRenderer: Cannot update background - Paper.js context not initialized');
    return;
  }

  withPaper(state.paperCtx, 'PuzzleRenderer:updateBackgroundImage', () => {
    const paperScope = state.paperCtx!.scope;

    // Activate puzzle layer for background image
    if (state.puzzleLayer) {
      state.puzzleLayer.activate();
    }

    // Remove existing background raster
    if (state.backgroundRaster) {
      state.backgroundRaster.remove();
      state.backgroundRaster = null;
    }

    // Create new background raster if imageUrl is provided
    if (imageUrl) {
      const raster = new paperScope.Raster(imageUrl);

      // Position at center of view
      raster.position = new paperScope.Point(width / 2, height / 2);

      // Scale to fit the canvas size
      raster.onLoad = () => {
        if (raster.width && raster.height) {
          const scaleX = width / raster.width;
          const scaleY = height / raster.height;
          raster.scale(scaleX, scaleY);
        }
      };

      // Send to back within puzzle layer
      raster.sendToBack();

      state.backgroundRaster = raster;
    }
  });
}

/**
 * Get a Set of all vertex indices that lie on boundary edges
 * (half-edges with twin === -1)
 */
export function getBoundaryEdgeVertexIds(puzzle: PuzzleGeometry): Set<number> {
  const boundaryVertexIds = new Set<number>();

  // Find all half-edges on the boundary (twin === -1)
  for (const halfEdge of puzzle.halfEdges.values()) {
    if (halfEdge.twin === -1) {
      // Find the index of this vertex
      const vertexIndex = puzzle.vertices.findIndex(
        (v) => v[0] === halfEdge.origin[0] && v[1] === halfEdge.origin[1]
      );
      if (vertexIndex >= 0) {
        boundaryVertexIds.add(vertexIndex);
      }
    }
  }

  return boundaryVertexIds;
}

/**
 * Create vertex circles for interactive dragging
 * Vertices are hidden by default and shown on hover
 * Excludes boundary edge vertices (not draggable)
 */
export function createVertexItems(
  puzzle: PuzzleGeometry,
  state: PuzzleRendererState
): void {
  if (!state.vertexItems || !state.paperCtx) return;

  // Scope is already activated by caller (renderPuzzle via withPaper)
  const paperScope = state.paperCtx.scope;

  // Clear existing vertex items
  state.vertexItems.removeChildren();

  // Get all vertices that lie on boundary edges
  const boundaryVertexIds = getBoundaryEdgeVertexIds(puzzle);

  // Create a circle for each non-boundary vertex
  for (let i = 0; i < puzzle.vertices.length; i++) {
    // Skip boundary edge vertices - they should not be draggable
    if (boundaryVertexIds.has(i)) continue;

    const [x, y] = puzzle.vertices[i];
    const circle = new paperScope.Path.Circle(new paperScope.Point(x, y), 4);
    circle.fillColor = new paperScope.Color('#4363d8');
    circle.strokeColor = new paperScope.Color('#ffffff');
    circle.strokeWidth = 1;
    circle.visible = false; // Hidden by default, shown on hover
    // Store vertex ID in data for hit testing
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    circle.data.vertexId = i;
    state.vertexItems.addChild(circle);
  }
}

/**
 * Converts a PathCommand array to a Paper.js path
 */
function pathCommandsToPath(
  commands: PathCommand[],
  paperScope: paper.PaperScope
): paper.Path {
  const path = new paperScope.Path();

  for (const command of commands) {
    switch (command.type) {
    case 'move':
      path.moveTo(new paperScope.Point(command.p[0], command.p[1]));
      break;
    case 'line':
      path.lineTo(new paperScope.Point(command.p[0], command.p[1]));
      break;
    case 'bezier':
      path.cubicCurveTo(
        new paperScope.Point(command.p1[0], command.p1[1]),
        new paperScope.Point(command.p2[0], command.p2[1]),
        new paperScope.Point(command.p3[0], command.p3[1])
      );
      break;
    case 'arc':
      // For arcs, we'll use lineTo as a simplified approximation
      // A more sophisticated implementation would compute the arc properly
      path.lineTo(new paperScope.Point(command.p[0], command.p[1]));
      break;
    }
  }

  return path;
}

/**
 * Render custom pieces on the custom pieces layer
 */
export function renderCustomPieces(
  state: PuzzleRendererState,
  customPieces: CustomPiece[],
  color: string,
  selectedCustomPieceId?: string | null
): void {
  if (!state.paperCtx || !state.customPiecesLayer) {
    return;
  }

  withPaper(state.paperCtx, 'PuzzleRenderer:renderCustomPieces', () => {
    const paperScope = state.paperCtx!.scope;

    // Activate custom pieces layer
    state.customPiecesLayer!.activate();

    // Clear existing custom pieces
    state.customPiecesLayer!.removeChildren();

    // Render each custom piece
    for (const customPiece of customPieces) {
      // Convert path commands to Paper.js path
      const path = pathCommandsToPath(customPiece.path, paperScope);

      // Apply transform to match exactly what handle rendering does:
      // 1. Center path at origin
      // 2. Apply scale, rotation, translation via matrix
      const { position, rotation, scale } = customPiece.transform;

      // Center the path at origin (same as handle rendering does with tempPath)
      path.position = new paperScope.Point(0, 0);

      // Build transformation matrix to apply: scale, then rotate, then translate
      // Paper.js uses post-multiplication: matrix.op() does matrix = matrix * op
      // To get final matrix T * R * S, we apply operations in reverse order
      const matrix = new paperScope.Matrix();

      // Apply in reverse: translate, rotate, scale
      // This builds: matrix = T * R * S
      matrix.translate(new paperScope.Point(position[0], position[1]));
      matrix.rotate(rotation * (180 / Math.PI), new paperScope.Point(0, 0));
      matrix.scale(scale[0], scale[1], new paperScope.Point(0, 0));

      // Apply the transformation matrix to the centered path
      path.transform(matrix);

      // Set styling
      const isSelected = customPiece.id === selectedCustomPieceId;
      if (isSelected) {
        // Selected: blue fill with transparency and blue stroke
        path.fillColor = new paperScope.Color(0, 0.5, 1, 0.3);
        path.strokeColor = new paperScope.Color(0, 0.5, 1);
        path.strokeWidth = 2;
      } else {
        // Unselected: same styling as main puzzle (no fill, same color and stroke width)
        path.fillColor = null;
        path.strokeColor = new paperScope.Color(color);
        path.strokeWidth = 1;
      }

      // Store custom piece ID in path data for hit testing
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      path.data.customPieceId = customPiece.id;
    }
  });
}

/**
 * Render transform handles for a selected custom piece
 */
export function renderCustomPieceHandles(
  state: PuzzleRendererState,
  customPiece: CustomPiece
): void {
  if (!state.paperCtx || !state.customHandlesLayer) {
    return;
  }

  withPaper(state.paperCtx, 'PuzzleRenderer:renderCustomPieceHandles', () => {
    const paperScope = state.paperCtx!.scope;

    // Activate custom handles layer
    state.customHandlesLayer!.activate();

    // Clear existing handles
    state.customHandlesLayer!.removeChildren();

    // Create a temporary path to get the unscaled, unrotated bounds
    const tempPath = pathCommandsToPath(customPiece.path, paperScope);
    tempPath.position = new paperScope.Point(0, 0);
    const baseBounds = tempPath.bounds;
    tempPath.remove(); // Clean up temporary path

    const { scale, rotation, position } = customPiece.transform;

    // Transform corners manually to match exactly what Paper.js does for the piece:
    // 1. Path is centered at (0, 0)
    // 2. Scale is applied
    // 3. Rotation is applied
    // 4. Position is set to final location
    const corners = [
      baseBounds.topLeft,
      baseBounds.topRight,
      baseBounds.bottomRight,
      baseBounds.bottomLeft,
    ];

    const transformedCorners = corners.map((corner) => {
      // Apply scale
      const scaledX = corner.x * scale[0];
      const scaledY = corner.y * scale[1];

      // Apply rotation
      const cos = Math.cos(rotation);
      const sin = Math.sin(rotation);
      const rotatedX = scaledX * cos - scaledY * sin;
      const rotatedY = scaledX * sin + scaledY * cos;

      // Apply translation
      return new paperScope.Point(
        rotatedX + position[0],
        rotatedY + position[1]
      );
    });

    // Draw circumscribed circle around the bounding box
    // The circle is centered at the piece position and passes through all corners
    // const center = new paperScope.Point(position[0], position[1]);
    // const radius = center.getDistance(transformedCorners[0]); // radius is distance from center to any corner
    // const circumscribedCircle = new paperScope.Path.Circle(center, radius);
    // circumscribedCircle.strokeColor = new paperScope.Color(0, 0.5, 1, 1); // Blue with transparency
    // circumscribedCircle.strokeWidth = 1;
    // circumscribedCircle.dashArray = [2, 4]; // Dotted line
    // circumscribedCircle.fillColor = null;
    // // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    // circumscribedCircle.data.handleType = 'circumscribed-circle';
    // state.customHandlesLayer!.addChild(circumscribedCircle);

    // Draw bounding box connecting the transformed corners
    const bbox = new paperScope.Path();
    bbox.moveTo(transformedCorners[0]);
    bbox.lineTo(transformedCorners[1]);
    bbox.lineTo(transformedCorners[2]);
    bbox.lineTo(transformedCorners[3]);
    bbox.closePath();
    bbox.strokeColor = new paperScope.Color(0, 0.5, 1); // Blue
    bbox.strokeWidth = 1;
    bbox.dashArray = [4, 4]; // Dashed line
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    bbox.data.handleType = 'bbox';
    state.customHandlesLayer!.addChild(bbox);

    // Draw corner scale handles with constant size
    const handleRadius = 4;
    const cornerTypes = ['nw', 'ne', 'se', 'sw'];

    transformedCorners.forEach((corner, index) => {
      const handle = new paperScope.Path.Circle(corner, handleRadius);
      handle.fillColor = new paperScope.Color(1, 1, 1); // White fill
      handle.strokeColor = new paperScope.Color(0, 0.5, 1); // Blue stroke
      handle.strokeWidth = 2;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      handle.data.handleType = 'scale';
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      handle.data.corner = cornerTypes[index];
      state.customHandlesLayer!.addChild(handle);
    });

    // Draw rotation handle (above center top)
    const rotationHandleDistance = 40;
    const centerTop = new paperScope.Point(baseBounds.center.x, baseBounds.top);

    // Transform the center top point the same way as the corners
    const scaledCenterTopX = centerTop.x * scale[0];
    const scaledCenterTopY = centerTop.y * scale[1];
    const cos = Math.cos(rotation);
    const sin = Math.sin(rotation);
    const rotatedCenterTopX = scaledCenterTopX * cos - scaledCenterTopY * sin;
    const rotatedCenterTopY = scaledCenterTopX * sin + scaledCenterTopY * cos;
    const rotationHandleBase = new paperScope.Point(
      rotatedCenterTopX + position[0],
      rotatedCenterTopY + position[1]
    );

    // Rotation handle position is along the rotated "up" direction (no scaling)
    const offsetX = 0;
    const offsetY = -rotationHandleDistance;
    const rotatedOffsetX = offsetX * cos - offsetY * sin;
    const rotatedOffsetY = offsetX * sin + offsetY * cos;

    const rotationHandlePos = new paperScope.Point(
      rotationHandleBase.x + rotatedOffsetX,
      rotationHandleBase.y + rotatedOffsetY
    );

    // Line from center top to rotation handle (dashed like the bounding box)
    const rotationLine = new paperScope.Path.Line(rotationHandleBase, rotationHandlePos);
    rotationLine.strokeColor = new paperScope.Color(0, 0.5, 1);
    rotationLine.strokeWidth = 1;
    rotationLine.dashArray = [4, 4]; // Dashed line
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    rotationLine.data.handleType = 'rotation-line';
    state.customHandlesLayer!.addChild(rotationLine);

    // Rotation handle circle with constant size
    const rotationHandle = new paperScope.Path.Circle(rotationHandlePos, handleRadius);
    rotationHandle.fillColor = new paperScope.Color(1, 1, 1);
    rotationHandle.strokeColor = new paperScope.Color(0, 0.5, 1);
    rotationHandle.strokeWidth = 2;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    rotationHandle.data.handleType = 'rotation';
    state.customHandlesLayer!.addChild(rotationHandle);
  });
}

/**
 * Clear transform handles
 */
export function clearCustomPieceHandles(state: PuzzleRendererState): void {
  if (state.customHandlesLayer) {
    state.customHandlesLayer.removeChildren();
  }
}

/**
 * Clean up Paper.js resources
 */
export function cleanupPaper(state: PuzzleRendererState): void {
  if (state.backgroundRaster) {
    state.backgroundRaster.remove();
    state.backgroundRaster = null;
  }
  if (state.paperPath) {
    state.paperPath.remove();
    state.paperPath = null;
  }
  if (state.seedPointItems) {
    state.seedPointItems.remove();
    state.seedPointItems = null;
  }
  if (state.problemItems) {
    state.problemItems.remove();
    state.problemItems = null;
  }
  if (state.vertexItems) {
    state.vertexItems.remove();
    state.vertexItems = null;
  }

  // Clean up layers
  if (state.puzzleLayer) {
    state.puzzleLayer.remove();
    state.puzzleLayer = null;
  }
  if (state.customPiecesLayer) {
    state.customPiecesLayer.remove();
    state.customPiecesLayer = null;
  }
  if (state.customHandlesLayer) {
    state.customHandlesLayer.remove();
    state.customHandlesLayer = null;
  }
  if (state.seedPointsLayer) {
    state.seedPointsLayer.remove();
    state.seedPointsLayer = null;
  }
  if (state.verticesLayer) {
    state.verticesLayer.remove();
    state.verticesLayer = null;
  }
  if (state.problemsLayer) {
    state.problemsLayer.remove();
    state.problemsLayer = null;
  }

  // Remove the Paper.js project
  if (state.paperCtx) {
    state.paperCtx.scope.project.remove();
  }
}
