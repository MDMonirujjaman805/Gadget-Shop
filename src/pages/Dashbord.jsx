import { useContext, useMemo, useState } from 'react'
import { AppContext } from '../context/AppContext.jsx'
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const { cart, wishlist, cartTotal, removeFromCart, removeFromWishlist, moveWishlistToCart, clearCart } = useContext(AppContext)
  const [tab, setTab] = useState('cart')
  const [sorted, setSorted] = useState(false)
  const navigate = useNavigate()

  const cartView = useMemo(() => {
    const list = [...cart]
    if (sorted) list.sort((a,b)=>b.price - a.price)
    return list
  }, [cart, sorted])

  return (
    <div className="container mx-auto px-4 py-8">
      <Helmet><title>Dashboard | GadgetHeaven</title></Helmet>

      <div role="tablist" className="tabs tabs-boxed mb-6">
        <a role="tab" className={`tab ${tab==='cart' ? 'tab-active':''}`} onClick={()=>setTab('cart')}>Cart</a>
        <a role="tab" className={`tab ${tab==='wish' ? 'tab-active':''}`} onClick={()=>setTab('wish')}>Wish List</a>
      </div>

      {tab==='cart' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-lg font-semibold">Total: ${cartTotal}</p>
            <div className="flex gap-2">
              <button className="btn btn-outline btn-sm" onClick={()=>setSorted(s=>!s)}>Sort by Price ⬇</button>
              <button className="btn btn-success btn-sm" disabled={cart.length===0} onClick={()=>document.getElementById('purchase_modal').showModal()}>Purchase</button>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {cartView.map(item => (
              <div key={item.product_id} className="card bg-base-100 shadow">
                <figure className="px-6 pt-6"><img src={item.product_image} className="h-36 object-contain" /></figure>
                <div className="card-body">
                  <h3 className="card-title">{item.product_title}</h3>
                  <p>${item.price}</p>
                  <button className="btn btn-error btn-sm" onClick={()=>removeFromCart(item.product_id)}>Remove</button>
                </div>
              </div>
            ))}
          </div>

          <dialog id="purchase_modal" className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Congrats! 🎉</h3>
              <p className="py-4">Your purchase was successful.</p>
              <div className="modal-action">
                <form method="dialog" className="flex gap-2">
                  <button className="btn" onClick={()=>{ clearCart(); navigate('/') }}>Close</button>
                </form>
              </div>
            </div>
          </dialog>
        </div>
      )}

      {tab==='wish' && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {wishlist.map(item => (
            <div key={item.product_id} className="card bg-base-100 shadow">
              <figure className="px-6 pt-6"><img src={item.product_image} className="h-36 object-contain" /></figure>
              <div className="card-body">
                <h3 className="card-title">{item.product_title}</h3>
                <p>${item.price}</p>
                <div className="flex gap-2">
                  <button className="btn btn-primary btn-sm" onClick={()=>moveWishlistToCart(item)}>Add to Cart</button>
                  <button className="btn btn-outline btn-sm" onClick={()=>removeFromWishlist(item.product_id)}>Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}