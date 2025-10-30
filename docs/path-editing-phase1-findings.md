# Phase 1 Findings - Paper.js Path Editor Evaluation

**Date**: 2025-10-27

**Objective**: Build a minimal viable editor to validate that Paper.js meets the project's needs for interactive path editing.

---

## Implementation Summary

Successfully implemented a proof-of-concept path editor in `src/pages/TestPage.ts` with the following features:

### Completed Features

✅ **Basic Path Drawing**
- Click to add points (straight line segments)
- Click and drag to add points with bezier handles (smooth curves)
- Path appears in real-time on canvas

✅ **Edit Mode**
- Toggle between Drawing and Editing modes
- Move anchor points by clicking and dragging
- Edit bezier handles by clicking and dragging the control handles
- Visual feedback with Paper.js built-in selection system (fullySelected)

✅ **UI Controls**
- Mode toggle button (Drawing ↔ Editing)
- Clear canvas button
- Context-sensitive instructions based on current mode

✅ **Data Export**
- Display raw Paper.js path data (`path.pathData`)
- Export to SVG format (`path.exportSVG()`)
- Real-time updates as path changes

✅ **Code Quality**
- TypeScript compilation passes (`pnpm exec tsc --noEmit`)
- Linting passes (`pnpm run lint`)
- Build succeeds (`pnpm run build`)

---

## Paper.js Evaluation

### Strengths

1. **Easy Setup**: Simple initialization with `paper.setup(canvas)`
2. **Built-in Tools**: `paper.Tool()` provides mouse/touch event handling out of the box
3. **Path Model**: `paper.Path` with segments, handles, and points is intuitive
4. **Selection Visualization**: `path.fullySelected = true` provides instant visual feedback
5. **SVG Export**: `path.exportSVG()` is straightforward and works well
6. **TypeScript Support**: The `paper` package includes its own type definitions
7. **Canvas Performance**: Smooth rendering with automatic updates

### Limitations Discovered

1. **No `view.draw()` Method**: Paper.js auto-updates the view when items change, which is good for performance but means we can't force immediate redraws. This turned out to be fine in practice.

2. **Handle Detection**: Had to implement custom logic to detect clicks on bezier handles (checking distance from handle points). Paper.js doesn't provide built-in handle hit testing.

3. **Drawing UX**: The current implementation is basic:
   - Drawing curves requires dragging while adding points
   - No dedicated "smooth curve" tool like in Illustrator/Figma
   - Would benefit from post-creation handle adjustment

### Improvements Made

1. **Symmetric Bezier Handles** (Post-Initial Implementation):
   - Updated curve creation to generate both `handleIn` and `handleOut` symmetrically
   - When dragging to create a curve, both control points are now visible in edit mode
   - Creates smoother, more professional-looking curves similar to Illustrator/Figma
   - Previous segments also get proper handle pairs for smooth continuity

### Areas for Improvement (Future Phases)

1. **Better Drawing Experience**:
   - Implement a pen tool that adds handles after the point is placed
   - Add support for closing paths (connecting first and last points)
   - Implement click-and-release-to-add-handle workflow

2. **More Editing Features**:
   - Delete points (delete key or right-click)
   - Convert point types (smooth ↔ corner)
   - Select multiple points
   - Keyboard shortcuts (escape, delete, etc.)

3. **Visual Enhancements**:
   - Larger hit areas for handles
   - Different colors for selected vs unselected elements
   - Grid/snap-to-grid
   - Zoom and pan

---

## PathCommand Integration Assessment

Paper.js path data can be converted to the existing `PathCommand` type system:

### Paper.js Path Structure

```typescript
path.segments[i] = {
  point: { x, y },           // Anchor point
  handleIn: { x, y },        // Control point before anchor
  handleOut: { x, y },       // Control point after anchor
}
```

### Conversion Strategy

- First segment → `MoveTo` command
- Segments with zero-length handles → `LineTo` commands
- Segments with non-zero handles → `CurveTo` commands (cubic bezier)
- Paper.js uses relative handles (offsets from anchor point), will need conversion to absolute coordinates

### SVG Export

Paper.js exports clean SVG path data:
```xml
<path d="M x,y L x,y C x1,y1 x2,y2 x,y ..." />
```

This can be parsed to extract commands or used directly in some contexts.

---

## Success Criteria Evaluation

| Criterion | Status | Notes |
|-----------|--------|-------|
| Can draw paths with mix of lines and bezier curves | ✅ Pass | Works well, drag-to-add-curve is functional |
| Can edit anchor points and control handles intuitively | ✅ Pass | Editing works, though handle hit detection could be improved |
| Can export to SVG path data | ✅ Pass | `exportSVG()` works perfectly |
| Touch events work on mobile devices | 🔄 Needs Manual Testing | Paper.js supports touch, but needs device testing |
| Paper.js feels responsive and suitable | ✅ Pass | Performance is excellent, suitable for the use cases |

---

## Recommendation

**Proceed to Phase 2** ✅

Paper.js successfully meets all core requirements for Phase 1. The library is well-suited for this project's path editing needs:

- Drawing and editing work as expected
- SVG export is straightforward
- TypeScript support is good
- Performance is excellent
- The path model aligns well with the existing `PathCommand` architecture

### Next Steps (Phase 2)

1. Create conversion utilities between Paper.js paths and `PathCommand[]` arrays
2. Test round-trip conversion (PathCommand → Paper.js → PathCommand)
3. Handle edge cases (empty paths, closed vs open paths, arc commands)
4. Add unit tests for conversion functions

---

## Technical Notes

### File Modified
- `src/pages/TestPage.ts` - Complete rewrite with Paper.js editor

### Dependencies
- `paper` package (already installed, includes TypeScript types)

### Implementation Details
- Canvas size: 800x600px
- Path styling: 2px blue stroke (#2196F3)
- Mode switching updates `path.fullySelected` property
- Hit testing uses custom distance calculation for handles
- Automatic path data updates on mouse up

### Code Organization
- Component uses Mithril closure component pattern
- State management via local state object
- Paper.js initialization in `oncreate` lifecycle hook
- Proper cleanup in `onremove` lifecycle hook
- Event handlers use Paper.js Tool API

---

## Conclusion

Phase 1 was successful. Paper.js is a strong candidate for the path editor implementation. The proof-of-concept demonstrates that all core functionality works well, and there are no significant blockers to moving forward with integration into the puzzle generator application.
