import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

function BooksShow () {
    const [book, setBook] = useState(null);
    const { bookId } = useParams();
    console.log(bookId);
    async function getBook() {
        try {
            let myBook = await fetch(`http://localhost:2000/books/${bookId}`);
            myBook = await myBook.json();
            // console.log(myBook);
            setBook(myBook);
        } catch(err) {
            console.log(err);
        }
    }

    console.log(book);

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
            </>
        )
    }

    useEffect(() => {
        getBook();
    }, []);

    return(
        <>
            {book ? bookLoaded() : <h2>Loading...</h2>}
        </>
    )
}

export default BooksShow;