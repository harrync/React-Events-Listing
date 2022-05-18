/**
 * General purpose buttons
 */
type Props = {
  classes?: string
  active?: boolean
  clicked?: (e?: React.MouseEvent<HTMLElement>) => void
  ariaLabel?: string
  children: React.ReactNode
  target?: string
}

export default function Button({
  classes,
  active,
  clicked,
  ariaLabel,
  target,
  children,
}: Props) {
  return (
    <button
      type="button"
      className={`${classes ? classes : 'a-btn'} ${active ? 'active' : ''}`}
      onClick={clicked}
      aria-label={ariaLabel}
      data-target={target}
    >
      {children}
    </button>
  )
}
