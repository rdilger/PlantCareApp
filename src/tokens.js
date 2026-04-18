export const T = {
  green: '#1D9E75',
  greenDark: '#17835F',
  greenLight: '#E8F5EF',
  greenPale: '#F3FAF6',
  bg: '#FAFAF7',
  card: '#FFFFFF',
  ink: '#0F1915',
  ink2: '#3D4A44',
  ink3: '#7A847F',
  line: '#E8EAE6',
  warn: '#E8923B',
  danger: '#D9534F',
  blue: '#3B82F6',
}

export function Icon({ name, size = 20, color = 'currentColor', strokeWidth = 1.8 }) {
  const p = { fill: 'none', stroke: color, strokeWidth, strokeLinecap: 'round', strokeLinejoin: 'round' }
  const paths = {
    home: <><path d="M3 11l9-7 9 7v9a1 1 0 01-1 1h-4v-6h-8v6H4a1 1 0 01-1-1z" {...p}/></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2" {...p}/><path d="M3 10h18M8 3v4M16 3v4" {...p}/></>,
    search: <><circle cx="11" cy="11" r="7" {...p}/><path d="M20 20l-4-4" {...p}/></>,
    plus: <><path d="M12 5v14M5 12h14" {...p}/></>,
    droplet: <><path d="M12 3s6 6.5 6 11a6 6 0 11-12 0c0-4.5 6-11 6-11z" {...p}/></>,
    sun: <><circle cx="12" cy="12" r="4" {...p}/><path d="M12 2v2M12 20v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2 12h2M20 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" {...p}/></>,
    leaf: <><path d="M4 20c0-9 7-15 16-15 0 9-7 15-16 15z" {...p}/><path d="M4 20c4-4 8-8 14-12" {...p}/></>,
    bell: <><path d="M6 8a6 6 0 0112 0c0 7 3 8 3 8H3s3-1 3-8zM10 21a2 2 0 004 0" {...p}/></>,
    check: <><path d="M5 12l5 5L20 7" {...p}/></>,
    chevronRight: <><path d="M9 6l6 6-6 6" {...p}/></>,
    chevronLeft: <><path d="M15 6l-6 6 6 6" {...p}/></>,
    close: <><path d="M6 6l12 12M18 6L6 18" {...p}/></>,
    scissors: <><circle cx="6" cy="6" r="3" {...p}/><circle cx="6" cy="18" r="3" {...p}/><path d="M8.1 8.1L20 20M8.1 15.9L20 4" {...p}/></>,
    sparkle: <><path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8" {...p}/></>,
    flask: <><path d="M9 3h6M10 3v6L5 19a2 2 0 002 3h10a2 2 0 002-3l-5-10V3" {...p}/></>,
    thermometer: <><path d="M14 14V5a2 2 0 10-4 0v9a4 4 0 104 0z" {...p}/></>,
    filter: <><path d="M4 5h16l-6 8v5l-4 2v-7L4 5z" {...p}/></>,
    camera: <><path d="M4 7h3l2-3h6l2 3h3a1 1 0 011 1v11a1 1 0 01-1 1H4a1 1 0 01-1-1V8a1 1 0 011-1z" {...p}/><circle cx="12" cy="13" r="4" {...p}/></>,
    location: <><path d="M12 22s7-8 7-13a7 7 0 10-14 0c0 5 7 13 7 13z" {...p}/><circle cx="12" cy="9" r="2.5" {...p}/></>,
    user: <><circle cx="12" cy="8" r="4" {...p}/><path d="M4 21c0-4.5 3.5-8 8-8s8 3.5 8 8" {...p}/></>,
    more: <><circle cx="5" cy="12" r="1.5" fill={color} stroke="none"/><circle cx="12" cy="12" r="1.5" fill={color} stroke="none"/><circle cx="19" cy="12" r="1.5" fill={color} stroke="none"/></>,
    heart: <><path d="M12 21s-8-5-8-11a5 5 0 018-4 5 5 0 018 4c0 6-8 11-8 11z" {...p}/></>,
    arrowRight: <><path d="M5 12h14M13 5l7 7-7 7" {...p}/></>,
    arrowLeft: <><path d="M19 12H5M11 5l-7 7 7 7" {...p}/></>,
    trash: <><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" {...p}/></>,
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ display: 'block', flexShrink: 0 }}>
      {paths[name] || null}
    </svg>
  )
}

export function PlantImg({ letter = 'P', hue = 140, size = 72, radius = 16, style = {} }) {
  const bg = `oklch(0.92 0.06 ${hue})`
  const fg = `oklch(0.45 0.1 ${hue})`
  return (
    <div style={{
      width: size, height: size, borderRadius: radius,
      background: bg,
      backgroundImage: 'repeating-linear-gradient(135deg, transparent 0 6px, rgba(0,0,0,0.04) 6px 7px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: fg, fontWeight: 600, fontSize: size * 0.38, letterSpacing: -0.5,
      flexShrink: 0, position: 'relative', overflow: 'hidden',
      ...style,
    }}>
      {letter}
    </div>
  )
}
