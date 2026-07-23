import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useNavigate } from 'react-router-dom'
import useIncidents from '../hooks/useIncidents'

export default function Admin() {
    const [trigger, setTrigger] = useState(0)
  const { incidents, loading } = useIncidents(trigger)
  const navigate = useNavigate()
  const [form, setForm] = useState({
    title: '', attack_type: 'Volumetric', severity: 'Medium',
    status: 'Active', affected_system: '', filtering_strategy: 'IP',
    source_ip_count: 0, packets_per_second: 0, description: ''
  })
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  // Check auth
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) navigate('/login')
    })
  }, [])

  const handleCreate = async () => {
    setSaving(true)
    const { error } = await supabase.from('incidents').insert([form])
    if (error) setMessage('Error: ' + error.message)
    else {
    setMessage('Incident created!')
    setTrigger(t => t + 1)  // ← inside else only
    setForm({               // ← reset form
      title: '', attack_type: 'Volumetric', severity: 'Medium',
      status: 'Active', affected_system: '', filtering_strategy: 'IP',
      source_ip_count: 0, packets_per_second: 0, description: ''
    })}
    setSaving(false)
    setTimeout(() => setMessage(''), 3000)
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this incident?')) return
    await supabase.from('incidents').delete().eq('id', id)
    setTrigger(t => t + 1) 
    setMessage('Deleted!')
    setTimeout(() => setMessage(''), 3000)
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-slate-900 px-6 py-8">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
            <p className="text-slate-400 text-sm">Create and manage incidents</p>
          </div>
          <button onClick={handleSignOut} className="text-slate-400 hover:text-white text-sm transition">
            Sign Out
          </button>
        </div>

        {message && (
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg px-4 py-2 text-blue-400 text-sm mb-6">
            {message}
          </div>
        )}

        {/* Create form */}
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 mb-8">
          <h2 className="text-white font-semibold mb-4">Create New Incident</h2>
          <div className="grid grid-cols-2 gap-4">
            <input placeholder="Title" value={form.title}
              onChange={e => setForm({...form, title: e.target.value})}
              className="px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500" />
            <input placeholder="Affected System" value={form.affected_system}
              onChange={e => setForm({...form, affected_system: e.target.value})}
              className="px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500" />
            <select value={form.attack_type} onChange={e => setForm({...form, attack_type: e.target.value})}
              className="px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white text-sm focus:outline-none">
              <option>Volumetric</option>
              <option>Protocol</option>
              <option>Application-layer</option>
            </select>
            <select value={form.severity} onChange={e => setForm({...form, severity: e.target.value})}
              className="px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white text-sm focus:outline-none">
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
              <option>Critical</option>
            </select>
            <select value={form.status} onChange={e => setForm({...form, status: e.target.value})}
              className="px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white text-sm focus:outline-none">
              <option>Active</option>
              <option>Mitigated</option>
              <option>Resolved</option>
            </select>
            <select value={form.filtering_strategy} onChange={e => setForm({...form, filtering_strategy: e.target.value})}
              className="px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white text-sm focus:outline-none">
              <option>IP</option>
              <option>Subnet</option>
              <option>Port</option>
              <option>Rate-limiting</option>
              <option>Combined</option>
            </select>
            <input type="number" placeholder="Source IP count" value={form.source_ip_count}
              onChange={e => setForm({...form, source_ip_count: parseInt(e.target.value)})}
              className="px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500" />
            <input type="number" placeholder="Packets per second" value={form.packets_per_second}
              onChange={e => setForm({...form, packets_per_second: parseInt(e.target.value)})}
              className="px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500" />
            <textarea placeholder="Description" value={form.description}
              onChange={e => setForm({...form, description: e.target.value})}
              className="col-span-2 px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 resize-none" rows={3} />
          </div>
          <button onClick={handleCreate} disabled={saving}
            className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition disabled:opacity-50">
            {saving ? 'Creating...' : 'Create Incident'}
          </button>
        </div>

        {/* Incidents list */}
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h2 className="text-white font-semibold mb-4">Manage Incidents</h2>
          {loading ? <p className="text-slate-400">Loading...</p> : (
            <div className="flex flex-col gap-3">
              {incidents?.map(incident => (
                <div key={incident.id} className="flex items-center justify-between bg-slate-700 rounded-lg px-4 py-3">
                  <div>
                    <p className="text-white text-sm font-medium">{incident.title}</p>
                    <p className="text-slate-400 text-xs">{incident.attack_type} · {incident.severity} · {incident.status}</p>
                  </div>
                  <button onClick={() => handleDelete(incident.id)}
                    className="text-red-400 hover:text-red-300 text-sm transition">
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}