import '../styles/authorDetail.css'
import axios from "axios"
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import Rating from '@mui/material/Rating';
import { useNavigate } from 'react-router-dom';
import {useRef} from 'react';

const Author = (props) => {
  const [user, setUser] = useState(null)
  const [books, setBooks] = useState([])
  const ref = useRef(null);
  const nav = useNavigate()

  const { auth_id } = useParams()

  useEffect(() => {
    axios.get(`http://localhost:5000/authors/?author_id=${auth_id}`).then(res => {
      setUser(res.data)
      setBooks(res.data.books)
    })
  }, [])

  if (!user) {
    return <></> //loading
  }

  const readpopularBooks = async (e) => {
    console.log(e.currentTarget.id);
   const id = e.currentTarget.id
    console.log(ref.current.id);
    nav("/book/"+id) 
  }

  return (
    <div class="body mt-5">
      <div class="container-lg">
        <div class="row">
          <div class="col-12 col-md-3 text-white">
            <div class="p-3">
              <img
                src={user.author_pic ?? "https://i.pinimg.com/736x/6a/29/8d/6a298df72cb446bdf65891b846374079.jpg"}
                class="w-100"
              />
            </div>
            <div class="p-3">
              <div class="fw-bold text-center fs-3">Thông tin cá nhân</div>
              <div class="px-1 mt-3">
                <div class="fs-6 fw-bold">Follower</div>
                <div style={{ color: "#999" }}>{user.follower ?? "Không có thông tin"}</div>
              </div>
              <div class="fs-6 px-1 mt-3">
                <div class="fw-bold">Website</div>
                <div style={{ color: "#999" }}>{user.website ?? "Không có thông tin"}</div>
              </div>
              <div class="fs-6 px-1 mt-3">
                <div class="fw-bold">Email</div>
                <div style={{ color: "#999" }}>{user.social_account ?? "Không có thông tin"} </div>
              </div>
              
            </div>
          </div>
          <div class="col-12 col-md-9 text-white">
            <div class="fs-1 fw-bold">{user.author_name}</div>
            <div class="fs-3 fw-bold mt-4">Tiểu sử</div>
            <div style={{ color: "#999" }} class="mt-2">
              {user.bio  ?? "Không có thông tin"}
            </div>
            <div class="fs-3 fw-bold mt-4">Quotes</div>
            <div style={{ color: "#999" }} class="mt-2">
              {user.quote  ?? "Không có thông tin"}
            </div>
            <div class="fs-3 fw-bold mt-4">Các tác phẩm</div>
            <div class="row mt-2">
              {books.map((book) => (
              <div class="col-12 col-md-3" ref={ref}  id ={book.book_id} onClick={readpopularBooks}>
                <a className='no-underline book'>
                  <img
                    src={book.cover}
                    class="w-100 h-100"
                    alt="image"
                    />
                    <div className='rating'>
                    {/* http://localhost:5000/book/book_id */}
                      <Rating name="half-rating" value={book.current_rating} precision={1} />
                    </div>
                </a>
                
                      <h1 className='fs-4 fw-bold mt-4 text-center' style={{ cursor: "pointer" }}>{book.title}</h1>
              
              </div>
                
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Author;
