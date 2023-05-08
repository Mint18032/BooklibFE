import "font-awesome/css/font-awesome.min.css";
import "../styles/general.css";
import "../styles/books.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import React from "react";
import { Helmet } from 'react-helmet';
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
import { useCallback } from "react";
import { Cookies } from 'react-cookie';

function BookDetail() {
  const [data, setData] = useState([]);
  const [avt, setAvt] = useState();
  const { auth_id } = useParams();
  const [genre, setGenre] = useState([]);
  const [author, setAuthor] = useState([]);
  const [commentData, setcommentData] = useState("");
  const [ratingData, setRatingData] = useState(0);
  const [ratingStars, updateRatingStar] = useState([[], [], [], [], []]);
  const [starCount, countStar] = useState([]);
  const { register, handleSubmit } = useForm();
  let nav = useNavigate();
  const cookies = new Cookies();

  const updateCollection = async (e) => {
    console.log(e);
    axios
      .post(
        `http://localhost:5000/my_collections/${
          e.name
        }?state=${cookies.get("state")}`,
        {
          books: [auth_id],
        },
        {}
      )
      .then(function (response) {
        console.log(response);
        document.getElementById("closeadd")?.click();
      })
      .catch(function (error) {});
  };

  const fetchBook = useCallback(() => {
    axios
      .get(`http://localhost:5000/books/?book_id=${auth_id}`, {
        headers: {
          "Access-Control-Allow-Headers": "Content-Type",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.status === 203) {
          nav("/login");
        } else {
          console.log(Object.keys(res.data.authors[0]));
          setData(res.data);
          setGenre(res.data.genre);
          setAuthor(res.data.authors[0]);
          updateRatingStar([
            res.data.one_star.ratings,
            res.data.two_star.ratings,
            res.data.three_star.ratings,
            res.data.four_star.ratings,
            res.data.five_star.ratings,
          ]);
          let totalRatings =
            res.data.five_star.ratings.length +
            res.data.four_star.ratings.length +
            res.data.three_star.ratings.length +
            res.data.two_star.ratings.length +
            res.data.one_star.ratings.length;
          if (totalRatings === 0) totalRatings = 1;
          countStar([
            (res.data.five_star.ratings.length * 5 +
              res.data.four_star.ratings.length * 4 +
              res.data.three_star.ratings.length * 3 +
              res.data.two_star.ratings.length * 2 +
              res.data.one_star.ratings.length * 1) /
              totalRatings,
              res.data.one_star.ratings.length,
              res.data.two_star.ratings.length,
              res.data.three_star.ratings.length,
              res.data.four_star.ratings.length,
              res.data.five_star.ratings.length,
            totalRatings,
          ]);
        }
      })
      .catch((err) => console.log(err));
  }, [auth_id, nav]);

  function fetchUser() {
    axios.get("http://localhost:5000/my_account", {
      params: { 'state': cookies.get('state') },
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        'Content-Type': 'application/json'
      },
    })
      .then((res) => {
        if (res.status === 203) {
          nav("/login");
        }
        else {
          setAvt(res.data.profile_pic !== null ? res.data.profile_pic : "https://i.pinimg.com/736x/cc/67/b0/cc67b05deb2f4490daa287a533b0890e.jpg");
          console.log(avt.toString());
        }
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    fetchBook();
    fetchUser();
  }, [fetchBook]);

  const readBook = async (e) => {
    nav("/reading/" + data.book_id);
  };

  const cmt = async (e) => {
    const cmmt = await e.target.value;
    setcommentData(cmmt);
  };

  const addRatings = async (e) => {
    if (ratingData === 0) {
      alert("Vui lòng chọn số sao thích hợp!");
      return;
    }
    axios
      .post(
        `http://localhost:5000/my_ratings?state=${cookies.get(
          "state"
        )}`,
        {
          book_id: data.book_id,
          stars: ratingData,
          content: commentData,
        },
        {}
      )
      .then(function (response) {
        console.log(response.data);
        fetchBook();
        setcommentData("");
        setRatingData(0);
      })
      .catch(function (error) {
        console.log(error);
        alert("Không thể nhận xét!");
      });
  };

  const toAuthor = async (e) => {
    console.log(e.currentTarget.id);
    const id = await e.currentTarget.id;
    nav("/author/" + id);
  };

  return (
    <>
      <Helmet>
        <title>{data.title}</title>
      </Helmet>

      <div>
        <div className="bookDetails">
          <div className="large-cover" />
          <div className="book-view-container">
            <div className="column book-view-left">
              <div className="book-cover">
                <img src={data.cover} alt="" />
              </div>
              <button
                id="readBtn"
                onClick={readBook}
                className="readBtn"
                role="link"
              >
                ĐỌC SÁCH
              </button>
            </div>
            <div className="column book-view-right">
              <h1 className="book-name">{data.title}</h1>

              <div className="rating-stars">
                <span
                  className={
                    starCount[0] >= 1 ? "fa fa-star checked-star" : "fa fa-star"
                  }
                />
                <span
                  className={
                    starCount[0] >= 2 ? "fa fa-star checked-star" : "fa fa-star"
                  }
                />
                <span
                  className={
                    starCount[0] >= 3 ? "fa fa-star checked-star" : "fa fa-star"
                  }
                />
                <span
                  className={
                    starCount[0] >= 4 ? "fa fa-star checked-star" : "fa fa-star"
                  }
                />
                <span
                  className={
                    starCount[0] === 5
                      ? "fa fa-star checked-star"
                      : "fa fa-star"
                  }
                />
                &nbsp;
                <div className="average-rating-point">
                  {starCount[0] > 0 ? starCount[0] : "0"}
                </div>
              </div>
              <br />
              <button className="share-to-fb">
                <i className="fab fa-facebook-square" /> &nbsp;Chia sẻ
              </button>
              <button
                className="add-to-collection"
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
              >
                <i className="fas fa-plus" /> &nbsp;Bộ sưu tập
              </button>

              <table className="book-details-table">
                <tbody>
                  <tr>
                    <th>TÁC GIẢ : </th>

                    <td
                      className="author-link"
                      id={[Object.keys(author)[0]]}
                      onClick={toAuthor}
                    >
                      {author[Object.keys(author)]}
                    </td>
                  </tr>
                  <tr>
                    <th>THỂ LOẠI : </th>
                    <td>
                      {" "}
                      {genre.map((gen) => (
                        <span className="genre-tag">{gen}</span>
                      ))}
                    </td>
                  </tr>
                  <tr>
                    <th>XUẤT BẢN : </th>
                    <td> {data.public_year}</td>
                  </tr>
                </tbody>
              </table>
              <div className="book-description">{data.descript}</div>
            </div>
          </div>
        </div>

        <div className="comment-section">
          <h2>Đánh giá của người đọc</h2>
          <div id="ratingDetails" class="rating-details">
            <div class="side">
              <div>5 sao</div>
            </div>
            <div class="middle">
              <div class="bar-container">
                <div
                  class="rating-bar"
                  style={{
                    width: ((starCount[5] / starCount[6]) * 100)
                      .toString()
                      .concat("%"),
                  }}
                ></div>
              </div>
            </div>
            <div class="side right">
              <div>{starCount[5]}</div>
            </div>
            <div class="side">
              <div>4 sao</div>
            </div>
            <div class="middle">
              <div class="bar-container">
                <div
                  class="rating-bar"
                  style={{
                    width: ((starCount[4] / starCount[6]) * 100)
                      .toString()
                      .concat("%"),
                  }}
                ></div>
              </div>
            </div>
            <div class="side right">
              <div>{starCount[4]}</div>
            </div>
            <div class="side">
              <div>3 sao</div>
            </div>
            <div class="middle">
              <div class="bar-container">
                <div
                  class="rating-bar"
                  style={{
                    width: ((starCount[3] / starCount[6]) * 100)
                      .toString()
                      .concat("%"),
                  }}
                ></div>
              </div>
            </div>
            <div class="side right">
              <div>{starCount[3]}</div>
            </div>
            <div class="side">
              <div>2 sao</div>
            </div>
            <div class="middle">
              <div class="bar-container">
                <div
                  class="rating-bar"
                  style={{
                    width: ((starCount[2] / starCount[6]) * 100)
                      .toString()
                      .concat("%"),
                  }}
                ></div>
              </div>
            </div>
            <div class="side right">
              <div>{starCount[2]}</div>
            </div>
            <div class="side">
              <div>1 sao</div>
            </div>
            <div class="middle">
              <div class="bar-container">
                <div
                  class="rating-bar"
                  style={{
                    width: ((starCount[1] / starCount[6]) * 100)
                      .toString()
                      .concat("%"),
                  }}
                ></div>
              </div>
            </div>
            <div class="side right">
              <div>{starCount[1]}</div>
            </div>
          </div>

          {ratingStars.map((startNum, index) =>
            startNum.map((details) => (
              <div style={{ marginRight: "100px" }}>
                <section>
                  <MDBContainer style={{ maxWidth: "1000px" }}>
                    <MDBRow className="justify-content-center">
                      <MDBCol>
                        <div className="d-flex flex-start">
                          <img
                            className="rounded-circle shadow-1-strong me-3"
                            src="https://i.pinimg.com/736x/cc/67/b0/cc67b05deb2f4490daa287a533b0890e.jpg"
                            alt="avatar"
                            width="65"
                            height="65"
                          />

                          <MDBCard className="w-100">
                            <MDBCardBody className="p-4">
                              <div>
                                <MDBTypography className="black" tag="h5">
                                  {details.username}
                                </MDBTypography>
                                <div>
                                  <div className="rating-stars">
                                    <span
                                      className={
                                        index + 1 >= 1
                                          ? "fa fa-star checked-star"
                                          : "fa fa-star"
                                      }
                                    />
                                    <span
                                      className={
                                        index + 1 >= 2
                                          ? "fa fa-star checked-star"
                                          : "fa fa-star"
                                      }
                                    />
                                    <span
                                      className={
                                        index + 1 >= 3
                                          ? "fa fa-star checked-star"
                                          : "fa fa-star"
                                      }
                                    />
                                    <span
                                      className={
                                        index + 1 >= 4
                                          ? "fa fa-star checked-star"
                                          : "fa fa-star"
                                      }
                                    />
                                    <span
                                      className={
                                        index + 1 === 5
                                          ? "fa fa-star checked-star"
                                          : "fa fa-star"
                                      }
                                    />
                                    &nbsp;
                                  </div>
                                </div>
                                <p
                                  className="black"
                                  style={{ minWidth: "1000px" }}
                                >
                                  {details.content}
                                </p>
                              </div>
                            </MDBCardBody>
                          </MDBCard>
                        </div>
                      </MDBCol>
                    </MDBRow>
                  </MDBContainer>
                </section>
              </div>
            ))
          )}

          <div style={{ marginLeft: "60px" }}>
            <section style={{ width: "90%" }}>
              <MDBRow className="justify-content-center mt-5">
                <MDBCol>
                  <MDBCard>
                    <MDBCardBody className="p-4">
                      <div className="d-flex flex-start w-200">
                        <MDBCardImage
                          className="rounded-circle shadow-1-strong me-3"
                          src={avt}
                          alt="avatar"
                          width="65"
                          height="65"
                        />

                        <div className="w-100">
                          <MDBTypography className="black" tag="h5">
                            Bình luận
                          </MDBTypography>
                          <a className="rating-stars" href="#ratingDetails">
                            <span
                              className={
                                ratingData >= 1
                                  ? "fa fa-star checked-star"
                                  : "fa fa-star"
                              }
                              onClick={() => setRatingData(1)}
                            />
                            <span
                              className={
                                ratingData >= 2
                                  ? "fa fa-star checked-star"
                                  : "fa fa-star"
                              }
                              onClick={() => setRatingData(2)}
                            />
                            <span
                              className={
                                ratingData >= 3
                                  ? "fa fa-star checked-star"
                                  : "fa fa-star"
                              }
                              onClick={() => setRatingData(3)}
                            />
                            <span
                              className={
                                ratingData >= 4
                                  ? "fa fa-star checked-star"
                                  : "fa fa-star"
                              }
                              onClick={() => setRatingData(4)}
                            />
                            <span
                              className={
                                ratingData === 5
                                  ? "fa fa-star checked-star"
                                  : "fa fa-star"
                              }
                              onClick={() => setRatingData(5)}
                            />
                            &nbsp;
                          </a>

                          <MDBTextArea
                            onChange={cmt}
                            className="text-black"
                            label="Thêm nhận xét của bạn"
                            rows={4}
                          />

                          <div className="d-flex justify-content-between mt-3">
                            <MDBBtn onClick={addRatings} color="danger">
                              Đăng{" "}
                              <MDBIcon fas icon="long-arrow-alt-right ms-1" />
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
      </div>
      <div
        class="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <form class="modal-dialog" onSubmit={handleSubmit(updateCollection)}>
          <div class="modal-content">
            <div class="modal-header">
              <h1
                class="modal-title fs-5"
                id="staticBackdropLabel"
                style={{ color: "black" }}
              >
                Thêm sách vào bộ sưu tập
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div>
                <div class="mb-3">
                  <label
                    for="coll-name1"
                    class="form-label"
                    style={{ color: "black" }}
                  >
                    Tên bộ sưu tập:{" "}
                  </label>
                  <input
                    type="text"
                    {...register("name")}
                    id="coll-name"
                    aria-describedby="emailHelp"
                  />
                </div>
                {/* <button type="submit" class="btn btn-primary">Submit</button> */}
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                id="closeadd"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="submit" class="btn btn-primary">
                Xác nhận
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default BookDetail;
