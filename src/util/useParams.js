import React, {useState, useEffect} from 'react'

export default function useParams() {
    const [cityID, setCityID] = useState(null);

    useEffect(() => {
        if (window.location.search.length > 1) {
            const params = new URLSearchParams(window.location.search);
            setCityID(params.get('cityID'));
        }
    }, [cityID])

    return cityID;
}
