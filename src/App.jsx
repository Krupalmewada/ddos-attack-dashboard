import { supabase } from './lib/supabase'
import { useEffect } from 'react'

function App() {
  useEffect(() => {
    const test = async () => {
      const { data, error } = await supabase.from('incidents').select('*').limit(3)
      console.log('data:', data)
      console.log('error:', error)
    }
    test()
  }, [])

  return <div>Testing Supabase connection...</div>
}

export default App