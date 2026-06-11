import { ImageResponse } from 'next/og'
import en from '@/data/cv.en.json'
import de from '@/data/cv.de.json'

export const runtime = 'edge'

const size = {
  width: 1200,
  height: 630,
}

function getAbsoluteImageUrl(pathOrUrl?: string) {
  if (!pathOrUrl) return null
  if (pathOrUrl.startsWith('http://') || pathOrUrl.startsWith('https://')) return pathOrUrl

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
  const normalizedSiteUrl = siteUrl.endsWith('/') ? siteUrl.slice(0, -1) : siteUrl
  const normalizedPath = pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`
  return `${normalizedSiteUrl}${normalizedPath}`
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const lang = searchParams.get('lang') === 'de' ? 'de' : 'en'
  const cv = lang === 'de' ? de : en
  const profileImageUrl = getAbsoluteImageUrl(cv.basics.photo)

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
          {lang === 'de' ? 'Lebenslauf' : 'Curriculum Vitae'}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 760 }}>
            <div style={{ display: 'flex', fontSize: 72, fontWeight: 700, lineHeight: 1.1 }}>
              {cv.basics.name}
            </div>
            <div style={{ display: 'flex', fontSize: 36, opacity: 0.9 }}>{cv.basics.title}</div>
          </div>

          {profileImageUrl ? (
            <img
              src={profileImageUrl}
              alt={cv.basics.name}
              width={220}
              height={220}
              style={{
                borderRadius: 24,
                objectFit: 'cover',
                border: '2px solid rgba(255,255,255,0.25)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.35)',
              }}
            />
          ) : null}
        </div>
      </div>
    ),
    size,
  )
}

