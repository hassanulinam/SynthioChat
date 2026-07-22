/**
 * Minimal markdown renderer (no extra deps).
 * Supports: **bold**, *italic*, `code`, ```fenced```, [links](url), lists, paragraphs.
 */
function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

function formatInline(text: string): string {
  let result = escapeHtml(text)

  result = result.replace(
    /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,
    '<a href="$2" target="_blank" rel="noreferrer noopener">$1</a>',
  )
  result = result.replace(/`([^`]+)`/g, '<code>$1</code>')
  result = result.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
  result = result.replace(/(^|[^*])\*([^*]+)\*(?!\*)/g, '$1<em>$2</em>')

  return result
}

export function renderMarkdownToHtml(markdown: string): string {
  const normalized = markdown.replaceAll('\r\n', '\n').trim()
  if (!normalized) {
    return ''
  }

  const blocks = normalized.split(/\n{2,}/)
  const htmlParts: string[] = []

  for (const block of blocks) {
    const trimmed = block.trim()
    if (!trimmed) {
      continue
    }

    const fenceMatch = trimmed.match(/^```(?:\w+)?\n?([\s\S]*?)```$/)
    if (fenceMatch) {
      const code = escapeHtml((fenceMatch[1] ?? '').replace(/\n$/, ''))
      htmlParts.push(`<pre><code>${code}</code></pre>`)
      continue
    }

    const lines = trimmed.split('\n')
    const isUnordered = lines.every((line) => /^[-*]\s+/.test(line))
    const isOrdered = lines.every((line) => /^\d+\.\s+/.test(line))

    if (isUnordered) {
      const items = lines
        .map((line) => `<li>${formatInline(line.replace(/^[-*]\s+/, ''))}</li>`)
        .join('')
      htmlParts.push(`<ul>${items}</ul>`)
      continue
    }

    if (isOrdered) {
      const items = lines
        .map((line) => `<li>${formatInline(line.replace(/^\d+\.\s+/, ''))}</li>`)
        .join('')
      htmlParts.push(`<ol>${items}</ol>`)
      continue
    }

    htmlParts.push(`<p>${formatInline(lines.join(' '))}</p>`)
  }

  return htmlParts.join('')
}
