import './App.css';
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home';
import BooksIndex from './pages/BooksIndex';
import BooksShow from './pages/BooksShow';
import Footer from './components/Footer';
import Header from './components/Header';
import BooksEdit from './pages/BooksEdit';
import BooksDelete from './pages/BooksDelete';

function App() {
  return (
    <div className="App">
      <Header />
      {/* This is a gigantic if/else if/else statement. It's just conditionally deciding which component to render next in this list */}
      <Routes>
        {/* I want to have a home route with one component. I want an index and a show route for my books */}
        <Route path='/' element={<Home />} />
        <Route path='/books'>
          <Route path='' element={<BooksIndex />} />
          <Route path=':bookId'>
            <Route path='' element={<BooksShow />} />
            <Route path="edit" element={<BooksEdit />} />
            <Route path="delete" element={<BooksDelete />} />
          </Route>
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
