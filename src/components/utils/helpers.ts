/**
 * JSON feed base url
 */
export const siteUrl = window.location.origin
// export const siteUrl = 'https://courtauld.ac.uk/'

/**
 * Render HTML from string
 */
export function htmlDecode(input: string) {
  const doc = new DOMParser().parseFromString(input, 'text/html')
  return doc.documentElement.textContent
}

/**
 * Human readable date strings
 */
export function formatDateHuman(date: Date, separator: string) {
  return (
    date.getDate() +
    separator +
    (date.getMonth() + 1) +
    separator +
    date.getFullYear()
  )
}

/**
 * Querystring friendly date strings
 */
export function formatDateUrl(date: Date) {
  return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
}
