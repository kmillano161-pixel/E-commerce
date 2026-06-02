export default function ImageFrame({ src, alt, className = '' }) {
  return (
    <div className={`mt-4 aspect-[4/3] overflow-hidden rounded-xl border border-slate-200 bg-slate-50 ${className}`.trim()}>
      <img src={src} alt={alt} className="h-full w-full object-cover opacity-80 transition group-hover:scale-[1.03]" />
    </div>
  )
}

