export default function Loading() {
  return (
    <div className="w-full min-h-[60vh] flex flex-col items-center justify-center px-6 py-24 space-y-6">
      {/* Stage Pulse Indicator */}
      <div className="relative flex items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-crimson-500/15 animate-ping" />
        <div className="absolute w-10 h-10 rounded-full bg-crimson-500/30 animate-pulse" />
        <div className="absolute w-4 h-4 rounded-full bg-crimson-500 shadow-[0_0_15px_rgba(224,18,50,0.8)]" />
      </div>

      {/* Loading Label */}
      <div className="text-center space-y-2">
        <p className="font-display font-bold text-lg uppercase tracking-widest text-[var(--ink)]">
          MENYIAPKAN PANGGUNG...
        </p>
        <p className="font-mono-data text-xs text-[var(--muted)]">
          Memuat data dari teater FJKT48
        </p>
      </div>

      {/* Shimmer skeleton bar */}
      <div className="w-48 h-1 rounded-full bg-[var(--surface-raised)] overflow-hidden">
        <div className="w-full h-full bg-gradient-to-r from-transparent via-crimson-500 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
      </div>
    </div>
  );
}
