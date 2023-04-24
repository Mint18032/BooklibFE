import 'font-awesome/css/font-awesome.min.css';
import "../styles/general.css"
import "../styles/books.css"
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import { useForm } from "react-hook-form";
import React from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
  MDBTextArea,
  MDBTypography,
} from "mdb-react-ui-kit";

function BookDetail() {
  const [data, setData] = useState([]);
  const { auth_id } = useParams();
  const [genre, setGenre] = useState([]);
  const [author, setAuthor] = useState([]);
  const [commentData, setcommentData] = useState("");
  const [oneStar, updateoneStar] = useState([]);
  const [twoStar, updatetwoStar] = useState([]);
  const [threeStar, updatethreeStar] = useState([]);
  const [fourStar, updatefourStar] = useState([]);
  const [fiveStar, updatefiveStar] = useState([]);
  const { register, handleSubmit } = useForm();

  const updateCollection = async (e) => {
    console.log(e);
    axios.post(`http://localhost:5000/my_collections/${e.name}?state=${localStorage.getItem('state')}`, {

      //  axios.post(`http://localhost:5000/my_account?state=${localSlogtorage.getItem('state')}`, {
      //"username": user.username,
      
      "books": [auth_id],
      // "books": 
    }, {})
      .then(function (response) {
        console.log(response);
        document.getElementById('closeadd')?.click()
        //handleClose()
      })
      .catch(function (error) {
        
      });
  }

  function fetchBook() {
    axios.get(`http://localhost:5000/books/?book_id=${auth_id}`, {

      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        'Content-Type': 'application/json'
      },
    })
      .then((res) => {
        if (res.status === 203) {
          nav("/login")
        }
        else {
          console.log(Object.keys(res.data.authors[0]))
          setData(res.data)
          setGenre(res.data.genre)
          setAuthor(res.data.authors[0])
          updatefiveStar(res.data.five_star.ratings)
          updatefourStar(res.data.four_star.ratings)
          updateoneStar(res.data.one_star.ratings)
          updatethreeStar(res.data.three_star.ratings)
          updatetwoStar(res.data.two_star.ratings)

          console.log(res.data)
        }
      })
      .catch((err) => console.log(err));
  }
  let nav = useNavigate()

  useEffect(() => {

    fetchBook()

    return () => {
    }
  });
  const readBook = async (e) => {
    nav("/reading/" + data.book_id)
  }
  const cmt = async (e) => {
    const cmmt = await (e.target.value)
    setcommentData(cmmt)
  }
  const addRatings = async (e) => {
    axios.post(`http://localhost:5000/my_ratings?state=${localStorage.getItem('state')}`, {
      "book_id": data.book_id,
      "stars": 3,
      "content": commentData
    }, {

    })
      .then(function (response) {
        console.log(response.data);

        fetchBook()
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  const toAuthor = async (e) => {
    console.log(e.currentTarget.id);
   const id = await e.currentTarget.id
    
    nav("/author/"+id) 
  }


  return (
    <>
      <div>

        <div className="bookDetails">
          <div className="large-cover" />
          <div className="book-view-container">
            <div className="column book-view-left">
              <div className="book-cover"><img src={data.cover} alt="" /></div>
              <button id="readBtn" onClick={readBook} className="readBtn" role="link">ĐỌC SÁCH</button>
            </div>
            <div className="column book-view-right">
              <h1 className="book-name">{data.title}</h1>

              <a className="rating-stars" href="#ratingDetails">
                <span className="fa fa-star checked-star" />
                <span className="fa fa-star checked-star" />
                <span className="fa fa-star checked-star" />
                <span className="fa fa-star checked-star" />
                <span className="fa fa-star" />&nbsp;
                <div className="average-rating-point">4</div>
              </a><br />
              <button className="share-to-fb"><i className="fab fa-facebook-square" /> &nbsp;Chia sẻ</button>
              <button className="add-to-collection" type='button' data-bs-toggle="modal" data-bs-target="#staticBackdrop"><i className="fas fa-plus" /> &nbsp;Bộ sưu tập</button>


              <table className="book-details-table">
                <tbody><tr>
                  <th>TÁC GIẢ : </th>
    
                  <td className="author-link" id = {[Object.keys(author)[0]]} onClick={toAuthor} >{ author[Object.keys(author)]}</td>
                </tr>
                  <tr>
                    <th>THỂ LOẠI : </th>
                    <td> {genre.map((gen) => (
                      <a className="genre-tag">{gen}</a>
                    ))}</td>
                  </tr>
                  <tr>
                    <th>XUẤT BẢN : </th>
                    <td> {data.public_year}</td>
                  </tr>
                </tbody></table>
              <div className="book-description">
                {data.descript}
              </div>
              <h2>Đánh giá của người đọc</h2>
              <div id="ratingDetails" class="rating-details">
                <div class="side">
                  <div>5 sao</div>
                </div>
                <div class="middle">
                  <div class="bar-container">
                    <div class="bar-5"></div>
                  </div>
                </div>
                <div class="side right">
                  <div>150</div>
                </div>
                <div class="side">
                  <div>4 sao</div>
                </div>
                <div class="middle">
                  <div class="bar-container">
                    <div class="bar-4"></div>
                  </div>
                </div>
                <div class="side right">
                  <div>63</div>
                </div>
                <div class="side">
                  <div>3 sao</div>
                </div>
                <div class="middle">
                  <div class="bar-container">
                    <div class="bar-3"></div>
                  </div>
                </div>
                <div class="side right">
                  <div>15</div>
                </div>
                <div class="side">
                  <div>2 sao</div>
                </div>
                <div class="middle">
                  <div class="bar-container">
                    <div class="bar-2"></div>
                  </div>
                </div>
                <div class="side right">
                  <div>6</div>
                </div>
                <div class="side">
                  <div>1 sao</div>
                </div>
                <div class="middle">
                  <div class="bar-container">
                    <div class="bar-1"></div>
                  </div>
                </div>
                <div class="side right">
                  <div>20</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* TODO: fix ratings, commment */}
        {fiveStar.map((four) => (
          <div style={{ marginRight: "100px" }}>
            <section className="">
              <MDBContainer className="py-5" style={{ maxWidth: "1000px" }}>
                <MDBRow className="justify-content-center">
                  <MDBCol>
                    <div className="d-flex flex-start mb-4">
                      <img
                        className="rounded-circle shadow-1-strong me-3"
                        src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(32).webp"
                        alt="avatar"
                        width="65"
                        height="65"
                      />

                      <MDBCard className="w-100">
                        <MDBCardBody className="p-4">
                          <div>
                            <MDBTypography className='black' tag="h5">{four.username}</MDBTypography>
                            <div>
                              <a href="">
                                <MDBIcon far icon="star text-danger me-1" />
                                <MDBIcon far icon="star text-danger me-1" />
                                <MDBIcon far icon="star text-danger me-1" />
                                <MDBIcon far icon="star text-danger me-1" />
                                <MDBIcon far icon="star text-danger me-1" />
                              </a>
                            </div>
                            <p className='black' style={{ minWidth: "1000px" }} >
                              {four.content}
                            </p>

                            <div className="d-flex justify-content-between align-items-center">
                              <div className="d-flex align-items-center">
                                <a href="#!" className="link-muted me-2">
                                  <MDBIcon fas icon="thumbs-up me-1" />
                                  132
                                </a>
                                <a href="#!" className="link-muted">
                                  <MDBIcon fas icon="thumbs-down me-1" />
                                  15
                                </a>
                              </div>
                              <a href="#!" className="link-muted">
                                <MDBIcon fas icon="reply me-1" /> Reply
                              </a>
                            </div>
                          </div>
                        </MDBCardBody>
                      </MDBCard>
                    </div>


                  </MDBCol>
                </MDBRow>
              </MDBContainer>
            </section>
          </div>
        ))}
        {fourStar.map((four) => (
          <div style={{ marginRight: "100px" }}>
            <section className="">
              <MDBContainer className="py-5" style={{ maxWidth: "1000px" }}>
                <MDBRow className="justify-content-center">
                  <MDBCol>
                    <div className="d-flex flex-start mb-4">
                      <img
                        className="rounded-circle shadow-1-strong me-3"
                        src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(32).webp"
                        alt="avatar"
                        width="65"
                        height="65"
                      />

                      <MDBCard className="w-100">
                        <MDBCardBody className="p-4">
                          <div>
                            <MDBTypography className='black' tag="h5">{four.username}</MDBTypography>
                            <div>
                              <a href="">
                                <MDBIcon far icon="star text-danger me-1" />
                                <MDBIcon far icon="star text-danger me-1" />
                                <MDBIcon far icon="star text-danger me-1" />
                                <MDBIcon far icon="star text-danger me-1" />

                              </a>
                            </div>
                            <p className='black' style={{ minWidth: "1000px" }} >
                              {four.content}
                            </p>

                            <div className="d-flex justify-content-between align-items-center">
                              <div className="d-flex align-items-center">
                                <a href="#!" className="link-muted me-2">
                                  <MDBIcon fas icon="thumbs-up me-1" />
                                  132
                                </a>
                                <a href="#!" className="link-muted">
                                  <MDBIcon fas icon="thumbs-down me-1" />
                                  15
                                </a>
                              </div>
                              <a href="#!" className="link-muted">
                                <MDBIcon fas icon="reply me-1" /> Reply
                              </a>
                            </div>
                          </div>
                        </MDBCardBody>
                      </MDBCard>
                    </div>


                  </MDBCol>
                </MDBRow>
              </MDBContainer>
            </section>
          </div>
        ))}
        {threeStar.map((four) => (
          <div style={{ marginRight: "100px" }}>
            <section className="">
              <MDBContainer className="py-5" style={{ maxWidth: "1000px" }}>
                <MDBRow className="justify-content-center">
                  <MDBCol>
                    <div className="d-flex flex-start mb-4">
                      <img
                        className="rounded-circle shadow-1-strong me-3"
                        src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(32).webp"
                        alt="avatar"
                        width="65"
                        height="65"
                      />

                      <MDBCard className="w-100">
                        <MDBCardBody className="p-4">
                          <div>
                            <MDBTypography className='black' tag="h5">{four.username}</MDBTypography>
                            <div>
                              <a href="">

                                <MDBIcon far icon="star text-danger me-1" />
                                <MDBIcon far icon="star text-danger me-1" />
                                <MDBIcon far icon="star text-danger me-1" />
                              </a>
                            </div>
                            <p className='black' style={{ minWidth: "1000px" }} >
                              {four.content}
                            </p>

                            <div className="d-flex justify-content-between align-items-center">
                              <div className="d-flex align-items-center">
                                <a href="#!" className="link-muted me-2">
                                  <MDBIcon fas icon="thumbs-up me-1" />
                                  132
                                </a>
                                <a href="#!" className="link-muted">
                                  <MDBIcon fas icon="thumbs-down me-1" />
                                  15
                                </a>
                              </div>
                              <a href="#!" className="link-muted">
                                <MDBIcon fas icon="reply me-1" /> Reply
                              </a>
                            </div>
                          </div>
                        </MDBCardBody>
                      </MDBCard>
                    </div>


                  </MDBCol>
                </MDBRow>
              </MDBContainer>
            </section>
          </div>
        ))}
        {twoStar.map((four) => (
          <div style={{ marginRight: "100px" }}>
            <section className="">
              <MDBContainer className="py-5" style={{ maxWidth: "1000px" }}>
                <MDBRow className="justify-content-center">
                  <MDBCol>
                    <div className="d-flex flex-start mb-4">
                      <img
                        className="rounded-circle shadow-1-strong me-3"
                        src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(32).webp"
                        alt="avatar"
                        width="65"
                        height="65"
                      />

                      <MDBCard className="w-100">
                        <MDBCardBody className="p-4">
                          <div>
                            <MDBTypography className='black' tag="h5">{four.username}</MDBTypography>
                            <div>
                              <a href="">

                                <MDBIcon far icon="star text-danger me-1" />
                                <MDBIcon far icon="star text-danger me-1" />
                              </a>
                            </div>
                            <p className='black' style={{ minWidth: "1000px" }} >
                              {four.content}
                            </p>

                            <div className="d-flex justify-content-between align-items-center">
                              <div className="d-flex align-items-center">
                                <a href="#!" className="link-muted me-2">
                                  <MDBIcon fas icon="thumbs-up me-1" />
                                  132
                                </a>
                                <a href="#!" className="link-muted">
                                  <MDBIcon fas icon="thumbs-down me-1" />
                                  15
                                </a>
                              </div>
                              <a href="#!" className="link-muted">
                                <MDBIcon fas icon="reply me-1" /> Reply
                              </a>
                            </div>
                          </div>
                        </MDBCardBody>
                      </MDBCard>
                    </div>


                  </MDBCol>
                </MDBRow>
              </MDBContainer>
            </section>
          </div>
        ))}
        {oneStar.map((four) => (
          <div style={{ marginRight: "100px" }}>
            <section className="">
              <MDBContainer className="py-5" style={{ maxWidth: "1000px" }}>
                <MDBRow className="justify-content-center">
                  <MDBCol>
                    <div className="d-flex flex-start mb-4">
                      <img
                        className="rounded-circle shadow-1-strong me-3"
                        src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(32).webp"
                        alt="avatar"
                        width="65"
                        height="65"
                      />

                      <MDBCard className="w-100">
                        <MDBCardBody className="p-4">
                          <div>
                            <MDBTypography className='black' tag="h5">{four.username}</MDBTypography>
                            <div>
                              <a href="">

                                <MDBIcon far icon="star text-danger me-1" />
                              </a>
                            </div>
                            <p className='black' style={{ minWidth: "1000px" }} >
                              {four.content}
                            </p>

                            <div className="d-flex justify-content-between align-items-center">
                              <div className="d-flex align-items-center">
                                <a href="#!" className="link-muted me-2">
                                  <MDBIcon fas icon="thumbs-up me-1" />
                                  132
                                </a>
                                <a href="#!" className="link-muted">
                                  <MDBIcon fas icon="thumbs-down me-1" />
                                  15
                                </a>
                              </div>
                              <a href="#!" className="link-muted">
                                <MDBIcon fas icon="reply me-1" /> Reply
                              </a>
                            </div>
                          </div>
                        </MDBCardBody>
                      </MDBCard>
                    </div>


                  </MDBCol>
                </MDBRow>
              </MDBContainer>
            </section>
          </div>
        ))}
        <div style={{ marginLeft: "60px" }}>
          <section style={{ width: "90%" }}>

            <MDBRow className="justify-content-center"  >
              <MDBCol  >
                <MDBCard>
                  <MDBCardBody className="p-4">
                    <div className="d-flex flex-start w-200">
                      <MDBCardImage
                        className="rounded-circle shadow-1-strong me-3"
                        src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(21).webp"
                        alt="avatar"
                        width="65"
                        height="65"
                      />

                      <div className="w-100">
                        <MDBTypography className='black' tag="h5">Bình luận</MDBTypography>

                        <MDBTextArea onChange={cmt} label="What is your view?" rows={4} />

                        <div className="d-flex justify-content-between mt-3">
                          <MDBBtn onClick={addRatings} color="danger">
                            Đăng <MDBIcon fas icon="long-arrow-alt-right ms-1" />
                          </MDBBtn>
                        </div>
                      </div>
                    </div>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>

          </section>
        </div>
      </div>
      <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <form class="modal-dialog"onSubmit={handleSubmit(updateCollection)}>
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="staticBackdropLabel" style={{ color: 'black' }}>Thêm sách vào bộ sưu tập</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div >
                <div class="mb-3">
                <label for="coll-name1" class="form-label" style={{ color: 'black' }} >Tên bộ sưu tập: </label>
                <input type="text" {...register('name')} id="coll-name" aria-describedby="emailHelp"/>

                </div>
                {/* <button type="submit" class="btn btn-primary">Submit</button> */}
                
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" id="closeadd" data-bs-dismiss="modal">Close</button>
              <button type="submit" class="btn btn-primary">Xác nhận</button>
            </div>
          </div>
        </form>
      </div>
    </>

  );
}



export default BookDetail