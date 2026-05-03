'use client'

export function Background() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Warm ambient glow — top center */}
      <div
        className="absolute -top-80 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(232,148,90,0.06) 0%, rgba(200,120,60,0.03) 40%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      {/* Subtle warm accent — bottom left */}
      <div
        className="absolute bottom-0 -left-40 w-[500px] h-[400px] rounded-full"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(180,100,40,0.04) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />
      {/* Grain texture overlay */}
      <div
        className="absolute inset-0"
        style={{
          opacity: 0.028,
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
          backgroundRepeat: 'repeat',
          backgroundSize: '180px 180px',
        }}
      />
    </div>
  )
}
