import { Link } from 'react-router-dom'

export default function ProductCard({ item }) {
  return (
    <div className="card bg-base-100 shadow">
      <figure className="px-6 pt-6">
        <img src={item.product_image} alt={item.product_title} className="rounded-xl h-40 object-contain" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{item.product_title}</h2>
        <p className="text-sm opacity-70">{item.category}</p>
        <p className="font-semibold">${item.price}</p>
        <div className="card-actions justify-end">
          <Link to={`/details/${item.product_id}`} className="btn btn-outline btn-sm">Details</Link>
        </div>
      </div>
    </div>
  )
}
