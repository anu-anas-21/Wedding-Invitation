import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
  const cinzel = await fetch(
    new URL('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&display=swap'),
  ).then((res) => res.text());

  const cinzelUrl = cinzel.match(/src: url\((.+?)\)/)?.[1]?.replace(/['"]/g, '');

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#020e0a',
          position: 'relative',
          fontFamily: cinzelUrl ? 'Cinzel' : 'serif',
        }}
      >
        {/* Radial gold glow */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '800px',
            height: '500px',
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(ellipse, rgba(201,168,76,0.15) 0%, transparent 70%)',
          }}
        />

        {/* Border frame */}
        <div
          style={{
            position: 'absolute',
            inset: '30px',
            border: '2px solid rgba(201,168,76,0.5)',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: '40px',
            border: '1px solid rgba(201,168,76,0.25)',
          }}
        />

        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '60px',
            zIndex: 1,
          }}
        >
          <p
            style={{
              fontSize: '28px',
              color: '#e8d5a3',
              marginBottom: '30px',
              direction: 'rtl',
            }}
          >
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </p>

          <p
            style={{
              fontSize: '42px',
              color: '#c9a84c',
              textAlign: 'center',
              lineHeight: 1.3,
              marginBottom: '20px',
            }}
          >
            Musfir &amp; Fasna · Fasil &amp; Rinshana
          </p>

          <p
            style={{
              fontSize: '24px',
              color: '#e8d5a3',
              letterSpacing: '0.1em',
              marginBottom: '16px',
            }}
          >
            Wedding Celebration · 23 July 2026
          </p>

          <p
            style={{
              fontSize: '20px',
              color: 'rgba(250,246,238,0.65)',
            }}
          >
            Al Jazeera Convention Centre
          </p>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: cinzelUrl
        ? [
            {
              name: 'Cinzel',
              data: await fetch(cinzelUrl).then((res) => res.arrayBuffer()),
              style: 'normal',
              weight: 400,
            },
          ]
        : [],
    },
  );
}
