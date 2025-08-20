import { NavLink } from 'react-router-dom'

export default function Navbar({ isHome }) {
  const link = 'px-3 py-2 rounded-lg'
  const active = 'bg-primary text-primary-content'
  return (
    <div className={`navbar ${isHome ? 'bg-base-100' : 'bg-base-100 shadow-sm'}`}>
      <div className="container mx-auto px-4">
        <div className="flex-1">
          <NavLink to="/" className="text-xl font-bold">⚡ GadgetHeaven</NavLink>
        </div>
        <div className="flex gap-2">
          <NavLink to="/dashboard" className={({isActive})=>`${link} ${isActive?active:''}`}>Dashboard</NavLink>
          <NavLink to="/stats" className={({isActive})=>`${link} ${isActive?active:''}`}>Stats</NavLink>
          <NavLink to="/about" className={({isActive})=>`${link} ${isActive?active:''}`}>About</NavLink>
        </div>
      </div>
    </div>
  )
}