import { SvgOverlayOptions } from "@/types/ROnboardingWrapper"
import { useEffect, useRef, useState } from "react"

interface Padding { top: number; right: number; bottom: number; left: number }
interface BorderRadius { leftTop: number; rightTop: number; rightBottom: number; leftBottom: number }

const normalizePadding = (padding: SvgOverlayOptions['padding']): Padding => {
  if (typeof padding === 'number') {
    return { top: padding, right: padding, bottom: padding, left: padding }
  }
  return {
    top: padding?.top ?? 0,
    right: padding?.right ?? 0,
    bottom: padding?.bottom ?? 0,
    left: padding?.left ?? 0
  }
}

const normalizeRadius = (radius: SvgOverlayOptions['borderRadius']): BorderRadius => {
  if (typeof radius === 'number') {
    return { leftTop: radius, rightTop: radius, rightBottom: radius, leftBottom: radius }
  }
  return {
    leftTop: radius?.leftTop ?? 0,
    rightTop: radius?.rightTop ?? 0,
    rightBottom: radius?.rightBottom ?? 0,
    leftBottom: radius?.leftBottom ?? 0
  }
}

const generatePath = (rect: DOMRect, padding: Padding, radius: BorderRadius): string => {
  const { innerWidth: w, innerHeight: h } = window

  const hole = {
    top: rect.top - padding.top,
    right: rect.left + rect.width + padding.right,
    bottom: rect.top + rect.height + padding.bottom,
    left: rect.left - padding.left
  }

  const maxRadius = Math.min((hole.right - hole.left) / 2, (hole.bottom - hole.top) / 2)
  const r = {
    lt: Math.min(radius.leftTop, maxRadius),
    rt: Math.min(radius.rightTop, maxRadius),
    rb: Math.min(radius.rightBottom, maxRadius),
    lb: Math.min(radius.leftBottom, maxRadius)
  }

  return `
    M${w},${h} H0 V0 H${w} Z
    M${hole.left + r.lt},${hole.top}
    Q${hole.left},${hole.top} ${hole.left},${hole.top + r.lt}
    V${hole.bottom - r.lb}
    Q${hole.left},${hole.bottom} ${hole.left + r.lb},${hole.bottom}
    H${hole.right - r.rb}
    Q${hole.right},${hole.bottom} ${hole.right},${hole.bottom - r.rb}
    V${hole.top + r.rt}
    Q${hole.right},${hole.top} ${hole.right - r.rt},${hole.top}
    Z
  `
}

export default function useSvgOverlay() {
  const [path, setPath] = useState('')
  const currentTarget = useRef<Element | null>(null)
  const currentPadding = useRef<Padding>({ top: 0, right: 0, bottom: 0, left: 0 })
  const currentRadius = useRef<BorderRadius>({ leftTop: 0, rightTop: 0, rightBottom: 0, leftBottom: 0 })
  const resizeObserver = useRef<ResizeObserver | null>(null)
  const rafId = useRef<number | null>(null)

  const refresh = () => {
    if (!currentTarget.current) return
    const rect = currentTarget.current.getBoundingClientRect()
    setPath(generatePath(rect, currentPadding.current, currentRadius.current))
  }

  const scheduleRefresh = () => {
    if (rafId.current !== null) return
    rafId.current = requestAnimationFrame(() => {
      rafId.current = null
      refresh()
    })
  }

  const updatePath = (element: Element | null, options: Omit<SvgOverlayOptions, 'enabled'> = {}) => {
    if (!element) return

    const padding = normalizePadding(options.padding)
    const radius = normalizeRadius(options.borderRadius)

    if (currentTarget.current !== element) {
      if (resizeObserver.current && currentTarget.current) {
        resizeObserver.current.unobserve(currentTarget.current)
      }
      resizeObserver.current?.observe(element)
    }

    currentTarget.current = element
    currentPadding.current = padding
    currentRadius.current = radius

    refresh()
  }

  useEffect(() => {
    window.addEventListener('scroll', scheduleRefresh, { capture: true })
    window.addEventListener('resize', scheduleRefresh)
    resizeObserver.current = new ResizeObserver(scheduleRefresh)

    return () => {
      window.removeEventListener('scroll', scheduleRefresh, { capture: true })
      window.removeEventListener('resize', scheduleRefresh)
      resizeObserver.current?.disconnect()
      resizeObserver.current = null
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current)
      }
    }
  }, [])

  return { path, updatePath }
}
