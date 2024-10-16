import { useLoading } from 'vue-loading-overlay'

export function highlightText (text, keyword) {
  if (text) {
    const regex = new RegExp(keyword, 'gi')

    return text.replace(regex, '<mark class="bg-yellow-accent-2 pa-0">$&</mark>')
  }
}

export const loader = useLoading({
  color: '#01579B',
  loader: 'dots',
  lockScroll: true,
  isFullPage: true,
  height: 64,
  width: 64
})

export default {
  highlightText,
  loader
}
