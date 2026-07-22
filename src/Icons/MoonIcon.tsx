type Props = {
  fill?: string;
  size?: number;
};

const MoonIcon = ({ fill = "#000", size = 24 }: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      id="SVGRepo_iconCarrier"
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M3.32 11.684a9 9 0 0 0 17.357 3.348A9 9 0 0 1 8.32 6.683c0-1.18.23-2.32.644-3.353a9 9 0 0 0-5.645 8.354"
    ></path>
  </svg>
);

export default MoonIcon;
