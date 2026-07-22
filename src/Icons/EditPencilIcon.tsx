type Props = {
  fill?: string;
  size?: number;
};

const EditPencilIcon = ({ fill = "#000", size = 24 }: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
  >
    <path
      fill={fill}
      d="m21.707 5.565-3.272-3.272a1 1 0 0 0-1.414 0L3.93 15.384a1 1 0 0 0-.242.39l-1.636 4.91A1 1 0 0 0 3 22a1 1 0 0 0 .316-.052l4.91-1.636a1 1 0 0 0 .39-.242L21.707 6.979a1 1 0 0 0 0-1.414M7.369 18.489l-2.788.93.93-2.788 8.943-8.944 1.859 1.859ZM17.728 8.132l-1.86-1.86 1.86-1.858 1.858 1.858Z"
    ></path>
  </svg>
);

export default EditPencilIcon;
