import React from 'react';
import '../styles/HomePage.css';

import axios from "axios"
import { useEffect, useState } from 'react';
import Rating from '@mui/material/Rating';
import { useNavigate } from 'react-router-dom';
import {useRef} from 'react';
import { Helmet } from 'react-helmet';

const HomePage = (props) => {
  const ref = useRef(null);

  const [popularBooks, setPopularBooks] = useState(null)
  const [copypopularBooks, copysetPopularBooks] = useState(null)

  const [newBooks, setNewBooks] = useState(null)
  const [personalBooks, setPersonalBooks] = useState([])
  const [genres, setgenres] = useState(" ")
  const [min_year, setmin_year] = useState(-3000)
  const [max_year, setmax_year] = useState(3000)
  const [min_rating, setmin_rating] = useState(0)
  const [max_rating, setmax_rating] = useState(5)
  const [min_pages, setmin_pages] = useState(0)
  const [max_pages, setmax_pages] = useState(10000)

  

  
  const nav = useNavigate()
  
  
  useEffect(() => {
    axios.get(`http://localhost:5000`, {
      
    headers: {
      "Access-Control-Allow-Headers": "Content-Type",
      'Content-Type': 'application/json'
    },
  })
      .then(res => {
        console.log(res.data.popular.books)
        setPopularBooks(res.data.popular.books);
        setNewBooks(res.data.new);
        copysetPopularBooks(res.data.popular.books)

        if (res.data.for_this_user) {
          setPersonalBooks(res.data.for_this_user);
        }

      })
  }, [])

  const readpopularBooks = async (e) => {
    console.log(e.currentTarget.id);
    const id = await e.currentTarget.id
    
    nav("/book/"+id) 
  }

  const toAuthor = async (e) => {
    console.log(e.currentTarget.id);
    const id = await e.currentTarget.id
    
    nav("/author/"+id) 
  }

  const filterItem = async (e) => {
    
  const res = await axios.get(`http://localhost:5000/books/filter?state=${localStorage.getItem('state')}&genres=${genres}&min_year=${min_year}&max_year=${max_year}&min_pages=${min_pages}&max_pages=${max_pages}&min_rating=${min_rating}&max_rating=${max_rating}`, {
    
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        'Content-Type': 'application/json'
      },
    }) 
        if (res.status === 203) {
          nav("/login")
        }
        else {
          setPopularBooks(res.data)
        }
  };

  const filterItem0 = async (e) => {
    const _genre = e.target.value
    setgenres(_genre)
    const res = await axios.get(`http://localhost:5000/books/filter?state=${localStorage.getItem('state')}&genres=${_genre}&min_year=${min_year}&max_year=${max_year}&min_pages=${min_pages}&max_pages=${max_pages}&min_rating=${min_rating}&max_rating=${max_rating}`, {
    
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        'Content-Type': 'application/json'
      },
    })
     
        if (res.status === 203) {
          nav("/login")
        }
        else {
          setPopularBooks(res.data)
        }
  }
  
  const filterItem1 = async (e) => {
    const data = e.target.value
    let _minYear = -3000
    let _maxYear = 3000
    
    if (data === "1") {
      setmin_year(-3000)
      setmax_year(0)
      _minYear = -3000
      _maxYear = 0
    } 
    else if (data === "2") {
      setmin_year(0)
      setmax_year(1900)
      _minYear = 0
      _maxYear = 1900
    } 
    else if (data === "3") {
      setmin_year(1900)
      setmax_year(3000)
      _minYear = 1900
      _maxYear = 3000
    } 
    else {
      setmin_year(-3000)
      setmax_year(3000)
      _minYear = -3000
      _maxYear = 3000
    }
    
    const res = await axios.get(`http://localhost:5000/books/filter?state=${localStorage.getItem('state')}&genres=${genres}&min_year=${_minYear}&max_year=${_maxYear}&min_pages=${min_pages}&max_pages=${max_pages}&min_rating=${min_rating}&max_rating=${max_rating}`, {
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        'Content-Type': 'application/json'
      },
      })
      if (res.status === 203) {
        nav("/login")
      } else {
        setPopularBooks(res.data)
    }
  }
  
  const filterItem2 = async (e) => {
    const data = e.target.value
    let _minPage = 0
    let _maxPage = 10000
    
    if (data === "1") {
      setmin_pages(0)
      setmax_pages(200)
      _minPage = 0
      _maxPage = 200
    } 
    else if (data === "2") {
      setmin_pages(200)
      setmax_pages(800)
      _minPage = 200
      _maxPage = 800
    } 
    else if (data === "3") {
        setmin_pages(800)
        setmax_pages(10000)
        _minPage = 800
        _maxPage = 10000
    } 
    else {
      setmin_pages(0)
      setmax_pages(10000)
      _minPage = 0
      _maxPage = 10000
    }

    const res = await axios.get(`http://localhost:5000/books/filter?state=${localStorage.getItem('state')}&genres=${genres}&min_year=${min_year}&max_year=${max_year}&min_pages=${_minPage}&max_pages=${_maxPage}&min_rating=${min_rating}&max_rating=${max_rating}`, {
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        'Content-Type': 'application/json'
      },
      })
      if (res.status === 203) {
        nav("/login")
      } else {
        setPopularBooks(res.data)
    }
  }
      
  const filterItem3 = async (e) => {
    const data = e.target.value
    let _minRating = 0
    let _maxRating = 5
    
    if (data === "1") {
      setmin_rating(0)
      setmax_rating(3)
      _minRating = 0
      _maxRating = 3
    } 
    else if (data === "2") {
      setmin_rating(3)
      setmax_rating(4)
      _minRating = 3
      _maxRating = 4
    } 
    else if (data === "3") {
      setmin_rating(4)
      setmax_rating(5)
      _minRating = 4
      _maxRating = 5
    } 
    else {
      setmin_rating(0)
      setmax_rating(5)
      _minRating = 0
      _maxRating = 5
    }

    const res = await axios.get(`http://localhost:5000/books/filter?state=${localStorage.getItem('state')}&genres=${genres}&min_year=${min_year}&max_year=${max_year}&min_pages=${min_pages}&max_pages=${max_pages}&min_rating=${_minRating}&max_rating=${_maxRating}`, {
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        'Content-Type': 'application/json'
      },
      })
      if (res.status === 203) {
        nav("/login")
      } else {
        setPopularBooks(res.data)
    }
  }

  

  return (
    <>
    <Helmet>
      <title>Booklib</title> 
    </Helmet>
         
      <div id="wrapper">
        <div className="search-field">
          <div className="fieldd">
            <label className="label">Thể loại</label>
            <select onChange={(e) => {
                                filterItem0(e);
                            }}>
              <option value=" ">- Tất cả -</option>
              <option value="Phiêu lưu">Phiêu lưu</option>
              <option value="Cổ điển">Cổ điển</option>
              <option value="Tội phạm">Tội phạm - Trinh thám</option>
              <option value="Viễn tưởng">Viễn tưởng</option>
              <option value="Cổ tích">Cổ tích - Truyền thuyết</option>
              <option value="Lịch sử">Lịch sử</option>
              <option value="Kinh dị">Kinh dị</option>
              <option value="Hài hước">Hài hước</option>
            </select>
          </div>
          <div className="fieldd">
            <label className="label">Năm</label>
            <select onChange={(e) => {
                                filterItem1(e);
                            }}>
              <option value="0">- Tất cả -</option>
              <option value="1">Trước công nguyên</option>
              <option value="2">Từ năm 0 - 1900</option>
              <option value="3">Sau năm 1900</option>
            </select>
          </div>
          <div className="fieldd">
            <label className="label">Số trang</label>
            <select onChange={(e) => {
                                filterItem2(e);
                            }}>
              <option value="0">- Tất cả -</option>
              <option value="1">0 - 200 trang</option>
              <option value="2">200 - 800 trang</option>
              <option value="3">Hơn 800 trang</option>
            </select>
          </div>
          <div className="fieldd">
            <label className="label">Rating</label>
            <select onChange={(e) => {
                                filterItem3(e);
                            }}>
             <option value="0">- Tất cả -</option>
             <option value="1">Thấp</option>
             <option value="2">Trung bình</option>
             <option value="3">Cao</option>
            </select>
          </div>
        </div>


        <div className="headline">
          <h2>Sách đề cử</h2>
          <hr />
        </div>
        <ul className="products">
          {popularBooks?.map(book => (
            <li  ><div className="product-item" >
              <div className="product-top" ref={ref} id ={book.book_id} onClick={ readpopularBooks}>
                <a className="product-thumb">
                  <img
                    src={book.cover}
                    alt="cover" 
                  />
                  <div className='product-rating'>
                    {/* http://localhost:5000/book/book_id */}
                    <Rating name="half-rating" value={book.current_rating} precision={1} />
                  </div>
                  <div className='rating'>
                    {/* http://localhost:5000/book/book_id */}
                    <Rating name="half-rating" value={book.current_rating} precision={1} />
                  </div>
                </a>
              </div>

              <div className="product-info">
                    <a href className="product-name" ref={ref} id ={book.book_id} onClick={ readpopularBooks}>{book.title}</a>
                    <a href className="product-author" id={Object.keys(book.authors[0])} onClick={toAuthor}>{Object.values(book.authors[0])}</a>
              </div>
            </div></li>
          ))}
        </ul>

        
        <div className="headline">
          <h2>Sách mới</h2>
          <hr />
        </div>
        <ul className="products">
          {newBooks?.books.map(book => (
            <li><div className="product-item">
              <div className="product-top" ref={ref} id ={book.book_id} onClick={ readpopularBooks}>
                <a className='product-thumb'>
                  <img
                    src={book.cover}
                    alt="cover"
                  />
                  <div className='product-rating'>
                    {/* http://localhost:5000/book/book_id */}
                    <Rating name="half-rating" value={book.current_rating} precision={1} />
                  </div>
                  <div className='rating'>
                    {/* http://localhost:5000/book/book_id */}
                    <Rating name="half-rating" value={book.current_rating} precision={1} />
                  </div>
                </a>
              </div>

              <div className="product-info">
                    <a href className="product-name" ref={ref} id ={book.book_id} onClick={ readpopularBooks}>{book.title}</a>
                    <a href className="product-author" id={Object.keys(book.authors[0])} onClick={toAuthor}>{Object.values(book.authors[0])}</a>
              </div>
            </div></li>
          ))}
        </ul>

      </div>
    </>
  );
}

export default HomePage;
