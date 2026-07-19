import {useState,useEffect} from'react';
import { supabase } from '../lib/supabase'
export default function useIncident(id){
const [incident , setIncident] = useState(null);
const [loading, setLoading] = useState(false);
const [error, setError ] = useState(null);
useEffect(()=>{
    const fetchdata = async()=>{
        setLoading(true);
        try {
            const {data,error} = await supabase .from('incidents').select('*').eq('id', id).single()
            setIncident(data)
        }
        catch(e){
            setError(e.message)
        }
        finally {
        setLoading(false);
      }
    }
    fetchdata();
    },[id])
    
    return {incident,loading,error}
}
// const { data, error } = await supabase
//   .from('incidents')
//   .select('*')
//   .order('detected_at', { ascending: false })