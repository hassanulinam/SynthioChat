type Props = {
  fill?: string;
  size?: number;
};

const ExpandRightIcon = ({ fill = "#000", size = 28 }: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M4 8h9m-9 4h16m0 0-3-3m3 3-3 3M4 16h9"
      fill={fill}
    ></path>
  </svg>
);

export default ExpandRightIcon;
