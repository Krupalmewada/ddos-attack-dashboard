import {useState,useEffect} from'react';
import { supabase } from '../lib/supabase'
export default function useIncidents(refetchTrigger = 0){
const [incidents , setIncidents] = useState(null);
const [loading, setLoading] = useState(false);
const [error, setError ] = useState(null);
useEffect(()=>{
    const fetchdata = async()=>{
        setLoading(true);
        try {
            const {data,error} = await supabase .from('incidents').select('*').order('detected_at', { ascending: false })
            setIncidents(data)
        }
        catch(e){
            setError(e.message)
        }
        finally {
        setLoading(false);
      }
    }
    fetchdata();
    },[refetchTrigger])
    
    return {incidents,loading,error}
}
// const { data, error } = await supabase
//   .from('incidents')
//   .select('*')
//   .order('detected_at', { ascending: false })