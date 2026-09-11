/**
 * SVG path parsing utilities
 * Converts SVG path data to PathCommand[] format
 */

import type { PathCommand, WhimsyInternalPath } from './types';

/**
 * Result of parsing an SVG file
 */
export interface SVGParseResult {
  /** The parsed path commands */
  commands: PathCommand[];
  /** Independent detail paths after the outline, with optional operation colors. */
  internalPaths?: WhimsyInternalPath[];
  /** Optional warning message for the user if something went wrong during parsing */
  warning?: string;
}

/**
 * Parse the first SVG path as an outline and subsequent paths as cut details.
 *
 * @param svgContent - The SVG file content as a string
 * @returns SVGParseResult with commands and optional warning, or null if parsing fails
 */
export function parseSVGFile(svgContent: string): SVGParseResult {
  try {
    // Parse the SVG content as XML
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgContent, 'image/svg+xml');

    // Check for parsing errors
    const parserError = doc.querySelector('parsererror');
    if (parserError) {
      console.error('[SVGParser] XML parsing error:', parserError.textContent);
      return {
        commands: [],
        warning: 'Failed to parse SVG',
      };
    }

    // Find the first path element
    const pathElement = doc.querySelector('path');
    if (!pathElement) {
      console.error('[SVGParser] No path element found in SVG');
      return {
        commands: [],
        warning: 'Failed to parse SVG: no path element',
      };
    }

    // Get the d attribute
    const dAttr = pathElement.getAttribute('d');
    if (!dAttr) {
      console.error('[SVGParser] Path element has no d attribute');
      return {
        commands: [],
        warning: 'Failed to parse SVG: Path element has no d attribute',
      };
    }

    const outline = parseSVGPath(dAttr);
    const warnings = new Set<string>();
    if (outline.warning) warnings.add(outline.warning);
    if (doc.querySelector('[transform]')) {
      warnings.add('SVG transforms are ignored. Apply transforms to the paths before importing.');
    }
    if (doc.querySelector('style, link') || svgContent.includes('<?xml-stylesheet')) {
      warnings.add('Stylesheet-based colors are not imported. Use inline stroke colors for internal details.');
    }

    const internalPaths = Array.from(doc.querySelectorAll('path')).slice(1).map((element) => {
      const result = parseSVGPath(element.getAttribute('d') ?? '');
      if (result.warning) warnings.add(result.warning);
      return { path: result.commands, strokeColor: readDetailColor(element, warnings) };
    });
    return { ...outline, internalPaths, warning: warnings.size > 0 ? [...warnings].join(' ') : undefined };
  } catch (error) {
    console.error('[SVGParser] Error parsing SVG:', error);
    return {
      commands: [],
      warning: 'Failed to parse SVG',
    };
  }
}

