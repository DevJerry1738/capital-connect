import { Link } from 'react-router-dom'
import { useState } from 'react'
import ccLogo from '../../assets/cc-logo.webp'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="container nav-inner">
        <Link to="/" className="brand">
          <img src={ccLogo} alt="Capital Connect logo" className="brand-logo" />
          <span className="brand-text">Capital Connect</span>
        </Link>

        <button
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="primary-navigation"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Toggle menu</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        <div id="primary-navigation" className={`nav-links ${open ? 'open' : ''}`}>
          <Link to="/">Home</Link>
          <Link to="/providers">Providers</Link>
          <Link to="/map">Map</Link>
        </div>
      </div>
    </nav>
  )
}
