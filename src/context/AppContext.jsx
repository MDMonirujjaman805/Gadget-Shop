/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify'

export const AppContext = createContext()

const MAX_CART_TOTAL = 1000

export default function AppProvider({ children }) {
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cart') || '[]'))
  const [wishlist, setWishlist] = useState(() => JSON.parse(localStorage.getItem('wishlist') || '[]'))

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist))
  }, [wishlist])

  const cartTotal = useMemo(() => cart.reduce((sum, i) => sum + (i.price || 0), 0), [cart])

  const addToWishlist = (item) => {
    if (wishlist.find(w => w.product_id === item.product_id)) return
    setWishlist(prev => [...prev, item])
    toast.info('Added to Wishlist ♥')
  }

  const removeFromWishlist = (id) => setWishlist(prev => prev.filter(i => i.product_id !== id))

  const addToCart = (item) => {
    const newTotal = cartTotal + item.price
    if (newTotal > MAX_CART_TOTAL) {
      toast.error('Cart total cannot exceed $1000')
      return false
    }
    setCart(prev => [...prev, item])
    toast.success('Added to Cart 🛒')
    return true
  }

  const moveWishlistToCart = (item) => {
    const ok = addToCart(item)
    if (ok) removeFromWishlist(item.product_id)
  }

  const removeFromCart = (id) => setCart(prev => prev.filter(i => i.product_id != id))

  const clearCart = () => setCart([])

  const value = { cart, wishlist, cartTotal, addToCart, addToWishlist, removeFromCart, removeFromWishlist, moveWishlistToCart, clearCart }
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}


// import { createContext, useEffect, useMemo, useState } from 'react'
// import { toast } from 'react-toastify'

// // eslint-disable-next-line react-refresh/only-export-components
// export const AppContext = createContext()

// const MAX_CART_TOTAL = 1000

// export default function AppProvider({ children }) {
//   const [cart, setCart] = useState(() => {
//     try { return JSON.parse(localStorage.getItem('cart')) || [] } 
//     catch { return [] }
//   })
//   const [wishlist, setWishlist] = useState(() => {
//     try { return JSON.parse(localStorage.getItem('wishlist')) || [] } 
//     catch { return [] }
//   })

//   useEffect(() => {
//     localStorage.setItem('cart', JSON.stringify(cart))
//   }, [cart])

//   useEffect(() => {
//     localStorage.setItem('wishlist', JSON.stringify(wishlist))
//   }, [wishlist])

//   const cartTotal = useMemo(
//     () => cart.reduce((sum, i) => sum + Number(i.price || 0), 0),
//     [cart]
//   )

//   const addToWishlist = (item) => {
//     if (wishlist.find(w => w.product_id === item.product_id)) return
//     setWishlist(prev => [...prev, item])
//     toast.info('Added to Wishlist ♥')
//   }

//   const removeFromWishlist = (id) =>
//     setWishlist(prev => prev.filter(i => i.product_id !== id))

//   const addToCart = (item) => {
//     const newTotal = cart.reduce((sum, i) => sum + Number(i.price || 0), 0) + Number(item.price || 0)
//     if (newTotal > MAX_CART_TOTAL) {
//       toast.error('Cart total cannot exceed $1000')
//       return false
//     }
//     setCart(prev => [...prev, item])
//     toast.success('Added to Cart 🛒')
//     return true
//   }

//   const moveWishlistToCart = (item) => {
//     const ok = addToCart(item)
//     if (ok) removeFromWishlist(item.product_id)
//   }

//   const removeFromCart = (id) =>
//     setCart(prev => prev.filter(i => i.product_id !== id))

//   const clearCart = () => setCart([])

//   const value = {
//     cart,
//     wishlist,
//     cartTotal,
//     addToCart,
//     addToWishlist,
//     removeFromCart,
//     removeFromWishlist,
//     moveWishlistToCart,
//     clearCart
//   }

//   return <AppContext.Provider value={value}>{children}</AppContext.Provider>
// }
