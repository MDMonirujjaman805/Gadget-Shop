import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <Helmet><title>404 | GadgetHeaven</title></Helmet>
      <h1 className="text-6xl font-bold">404</h1>
      <p className="mt-2">Page not found.</p>
      <Link to="/" className="btn btn-primary mt-4">Go Home</Link>
    </div>
  )
}
