import type { ButtonHTMLAttributes, ReactNode } from 'react'

import './IconButton.css'

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
  children?: ReactNode
}

export function IconButton({
  label,
  children,
  className = '',
  type = 'button',
  ...rest
}: IconButtonProps) {
  const classes = ['icon-button', className].filter(Boolean).join(' ')

  return (
    <button type={type} className={classes} aria-label={label} {...rest}>
      {children ?? (
        <span
          className="icon-placeholder"
          data-icon="generic"
          aria-hidden="true"
        />
      )}
      {/* icon-placeholder: generic */}
    </button>
  )
}
