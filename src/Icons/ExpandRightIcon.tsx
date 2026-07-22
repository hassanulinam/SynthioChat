type Props = {
  fill?: string;
  size?: number;
};

const ExpandRightIcon = ({ fill = "#000", size = 24 }: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      stroke={fill}
      strokeWidth={2}
      d="m12 18 6-6-6-6M6 18l6-6-6-6"
      fill={fill}
    ></path>
  </svg>
);

export default ExpandRightIcon;
