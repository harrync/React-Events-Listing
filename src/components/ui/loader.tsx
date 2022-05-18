type Props = {
  extraClasses?: string
}

/**
 * Loading animation
 */
export default function Loader({ extraClasses }: Props) {
  return (
    <div
      className={`a-loader ${extraClasses ? extraClasses : ''}`}
      aria-label="Loading"
    >
      <div className="a-loader__cube a-loader__cube-1"></div>
      <div className="a-loader__cube a-loader__cube-2"></div>
      <div className="a-loader__cube a-loader__cube-4"></div>
      <div className="a-loader__cube a-loader__cube-3"></div>
    </div>
  )
}
