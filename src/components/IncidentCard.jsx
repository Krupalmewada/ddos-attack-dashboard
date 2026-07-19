import { useNavigate } from "react-router-dom";

const timeAgo = (dateStr) => {
    const diff = Date.now() - new Date(dateStr).getTime()
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(hours / 24)
    if (days > 0) return `${days}d ago`
  if (hours > 0) return `${hours}h ago`
  return 'Just now'
}
export default function IncidentCard({ incident }) {
  const navigate = useNavigate()
  const severityColors = {
    'Critical': 'bg-red-500',
    'High': 'bg-orange-500',
    'Medium': 'bg-yellow-500',
    'Low': 'bg-green-500',
  }

  const statusColors = {
    'Active': 'text-red-400 bg-red-400/10',
    'Mitigated': 'text-yellow-400 bg-yellow-400/10',
    'Resolved': 'text-green-400 bg-green-400/10',
  }

  const attackTypeIcons = {
    'Volumetric': '🌊',
    'Protocol': '⚡',
    'Application-layer': '🎯',
  }
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 hover:border-slate-500 transition cursor-pointer" onClick={() => navigate(`/incidents/${incident.id}`)}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 mt-1 ${severityColors[incident.severity]}`} />
          <h3 className="text-white font-semibold text-sm">{incident.title}</h3>
        </div>
        <span className={`text-xs px-2 py-1 rounded-full font-medium flex-shrink-0 ${statusColors[incident.status]}`}>
          {incident.status}
        </span>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        <span className="text-xs px-2 py-1 bg-slate-700 text-slate-300 rounded-md">
          {attackTypeIcons[incident.attack_type]} {incident.attack_type}
        </span>
        <span className="text-xs px-2 py-1 bg-slate-700 text-slate-300 rounded-md">
          🛡 {incident.filtering_strategy}
        </span>
        <span className="text-xs px-2 py-1 bg-slate-700 text-slate-400 rounded-md">
          {incident.severity} severity
        </span>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <p className="text-slate-500 text-xs truncate max-w-xs">{incident.description}</p>
        <span className="text-slate-500 text-xs flex-shrink-0 ml-2">{timeAgo(incident.detected_at)}</span>
      </div>
    </div>
  )
}