// /* eslint-disable react-refresh/only-export-components */
// import { createContext, useEffect, useMemo, useState } from 'react'
// import { toast } from 'react-toastify'

// export const AppContext = createContext()

// const MAX_CART_TOTAL = 1000

// export default function AppProvider({ children }) {
//   const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cart') || '[]'))
//   const [wishlist, setWishlist] = useState(() => JSON.parse(localStorage.getItem('wishlist') || '[]'))

//   useEffect(() => {
//     localStorage.setItem('cart', JSON.stringify(cart))
//   }, [cart])

//   useEffect(() => {
//     localStorage.setItem('wishlist', JSON.stringify(wishlist))
//   }, [wishlist])

//   const cartTotal = useMemo(() => cart.reduce((sum, i) => sum + (i.price || 0), 0), [cart])

//   const addToWishlist = (item) => {
//     if (wishlist.find(w => w.product_id === item.product_id)) return
//     setWishlist(prev => [...prev, item])
//     toast.info('Added to Wishlist ♥')
//   }

//   const removeFromWishlist = (id) => setWishlist(prev => prev.filter(i => i.product_id !== id))

//   const addToCart = (item) => {
//     const newTotal = cartTotal + item.price
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

//   const removeFromCart = (id) => setCart(prev => prev.filter(i => i.product_id != id))

//   const clearCart = () => setCart([])

//   const value = { cart, wishlist, cartTotal, addToCart, addToWishlist, removeFromCart, removeFromWishlist, moveWishlistToCart, clearCart }
//   return <AppContext.Provider value={value}>{children}</AppContext.Provider>
// }


// // import { createContext, useEffect, useMemo, useState } from 'react'
// // import { toast } from 'react-toastify'

// // // eslint-disable-next-line react-refresh/only-export-components
// // export const AppContext = createContext()

// // const MAX_CART_TOTAL = 1000

// // export default function AppProvider({ children }) {
// //   const [cart, setCart] = useState(() => {
// //     try { return JSON.parse(localStorage.getItem('cart')) || [] } 
// //     catch { return [] }
// //   })
// //   const [wishlist, setWishlist] = useState(() => {
// //     try { return JSON.parse(localStorage.getItem('wishlist')) || [] } 
// //     catch { return [] }
// //   })

// //   useEffect(() => {
// //     localStorage.setItem('cart', JSON.stringify(cart))
// //   }, [cart])

// //   useEffect(() => {
// //     localStorage.setItem('wishlist', JSON.stringify(wishlist))
// //   }, [wishlist])

// //   const cartTotal = useMemo(
// //     () => cart.reduce((sum, i) => sum + Number(i.price || 0), 0),
// //     [cart]
// //   )

// //   const addToWishlist = (item) => {
// //     if (wishlist.find(w => w.product_id === item.product_id)) return
// //     setWishlist(prev => [...prev, item])
// //     toast.info('Added to Wishlist ♥')
// //   }

// //   const removeFromWishlist = (id) =>
// //     setWishlist(prev => prev.filter(i => i.product_id !== id))

// //   const addToCart = (item) => {
// //     const newTotal = cart.reduce((sum, i) => sum + Number(i.price || 0), 0) + Number(item.price || 0)
// //     if (newTotal > MAX_CART_TOTAL) {
// //       toast.error('Cart total cannot exceed $1000')
// //       return false
// //     }
// //     setCart(prev => [...prev, item])
// //     toast.success('Added to Cart 🛒')
// //     return true
// //   }

// //   const moveWishlistToCart = (item) => {
// //     const ok = addToCart(item)
// //     if (ok) removeFromWishlist(item.product_id)
// //   }

// //   const removeFromCart = (id) =>
// //     setCart(prev => prev.filter(i => i.product_id !== id))

// //   const clearCart = () => setCart([])

// //   const value = {
// //     cart,
// //     wishlist,
// //     cartTotal,
// //     addToCart,
// //     addToWishlist,
// //     removeFromCart,
// //     removeFromWishlist,
// //     moveWishlistToCart,
// //     clearCart
// //   }

// //   return <AppContext.Provider value={value}>{children}</AppContext.Provider>
// // }




// claude...........
import { createContext, useEffect, useMemo, useState, useCallback } from 'react'
import { toast } from 'react-toastify'

// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext()

const MAX_CART_TOTAL = 1000

// Safe JSON parse with fallback
const safeJSONParse = (key, fallback = []) => {
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : fallback
  } catch (error) {
    console.warn(`Failed to parse ${key} from localStorage:`, error)
    return fallback
  }
}

export default function AppProvider({ children }) {
  const [cart, setCart] = useState(() => safeJSONParse('cart', []))
  const [wishlist, setWishlist] = useState(() => safeJSONParse('wishlist', []))

  // Safe localStorage setter
  const safeSetLocalStorage = useCallback((key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error(`Failed to save ${key} to localStorage:`, error)
      toast.error('Failed to save data. Please check your browser settings.')
    }
  }, [])

  useEffect(() => {
    safeSetLocalStorage('cart', cart)
  }, [cart, safeSetLocalStorage])

  useEffect(() => {
    safeSetLocalStorage('wishlist', wishlist)
  }, [wishlist, safeSetLocalStorage])

  const cartTotal = useMemo(() => 
    cart.reduce((sum, item) => sum + (Number(item.price) || 0), 0), 
    [cart]
  )

  const addToWishlist = useCallback((item) => {
    if (!item || !item.product_id) {
      toast.error('Invalid product')
      return
    }
    
    if (wishlist.find(w => w.product_id === item.product_id)) {
      toast.info('Already in wishlist')
      return
    }
    
    setWishlist(prev => [...prev, item])
    toast.info('Added to Wishlist ♥')
  }, [wishlist])

  const removeFromWishlist = useCallback((id) => {
    setWishlist(prev => prev.filter(i => i.product_id !== id))
    toast.info('Removed from wishlist')
  }, [])

  const addToCart = useCallback((item) => {
    if (!item || !item.product_id) {
      toast.error('Invalid product')
      return false
    }

    const itemPrice = Number(item.price) || 0
    const newTotal = cartTotal + itemPrice
    
    if (newTotal > MAX_CART_TOTAL) {
      toast.error(`Cart total cannot exceed $${MAX_CART_TOTAL}`)
      return false
    }
    
    setCart(prev => [...prev, item])
    toast.success('Added to Cart 🛒')
    return true
  }, [cartTotal])

  const moveWishlistToCart = useCallback((item) => {
    const success = addToCart(item)
    if (success) {
      removeFromWishlist(item.product_id)
    }
  }, [addToCart, removeFromWishlist])

  const removeFromCart = useCallback((id) => {
    setCart(prev => prev.filter(i => i.product_id !== id))
    toast.info('Removed from cart')
  }, [])

  const clearCart = useCallback(() => {
    setCart([])
    toast.success('Cart cleared')
  }, [])

  const value = useMemo(() => ({
    cart,
    wishlist,
    cartTotal,
    addToCart,
    addToWishlist,
    removeFromCart,
    removeFromWishlist,
    moveWishlistToCart,
    clearCart
  }), [
    cart,
    wishlist,
    cartTotal,
    addToCart,
    addToWishlist,
    removeFromCart,
    removeFromWishlist,
    moveWishlistToCart,
    clearCart
  ])

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}