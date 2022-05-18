import { htmlDecode } from '../utils/helpers'

type Props = {
  copy: string
}

/**
 * Output teaser copy
 */
export default function Excerpt({ copy }: Props) {
  return <p>{htmlDecode(copy)}</p>
}
