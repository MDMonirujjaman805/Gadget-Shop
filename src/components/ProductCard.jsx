
// ChatGPT..............
// import { Link } from 'react-router-dom'

// export default function ProductCard({ item }) {
//   return (
//     <div className="card bg-base-100 shadow">
//       <figure className="px-6 pt-6">
//         <img src={item.product_image} alt={item.product_title} className="rounded-xl h-40 object-contain" />
//       </figure>
//       <div className="card-body">
//         <h2 className="card-title">{item.product_title}</h2>
//         <p className="text-sm opacity-70">{item.category}</p>
//         <p className="font-semibold">${item.price}</p>
//         <div className="card-actions justify-end">
//           <Link to={`/details/${item.product_id}`} className="btn btn-outline btn-sm">Details</Link>
//         </div>
//       </div>
//     </div>
//   )
// }


// Claude......
import { Link } from 'react-router-dom'
import { memo } from 'react'

const ProductCard = memo(function ProductCard({ item }) {
  if (!item) return null

  return (
    <div className="card bg-base-100 shadow hover:shadow-lg transition-shadow">
      <figure className="px-6 pt-6">
        <img 
          src={item.product_image} 
          alt={item.product_title} 
          className="rounded-xl h-40 object-contain"
          loading="lazy"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-lg">{item.product_title}</h2>
        <p className="text-sm opacity-70 capitalize">{item.category.replace('-', ' ')}</p>
        <p className="font-semibold text-primary">${item.price}</p>
        <div className="card-actions justify-end">
          <Link 
            to={`/details/${item.product_id}`} 
            className="btn btn-outline btn-sm"
            aria-label={`View details for ${item.product_title}`}
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  )
})

export default ProductCard