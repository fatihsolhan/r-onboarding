import { useEffect, useRef, useState } from "react"

export default function useSvgOverlay() {
  const [path, setPath] = useState('')
  const target = useRef<Element | null>(null)

  const onScroll = () => {
    updatePath(target.current)
  }
  const updatePath = async (element: Element | null) => {
    if (!element) return
    const { innerWidth, innerHeight } = window
    const { left, top, width, height } = element.getBoundingClientRect()
    setPath(`M${innerWidth},${innerHeight}H0V0H${innerWidth}V${innerHeight}ZM${left},${top}a0,0,0,0,0-0,0V${top + height}a0,0,0,0,0,0,0H${left + width}a0,0,0,0,0,0-0V${top}a0,0,0,0,0-0-0Z`)
    target.current = element
  }

  useEffect(() => {
    window.addEventListener('scroll', onScroll)
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])
  return {
    path,
    updatePath
  }
}
