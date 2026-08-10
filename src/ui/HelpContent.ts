import m from 'mithril';
import './HelpContent.css';

/** User-facing overview of the puzzle generator and its controls. */
const HelpContent: m.Component = {
  view: () => m('.help-content', [
    m('p',
      'This tool creates jigsaw puzzle designs in your browser using various ' +
      'generative algorithms. You can preview the puzzle, tweak the settings, ' +
      'adjust its shape and style, then download an SVG file for use with a ' +
      'laser cutter or CNC machine.'),
    m('h3', 'How to use the generator'),
    m('p',
      'The main workspace is the puzzle canvas. The canvas is zoomable using ' +
      'either the mouse wheel or the zoom selector below it, and you can pan ' +
      'while zoomed by holding down the space key while click dragging. Click ' +
      'the recenter button to reset the view to its default zoom and center. ' +
      'The settings controls each open a different set of configuration options.'),
    m('.help-step', [
      m('strong', 'Canvas:'),
      ' Settings that apply to the puzzle as a whole including shape, piece color, ' +
      'and background image.',
    ]),
    m('.help-step', [
      m('strong', 'Whimsies:'),
      ' Controls for adding custom pieces with special shapes.',
    ]),
    m('.help-step', [
      m('strong', 'Seeds:'),
      ' Configure the algorithms that define the points that guide where pieces ' +
      'are placed.',
    ]),
    m('.help-step', [
      m('strong', 'Piece Generation:'),
      ' The generation algorithms that turn seed points into puzzle pieces. ' +
      'Each one has various configurable options.',
    ]),
    m('.help-step', [
      m('strong', 'Tab Placement:'),
      ' Configure where tabs are placed between pieces and how they are oriented.',
    ]),
    m('.help-step', [
      m('strong', 'Tab Shape:'),
      ' Various options for tab shapes.',
    ]),
    m('p',
      'The puzzle regenerates as you change settings. The seed value controls ' +
      'the random choices, so the same seed and settings will reproduce the ' +
      'same design.'),
    m('h3', 'When your puzzle is ready'),
    m('p',
      'Inspect the preview and move seed points or custom pieces if you want ' +
      'to fine-tune the design. Use the geometry checker to look for possible ' +
      'overlaps or other cutting problems, then use Download SVG to export the ' +
      'final design. Save and load let you keep a design and continue working ' +
      'on it later.'),
  ]),
};

export default HelpContent;
