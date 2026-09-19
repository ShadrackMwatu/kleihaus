import React from 'react'

const ButtonBase = ({ defaultVisuals, className = '', children, ...props }) => (
  <button
    className={`inline-flex items-center justify-center rounded-md border px-4 py-2.5 text-sm font-semibold shadow-sm transition ${/\bbg-/.test(className) ? '' : defaultVisuals} ${className}`}
    {...props}
  >
    {children}
  </button>
)

export const Button = (props) => (
  <ButtonBase
    {...props}
    defaultVisuals="border-brand-forest bg-brand-forest text-white hover:bg-emerald-900"
  />
)

export const ButtonSecondary = (props) => (
  <ButtonBase
    {...props}
    defaultVisuals="border-brand-forest bg-white text-brand-forest hover:border-brand-copper"
  />
)
