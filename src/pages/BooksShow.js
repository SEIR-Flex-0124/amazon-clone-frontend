import { useParams } from "react-router";

function BooksShow () {
    const { bookId } = useParams();
    console.log(bookId);
    return(
        <h2>This is my BooksShow component</h2>
    )
}

export default BooksShow;