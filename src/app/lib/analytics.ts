"use client"

export function logEvent(ev: string) {
  try {
    const version = document.getElementById('version')?.textContent
    const disableAnalytics = document.getElementById('disable_analytics')?.textContent

    console.log(disableAnalytics, version)
    if (
      !disableAnalytics
      && process.env.NODE_ENV === 'production'
    ) {
      fetch('https://alfon.dev/api/public/analytics', {
        method: 'POST',
        body: JSON.stringify({
          p: 'check-site-meta',
          e: ev,
          m: { version: version, falseReferer: true }
        })
      }).catch(() => { })
    }
  } catch { }
}

export const logCheckButton = () => logEvent('check-button-clicked')