const readDetailColor = (element: Element, warnings: Set<string>): string | undefined => {
  let stroke = '';
  for (let current: Element | null = element; current; current = current.parentElement) {
    const style = document.createElement('span').style;
    style.cssText = current.getAttribute('style') ?? '';
    const inlineStroke = style.getPropertyValue('stroke');
    stroke = (inlineStroke.length > 0 ? inlineStroke : current.getAttribute('stroke') ?? '').trim();
    if (stroke && !['inherit', 'unset'].includes(stroke.toLowerCase())) break;
    stroke = '';
  }
  if (!stroke || ['none', 'initial'].includes(stroke.toLowerCase())) return undefined;

  // Resolve only a color, never attach any imported SVG markup to the document.
  const probe = document.createElement('span');
  probe.style.color = stroke;
  if (!probe.style.color || /url\(|var\(|currentcolor|context-|revert|inherit|unset/i.test(stroke)) {
    warnings.add('An unsupported detail stroke color was ignored; that detail will use the global piece color.');
    return undefined;
  }
  probe.style.display = 'none';
  document.body.appendChild(probe);
  const color = getComputedStyle(probe).color;
  probe.remove();
  return /^(black|#0{3}(?:0{3})?|rgba?\(0[, ]+0[, ]+0(?:[, /]+[\d.]+)?\))$/i.test(color)
    ? undefined
    : color;
};

/**
 * Parse an SVG path d attribute into PathCommand[] format
 *
 * Supports: M/m (moveto), L/l (lineto), C/c (cubic bezier), Q/q (quadratic bezier)
 * Note: H/h, V/v, S/s, T/t, A/a are converted to their equivalent forms
 *
 * If the path contains multiple subpaths (multiple M commands), only the first
 * subpath is processed and a warning is returned.
 *
 * @param d - The SVG path d attribute value
 * @returns SVGParseResult with commands and optional warning
 */
export function parseSVGPath(d: string): SVGParseResult {
  const commands: PathCommand[] = [];
  let hasMultipleSubpaths = false;

  // Tokenize the path data
  // Insert spaces before command letters and handle negative numbers
  const normalized = d
    .replace(/([MmLlHhVvCcSsQqTtAaZz])/g, ' $1 ')
    .replace(/(\d)-/g, '$1 -')  // Add space before minus when it follows a digit (e.g., "280-400" -> "280 -400")
    .replace(/,/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  const tokens = normalized.split(' ').filter((t) => t.length > 0);

  let i = 0;
  let currentX = 0;
  let currentY = 0;
  let startX = 0;
  let startY = 0;
  let lastControlX = 0;
  let lastControlY = 0;
  let lastCommand = '';
  let isFirstMoveTo = true;

  const parseNumber = (): number => {
    const num = parseFloat(tokens[i]);
    if (!Number.isFinite(num)) throw new Error('Invalid SVG path coordinate');
    i++;
    return num;
  };

  while (i < tokens.length) {
    const startIndex = i;
    let command = tokens[i];

    // Handle implicit commands (coordinates following a command)
    if (!isNaN(parseFloat(command))) {
      // Numbers without a command - repeat the last command
      if (lastCommand === 'M') {
        command = 'L'; // After M, implicit coords are L
      } else if (lastCommand === 'm') {
        command = 'l';
      } else {
        command = lastCommand;
      }
    } else {
      i++; // Move past the command letter
    }

    const isRelative = command === command.toLowerCase();
    const commandUpper = command.toUpperCase();

    switch (commandUpper) {
    case 'M': { // MoveTo
      // Check if this is a second MoveTo command (compound path with multiple subpaths)
      if (!isFirstMoveTo) {
        hasMultipleSubpaths = true;
        // Stop parsing - we only want the first subpath
        i = tokens.length; // Skip to end
        break;
      }
      isFirstMoveTo = false;

      const x = parseNumber();
      const y = parseNumber();

      if (isRelative) {
        currentX += x;
        currentY += y;
      } else {
        currentX = x;
        currentY = y;
      }

      startX = currentX;
      startY = currentY;

      commands.push({
        type: 'move',
        p: [currentX, currentY],
      });

      lastCommand = command;
      break;
    }

    case 'L': { // LineTo
      const x = parseNumber();
      const y = parseNumber();

      if (isRelative) {
        currentX += x;
        currentY += y;
      } else {
        currentX = x;
        currentY = y;
      }

      commands.push({
        type: 'line',
        p: [currentX, currentY],
      });

      lastControlX = currentX;
      lastControlY = currentY;
      lastCommand = command;
      break;
    }

    case 'H': { // Horizontal line
      const x = parseNumber();

      if (isRelative) {
        currentX += x;
      } else {
        currentX = x;
      }

      commands.push({
        type: 'line',
        p: [currentX, currentY],
      });

      lastControlX = currentX;
      lastControlY = currentY;
      lastCommand = command;
      break;
    }

    case 'V': { // Vertical line
      const y = parseNumber();

      if (isRelative) {
        currentY += y;
      } else {
        currentY = y;
      }

      commands.push({
        type: 'line',
        p: [currentX, currentY],
      });

      lastControlX = currentX;
      lastControlY = currentY;
      lastCommand = command;
      break;
    }

    case 'C': { // Cubic Bezier
      const x1 = parseNumber();
      const y1 = parseNumber();
      const x2 = parseNumber();
      const y2 = parseNumber();
      const x = parseNumber();
      const y = parseNumber();

      let cp1x = x1;
      let cp1y = y1;
      let cp2x = x2;
      let cp2y = y2;
      let endX = x;
      let endY = y;

      if (isRelative) {
        cp1x += currentX;
        cp1y += currentY;
        cp2x += currentX;
        cp2y += currentY;
        endX += currentX;
        endY += currentY;
      }

      commands.push({
        type: 'bezier',
        p1: [cp1x, cp1y],
        p2: [cp2x, cp2y],
        p3: [endX, endY],
      });

      lastControlX = cp2x;
      lastControlY = cp2y;
      currentX = endX;
      currentY = endY;
      lastCommand = command;
      break;
    }

    case 'S': { // Smooth cubic Bezier
      const x2 = parseNumber();
      const y2 = parseNumber();
      const x = parseNumber();
      const y = parseNumber();

      // Reflect the last control point
      const cp1x = 2 * currentX - lastControlX;
      const cp1y = 2 * currentY - lastControlY;

      let cp2x = x2;
      let cp2y = y2;
      let endX = x;
      let endY = y;

      if (isRelative) {
        cp2x += currentX;
        cp2y += currentY;
        endX += currentX;
        endY += currentY;
      }

      commands.push({
        type: 'bezier',
        p1: [cp1x, cp1y],
        p2: [cp2x, cp2y],
        p3: [endX, endY],
      });

      lastControlX = cp2x;
      lastControlY = cp2y;
      currentX = endX;
      currentY = endY;
      lastCommand = command;
      break;
    }

    case 'Q': { // Quadratic Bezier
      const x1 = parseNumber();
      const y1 = parseNumber();
      const x = parseNumber();
      const y = parseNumber();

      let cpx = x1;
      let cpy = y1;
      let endX = x;
      let endY = y;

      if (isRelative) {
        cpx += currentX;
        cpy += currentY;
        endX += currentX;
        endY += currentY;
      }

      // Convert quadratic to cubic bezier
      // Cubic control points are 2/3 of the way from endpoints to quadratic control
      const cp1x = currentX + (2 / 3) * (cpx - currentX);
      const cp1y = currentY + (2 / 3) * (cpy - currentY);
      const cp2x = endX + (2 / 3) * (cpx - endX);
      const cp2y = endY + (2 / 3) * (cpy - endY);

      commands.push({
        type: 'bezier',
        p1: [cp1x, cp1y],
        p2: [cp2x, cp2y],
        p3: [endX, endY],
      });

      lastControlX = cpx;
      lastControlY = cpy;
      currentX = endX;
      currentY = endY;
      lastCommand = command;
      break;
    }

    case 'T': { // Smooth quadratic Bezier
      const x = parseNumber();
      const y = parseNumber();

      // Reflect the last control point
      const cpx = 2 * currentX - lastControlX;
      const cpy = 2 * currentY - lastControlY;

      let endX = x;
      let endY = y;

      if (isRelative) {
        endX += currentX;
        endY += currentY;
      }

      // Convert quadratic to cubic bezier
      const cp1x = currentX + (2 / 3) * (cpx - currentX);
      const cp1y = currentY + (2 / 3) * (cpy - currentY);
      const cp2x = endX + (2 / 3) * (cpx - endX);
      const cp2y = endY + (2 / 3) * (cpy - endY);

      commands.push({
        type: 'bezier',
        p1: [cp1x, cp1y],
        p2: [cp2x, cp2y],
        p3: [endX, endY],
      });

      lastControlX = cpx;
      lastControlY = cpy;
      currentX = endX;
      currentY = endY;
      lastCommand = command;
      break;
    }

    case 'A': {
      // Arc command - simplified conversion to cubic bezier
      // This is a complex conversion, so we'll use a basic approximation
      // For now, convert to straight line

      // Parse arc parameters (7 values)
      const _rx = parseNumber();
      const _ry = parseNumber();
      const _xAxisRotation = parseNumber();
      const _largeArcFlag = parseNumber();
      const _sweepFlag = parseNumber();
      const x = parseNumber();
      const y = parseNumber();

      let endX = x;
      let endY = y;

      if (isRelative) {
        endX += currentX;
        endY += currentY;
      }

      // For now, just draw a straight line
      // TODO: Implement proper arc-to-bezier conversion
      commands.push({
        type: 'line',
        p: [endX, endY],
      });

      currentX = endX;
      currentY = endY;
      lastControlX = endX;
      lastControlY = endY;
      lastCommand = command;
      break;
    }

    case 'Z': { // Close path
      // Add a line back to the start if needed
      if (currentX !== startX || currentY !== startY) {
        commands.push({
          type: 'line',
          p: [startX, startY],
        });
        currentX = startX;
        currentY = startY;
      }
      lastCommand = command;
      break;
    }

    default:
      // Unknown command - skip it
      break;
    }
    if (i === startIndex) throw new Error('Invalid SVG path command');
  }

  const result: SVGParseResult = { commands };
  if (hasMultipleSubpaths) {
    result.warning = 'This SVG contains a compound path. Only the first subpath was imported.';
  }

  return result;
}
