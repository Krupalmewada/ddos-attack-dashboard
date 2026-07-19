import { useParams, useNavigate } from "react-router-dom";
import useIncident from "../hooks/useIncident";

const severityColors = {
  'Critical': 'bg-red-500/10 text-red-400 border-red-500/20',
  'High': 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  'Medium': 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  'Low': 'bg-green-500/10 text-green-400 border-green-500/20',
}

const statusColors = {
  'Active': 'bg-red-500/10 text-red-400 border-red-500/20',
  'Mitigated': 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  'Resolved': 'bg-green-500/10 text-green-400 border-green-500/20',
}

const attackTypeIcons = {
  'Volumetric': '🌊',
  'Protocol': '⚡',
  'Application-layer': '🎯',
}

const formatDate = (dateStr) => {
  if (!dateStr) return 'N/A'
  return new Date(dateStr).toLocaleString()
}

export default function IncidentDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { incident, loading, error } = useIncident(id)

  if (loading) return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <p className="text-slate-400">Loading incident...</p>
    </div>
  )

  if (error) return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <p className="text-red-400">Error: {error}</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-slate-900 px-6 py-8">
      <div className="max-w-4xl mx-auto">

        {/* Back button */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition"
        >
          ← Back to Dashboard
        </button>

        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">{incident?.title}</h1>
            <p className="text-slate-400 mt-1">{incident?.affected_system}</p>
          </div>
          <div className="flex gap-2">
            <span className={`px-3 py-1 rounded-full text-sm font-medium border ${severityColors[incident?.severity]}`}>
              {incident?.severity}
            </span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium border ${statusColors[incident?.status]}`}>
              {incident?.status}
            </span>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
            <p className="text-slate-400 text-sm mb-1">Attack Type</p>
            <p className="text-white font-semibold">
              {attackTypeIcons[incident?.attack_type]} {incident?.attack_type}
            </p>
          </div>
          <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
            <p className="text-slate-400 text-sm mb-1">Filtering Strategy</p>
            <p className="text-white font-semibold">🛡 {incident?.filtering_strategy}</p>
          </div>
          <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
            <p className="text-slate-400 text-sm mb-1">Source IP Count</p>
            <p className="text-white font-semibold text-2xl">{incident?.source_ip_count}</p>
          </div>
          <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
            <p className="text-slate-400 text-sm mb-1">Packets / Second</p>
            <p className="text-white font-semibold text-2xl">
              {incident?.packets_per_second?.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Description */}
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 mb-6">
          <h2 className="text-white font-semibold mb-2">Description</h2>
          <p className="text-slate-300 leading-relaxed">{incident?.description}</p>
        </div>

        {/* Timeline */}
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h2 className="text-white font-semibold mb-4">Incident Timeline</h2>
          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0" />
              <div>
                <p className="text-white text-sm font-medium">Attack Detected</p>
                <p className="text-slate-400 text-sm">{formatDate(incident?.detected_at)}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-yellow-400 mt-2 flex-shrink-0" />
              <div>
                <p className="text-white text-sm font-medium">
                  {incident?.filtering_strategy} filtering deployed
                </p>
                <p className="text-slate-400 text-sm">
                  Based on ML feature importance analysis (src_ip, dst_port, byte_count)
                </p>
              </div>
            </div>
            {incident?.resolved_at && (
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-green-400 mt-2 flex-shrink-0" />
                <div>
                  <p className="text-white text-sm font-medium">Incident Resolved</p>
                  <p className="text-slate-400 text-sm">{formatDate(incident?.resolved_at)}</p>
                </div>
              </div>
            )}
            {!incident?.resolved_at && (
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0 animate-pulse" />
                <div>
                  <p className="text-red-400 text-sm font-medium">Attack still active</p>
                  <p className="text-slate-400 text-sm">Monitoring in progress</p>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}