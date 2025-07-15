// wraps GeometryChecker in a web worker
import { checkGeometry } from '../geometry/GeometryChecker';
import { deserializeTopology, type PuzzleTopologySerializable } from '../geometry/utils';
import type { Vec2 } from '../geometry/types';

// Define the message format the worker expects to receive
export interface CheckGeometryWorkerInput {
  topology: PuzzleTopologySerializable;
}

// Define the discriminated union for messages the worker sends back
export type CheckGeometryWorkerOutput =
  | { type: 'progress'; processed: number; total: number }
  | { type: 'done'; results: Vec2[] }
  | { type: 'error'; message: string };

// Listen for messages from the main thread
self.onmessage = async (event: MessageEvent<CheckGeometryWorkerInput>) => {
  try {
    const { topology: serializableTopology } = event.data;

    // 1. Reconstruct the PuzzleTopology object with its Maps
    const topology = deserializeTopology(serializableTopology);

    // 2. Create a progress callback to post updates back to the main thread
    const onProgress = (processed: number, total: number) => {
      const progressMessage: CheckGeometryWorkerOutput = { type: 'progress', processed, total };
      self.postMessage(progressMessage);
    };

    // 3. Execute the geometry check
    const intersections = await checkGeometry(topology, onProgress);

    // 4. Post the final results when complete
    const doneMessage: CheckGeometryWorkerOutput = { type: 'done', results: intersections };
    self.postMessage(doneMessage);

  } catch (e) {
    // notify the main thread
    const errorMessage: CheckGeometryWorkerOutput = {
      type: 'error',
      message: e instanceof Error ? e.message : `An error occurred in the CheckGeometryWorker: ${String(e)}.`,
    };
    self.postMessage(errorMessage);
  } finally {
    // Close the worker to free up resources once its job is done
    self.close();
  }
};


