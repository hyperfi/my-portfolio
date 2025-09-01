import DOMPurify from 'dompurify'

// Centralized sanitizer for blog content
// Allows safe embedding of images, videos, and iframes (YouTube/Vimeo)
// Also rewrites common non-embeddable YouTube/Vimeo iframe URLs to proper embed URLs.
// DOMPurify will still block dangerous URLs (javascript:) by default.
export function sanitizeHTML(html) {
  const rewritten = rewriteEmbeds(html)
  return DOMPurify.sanitize(rewritten, {
    ADD_TAGS: ['iframe', 'video', 'source'],
    ADD_ATTR: [
      'allow',
      'allowfullscreen',
      'frameborder',
      'src',
      'controls',
      'type',
      'poster',
      'width',
      'height',
      'loading',
      'referrerpolicy'
    ]
  })
}

function rewriteEmbeds(html) {
  if (typeof document === 'undefined') return html
  try {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = html || ''

    // Rewrite YouTube and Vimeo iframes to embed forms
    const iframes = wrapper.querySelectorAll('iframe')
    iframes.forEach((iframe) => {
      const src = iframe.getAttribute('src') || ''
      const yt = toYouTubeEmbed(src)
      const vm = toVimeoEmbed(src)
      if (yt) {
        iframe.setAttribute('src', yt)
        iframe.setAttribute('loading', iframe.getAttribute('loading') || 'lazy')
        iframe.setAttribute('referrerpolicy', iframe.getAttribute('referrerpolicy') || 'strict-origin-when-cross-origin')
        iframe.setAttribute('allow', iframe.getAttribute('allow') || 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture')
        iframe.setAttribute('allowfullscreen', '')
      } else if (vm) {
        iframe.setAttribute('src', vm)
        iframe.setAttribute('loading', iframe.getAttribute('loading') || 'lazy')
        iframe.setAttribute('referrerpolicy', iframe.getAttribute('referrerpolicy') || 'strict-origin-when-cross-origin')
        iframe.setAttribute('allow', iframe.getAttribute('allow') || 'autoplay; fullscreen; picture-in-picture')
        iframe.setAttribute('allowfullscreen', '')
      }
    })

    return wrapper.innerHTML
  } catch {
    return html
  }
}

function toYouTubeEmbed(url) {
  try {
    const u = new URL(url)
    const host = u.hostname.replace(/^www\./, '')
    // Already embed or nocookie
    if (host === 'youtube.com' && u.pathname.startsWith('/embed/')) return url
    if (host === 'youtube-nocookie.com' && u.pathname.startsWith('/embed/')) return url

    let id = null
    if (host === 'youtu.be') {
      id = u.pathname.slice(1)
    } else if (host === 'youtube.com' || host === 'm.youtube.com') {
      if (u.pathname === '/watch') id = u.searchParams.get('v')
      if (!id && u.pathname.startsWith('/shorts/')) id = u.pathname.split('/')[2]
      if (!id && u.pathname.startsWith('/live/')) id = u.pathname.split('/')[2]
    }
    return id ? `https://www.youtube-nocookie.com/embed/${id}` : null
  } catch {
    return null
  }
}

function toVimeoEmbed(url) {
  try {
    const u = new URL(url)
    const host = u.hostname.replace(/^www\./, '')
    if (host === 'player.vimeo.com' && u.pathname.startsWith('/video/')) return url
    if (host === 'vimeo.com') {
      const id = u.pathname.split('/').filter(Boolean).pop()
      return id ? `https://player.vimeo.com/video/${id}` : null
    }
    return null
  } catch {
    return null
  }
}

