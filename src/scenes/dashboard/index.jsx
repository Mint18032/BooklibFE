import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import GeographyChart from "../../components/GeographyChart";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";
import Sidebar from "../../scenes/global/Sidebar";
import { useState, useEffect } from "react";
import '../../styles/HomePage.css';
import imgSrc1 from '../../images/mainPage/book1.jpg'
import imgSrc2 from '../../images/mainPage/book2.jpg'
import imgSrc3 from '../../images/mainPage/book3.jpg'
import imgSrc4 from '../../images/mainPage/book4.jpg'
import imgSrc5 from '../../images/mainPage/book5.jpg'
import imgSrc6 from '../../images/mainPage/book6.jpg'
import imgSrc7 from '../../images/mainPage/book7.jpg'
import imgSrc8 from '../../images/mainPage/book8.jpg'
import axios from "axios"

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isSidebar, setIsSidebar] = useState(true);
  const [user, setUser] = useState([])

  function fetchUser() {
    axios.get("http://w22g7.int3306.freeddns.org/my_account", {
      params: { 'state': localStorage.getItem('state') },
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        'Content-Type': 'application/json'
      },
    })
      .then((res) => {
        if (res.status == 203) {
          
        }
        else {
          console.log(res)
          setUser(res.data)
        }
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    
    fetchUser()
    
    
  }, [])
  return (
    <div className="app">
      <div className="side">
        <Sidebar {...user} isSidebar={isSidebar} />
        </div>
      <main className="content">
       
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="12,361"
            subtitle="Emails Sent"
            progress="0.75"
            increase="+14%"
            icon={
              <EmailIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="431,225"
            subtitle="View Obtained"
            progress="0.50"
            increase="+21%"
            icon={
              <PointOfSaleIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="32,441"
            subtitle="New Readers"
            progress="0.30"
            increase="+5%"
            icon={
              <PersonAddIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="1,325,134"
            subtitle="Report Received"
            progress="0.80"
            increase="+43%"
            icon={
              <TrafficIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }} 
              />
            }
          />
        </Box>
        <Box
              gridColumn="span 12"
              height={600}
          backgroundColor={colors.primary[400]}
          
        >
          <div className="headline">
        <h2>Sách hot trong tuần</h2>
        <hr />
      </div>
      <ul className="products">
        <li>
          <div className="product-item">
            <div className="product-top">
              <a href className="product-thumb">
                <img src={imgSrc1} alt="" />
              </a>
            </div>
            <div className="product-info">
              <a href className="product-name">Phía Tây không có gì lạ</a>
              <a href className="product-author">Edward Berger</a>
            </div>
          </div>
        </li>
        <li>
          <div className="product-item">
            <div className="product-top">
              <a href className="product-thumb">
                <img src={imgSrc2} alt="" />
              </a>
            </div>
            <div className="product-info">
              <a href className="product-name">Gia Tộc Rồng</a>
              <a href className="product-author">Ryan Condal</a>
            </div>
          </div>
        </li>
        <li>
          <div className="product-item">
            <div className="product-top">
              <a href className="product-thumb">
                <img src={imgSrc3} alt="" />
              </a>
            </div>
            <div className="product-info">
              <a href className="product-name">Bỗng dưng trúng số</a>
              <a href className="product-author">Park Gyu-tae</a>
            </div>
          </div>
        </li>
        <li>
          <div className="product-item">
            <div className="product-top">
              <a href className="product-thumb">
                <img src={imgSrc4} alt="" />
              </a>
            </div>
            <div className="product-info">
              <a href className="product-name">Chúa tể những chiếc nhẫn</a>
              <a href className="product-author">Patrick Mckay</a>
            </div>
          </div>
        </li>
        
      </ul>
        </Box>
        
        
      </Box>
        </Box>
        </main>
      </div>
  );
};

export default Dashboard;
