import './ListenerAnimation.css'

interface ListenerAnimationProps {
  phase: 'listening' | 'processing' | 'speaking'
}

function getPhaseLabel(phase: ListenerAnimationProps['phase']): string {
  switch (phase) {
    case 'processing':
      return 'Processing…'
    case 'speaking':
      return 'Speaking…'
    case 'listening':
    default:
      return 'Listening…'
  }
}

export function ListenerAnimation({ phase }: ListenerAnimationProps) {
  return (
    <div className={`listener-animation listener-animation--${phase}`}>
      <span className="listener-animation-ring listener-animation-ring--outer" aria-hidden="true" />
      <span className="listener-animation-ring listener-animation-ring--middle" aria-hidden="true" />
      <span className="listener-animation-ring listener-animation-ring--inner" aria-hidden="true" />
      <span
        className="listener-animation-core icon-placeholder"
        data-icon="listener"
        aria-hidden="true"
      />
      {/* icon-placeholder: listener */}
      <p className="listener-animation-label">{getPhaseLabel(phase)}</p>
    </div>
  )
}
