import { T } from '../tokens.js'

export function ScreenShell({ children }) {
  return (
    <div style={{
      height: '100%', width: '100%',
      background: T.bg, position: 'relative',
      display: 'flex', flexDirection: 'column',
      overflowY: 'hidden',
    }}>
      {children}
    </div>
  )
}
