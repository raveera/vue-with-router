export function highlightText (text, keyword) {
  if (text) {
    const regex = new RegExp(keyword, 'gi')

    return text.replace(regex, '<mark class="bg-yellow-accent-2 pa-0">$&</mark>')
  }
}

export default {
  highlightText
}
