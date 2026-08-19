import '@testing-library/jest-dom'

if (!window.matchMedia) {
  window.matchMedia = () => ({
    matches: false,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
  })
}

if (!window.requestAnimationFrame) {
  window.requestAnimationFrame = () => 0
  window.cancelAnimationFrame = () => {}
}

HTMLCanvasElement.prototype.getContext = () => ({
  fillRect: () => {},
  fillText: () => {},
  clearRect: () => {},
})
