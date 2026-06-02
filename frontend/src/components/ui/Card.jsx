import { forwardRef } from 'react'

export const Card = forwardRef(function Card({
  className = '',
  as: As = 'div',
  children,
  ...rest
}, ref) {
  return (
    <As ref={ref} className={`bb-card ${className}`.trim()} {...rest}>
      {children}
    </As>
  )
})

export default Card

