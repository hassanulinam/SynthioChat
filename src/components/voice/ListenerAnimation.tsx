import HumanSoulIcon from "../../Icons/HumanSoulIcon";

import "./ListenerAnimation.css";

interface ListenerAnimationProps {
  phase: "listening" | "processing" | "speaking";
}

function getPhaseLabel(phase: ListenerAnimationProps["phase"]): string {
  switch (phase) {
    case "processing":
      return "Processing…";
    case "speaking":
      return "Speaking…";
    case "listening":
    default:
      return "Listening…";
  }
}

export function ListenerAnimation({ phase }: ListenerAnimationProps) {
  const renderRings = () => (
    <>
      <span
        className="listener-animation-ring listener-animation-ring--xl"
        aria-hidden="true"
      />
      <span
        className="listener-animation-ring listener-animation-ring--outer"
        aria-hidden="true"
      />
      <span
        className="listener-animation-ring listener-animation-ring--middle"
        aria-hidden="true"
      />
      <span
        className="listener-animation-ring listener-animation-ring--inner"
        aria-hidden="true"
      />
    </>
  );

  const renderCore = () => (
    <span className="listener-animation-core" aria-hidden="true">
      <HumanSoulIcon fill="currentColor" size={40} />
    </span>
  );

  const renderLabel = () => (
    <p className="listener-animation-label">{getPhaseLabel(phase)}</p>
  );

  return (
    <div className={`listener-animation listener-animation--${phase}`}>
      {renderRings()}
      {renderCore()}
      {renderLabel()}
    </div>
  );
}
