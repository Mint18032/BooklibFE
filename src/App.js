import { Routes, Route } from "react-router-dom";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Form from "./scenes/form";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import HomePage from "./scenes/HomePage";
import Header from "./scenes/Header";
import Footer from "./scenes/Footer";
import Search from "./scenes/Search"
import BookDetail from "./scenes/Book_detail";
import Register from "./scenes/Register";
import Login from "./scenes/Login";
import Reading from "./scenes/Reading";
import Accounts from "./scenes/Accounts"; // TODO: fix
import Author from "./scenes/Author";
import DeleteBook from "./scenes/deletebook";
import { Cookies } from 'react-cookie';

const cookies = new Cookies();

function App() {
  const [theme, colorMode] = useMode();  

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <main className="content">
            
            <Routes>
              <Route path="/" element={<><Header /> <HomePage /> <Footer /> </>}/>
              <Route path="/register" element={<><Header /> <Register /> <Footer /> </>}/>
              <Route path="/search" element={<><Header /> <Search /> <Footer /> </>}/>
              <Route path="/login" element={<><Header /> <Login /> <Footer /> </>}/>
              <Route path="/reading/:book_id" element={<><Header /> <Reading /> <Footer /> </>}/>
              <Route path="/Dashboard" element={<Dashboard />} />
              <Route path="/team" element={<Team />} />
              <Route path="/form1" element={<DeleteBook />} />
              <Route path="/form" element={<Form />} />
              <Route path="/book/:auth_id" element={<> <Header /> <BookDetail /> <Footer /> </>} />
              <Route path="/account" element= {<> <Header /> <Accounts /> <Footer /> </>} />
              <Route path="/author/:auth_id" element= {<> <Header /> <Author /> <Footer /> </>} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
