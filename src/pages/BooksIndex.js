import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function BooksIndex () {
    // I want to keep track of if I've grabbed my books array yet
    const [books, setBooks] = useState([]);
    // I'm creating a hook with a default value set for each element of my form
    const [booksForm, setBooksForm] = useState({
        title: "",
        author: "",
        price: 0
    })

    async function getBooks() {
        try {
            // I want to fetch information from API. I'm going to be using localhost because render is insanely slow.
            let myBooks = await fetch('http://localhost:2000/books')
            // The next thing I need to do is, because information we send is sent as a string, I need to parse it.
            myBooks = await myBooks.json();
            // Updating the value of my hook, which I'm calling books.
            setBooks(myBooks);
        } catch(err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getBooks();
    }, []);

    console.log(books);

    function loaded(arr) {
        return(
            <>
                {arr.map((book, idx) => {
                    return(
                        <div key={idx}>
                            <Link to={`/books/${book._id}`}>
                                <h2>Title: {book.title}</h2>
                            </Link>
                            <h3>Author: {book.author}</h3>
                            <h3>Price: ${book.price}</h3>
                            <hr />
                        </div>
                    )
                })}
            </>
        )
    }

    // I'm going to be updating the value of the bookForm whenever there's a change made to the form
    function handleChange(e) {
        // I want to take the previous state, which is something built into the set hooks for React, and then update what it was to become the same object execept the e.target
        console.log(e.target);
        setBooksForm((previousFormState) => ({
            ...previousFormState,
            [e.target.name]: e.target.value
        }))
    }
    // console.log(booksForm);
    // I want to actually add whatever a user submits to my database. And then I want to update the books rendering on my page with that new item.
    async function handleSumbit(e) {
        try {
            // I don't want to reload this page because that defeats the purpose of React
            e.preventDefault();
            // I want to fetch but with a post request so I need to add in some options
            await fetch('http://localhost:2000/books', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                // I have to specify that what I'm sending, as with most things that are sent, is going to be a string.
                body: JSON.stringify(booksForm)
            })
            // console.log(myNewBook);
            getBooks();
            e.target.reset();
        } catch(err) {
            console.log(err);
        }
    }

    return(
        <>
            <form onSubmit={handleSumbit}>
                <label>Title: </label>
                <input type="text" name="title" onChange={handleChange} placeholder="Book title"/>
                <label>Author: </label>
                <input type="text" name="author" onChange={handleChange} placeholder="Book's author"/>
                <label>Price: $</label>
                <input type="number" name="price" onChange={handleChange} placeholder="Book's price"/>
                <button>Submit</button>
            </form>
            {books.length ? loaded(books) : <h2>Loading...</h2>}
        </>
    )
}

export default BooksIndex;