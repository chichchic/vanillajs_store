export function debounceFrame(cb) {
  let currentCallBack = -1;
  return () => {
    cancelAnimationFrame(currentCallBack);
    currentCallBack = requestAnimationFrame(cb)
  }
}