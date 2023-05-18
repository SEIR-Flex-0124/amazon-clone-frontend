import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";


function BooksEdit() {
    // const navigate = useNavigate();
    const { bookId } = useParams();
    const [book, setBook] = useState(null);
    const navigate = useNavigate();
    async function getBook() {
        try {
            let myBook = await fetch(`http://localhost:2000/books/${bookId}`);
            myBook = await myBook.json();
            setBook(myBook);
        } catch(err) {
            console.log(err);
        }
    }
    // console.log(book);

    useEffect(() => {
        getBook();
    }, []);

    function handleChange(e) {
        setBook((currentState) => ({
            ...currentState,
            [e.target.name]: e.target.value
        }))
    }

    async function handleSumbit(e) {
        try{
            e.preventDefault();
            // console.log("I'm submitting my put request")
            await fetch(`http://localhost:2000/books/${bookId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(book)
            });
            return navigate(`/books/${bookId}`);
            // return redirect(`/books/${bookId}`)
        } catch(err) {
            console.log(err);
        }
    }

    function loaded() {
        return(
            <>
                <h2>Editing {book.title}</h2>
                <form onSubmit={handleSumbit}>
                    Title: <input type="text" value={book.title} name="title" onChange={handleChange} />
                    Author: <input type="text" value={book.author} name="author" onChange={handleChange} />
                    Price: $<input type="number" value={book.price} name="price" onChange={handleChange} />
                    <button>Submit</button>
                </form>
            </>
        )
    }

    return (
        <>
            {book ? loaded() : <h2>Loading...</h2>}
        </>
    )
}

export default BooksEdit;