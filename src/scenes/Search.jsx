import React, { useEffect, useState } from 'react';
import '../styles/search.css'
import SearchIcon from '@mui/icons-material/Search';
import Rating from '@mui/material/Rating';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {useRef} from 'react';



function Search() {
  const [searchValue, setSearchValue] = useState('');
  const [books, setBooks] = useState([]);
  const ref = useRef(null);
  const nav = useNavigate();


  useEffect(() => {
    if (searchValue === '') {
      axios.get(`http://localhost:5000/`).then(res => {
        console.log(res.data?.popular?.books);
        setBooks(res.data?.popular?.books);
      }).catch(() => {
        setBooks([])
      })
    } else {
      axios.get(`http://localhost:5000/books/search?query=${searchValue}`).then(res => {
        setBooks(res.data)
      }).catch(() => {
        setBooks([])
      })
    }
  }, [searchValue])

  const readpopularBooks = async (e) => {
    console.log(e.currentTarget.id);
   const id = e.currentTarget.id
    console.log(ref.current.id);
    nav("/book/"+id) 
  }

  const toAuthor = async (e) => {
    console.log(e.currentTarget.id);
   const id = await e.currentTarget.id
    
    nav("/author/"+id) 
  }

  const ratings = {
    position: "absolute",
    left: 0,
    bottom: 0,
    transform:" translateY(100%)",
    padding: "1rem",
    maxHeight:" 100%",
    transition: "transform 0.3s linear",
  }

  return (
    <div>
      <title>Tìm kiếm sách</title>

      <div id="wrapper">
        <div className="search-field">
          <input type="text" className="input is-medium" placeholder="Nhập tên sách hoặc tác giả..." onInput={e => setSearchValue(e.target.value)} />
          <div className="icon-margin">
            <SearchIcon sx={{ fontSize: 40 }} />
          </div>
        </div>

        <ul className="products">
          { books.map((book, key) => {
            return <li key={key}>
              <div className="product-item" ref={ref}  id ={book.book_id} onClick={readpopularBooks}>
                
                <div className="product-top">
                  
                  <a href className="product-thumb">
                    <img src={book.cover} alt="" />
                    
                    <div className="product-rating">
                            <Rating classes={ratings} value={book.current_rating} precision={1} />
                    </div>
                  </a>
                </div>
                
                <div className="product-info">
                  <a href className="product-name">{book.title}</a>
                  <a href className="product-author" id={Object.keys(book.authors[0])} onClick={toAuthor}>{Object.values(book.authors[0])}</a>
                </div>
              </div>
            </li>
          })}
        </ul>
      </div>
    </div>
  );
}
export default Search