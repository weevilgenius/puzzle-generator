
export type UniqueId = number;

let id = 0;
export function getUniqueId(): UniqueId {
  return id++;
}
