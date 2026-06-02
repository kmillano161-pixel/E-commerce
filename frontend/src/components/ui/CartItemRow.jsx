export default function CartItemRow({
  name,
  qty,
  unitPrice,
  lineTotal,
  image,
  onDec,
  onInc,
  onRemove,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <div className="flex items-start gap-4">
        <div className="h-16 w-16 rounded-xl border border-slate-200 bg-slate-50 overflow-hidden flex items-center justify-center">
          {image ? (
            <img src={image} alt={name} className="h-full w-full object-cover opacity-90" />
          ) : (
            <span className="text-xs text-slate-400">IMG</span>
          )}
        </div>

        <div className="flex-1">
          <div className="font-medium leading-snug">{name}</div>
          <div className="text-sm text-slate-500">${unitPrice.toFixed(2)} each</div>

          <div className="mt-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                className="rounded-md border border-slate-200 bg-white px-2 py-1 text-sm hover:bg-slate-50"
                onClick={onDec}
                type="button"
              >
                −
              </button>
              <div className="w-8 text-center text-sm">{qty}</div>
              <button
                className="rounded-md border border-slate-200 bg-white px-2 py-1 text-sm hover:bg-slate-50"
                onClick={onInc}
                type="button"
              >
                +
              </button>
            </div>

            <div className="text-sm font-semibold text-slate-900">${lineTotal.toFixed(2)}</div>
          </div>

          <button
            className="mt-3 text-xs text-red-600 hover:text-red-700"
            onClick={onRemove}
            type="button"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  )
}

