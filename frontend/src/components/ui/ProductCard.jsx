import Badge from './Badge'
import ImageFrame from './ImageFrame'
import Price from './Price'
import Button from './Button'
import Card from './Card'

export default function ProductCard({ product, onAdd }) {
  return (
    <Card className="group bb-card-hover p-5">
      <div className="flex items-center justify-between gap-3">
        <Badge tone="blue">{product.tag}</Badge>
        <Price amount={product.price} />
      </div>

      <ImageFrame src={product.image} alt={product.name} />

      <div className="mt-4">
        <div className="text-base font-semibold text-slate-900">{product.name}</div>
        <div className="mt-3 flex items-center justify-between gap-3">
          <div className="text-xs text-slate-600">Free returns</div>
          <Button onClick={() => onAdd?.(product)} className="text-xs" disabled={!onAdd}>
            Add to cart
          </Button>
        </div>
      </div>
    </Card>
  )
}

