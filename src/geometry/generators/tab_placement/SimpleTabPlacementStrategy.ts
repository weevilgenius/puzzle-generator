import type { PuzzleTopology, Edge, PathCommand, RandomFn, TabPlacement } from "../../types";
import type { TabPlacementStrategy, TabPlacementStrategyRuntimeOptions } from "./TabPlacementStrategy";
import type { GeneratorUIMetadata } from '../../ui_types';
import { GeneratorConfig, GeneratorFactory } from "../Generator";
import { TabPlacementStrategyRegistry } from "../Generator";

// Name of this strategy, uniquely identifies from all other TabPlacementStrategies
type SimpleTabPlacementStrategyName = "SimpleTabPlacementStrategy";
export const Name: SimpleTabPlacementStrategyName = "SimpleTabPlacementStrategy";

/** Custom config for this strategy */
export interface SimpleTabPlacementStrategyConfig extends GeneratorConfig {
  name: SimpleTabPlacementStrategyName;
  /** The default size of the tab as a fraction (0-1) of the edge length. */
  tabSize?: number;
  /** Edges shorter than this value will not have a tab. */
  minEdgeLength?: number;
  /** The maximum absolute width that a tab can have. Wide tabs will get clamped to this value. */
  maxTabSize?: number;
}

/** UI metadata needed for this strategy */
export const SimpleTabPlacementStrategyUIMetadata: GeneratorUIMetadata = {
  name: Name,
  displayName: "Simple",
  description: "Creates a single tab in the center of each edge with a random orientation.",
  sortHint: 1,
  // these have to match the config above
  controls: [
    {
      type: 'range',
      name: 'tabSize',
      label: 'Tab Size',
      optional: true,
      min: 0.01,
      max: 1.0,
      step: 0.01,
      defaultValue: 0.5,
      helpText: 'The width of the tab as a fraction of the edge length',
    },
    {
      type: 'number',
      name: 'minEdgeLength',
      label: 'Minimum Edge Length',
      optional: true,
      defaultValue: 15,
      helpText: 'Edges shorter than this value will not have a tab',
    },
    {
      type: 'number',
      name: 'maxTabSize',
      label: 'Maximum Tab Size',
      helpText: 'Maximum width of a generated tab',
    },
  ],
};

// helper function to do the actual placement work
function placeTabOnEdge(
  edge: Edge,
  topology: PuzzleTopology,
  config: { tabSize: number, minEdgeLength: number, maxTabSize?: number },
  random: RandomFn
): void {
  // clear any existing tabs in case we're re-evaluating
  edge.tabs = undefined;

  // we only place on internal edges
  const isInternal = edge.heRight !== -1;
  if (!isInternal) { return; }

  const he1 = topology.halfEdges.get(edge.heLeft);
  const he2 = topology.halfEdges.get(edge.heRight);
  if (!he1 || !he2) return;

  const p1 = he1.origin;
  const p2 = he2.origin;
  const edgeLength = Math.hypot(p2[0] - p1[0], p2[1] - p1[1]);

  // add a tab, if the edge is long enough
  if (edgeLength >= config.minEdgeLength) {
    let tabSize = config.tabSize;

    // clamp tab width if requested
    if (config.maxTabSize && (edgeLength * tabSize) > config.maxTabSize) {
      tabSize = config.maxTabSize / edgeLength;
    }

    const tab: TabPlacement = {
      position: 0.5, // center of the edge
      size: tabSize,
      convex: random() > 0.5, // tab is "innie" or "outie"
    };
    edge.tabs = [tab];
  }
}

/**
 * A straightforward tab placement strategy that adds a single tab to the
 * center of each internal edge of the puzzle.
 */
export const SimpleTabPlacementStrategyFactory: GeneratorFactory<TabPlacementStrategy> = (
  _border: PathCommand[],
  _bounds: { width: number; height: number },
  config: SimpleTabPlacementStrategyConfig,
): TabPlacementStrategy => {
  const { tabSize = 0.5, minEdgeLength = 0, maxTabSize } = config;
  const placementConfig = { tabSize, minEdgeLength, maxTabSize };

  return {
    placeTabs(runtimeOpts: TabPlacementStrategyRuntimeOptions): void {
      const { topology, random } = runtimeOpts;
      for (const edge of topology.edges.values()) {
        placeTabOnEdge(edge, topology, placementConfig, random);
      }
    },
    updateTabPlacements(edges: Edge[], runtimeOpts: TabPlacementStrategyRuntimeOptions): void {
      const { topology, random } = runtimeOpts;
      for (const edge of edges) {
        placeTabOnEdge(edge, topology, placementConfig, random);
      }
    },
  };
};
export default SimpleTabPlacementStrategyFactory;

// register the strategy
TabPlacementStrategyRegistry.register(Name, SimpleTabPlacementStrategyFactory, SimpleTabPlacementStrategyUIMetadata);