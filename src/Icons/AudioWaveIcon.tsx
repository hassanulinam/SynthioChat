type Props = {
  fill?: string;
  size?: number;
};

const AudioWaveIcon = ({ fill = "#000", size = 24 }: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      fill={fill}
      d="M1 16V8a1 1 0 0 1 2 0v8a1 1 0 0 1-2 0m7 4V4a1 1 0 0 0-2 0v16a1 1 0 0 0 2 0m5 2V2a1 1 0 0 0-2 0v20a1 1 0 0 0 2 0m5-2V4a1 1 0 0 0-2 0v16a1 1 0 0 0 2 0m4-13a1 1 0 0 0-1 1v8a1 1 0 0 0 2 0V8a1 1 0 0 0-1-1"
    ></path>
  </svg>
);

export default AudioWaveIcon;
