type Props = {
  href: string
  title: string
  ariaLabel?: string
  tabIndex?: number
  classes?: string
  target?: string
  children: React.ReactNode
}

export default function Link({
  href,
  title,
  ariaLabel,
  tabIndex,
  classes,
  target,
  children,
}: Props) {
  return (
    <a
      href="/#disabled-for-example"
      className={classes}
      title={title}
      aria-label={ariaLabel}
      tabIndex={tabIndex}
      target={target}
    >
      {children}
    </a>
  )
}
