// import { useParams } from 'react-router-dom'
// import data from '../assets/data.json'
// import { AppContext } from '../context/AppContext.jsx'
// import { useContext, useMemo, useState } from 'react'
// import { Helmet } from 'react-helmet-async'

// export default function Details() {
//   const { id } = useParams()
//   const product = useMemo(() => data.find(d => d.product_id === id), [id])
//   const { addToCart, addToWishlist, wishlist } = useContext(AppContext)
//   const alreadyInWish = wishlist.some(w => w.product_id === id)
//   const [wishDisabled, setWishDisabled] = useState(alreadyInWish)

//   if (!product) {
//     return <div className="container mx-auto px-4 py-10">Product not found.</div>
//   }

//   const handleWish = () => {
//     addToWishlist(product)
//     setWishDisabled(true)
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <Helmet><title>{product.product_title} | GadgetHeaven</title></Helmet>
//       <div className="grid lg:grid-cols-2 gap-8 bg-base-100 p-6 rounded-2xl">
//         <img src={product.product_image} alt={product.product_title} className="w-full rounded-xl object-contain" />
//         <div className="space-y-3">
//           <h1 className="text-3xl font-bold">{product.product_title}</h1>
//           <p className="text-xl font-semibold">${product.price}</p>
//           <p className="opacity-80">{product.description}</p>
//           <div className="space-y-1">
//             <p><span className="font-semibold">Category:</span> {product.category}</p>
//             <p><span className="font-semibold">Availability:</span> {product.availability ? 'In Stock' : 'Out of stock'}</p>
//             <p><span className="font-semibold">Rating:</span> {product.rating} ⭐</p>
//             <div>
//               <span className="font-semibold">Specification:</span>
//               <ul className="list-disc ml-6">
//                 {product.Specification.map((s,i)=>(<li key={i}>{s}</li>))}
//               </ul>
//             </div>
//           </div>
//           <div className="flex gap-3 pt-2">
//             <button className="btn btn-primary" onClick={()=>addToCart(product)}>Add to Cart 🛒</button>
//             <button className="btn btn-outline" onClick={handleWish} disabled={wishDisabled}>♥ Wishlist</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// Claude..............
import { useParams, useNavigate } from 'react-router-dom'
import data from '../assets/data.json'
import { AppContext } from '../context/AppContext.jsx'
import { useContext, useMemo, useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'

export default function Details() {
  const { id } = useParams()
  const navigate = useNavigate()
  const product = useMemo(() => data.find(d => d.product_id === id), [id])
  const { addToCart, addToWishlist, wishlist } = useContext(AppContext)
  
  const alreadyInWish = useMemo(() => 
    wishlist.some(w => w.product_id === id), 
    [wishlist, id]
  )
  
  const [wishDisabled, setWishDisabled] = useState(alreadyInWish)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setWishDisabled(alreadyInWish)
  }, [alreadyInWish])

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-10 text-center">
        <Helmet><title>Product Not Found | GadgetHeaven</title></Helmet>
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <p className="mb-4">The product you're looking for doesn't exist.</p>
        <button className="btn btn-primary" onClick={() => navigate('/')}>
          Back to Home
        </button>
      </div>
    )
  }

  const handleAddToCart = async () => {
    setIsLoading(true)
    try {
      addToCart(product)
    } finally {
      setIsLoading(false)
    }
  }

  const handleWish = () => {
    addToWishlist(product)
    setWishDisabled(true)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Helmet><title>{product.product_title} | GadgetHeaven</title></Helmet>
      
      {/* Breadcrumb */}
      <nav className="text-sm breadcrumbs mb-6">
        <ul>
          <li><button onClick={() => navigate('/')}>Home</button></li>
          <li>{product.category.replace('-', ' ')}</li>
          <li>{product.product_title}</li>
        </ul>
      </nav>

      <div className="grid lg:grid-cols-2 gap-8 bg-base-100 p-6 rounded-2xl shadow-lg">
        <div>
          <img 
            src={product.product_image} 
            alt={product.product_title} 
            className="w-full rounded-xl object-contain max-h-96"
            loading="eager"
          />
        </div>
        
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{product.product_title}</h1>
          
          <div className="flex items-center gap-4">
            <p className="text-2xl font-semibold text-primary">${product.price}</p>
            {product.availability ? (
              <span className="badge badge-success">In Stock</span>
            ) : (
              <span className="badge badge-error">Out of Stock</span>
            )}
          </div>

          <p className="text-base-content/80">{product.description}</p>
          
          <div className="space-y-3">
            <div>
              <span className="font-semibold">Category:</span>
              <span className="ml-2 capitalize">{product.category.replace('-', ' ')}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="font-semibold">Rating:</span>
              <div className="flex items-center gap-1">
                <span>{product.rating}</span>
                <div className="rating rating-sm">
                  {[1,2,3,4,5].map(star => (
                    <input 
                      key={star}
                      type="radio" 
                      className="mask mask-star-2 bg-orange-400" 
                      checked={star <= Math.round(product.rating)}
                      readOnly
                    />
                  ))}
                </div>
              </div>
            </div>
            
            {product.Specification && product.Specification.length > 0 && (
              <div>
                <span className="font-semibold">Specifications:</span>
                <ul className="list-disc ml-6 mt-1 space-y-1">
                  {product.Specification.map((spec, index) => (
                    <li key={index}>{spec}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          
          <div className="flex gap-3 pt-4">
            <button 
              className="btn btn-primary"
              onClick={handleAddToCart}
              disabled={!product.availability || isLoading}
              aria-label={`Add ${product.product_title} to cart`}
            >
              {isLoading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                <>🛒 Add to Cart</>
              )}
            </button>
            
            <button 
              className="btn btn-outline"
              onClick={handleWish} 
              disabled={wishDisabled}
              aria-label={`Add ${product.product_title} to wishlist`}
            >
              ♥ {wishDisabled ? 'In Wishlist' : 'Wishlist'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}