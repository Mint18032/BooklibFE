import { useState, useEffect } from "react";
import "../css/Note.css";
import CreateNote from "./CreateNote";
import Note from "./Note";
import { v4 as uuid } from "uuid";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { useParams, useSearchParams } from 'react-router-dom'

function Notes(props) {
  //states
  const { book_id } = useParams()

  const [inputText, setInputText] = useState("");

  // get text and store in state
  const textHandler = (e) => {
    setInputText(e.target.value);
    localStorage.setItem('text', e.target.value);
  };

  // add new note to the state array
  const saveHandler = async (e) => {
    axios.post(`http://localhost:5000/my_bookmark?state=${localStorage.getItem('state')}&bm_name=note`, {
        "book_id": book_id,
        "content": inputText
      }, {
     
  })
    .then(function (response) {
      console.log(response);
      localStorage.setItem('text',inputText);
     
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  //delete note function


  //apply the save and get functions using useEffect
  //get the saved notes and add them to the array
  useEffect(() => {
    // const data = props.content? props.content:localStorage.getItem('text');
    // console.log(data)
    // if (data) {
    //   setInputText(data);
    // }
    const fetchData = async () => {
    let res = await axios.get(`http://localhost:5000/my_bookmark?state=${localStorage.getItem('state')}&book_id=${book_id}&bm_name=note`, {
      params: { 'state': localStorage.getItem('state') },
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        'Content-Type': 'application/json'
      },
    })
    console.log("data", res.data[1].content)
    setInputText(res.data[1].content);
  }
  fetchData();
  }, []);

  // useEffect(() => {
  //   localStorage.setItem('text', inputText);
  // }, [inputText]);

  //saving data to local storage
 

  return (
    <div className="notes">
      
      <CreateNote
        textHandler={textHandler}
        saveHandler={saveHandler}
        inputText={inputText}
      />
    </div>
  );
}

export default Notes;
