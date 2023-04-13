import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../../index.css";
import Sidebar from "../../scenes/global/Sidebar";
import SearchIcon from "@mui/icons-material/Search";
import Alert from '@mui/material/Alert';
const Team = (props) => {
  const [success, setSucess] = useState(false);
  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [books, setBooks] = useState([]);
  

  const [id, setId] = useState(-1);
  
  function handleGetRowId() {
    setId(id+1);
    return id;
  }
  
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isSidebar, setIsSidebar] = useState(true);
  const [selectionModel, setSelectionModel] = useState([]);
  const [user, setUser] = useState([]);
  const current = new Date();
  const date10 = `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate() + 10}`;
  const date100 = `${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()+100}`;

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    
  ];
  function fetchUser() {
    axios.get("http://localhost:5000/my_account", {
      params: { 'state': localStorage.getItem('state') },
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
          console.log(res)
          setUser(res.data)
        }
      })
      .catch((err) => console.log(err));
  }
  const Ban10 = (e) => {
    console.log(user)
    console.log(data[selectionModel.newSelectionModel]['username'])
    axios.post(`http://localhost:5000/ban_user?state=${localStorage.getItem('state')}`, {
      "username": data[selectionModel.newSelectionModel]['username'],
      "restrict_due": date10 + " 22:27:5"
  }, {
      
    })
      .then(function (response) {
        console.log(response.data);
        setSucess(true);
        

      })
      .then(function (response){
        setTimeout(() => {
          setSucess(false);
        }, 3000);
        
        
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const Ban100 = (e) => {
    console.log(user)
    console.log(data[selectionModel.newSelectionModel]['username'])
    axios.post(`http://localhost:5000/ban_user?state=${localStorage.getItem('state')}`, {
      "username": data[selectionModel.newSelectionModel]['username'],
      "restrict_due": date100 + " 22:27:5"
  }, {
      
    })
      .then(function (response) {
        console.log(response.data);
        setSucess(true);
      })
      .then(function (response){
        setTimeout(() => {
          setSucess(false);
        }, 1000);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
        
      
  

  function fetchBook() {
    axios.get("http://localhost:5000/user_list", {
      params: { 'state': localStorage.getItem('state') },
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
          
          const getData = res.data;
          
          setData(getData)
          console.log(getData)
          setUser(getData.username)
        }
      })
      .catch((err) => console.log(err));
  }
  let nav = useNavigate()
  useEffect(() => {
    
    fetchBook()
    fetchUser()
    
  });

  useEffect(() => {
    if (searchValue === '') {
      axios.get(`http://localhost:5000/`).then(res => {
        console.log(res.data?.popular?.books);
        setBooks(res.data?.popular?.books)
      }).catch(() => {
        setBooks([])
      })
    } else {
      
    }
  }, [searchValue]);

  return (
    <div className="app">
      
    <div className="side-team">
      <Sidebar {...user} isSidebar={isSidebar} />
      </div>
      <main className="content">
        
        {success? <Alert severity="success">USER  BANNED!</Alert>: <></>}
      <div id="wrapper">
        <div className="search-field">
          <input type="text" className="input is-medium" placeholder="Nhập tên user..." onInput={e => setSearchValue(e.target.value)} />
          <div className="icon-margin">
            <SearchIcon sx={{ fontSize: 40 }} />
          </div>
          </div>
          </div>
       
       
    <Box m="20px">
          <Header title="Users" subtitle="Managing the users" />
          <div className="flex-main">
            <Box     
              onClick={(e) => Ban10( e)}
            width="20%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
               colors.greenAccent[600]
                
            }
            borderRadius="4px"
          >
            
             <SecurityOutlinedIcon />
            
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              Ban 10 days
            </Typography>
            </Box>
            <Box
              onClick={(e) => Ban10( e)}
            width="20%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
               colors.greenAccent[600]
                
            }
            borderRadius="4px"
          >
             <SecurityOutlinedIcon />
            
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              Ban 100 days
            </Typography>
            </Box>
            <Box
            width="20%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
               colors.greenAccent[600]
                
            }
            borderRadius="4px"
          >
             <SecurityOutlinedIcon />
            
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              Ban
            </Typography>
          </Box>
          </div>
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
            <DataGrid
              onSelectionModelChange={(newSelectionModel) => {
                
                setSelectionModel({
                  ...selectionModel,newSelectionModel
                }
                   
                )
              }}
              
              getRowId={(row) =>  handleGetRowId()}
                // newSelectionArray is [5,1] given the select order is 5 then 1
              
              checkboxSelection rows={data} columns={columns} />
      </Box>
          </Box>
          
        </main>
      </div>
  );
};

export default Team;