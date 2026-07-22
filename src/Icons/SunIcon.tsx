type Props = {
  fill?: string;
  size?: number;
};

const SunIcon = ({ fill = "#fff", size = 24 }: Props) => (
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
      d="M12 3v1m0 16v1m-8-9H3m3.314-5.686L5.5 5.5m12.186.814L18.5 5.5M6.314 17.69l-.814.81m12.186-.81.814.81M21 12h-1m-4 0a4 4 0 1 1-8 0 4 4 0 0 1 8 0"
    ></path>
  </svg>
);

export default SunIcon;
