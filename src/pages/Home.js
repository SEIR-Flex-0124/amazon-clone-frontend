import { useState, useEffect } from "react";

function Home () {
    // I want to start with grabbing all my specials but when I don't have them, I'm going to say I have a null value for the starting point
    const [specials, setSpecials] = useState(null);

    async function fetchSpecials() {
        try {
            // I want to go and grab all my specials from the URL I have that is my backend API
            let mySpecials = await fetch('http://localhost:2000/');
            // I want to parse the string (as again, information tends to be sent as a string) and turn it into json
            mySpecials = await mySpecials.json();
            // console.log(mySpecials);
            // Update the value of specials to be mySpecials that is now the API info parsed into JSON.
            setSpecials(mySpecials);
        } catch(err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchSpecials();
    }, [])

    return(
        <>
            {specials ? specials.map((special, idx) => {
                return (
                    <div key={idx}>
                        <h2>{special.name}</h2>
                    </div>
                )
            }) : <h2>Loading...</h2>} 
        </>
    )
}

export default Home;