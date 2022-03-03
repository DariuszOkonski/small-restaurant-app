import { useEffect, useState } from "react"

export default function useFetch(url, method = "GET") {
    
    const [data, setData] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(null)
    const [options, setOptions] = useState(null)

    const postData = (postData) => {
        setOptions({
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(postData)
        })
    }

    useEffect(() => {        
        // object needed to stop fetching data
        const controller = new AbortController();

        const fetchData = async (options) => {
            setIsPending(true);
            
            try {

                // controller is assign to specific fetch function
                const res = await fetch(url, { ...options, signal: controller.signal });
                
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
        

        if(method === "GET") {
            fetchData();
        } 

        if(method === "POST" && options) {
            fetchData(options)
        }

        // clean up function kicks off when component is unmounted
        return () => {
            // abort fetching data if component is unmounted during fetching
            controller.abort();
        }

    }, [url, options, method])
    
  
    return { data, isPending, error, postData }
}
