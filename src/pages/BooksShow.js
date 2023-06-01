import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Comments from "../components/Comments";

function BooksShow () {
    const [book, setBook] = useState(null);
    const { bookId } = useParams();
    
    function bookLoaded() {
        return(
            <>
                <h2>Title: {book.title}</h2>
                <h3>Author: {book.author}</h3>
                <h3>Price: ${book.price.toFixed(2)}</h3>
                <Link to={`/books/${bookId}/edit`}>
                    <button>Edit</button>
                </Link>
                <Link to={`/books/${bookId}/delete`}>
                    <button>Delete</button>
                </Link>
                <hr />
                <h3>Comments:</h3>
                <Comments bookId={bookId}/>
            </>
        )
    }

    useEffect(() => {
        const getBook = async () => {
            let myBook = await fetch(`https://amazon-clone-api-bblr.onrender.com/books/${bookId}`);
            myBook = await myBook.json();
            // console.log(myBook);
            setBook(myBook);
        }
        getBook();
    }, [bookId]);

    return(
        <>
            {book ? bookLoaded() : <h2>Loading...</h2>}
        </>
    )
}

export default BooksShow;