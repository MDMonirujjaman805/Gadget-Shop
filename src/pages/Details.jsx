import { useParams } from 'react-router-dom'
import data from '../assets/data.json'
import { AppContext } from '../context/AppContext.jsx'
import { useContext, useMemo, useState } from 'react'
import { Helmet } from 'react-helmet-async'

export default function Details() {
  const { id } = useParams()
  const product = useMemo(() => data.find(d => d.product_id === id), [id])
  const { addToCart, addToWishlist, wishlist } = useContext(AppContext)
  const alreadyInWish = wishlist.some(w => w.product_id === id)
  const [wishDisabled, setWishDisabled] = useState(alreadyInWish)

  if (!product) {
    return <div className="container mx-auto px-4 py-10">Product not found.</div>
  }

  const handleWish = () => {
    addToWishlist(product)
    setWishDisabled(true)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Helmet><title>{product.product_title} | GadgetHeaven</title></Helmet>
      <div className="grid lg:grid-cols-2 gap-8 bg-base-100 p-6 rounded-2xl">
        <img src={product.product_image} alt={product.product_title} className="w-full rounded-xl object-contain" />
        <div className="space-y-3">
          <h1 className="text-3xl font-bold">{product.product_title}</h1>
          <p className="text-xl font-semibold">${product.price}</p>
          <p className="opacity-80">{product.description}</p>
          <div className="space-y-1">
            <p><span className="font-semibold">Category:</span> {product.category}</p>
            <p><span className="font-semibold">Availability:</span> {product.availability ? 'In Stock' : 'Out of stock'}</p>
            <p><span className="font-semibold">Rating:</span> {product.rating} ⭐</p>
            <div>
              <span className="font-semibold">Specification:</span>
              <ul className="list-disc ml-6">
                {product.Specification.map((s,i)=>(<li key={i}>{s}</li>))}
              </ul>
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button className="btn btn-primary" onClick={()=>addToCart(product)}>Add to Cart 🛒</button>
            <button className="btn btn-outline" onClick={handleWish} disabled={wishDisabled}>♥ Wishlist</button>
          </div>
        </div>
      </div>
    </div>
  )
}