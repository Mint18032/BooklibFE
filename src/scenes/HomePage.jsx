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
  const [genres, setgenres] = useState(null)
  const [sort_by_year, setsort_by_year] = useState(null)
  const [min_rating, setmin_rating] = useState(null)
  const [min_pages, setmin_pages] = useState(10)
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
    
  const res = await axios.get(`http://localhost:5000/books/filter?state=${localStorage.getItem('state')}&genres=${genres}&sort_by_year=${sort_by_year}&min_rating=${min_rating}&min_pages=${min_pages}&max_pages=${max_pages}`, {
    
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
    const dat = e.target.value
    
    if (dat === "sachle") {
      setmin_pages(0)
      setmax_pages(100)
      const res = await axios.get(`http://localhost:5000/books/filter?state=${localStorage.getItem('state')}&&sort_by_year=${sort_by_year}&min_rating=${min_rating}&min_pages=0&max_pages=100`, {
    
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
    else if (dat === "sachbo") {
      setmin_pages(300)
      setmax_pages(500)
      const res = await axios.get(`http://localhost:5000/books/filter?state=${localStorage.getItem('state')}&sort_by_year=${sort_by_year}&min_rating=${min_rating}&min_pages=300&max_pages=500`, {
    
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
  }

   const filterItem1 = async (e) => {
     const dat = e.target.value
     setgenres(dat)
    const res = await axios.get(`http://localhost:5000/books/filter?state=${localStorage.getItem('state')}&genres=${dat}&sort_by_year=${sort_by_year}&min_rating=${min_rating}&min_pages=${min_pages}&max_pages=${max_pages}`, {
    
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
      
  const filterItem2 = async (e) => {
    var dat = e.target.value
    let  true_dat = 1
    if (dat === "cao") {
      true_dat = 3
    }
    else {
       true_dat = 1
    }
    setmin_rating(true_dat)
    const res = await axios.get(`http://localhost:5000/books/filter?state=${localStorage.getItem('state')}&sort_by_year=${sort_by_year}&min_rating=${true_dat}&min_pages=${min_pages}&max_pages=${max_pages}`, {
    
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
  
  const filterItem3 = async (e) => {
    const dat = e.target.value
    let data = "asceding"
    if (dat === "tang") {
      data = "asceding"
    }
    else {
      data = "descending"

    }
    setsort_by_year(data)
   const res = await axios.get(`http://localhost:5000/books/filter?state=${localStorage.getItem('state')}&genres=${genres}&sort_by_year=${data}&min_rating=${min_rating}&min_pages=${min_pages}&max_pages=${max_pages}`, {
   
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

  

  return (
    <>
    <Helmet>
      <title>Booklib</title> 
    </Helmet>
         
      <div id="wrapper">
        <div className="search-field">
          <div className="field">
            <label className="label">Loại sách:</label>
            <select onChange={(e) => {
                                filterItem0(e);
                            }}>
              <option>- Tất cả -</option>
              <option value="sachle">Sách lẻ</option>
              <option value="sachbo">Sách bộ</option>
            </select>
          </div>
          <div className="field">
            <label className="label">Thể loại:</label>
            <select onChange={(e) => {
                                filterItem1(e);
                            }}>
              <option value="">- Tất cả -</option>
              <option value="Phiêu lưu">Phiêu lưu</option>
              <option value="Cổ điển">Cổ điển</option>
              <option value="Tội phạm Trinh thám">Tội phạm - Trinh thám</option>
              <option value="Viễn tưởng">Viễn tưởng</option>
              <option value="Cổ tích - Truyền thuyết">Cổ tích - Truyền thuyết</option>
              <option value="Lịch sử">Lịch sử</option>
              <option value="Kinh dị">Kinh dị</option>
              <option value="Hài hước">Hài hước</option>
            </select>
          </div>
          <div className="field">
            <label className="label">Ratings:</label>
            <select onChange={(e) => {
                                filterItem2(e);
                            }}>
              <option>- Tất cả -</option>
              <option value="cao">Cao</option>
              <option value="thap">Thấp</option>
              
            </select>
          </div>
          <div className="field">
            <label className="label">Năm:</label>
            <select onChange={(e) => {
                                filterItem2(e);
                            }}>
             
              <option value={"tang"}>Từ 2000</option>
              <option value={"giam"}>Trước 2000</option>
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
