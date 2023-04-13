import '../styles/general.css';
import '../styles/reading.css';
import { useParams } from 'react-router-dom'
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Components/css/App.css";
import Notes from "./Components/NoteComponents/Notes";
import React from "react";
import { ScrollTo } from "react-scroll-to";

function Reading() {
  const nav = useNavigate( )
  const { book_id } = useParams()
  const [data, setData] = useState([]);
  const [bookMark, setbookMark] = useState([])
  const [note, setbookNote] = useState([])

  const upLoadBookMark = async (e) => {
    axios.post(`http://localhost:5000/my_bookmark?state=${localStorage.getItem('state')}&bm_name=bookmark`, {
      "book_id": book_id,
      "line_pos": scrollPosition}, {
     
  })
    .then(function (response) {
      console.log(response);
      
     
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  useEffect(() => {
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    upLoadBookMark()
    return () => {
        window.removeEventListener('scroll', handleScroll);
    };
  }, [upLoadBookMark]);
  const fetchBook = async () => {
    
    let res;
  res = await axios.get(`http://localhost:5000/books/?book_id=${book_id}`, {
      
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        'Content-Type': 'application/json'
      },
    })
     
        if (res.status === 203) {
          nav("/login")
        }
        else {
          setData(res.data)
        }
  }

  const fetchBookmark = async() => {
    let res; res = await axios.get(`http://localhost:5000/my_bookmark?book_id=${book_id}&bm_name=aaa`, {
      params: { 'state': localStorage.getItem('state') },
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        'Content-Type': 'application/json'
      },
    })
      
        if (res.status === 203) {
          nav("/login")
        }
        else {
          console.log(res.data)
        await setbookMark(res.data[0])
        setbookNote(res.data[1])
        // const res3= localStorage.setItem('text', (res.data[1].content))
      
        }
    }
  
  useEffect(() => { 
    localStorage.removeItem('text')
    fetchBook()
    fetchBookmark()
    
    return () => {
    }
  }, [])
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
      const position = window.pageYOffset;
    setScrollPosition(position);
    console.log(position)
  };

   

  return (
    
    <div className='reading-view'>
      <ScrollTo>
        {({ scroll }) => (
          <a class="tooltiplink" onClick={() => scroll({ x: 20, y: bookMark.line_position })} data-title="Đi tới chỗ đang đọc"><div className="bookmark"></div></a>
        )}
      </ScrollTo>
        <h1>{data.title}</h1>
        <hr />
      < Notes {... note} />
      {/* <div className="book-cover"><img src={data.cover} alt=""/></div> */}
      
      <div id='book-content' className="paper">
        <p style={{whiteSpace: "pre-wrap"}}>{ data.content}</p>
      </div>
    </div>
  );
}
export default Reading