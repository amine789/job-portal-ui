import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, cleanup } from '@testing-library/react'
import MatrixRain from './MatrixRain'

describe('MatrixRain', () => {
  const originalMatchMedia = window.matchMedia

  beforeEach(() => {
    window.requestAnimationFrame = vi.fn(() => 1)
    window.cancelAnimationFrame = vi.fn()
  })

  afterEach(() => {
    cleanup()
    window.matchMedia = originalMatchMedia
  })

  it('renders a decorative, hidden canvas and starts the animation loop', () => {
    window.matchMedia = vi.fn().mockReturnValue({ matches: false })

    const { container, unmount } = render(<MatrixRain />)
    const canvas = container.querySelector('canvas')

    expect(canvas).toBeInTheDocument()
    expect(canvas).toHaveAttribute('aria-hidden', 'true')
    expect(window.requestAnimationFrame).toHaveBeenCalled()

    unmount()
    expect(window.cancelAnimationFrame).toHaveBeenCalled()
  })

  it('skips the animation loop when prefers-reduced-motion is set', () => {
    window.matchMedia = vi.fn().mockReturnValue({ matches: true })

    const { container } = render(<MatrixRain />)

    expect(container.querySelector('canvas')).toBeInTheDocument()
    expect(window.requestAnimationFrame).not.toHaveBeenCalled()
  })
})
