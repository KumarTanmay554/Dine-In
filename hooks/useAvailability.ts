import { useEffect, useState } from 'react';
import availability from '../pages/api/restaurant/[slug]/availability';

export default function useAvailability() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState(null);


    const fetchAvailability = async () => {
        setLoading(true);
        try{
            // const res = await availability({
                
            // })

        }catch(error:any){
            console.log({error})
            setError(error.response)
        }
    }
}