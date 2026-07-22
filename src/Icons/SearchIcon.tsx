type Props = {
  fill?: string;
  size?: number;
};

const SearchIcon = ({ fill = "#000", size = 24 }: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 20 20"
  >
    <path
      fill={fill}
      fillRule="evenodd"
      d="M4 9a5 5 0 1 1 10 0A5 5 0 0 1 4 9m5-7a7 7 0 1 0 4.2 12.6 1 1 0 0 0 .093.107l3 3a1 1 0 0 0 1.414-1.414l-3-3a1 1 0 0 0-.107-.093A7 7 0 0 0 9 2"
    ></path>
  </svg>
);

export default SearchIcon;
