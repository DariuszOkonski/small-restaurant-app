import { useEffect, useState } from "react"

export default function useFetch(url) {
    
    const [data, setData] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {        
        // object needed to stop fetching data
        const controller = new AbortController();

        const fetchData = async () => {
            setIsPending(true);
            
            try {

                // controller is assign to specific fetch function
                const res = await fetch(url, { signal: controller.signal });
                
                // secure from wrong endpoint - 404 not found
                if(!res.ok) {
                    throw new Error(res.statusText)
                }
                
                const jsonData = await res.json();

                setIsPending(false);
                setData(jsonData)
                setError(null);
                
                // secure from no internet connection
            } catch (err) {
                // when controller is abborted it's throwing an error
                if(err.name === 'AbortError') {
                    console.log('the fetch was aborted')
                } else {
                    setIsPending(false);
                    setError('Could not fetch the data');
                    console.log('USEFETCH()')
                    console.log(err.message)
                }

            }
        }  
        
        fetchData();
    
        // clean up function kicks off when component is unmounted
        return () => {
            // abort fetching data if component is unmounted during fetching
            controller.abort();
        }

    }, [url])
    
  
    return { data, isPending, error }
}
