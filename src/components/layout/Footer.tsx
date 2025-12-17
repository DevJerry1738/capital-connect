import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-left">© {new Date().getFullYear()} Abuja Connect</div>
        <nav className="footer-nav" aria-label="Footer navigation">
          <Link to="/">Home</Link>
          <Link to="/providers">Providers</Link>
          <Link to="/map">Map</Link>
        </nav>
      </div>
    </footer>
  )
}
