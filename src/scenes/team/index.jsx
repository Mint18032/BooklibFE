import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import "../../index.css";
import Sidebar from "../../scenes/global/Sidebar";
import SearchIcon from "@mui/icons-material/Search";
import Alert from "@mui/material/Alert";
import Cookies from "universal-cookie";
import { v4 as uuidv4 } from "uuid";

const Team = (props) => {
  const [success, setSucess] = useState(false);
  // const [dataWithouID, setDataWithoutID] = useState([]);
  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const cookies = new Cookies();

  const handleGetRowId = (row) => row.id;

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isSidebar, setIsSidebar] = useState(true);
  const [selectionModel, setSelectionModel] = useState([]);
  const [user, setUser] = useState([]);
  let nav = useNavigate();
  const current = new Date();
  const date10 = `${current.getFullYear()}-${current.getMonth() + 1}-${
    current.getDate() + 10
  }`;
  const date100 = `${current.getFullYear()}-${current.getMonth() + 1}-${
    current.getDate() + 100
  }`;

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "username",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },

    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
  ];
  // const fetchUser = useCallback(() => {
  //   axios
  //     .get("http://localhost:5000/my_account", {
  //       params: { state: cookies.get("state") },
  //       headers: {
  //         "Access-Control-Allow-Headers": "Content-Type",
  //         "Content-Type": "application/json",
  //       },
  //     })
  //     .then((res) => {
  //       if (res.status === 203) {
  //         nav("/login");
  //       } else {
  //         console.log(res);
  //         setUser(res.data);
  //       }
  //     })
  //     .catch((err) => console.log(err));
  // }, [nav, cookies]);

  const Ban10 = (e) => {
    console.log(user);
    console.log(data[selectionModel.newSelectionModel]["username"]);
    axios
      .post(
        `http://localhost:5000/ban_user?state=${cookies.get("state")}`,
        {
          username: data[selectionModel.newSelectionModel]["username"],
          restrict_due: date10 + " 22:27:5",
        },
        {}
      )
      .then(function (response) {
        console.log(response.data);
        setSucess(true);
      })
      .then(function (response) {
        setTimeout(() => {
          setSucess(false);
        }, 3000);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const Ban100 = (e) => {
    console.log(user);
    console.log(data[selectionModel.newSelectionModel]["username"]);
    axios
      .post(
        `http://localhost:5000/ban_user?state=${cookies.get("state")}`,
        {
          username: data[selectionModel.newSelectionModel]["username"],
          restrict_due: date100 + " 22:27:5",
        },
        {}
      )
      .then(function (response) {
        console.log(response.data);
        setSucess(true);
      })
      .then(function (response) {
        setTimeout(() => {
          setSucess(false);
        }, 1000);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const fetchUserList = () => {
    axios
      .get("http://localhost:5000/user_list", {
        params: { state: cookies.get("state") },
        headers: {
          "Access-Control-Allow-Headers": "Content-Type",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.status === 203) {
          nav("/login");
        } else {
          const getData = res.data;
          console.log(res.data);
          // setDataWithoutID(getData);
          setData(getData.map((row, id) => ({ ...row, id })));
          console.log(getData);
          setUser(getData.username);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    // fetchUser();
    fetchUserList();
  }, []);

  return (
    <div className="app">
      <div className="side-team">
        <Sidebar {...user} isSidebar={isSidebar} />
      </div>
      <main className="content">
        {success ? <Alert severity="success">USER BANNED!</Alert> : <></>}

        <Box m="20px">
          <Header title="Users" subtitle="Managing the users" />
          <div className="flex-main">
            <Box
              onClick={(e) => Ban10(e)}
              width="20%"
              m="0 auto"
              p="5px"
              display="flex"
              justifyContent="center"
              backgroundColor={colors.greenAccent[600]}
              borderRadius="4px"
            >
              <SecurityOutlinedIcon />

              <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
                Ban 10 days
              </Typography>
            </Box>
            <Box
              onClick={(e) => Ban10(e)}
              width="20%"
              m="0 auto"
              p="5px"
              display="flex"
              justifyContent="center"
              backgroundColor={colors.greenAccent[600]}
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
              backgroundColor={colors.greenAccent[600]}
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
              checkboxSelection
              rows={data}
              columns={columns}
              getRowId={(row) => handleGetRowId(row)}
              selectionModel={selectionModel}
              onSelectionModelChange={(newSelectionModel) => {
                setSelectionModel(newSelectionModel);
              }}
            />
          </Box>
        </Box>
      </main>
    </div>
  );
};

export default Team;
