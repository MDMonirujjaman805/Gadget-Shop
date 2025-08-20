import { Helmet } from 'react-helmet-async'

export default function About() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Helmet><title>About | GadgetHeaven</title></Helmet>
      <div className="prose max-w-3xl">
        <h1>About GadgetHeaven</h1>
        <p>We help you pick the right tech with clean UI and smooth UX.</p>
      </div>
    </div>
  )
}
