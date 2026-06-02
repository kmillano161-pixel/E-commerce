export default function SectionTitle({ title, subtitle, className = '' }) {
  return (
    <div className={`mb-6 ${className}`.trim()}>
      <h1 className="bb-title">{title}</h1>
      {subtitle ? <p className="bb-subtitle text-sm">{subtitle}</p> : null}
    </div>
  )
}

