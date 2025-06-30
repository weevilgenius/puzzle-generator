Procedural Puzzle Generator
==================================

This is a procedural jigsaw puzzle generator that runs in the browser. It has
several configurable strategies that control the generation process allowing for
a variety of puzzle styles. It can produce an SVG file suitable for use with a
laser cutter or CNC machine for making physical puzzles.

<!-- add screen shots here -->

Project Goals
-------------

* A tool to generate interesting and pleasing jigsaw puzzle designs without having
  to draw them by hand.
* Clean, well-documented, and extensible codebase allowing others to add/modify/extend
  various algorithms for puzzle creation.
* Output compatible with laser cutters or CNC machines (SVG)

Contributing
------------

Contributions are welcome. To add a new point, piece or tab shape, see the
[generator documentation](./src/geometry/README.md). The project is built with
[Typescript] and [Vite].

### Architecture

The puzzle generation process is broken into stages (generating seed points, pieces,
tabs), each with configurable strategies that can be swapped as desired. Generators
define both the geometry algorithms as well as drive the UI that lets you configure
them. [Mithril] and [Shoelace] are used to create a responsive single page application.

### Getting Started

```bash
# clone the repository
git clone https://github.com/weevilgenius/puzzle-generator.git
cd puzzle-generator

# install dependencies
pnpm install

# run app in development mode
pnpm run dev
```

Acknowledgements
----------------

This project was inspired by discussions in various puzzle forums as well as
online puzzle generators including those from [proceduraljigsaw] on GitHub.

<!-- links -->
[Mithril]: https://mithril.js.org/
[Shoelace]: https://shoelace.style/
[Typescript]: https://www.typescriptlang.org/
[Vite]: https://vitejs.dev/
[proceduraljigsaw]: https://github.com/proceduraljigsaw
