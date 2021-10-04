import list from "src/data/list.json";
import options from "src/data/options.json";

function extractOptions(productId: number): options | null {
  const listIndex = list.findIndex(({ id }) => id === productId);
  if (listIndex === -1) {
    return null;
  }
  return { ...list[listIndex], options: options[productId - 1] };
}

export { extractOptions };
