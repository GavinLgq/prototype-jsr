type Props = {
  seed: string
  className?: string
  label?: string
}

/**
 * Prototype stand-in for photography: a deterministic gradient + glyph so the
 * mockup looks complete without shipping or fetching any images.
 */
const PRESETS: Record<string, { from: string; to: string; glyph: string }> = {
  mosque: { from: '#1f8159', to: '#0b3d2c', glyph: '🕌' },
  class: { from: '#2ea06e', to: '#17523c', glyph: '🎓' },
  herb: { from: '#4dba87', to: '#1a6749', glyph: '🌿' },
  camp: { from: '#7ed3b0', to: '#1f8159', glyph: '⛺' },
  stream: { from: '#2ea06e', to: '#0b3d2c', glyph: '📡' },
  lemon: { from: '#b0e5cd', to: '#2ea06e', glyph: '🍋' },
  turmeric: { from: '#4dba87', to: '#17523c', glyph: '🫚' },
  night: { from: '#17523c', to: '#0b3d2c', glyph: '🌙' },
  video: { from: '#1a6749', to: '#0b3d2c', glyph: '▶️' },
  habit: { from: '#7ed3b0', to: '#2ea06e', glyph: '🌤️' },
  plate: { from: '#b0e5cd', to: '#1f8159', glyph: '🍽️' },
  skin: { from: '#d6f2e4', to: '#4dba87', glyph: '✨' },
  honey: { from: '#4dba87', to: '#1a6749', glyph: '🍯' },
  dates: { from: '#2ea06e', to: '#17523c', glyph: '🌴' },
  article: { from: '#1f8159', to: '#17523c', glyph: '📖' },
}

const FALLBACK = { from: '#4dba87', to: '#1a6749', glyph: '🌿' }

export function CoverArt({ seed, className = '', label }: Props) {
  const preset = PRESETS[seed] ?? FALLBACK
  return (
    <div
      className={`relative grid place-items-center overflow-hidden ${className}`}
      style={{ backgroundImage: `linear-gradient(135deg, ${preset.from}, ${preset.to})` }}
      role="img"
      aria-label={label ?? seed}
    >
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 20%, rgba(255,255,255,.45), transparent 45%), radial-gradient(circle at 85% 80%, rgba(255,255,255,.25), transparent 40%)',
        }}
      />
      <span className="relative text-4xl drop-shadow-sm sm:text-5xl">{preset.glyph}</span>
    </div>
  )
}
