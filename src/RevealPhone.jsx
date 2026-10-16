import React, { useEffect, useRef, useState } from 'react'
import { Phone } from 'lucide-react'
import { analyticsService } from './services/analyticsService'

export default function RevealPhone({ className = '', iconClassName = 'h-4 w-4', onClick, 'aria-label': ariaLabel = 'Call Kleihaus Ceramics', clickedElement = 'phone_link' }) {
  const [revealed, setRevealed] = useState(false)
  const linkRef = useRef(null)

  useEffect(() => {
    if (revealed) linkRef.current?.focus({ preventScroll: true })
  }, [revealed])

  const classes = `phone-control inline-flex items-center gap-2 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 ${className}`
  const icon = <Phone className={`${iconClassName} shrink-0`} aria-hidden="true" />

  return revealed ? (
    <a ref={linkRef} href="tel:+254748827166" className={classes}
      aria-label={`${ariaLabel}: +254 748 827 166`}
      onClick={onClick || (() => analyticsService.track('phone_click', { clickedElement }))}>
      {icon}<span>+254 748 827 166</span>
    </a>
  ) : (
    <button type="button" className={classes} aria-label={`${ariaLabel} — reveal phone number`}
      onClick={() => setRevealed(true)}>
      {icon}<span>Call</span>
    </button>
  )
}
