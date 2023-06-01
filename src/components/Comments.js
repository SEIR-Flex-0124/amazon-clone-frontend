import { useEffect, useState } from "react";

function Comments({bookId}) {
    // console.log(bookId);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState({
        rating: 5,
        text: "",
        user: "",
    });
    const [render, setRender] = useState(0)
    // console.log(comments);

    useEffect(() => {
        async function getComments() {
            try {
                const myBooksComments = await fetch(`https://amazon-clone-api-bblr.onrender.com/books/${bookId}/comments`);
                const parsedBooksComments = await myBooksComments.json();
                // console.log(parsedBooksComments);
                setComments(parsedBooksComments);
            } catch(err) {
                console.log(err);
            }
        }
        getComments();
    }, [bookId]);

    function handleChange(e) {
        setNewComment((currentComment) => ({
            ...currentComment,
            [e.target.name]: e.target.value
        }))
    }
    console.log(newComment);

    async function handleSubmit(e) {
        e.preventDefault();
        // I want to fetch but with a post request so I need to add in some options
        await fetch(`https://amazon-clone-api-bblr.onrender.com/books/${bookId}/comments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            // I have to specify that what I'm sending, as with most things that are sent, is going to be a string.
            body: JSON.stringify(newComment)
        })
        console.log(render);
        setRender((currentRender) => currentRender++)
        e.target.reset();
    }

    function loaded() {
        // console.log(comments);
        return (
            <>
                {comments.map((comment, idx) => {
                    return(
                        <div key={idx}>
                            <h2>Rating: {comment.rating}</h2> <br/>
                            <h2>User: {comment.user}</h2><br/>
                            <h2>Comment: {comment.text}</h2>
                            <hr />
                        </div>
                    )
                })}
            </>
        )
    }

    return(
        <>
            <form onSubmit={handleSubmit}>
                <label>Rating: </label>
                <input type="number" name="rating" onChange={handleChange} value={newComment.rating}/>
                <label>Text: </label>
                <input type="text" name="text" onChange={handleChange} value={newComment.text}/>
                <label>User: </label>
                <input type="text" name="user" onChange={handleChange} value={newComment.user}/>
                <button>Submit</button>
            </form>
            <h2>Here are all my comments</h2>
            {comments ? loaded() : <h3>Loading...</h3>}
        </>
    )
}

export default Comments;