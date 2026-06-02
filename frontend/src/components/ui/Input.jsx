import { forwardRef } from 'react'

export const Input = forwardRef(function Input(
  { className = '', ...props },
  ref,
) {
  return <input ref={ref} className={`bb-input ${className}`.trim()} {...props} />
})

export default Input

