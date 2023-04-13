import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import "../../index.css"
import { useState, useEffect } from "react";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { storage } from "../../firebase";
import { v4 } from "uuid";

const AccountManagement = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  let initialValues = {
    avatar_url: "",
    username: "",
    email: "",
    name: "",

    user_role: ""
  };
  const [Info, setInfos] = useState(initialValues);
  const handleFormSubmit = (values) => {
    values.avatar_url = imageUrls
      setInfos(values)
        console.log(Info);
  };
  const imagesListRef = ref(storage, "images/");
  const uploadFile = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrls(url);
        
        console.log(imageUrls)

      });
    });
  };

 
    return (
        
        <div className="content1">
          
            <Box sx={{
              width: 4000,
              height: 10000
              
              
            }}
              m="20px">
          <Header username="ACCOUNT INFO"  />
    
          <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValues}
            validationSchema={checkoutSchema}
          >
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
            }) => (
                  <form onSubmit={handleSubmit}>
                  
                <Box
                  display="grid"
                  gap="30px"
                  gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                  sx={{
                    "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                  }}
                >
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="username"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.username}
                    name="username"
                    error={!!touched.username && !!errors.username}
                    helperText={touched.username && errors.username}
                    sx={{ gridColumn: "span 4" }}
                      />
                       
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    name="email"
                    error={!!touched.email && !!errors.email}
                    helperText={touched.email && errors.email}
                    sx={{ gridColumn: "span 4 " }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.name}
                    name="name"
                    error={!!touched.name && !!errors.name}
                    helperText={touched.name && errors.name}
                    sx={{ gridColumn: "span 4" }}
                  />
                  
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="User role"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.user_role}
                    name="user_role"
                    error={!!touched.user_role && !!errors.user_role}
                    helperText={touched.user_role && errors.user_role}
                    sx={{ gridColumn: "span 4" }}
                  />
                  
                  
                  </Box>
                  <Box sx={{marginTop : 2 }} display="flex" flexDirection={"row"}  m="  0  0 20px 0" justifyContent={"space-between"}>
                  <input 
        type="file"
        onChange={(event) => {
          setImageUpload(event.target.files[0]);
        }}
      />
      <button type="button" onClick={uploadFile}> Upload Image</button>
                  </Box>
                  <Box>
                    
       <img src={imageUrls} width={100} height={100} marginTop={300} />
      
                  </Box>
                <Box display="flex" justifyContent="end" mt="20px">
                                    <Button type="submit" color="secondary" variant="contained" 
                                        sx={{
                                            fontSize: 20,
                                            marginRight: 50,
                                            width: 500
                                        }}>
                    EDIT INFO
                                    </Button>
                                   
                </Box>
              </form>
            )}
              </Formik>
             
      
            </Box>
            </div>
      );
    };
    
    
    
    const checkoutSchema = yup.object().shape({
      username: yup.string().required("required"),
      email: yup.string().required("required"),
      name: "",
      user_role: yup.string().required("required"),
     
    });

export default AccountManagement
