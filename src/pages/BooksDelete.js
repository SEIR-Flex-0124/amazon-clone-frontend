import { useParams } from "react-router";
import { Link } from "react-router-dom";

function BooksDelete() {
    const {bookId} = useParams();

    async function deleteMyBook() {
        try {
            // Make an API call to the DELETE route!
            await fetch(`https://amazon-clone-api-bblr.onrender.com/books/${bookId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            })
        } catch(err) {
            console.log(err);
        }
    }

    return (
        <>
            <h2>Are you sure you want to delete this book?</h2>
            <Link to='/books'>
                <button onClick={deleteMyBook}>Yes, delete it!</button>
            </Link>
            <Link to={`/books/${bookId}`}>
                <button>No, cancel</button>
            </Link>
        </>
    )
}

export default BooksDelete;