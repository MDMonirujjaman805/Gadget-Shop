// chatGPT............

// import { useContext, useMemo, useState } from 'react'
// import { AppContext } from '../context/AppContext.jsx'
// import { Helmet } from 'react-helmet-async'
// import { useNavigate } from 'react-router-dom'

// export default function Dashboard() {
//   const { cart, wishlist, cartTotal, removeFromCart, removeFromWishlist, moveWishlistToCart, clearCart } = useContext(AppContext)
//   const [tab, setTab] = useState('cart')
//   const [sorted, setSorted] = useState(false)
//   const navigate = useNavigate()

//   const cartView = useMemo(() => {
//     const list = [...cart]
//     if (sorted) list.sort((a,b)=>b.price - a.price)
//     return list
//   }, [cart, sorted])

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <Helmet><title>Dashboard | GadgetHeaven</title></Helmet>

//       <div role="tablist" className="tabs tabs-boxed mb-6">
//         <a role="tab" className={`tab ${tab==='cart' ? 'tab-active':''}`} onClick={()=>setTab('cart')}>Cart</a>
//         <a role="tab" className={`tab ${tab==='wish' ? 'tab-active':''}`} onClick={()=>setTab('wish')}>Wish List</a>
//       </div>

//       {tab==='cart' && (
//         <div className="space-y-4">
//           <div className="flex items-center justify-between">
//             <p className="text-lg font-semibold">Total: ${cartTotal}</p>
//             <div className="flex gap-2">
//               <button className="btn btn-outline btn-sm" onClick={()=>setSorted(s=>!s)}>Sort by Price ⬇</button>
//               <button className="btn btn-success btn-sm" disabled={cart.length===0} onClick={()=>document.getElementById('purchase_modal').showModal()}>Purchase</button>
//             </div>
//           </div>
//           <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
//             {cartView.map(item => (
//               <div key={item.product_id} className="card bg-base-100 shadow">
//                 <figure className="px-6 pt-6"><img src={item.product_image} className="h-36 object-contain" /></figure>
//                 <div className="card-body">
//                   <h3 className="card-title">{item.product_title}</h3>
//                   <p>${item.price}</p>
//                   <button className="btn btn-error btn-sm" onClick={()=>removeFromCart(item.product_id)}>Remove</button>
//                 </div>
//               </div>
//             ))}
//           </div>

//           <dialog id="purchase_modal" className="modal">
//             <div className="modal-box">
//               <h3 className="font-bold text-lg">Congrats! 🎉</h3>
//               <p className="py-4">Your purchase was successful.</p>
//               <div className="modal-action">
//                 <form method="dialog" className="flex gap-2">
//                   <button className="btn" onClick={()=>{ clearCart(); navigate('/') }}>Close</button>
//                 </form>
//               </div>
//             </div>
//           </dialog>
//         </div>
//       )}

//       {tab==='wish' && (
//         <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
//           {wishlist.map(item => (
//             <div key={item.product_id} className="card bg-base-100 shadow">
//               <figure className="px-6 pt-6"><img src={item.product_image} className="h-36 object-contain" /></figure>
//               <div className="card-body">
//                 <h3 className="card-title">{item.product_title}</h3>
//                 <p>${item.price}</p>
//                 <div className="flex gap-2">
//                   <button className="btn btn-primary btn-sm" onClick={()=>moveWishlistToCart(item)}>Add to Cart</button>
//                   <button className="btn btn-outline btn-sm" onClick={()=>removeFromWishlist(item.product_id)}>Remove</button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   )
// }


