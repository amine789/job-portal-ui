import { useEffect, useRef } from 'react'

const CHARACTERS = 'アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const FONT_SIZE = 16
const FRAME_INTERVAL = 60

const MatrixRain = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animationFrameId
    let drops

    const setup = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      const columns = Math.floor(canvas.width / FONT_SIZE)
      drops = Array(columns).fill(1)
    }

    setup()
    window.addEventListener('resize', setup)

    let lastTime = 0

    const draw = (time) => {
      animationFrameId = requestAnimationFrame(draw)
      if (time - lastTime < FRAME_INTERVAL) return
      lastTime = time

      ctx.fillStyle = 'rgba(3, 6, 3, 0.08)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = '#00ff41'
      ctx.font = `${FONT_SIZE}px "Share Tech Mono", monospace`

      drops.forEach((y, i) => {
        const char = CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)]
        const x = i * FONT_SIZE
        ctx.fillText(char, x, y * FONT_SIZE)

        if (y * FONT_SIZE > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      })
    }

    animationFrameId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', setup)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none opacity-[0.12] z-0"
      aria-hidden="true"
    />
  )
}

export default MatrixRain
