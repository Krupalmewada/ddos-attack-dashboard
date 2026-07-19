import useIncidents from "../hooks/useIncidents";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { useNavigate } from "react-router-dom";

const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444']

const modelData = [
  { name: 'Random Forest', accuracy: 84 },
  { name: 'XGBoost', accuracy: 85 },
]

export default function Dashboard() {
  const { incidents, loading, error } = useIncidents()
  const navigate = useNavigate()

  const attackTypeData = incidents?.reduce((acc, incident) => {
    const existing = acc.find(item => item.name === incident.attack_type)
    if (existing) existing.count++
    else acc.push({ name: incident.attack_type, count: 1 })
    return acc
  }, []) || []

  const filteringData = incidents?.reduce((acc, incident) => {
    const existing = acc.find(item => item.name === incident.filtering_strategy)
    if (existing) existing.value++
    else acc.push({ name: incident.filtering_strategy, value: 1 })
    return acc
  }, []) || []

  if (loading) return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <p className="text-slate-400">Loading...</p>
    </div>
  )
  if (error) return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <p className="text-red-400">Error: {error}</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-slate-900 px-6 py-8">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Analytics Dashboard</h1>
            <p className="text-slate-400 mt-1">
              ML-Enhanced Adaptive DDoS Filtering — Research Insights
            </p>
          </div>
          <button
            onClick={() => navigate('/')}
            className="text-slate-400 hover:text-white transition"
          >
            ← Back
          </button>
        </div>

        {/* Charts grid */}
        <div className="grid grid-cols-2 gap-6 mb-6">

          {/* Attack type bar chart */}
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h2 className="text-white font-semibold mb-4">Attacks by Type</h2>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={attackTypeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <Tooltip
                  contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                  labelStyle={{ color: '#fff' }}
                />
                <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Filtering strategy pie chart */}
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h2 className="text-white font-semibold mb-4">Filtering Strategies Used</h2>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={filteringData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                >
                  {filteringData.map((entry, index) => (
                    <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                />
                <Legend wrapperStyle={{ color: '#94a3b8', fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Model accuracy */}
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 mb-6">
          <h2 className="text-white font-semibold mb-1">ML Model Performance</h2>
          <p className="text-slate-400 text-sm mb-4">
            Trained on CIC-DDoS2019 dataset — 50,000+ traffic flows
          </p>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={modelData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis type="number" domain={[0, 100]} tick={{ fill: '#94a3b8', fontSize: 11 }} unit="%" />
              <YAxis dataKey="name" type="category" tick={{ fill: '#94a3b8', fontSize: 11 }} width={110} />
              <Tooltip
                contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                formatter={(val) => `${val}%`}
              />
              <Bar dataKey="accuracy" fill="#10b981" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Research note */}
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
          <p className="text-blue-400 text-sm">
            📄 Based on: <span className="font-medium">ML-Enhanced Adaptive DDoS Filtering: Bridging Detection and Rule Generation for Real-World Network Defense</span> — Wilfrid Laurier University, 2026
          </p>
        </div>

      </div>
    </div>
  )
}