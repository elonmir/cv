import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Markus Reisenhofer CV preview image'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '56px 64px',
          background:
            'linear-gradient(135deg, rgb(15, 23, 42) 0%, rgb(30, 41, 59) 45%, rgb(51, 65, 85) 100%)',
          color: 'white',
          fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 28,
            letterSpacing: 1,
            textTransform: 'uppercase',
            opacity: 0.8,
          }}
        >
          Curriculum Vitae
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'flex', fontSize: 72, fontWeight: 700, lineHeight: 1.1 }}>
            Markus Reisenhofer
          </div>
          <div style={{ display: 'flex', fontSize: 36, opacity: 0.9 }}>
            Technical Team Lead & Senior Full-Stack Engineer
          </div>
        </div>
      </div>
    ),
    size,
  )
}