// Claude.........
import { useContext, useMemo, useState, useCallback } from 'react'
import { AppContext } from '../context/AppContext.jsx'
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const { 
    cart, 
    wishlist, 
    cartTotal, 
    removeFromCart, 
    removeFromWishlist, 
    moveWishlistToCart, 
    clearCart 
  } = useContext(AppContext)
  
  const [tab, setTab] = useState('cart')
  const [sorted, setSorted] = useState(false)
  const navigate = useNavigate()

  const cartView = useMemo(() => {
    const list = [...cart]
    if (sorted) list.sort((a,b) => (b.price || 0) - (a.price || 0))
    return list
  }, [cart, sorted])

  const handlePurchase = useCallback(() => {
    clearCart()
    navigate('/')
  }, [clearCart, navigate])

  const toggleSort = useCallback(() => {
    setSorted(prev => !prev)
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <Helmet><title>Dashboard | GadgetHeaven</title></Helmet>

      {/* Tab Navigation */}
      <div role="tablist" className="tabs tabs-boxed mb-6" aria-label="Dashboard sections">
        <button 
          role="tab" 
          className={`tab ${tab==='cart' ? 'tab-active':''}`} 
          onClick={() => setTab('cart')}
          aria-selected={tab === 'cart'}
        >
          Cart ({cart.length})
        </button>
        <button 
          role="tab" 
          className={`tab ${tab==='wish' ? 'tab-active':''}`} 
          onClick={() => setTab('wish')}
          aria-selected={tab === 'wish'}
        >
          Wishlist ({wishlist.length})
        </button>
      </div>

      {/* Cart Tab */}
      {tab === 'cart' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <p className="text-lg font-semibold">Total: ${cartTotal.toFixed(2)}</p>
            <div className="flex gap-2">
              <button 
                className="btn btn-outline btn-sm" 
                onClick={toggleSort}
                aria-label={`Sort by price ${sorted ? 'ascending' : 'descending'}`}
              >
                Sort by Price {sorted ? '⬆' : '⬇'}
              </button>
              <button 
                className="btn btn-success btn-sm" 
                disabled={cart.length === 0} 
                onClick={() => document.getElementById('purchase_modal').showModal()}
              >
                Purchase
              </button>
            </div>
          </div>

          {cart.length === 0 ? (
            <div className="text-center py-12 opacity-60">
              <p className="text-lg">Your cart is empty</p>
              <p className="text-sm">Add some products to get started!</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {cartView.map((item, index) => (
                <div key={`${item.product_id}-${index}`} className="card bg-base-100 shadow">
                  <figure className="px-6 pt-6">
                    <img 
                      src={item.product_image} 
                      alt={item.product_title}
                      className="h-36 object-contain" 
                      loading="lazy"
                    />
                  </figure>
                  <div className="card-body">
                    <h3 className="card-title">{item.product_title}</h3>
                    <p className="font-semibold">${item.price}</p>
                    <button 
                      className="btn btn-error btn-sm" 
                      onClick={() => removeFromCart(item.product_id)}
                      aria-label={`Remove ${item.product_title} from cart`}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Purchase Modal */}
          <dialog id="purchase_modal" className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Congratulations! 🎉</h3>
              <p className="py-4">Your purchase of ${cartTotal.toFixed(2)} was successful!</p>
              <div className="modal-action">
                <form method="dialog">
                  <button className="btn btn-primary" onClick={handlePurchase}>
                    Continue Shopping
                  </button>
                </form>
              </div>
            </div>
            <form method="dialog" className="modal-backdrop">
              <button onClick={handlePurchase}>close</button>
            </form>
          </dialog>
        </div>
      )}

      {/* Wishlist Tab */}
      {tab === 'wish' && (
        <div>
          {wishlist.length === 0 ? (
            <div className="text-center py-12 opacity-60">
              <p className="text-lg">Your wishlist is empty</p>
              <p className="text-sm">Add some products to save for later!</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {wishlist.map(item => (
                <div key={item.product_id} className="card bg-base-100 shadow">
                  <figure className="px-6 pt-6">
                    <img 
                      src={item.product_image} 
                      alt={item.product_title}
                      className="h-36 object-contain" 
                      loading="lazy"
                    />
                  </figure>
                  <div className="card-body">
                    <h3 className="card-title">{item.product_title}</h3>
                    <p className="font-semibold">${item.price}</p>
                    <div className="flex gap-2">
                      <button 
                        className="btn btn-primary btn-sm" 
                        onClick={() => moveWishlistToCart(item)}
                        aria-label={`Move ${item.product_title} to cart`}
                      >
                        Add to Cart
                      </button>
                      <button 
                        className="btn btn-outline btn-sm" 
                        onClick={() => removeFromWishlist(item.product_id)}
                        aria-label={`Remove ${item.product_title} from wishlist`}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}