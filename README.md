Procedural Puzzle Generator
==================================

This is a procedural jigsaw puzzle generator that runs in the browser. It has
several configurable strategies that control the generation process allowing for
a variety of puzzle styles. It can produce an SVG file suitable for use with a
laser cutter or CNC machine for making physical puzzles.

Use the tool [here](https://weevilgenius.github.io/puzzle-generator/).

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

Contributions are welcome! The project is built with [Typescript] and [Vite] and
uses [Mithril] and [Web Awesome] to create a responsive user interface. Vector
rendering is powered by [Paper.js], which provides interactive canvas rendering
with built-in support for hit testing, transformations, and scene graph management.
The puzzle generation process is broken into three stages (seed points, piece
generation, tab generation), each of which can be extended with custom algorithms.
To add a new point, piece or tab shape, see the
[generator documentation](./src/geometry/README.md).

Building the project requires Node 20 or later and [pnpm].

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

### Testing

The project uses [Vitest](https://vitest.dev/) for unit and component coverage.

```bash
# run the fast suite once (CI friendly)
pnpm run test

# keep Vitest in watch mode while iterating locally
pnpm run test:watch

# collect V8 coverage details
pnpm run test:coverage

# run typecheck, lint, and tests together before a commit
pnpm run check
```

Acknowledgements
----------------

This project was inspired by discussions in various puzzle forums as well as
online puzzle generators including those from [proceduraljigsaw] on GitHub.

<!-- links -->
[pnpm]: https://pnpm.io/
[Mithril]: https://mithril.js.org/
[Web Awesome]: https://webawesome.com/
[Paper.js]: http://paperjs.org/
[Typescript]: https://www.typescriptlang.org/
[Vite]: https://vitejs.dev/
[proceduraljigsaw]: https://github.com/proceduraljigsaw
