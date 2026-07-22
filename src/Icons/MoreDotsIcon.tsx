type Props = {
  fill?: string
  size?: number
}

const MoreDotsIcon = ({ fill = '#000', size = 24 }: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle cx="5" cy="12" r="2" fill={fill} />
    <circle cx="12" cy="12" r="2" fill={fill} />
    <circle cx="19" cy="12" r="2" fill={fill} />
  </svg>
)

export default MoreDotsIcon
