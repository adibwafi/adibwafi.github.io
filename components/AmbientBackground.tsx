/* ─── Ambient radial-gradient blobs — fixed behind all content ───────────── */

export function AmbientBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      <div
        className="absolute -top-32 -left-32 w-[560px] h-[560px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(99,102,241,0.13) 0%, transparent 70%)',
          filter: 'blur(48px)',
        }}
      />
      <div
        className="absolute top-1/2 -right-24 w-[440px] h-[440px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(37,99,235,0.09) 0%, transparent 70%)',
          filter: 'blur(48px)',
        }}
      />
      <div
        className="absolute -bottom-24 left-1/4 w-[400px] h-[400px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 70%)',
          filter: 'blur(48px)',
        }}
      />
    </div>
  );
}
