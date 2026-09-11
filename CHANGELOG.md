Change Log
==========

## Version 0.6.1

Added support for whimsies that contain internal details via SVG import. The first
path in the file must be closed or the import will be rejected. Any internal details
that aren't black will have their colors preserved in the output. Fixed pinch zoom
and dragging whimsy handles on retina displays.


## Version 0.6.0

Overhauled the UI to make managing settings less awkward. Added a lot of help text.
Better mobile support.


## Version 0.5.1

Added the ability to save and load puzzle configurations as JSON files, allowing users
to preserve and share their designs. This feature includes support for persistent
manual seed point edits and automatically recovers the last session's state using
local storage.


## Version 0.5.0

Initial release. Project is functional, though UI leaves much to be desired. There
are four initial generator types with at least one generator defined for each: seed
points, piece generation, tab placement, and tab generation. Not every piece generator
uses seed points. Basic SVG export is supported as well as simple whimsy piece support.
