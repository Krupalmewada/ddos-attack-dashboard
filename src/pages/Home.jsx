import useIncidents from "../hooks/useIncidents"
import IncidentCard from "../components/IncidentCard"

export default function Home() {
  const { incidents, loading, error } = useIncidents()

  if (loading) return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <p className="text-slate-400">Loading incidents...</p>
    </div>
  )
  
  if (error) return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <p className="text-red-400">Error: {error}</p>
    </div>
  )

  const active = incidents?.filter(i => i.status === 'Active').length || 0
  const mitigated = incidents?.filter(i => i.status === 'Mitigated').length || 0
  const resolved = incidents?.filter(i => i.status === 'Resolved').length || 0

  return (
    <div className="min-h-screen bg-slate-900 px-6 py-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">DDoS Incident Dashboard</h1>
          <p className="text-slate-400 mt-1">
            Real-time monitoring based on ML-Enhanced Adaptive DDoS Filtering research
          </p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total', value: incidents?.length || 0, color: 'text-white' },
            { label: 'Active', value: active, color: 'text-red-400' },
            { label: 'Mitigated', value: mitigated, color: 'text-yellow-400' },
            { label: 'Resolved', value: resolved, color: 'text-green-400' },
          ].map(stat => (
            <div key={stat.label} className="bg-slate-800 rounded-xl p-4 border border-slate-700">
              <p className="text-slate-400 text-sm">{stat.label}</p>
              <p className={`text-3xl font-bold mt-1 ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Incident feed */}
        <h2 className="text-lg font-semibold text-white mb-4">Live Incident Feed</h2>
        <div className="flex flex-col gap-3">
          {incidents?.map(incident => (
            <IncidentCard key={incident.id} incident={incident} />
          ))}
        </div>

      </div>
    </div>
  )
}