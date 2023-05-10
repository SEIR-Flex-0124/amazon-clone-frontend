import { Link } from 'react-router-dom'

function Header () {
    return(
        <>
            <nav>
                <Link to='/'>Home</Link>
                <Link to='/books'>Books</Link>
            </nav>
            <h1>Amazon Clone</h1>
        </>
    )
}

export default Header;