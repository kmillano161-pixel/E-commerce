import { forwardRef } from 'react'

function getVariantClasses({ variant, className }) {
  const base = 'bb-btn-primary'
  if (variant === 'secondary') return `bb-btn-secondary ${className}`.trim()
  if (variant === 'ghost') return `rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 ${className || ''}`.trim()
  return `${base} ${className || ''}`.trim()
}

export const Button = forwardRef(function Button(
  { as: As = 'button', variant = 'primary', className, ...props },
  ref,
) {
  return <As ref={ref} className={getVariantClasses({ variant, className })} {...props} />
})

export default Button

