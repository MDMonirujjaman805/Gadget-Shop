import { Link } from 'react-router-dom'

export default function Banner() {
  return (
    <div className="hero min-h-[320px] bg-base-200 rounded-2xl">
      <div className="hero-content text-center">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold">GadgetHeaven ✨</h1>
          <p className="py-4">Your go-to destination for the latest and greatest gadgets.</p>
          <Link to="/dashboard" className="btn btn-primary">Go to Dashboard</Link>
        </div>
      </div>
    </div>
  )
}