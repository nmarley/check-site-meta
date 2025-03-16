"use client"

export function logEvent(ev: string) {
  try {
    const version = document.querySelector('meta[name="csm-version"]')?.getAttribute('content')
    const disableAnalytics = document.querySelector('meta[name="disable_analytics"]')?.getAttribute('content')

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
