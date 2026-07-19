import { useNavigate, useLocation } from 'react-router-dom'

export default function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()

  const links = [
    { path: '/', label: 'Dashboard' },
    { path: '/dashboard', label: 'Analytics' },
    { path: '/admin', label: 'Admin' },
  ]

  return (
    <nav className="bg-slate-900 border-b border-slate-700 px-6 py-3">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <span className="text-white font-bold text-lg">🛡 DDoS Monitor</span>
        <div className="flex gap-4">
          {links.map(link => (
            <button
              key={link.path}
              onClick={() => navigate(link.path)}
              className={`text-sm px-3 py-1.5 rounded-lg transition ${
                location.pathname === link.path
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}