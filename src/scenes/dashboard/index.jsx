import { Box, Button, Rating, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import StatBox from "../../components/StatBox";
import Sidebar from "../../scenes/global/Sidebar";
import { useState, useEffect, useRef } from "react";
import Cookies from "universal-cookie";
import axios from "axios"
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const ref = useRef(null);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isSidebar, setIsSidebar] = useState(true);
  const [user, setUser] = useState([]);
  const [popularBooks, setPopularBooks] = useState(null);
  const cookies = new Cookies();
  const nav = useNavigate()

  const readpopularBooks = async (e) => {
    console.log(e.currentTarget.id);
    const id = await e.currentTarget.id;

    nav("/book/" + id);
  };

  const toAuthor = async (e) => {
    console.log(e.currentTarget.id);
    const id = await e.currentTarget.id;

    nav("/author/" + id);
  };
  useEffect(() => {
    axios
      .get(`http://localhost:5000`, {
        headers: {
          "Access-Control-Allow-Headers": "Content-Type",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res.data.popular.books);
        setPopularBooks(res.data.popular.books);
      });
  }, []);

  return (
    <div className="app">
      <div className="side">
        <Sidebar {...user} isSidebar={isSidebar} />
      </div>
      <main className="content">
        <Box m="20px">
          {/* HEADER */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Header title="DASHBOARD" subtitle="Sách nổi bật" />
          </Box>

            <Box
              gridColumn="span 12"
              height={600}
              paddingTop={2}
              backgroundColor={colors.primary[400]}
            >
              
              <ul className="products">
                {popularBooks?.map((book) => (
                  <li>
                    <div className="product-item">
                      <div
                        className="product-top"
                        ref={ref}
                        id={book.book_id}
                        onClick={readpopularBooks}
                      >
                        <a className="product-thumb">
                          <img src={book.cover} alt="cover" />
                          <div className="product-rating">
                            {/* http://localhost:5000/book/book_id */}
                            <Rating
                              name="half-rating"
                              value={book.current_rating}
                              precision={1}
                            />
                          </div>
                          <div className="rating">
                            {/* http://localhost:5000/book/book_id */}
                            <Rating
                              name="half-rating"
                              value={book.current_rating}
                              precision={1}
                            />
                          </div>
                        </a>
                      </div>

                      <div className="product-info">
                        <a
                          href
                          className="product-name"
                          ref={ref}
                          id={book.book_id}
                          onClick={readpopularBooks}
                        >
                          {book.title}
                        </a>
                        <a
                          href
                          className="product-author"
                          id={Object.keys(book.authors[0])}
                          onClick={toAuthor}
                        >
                          {Object.values(book.authors[0])}
                        </a>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
          </Box>
        </Box>
      </main>
    </div>
  );
};

export default Dashboard;
