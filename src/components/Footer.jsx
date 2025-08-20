export default function Footer() {
  return (
    <footer className="bg-base-300 mt-10">
      <div className="container mx-auto px-4 py-10 grid md:grid-cols-3 gap-6">
        <div>
          <h3 className="font-bold text-lg">GadgetHeaven</h3>
          <p>Your go-to destination for the latest and greatest gadgets.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Quick Links</h4>
          <ul className="space-y-1">
            <li><a href="/" className="link link-hover">Home</a></li>
            <li><a href="/dashboard" className="link link-hover">Dashboard</a></li>
            <li><a href="/stats" className="link link-hover">Stats</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Contact</h4>
          <p>Email: support@gadgetheaven.dev</p>
          <p>© {new Date().getFullYear()} GadgetHeaven</p>
        </div>
      </div>
    </footer>
  )
}