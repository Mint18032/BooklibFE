import React from 'react';
import '../styles/general.css';
import { useEffect, useState } from 'react';
import axios from "axios";
import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye';
import Cookies from 'universal-cookie';

function Login() {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const cookies = new Cookies();
  
    const handleSubmit = (e) => {
      // Prevent the default submit and page reload
      e.preventDefault();
  
      // Handle validations
      axios
        .post("http://localhost:5000/login", { username, password })
        .then((res) => {
          console.log(res);
          // setCookie('state', res.data.state, { path: '/' })
          cookies.set("state", res.data.user, { path: "/" });
          // cookies.get('myCat')
  
          localStorage.setItem("state", res.data.user);
          window.location.assign(res.data.url);
          window.dispatchEvent(new Event("loggedin"));
        })
        .catch((err) => console.log(err));
      return () => {};
    };
  
    
    return (
      <div>
        <form action="" id="login" method="post" onSubmit={handleSubmit}>
          <h1>Login</h1>
          <p className="item">
            <label for="Username"> Username </label>
            <input
              type="username"
              name="username"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </p>
          <p className="item">
            <label for="password"> Password </label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </p>
          <p className="item">
            <input type="submit" value="Login" />
          </p>
        </form>
      </div>
    );
  }
  
  export default Login;

// function Login() {
//     // let nav = useNavigate()
//     // const [cookies, setCookie] = useCookies('state')
//     const [type, setType] = useState('password');
//     const [icon, setIcon] = useState(eyeOff);
//     const cookies = new Cookies();

//     // useEffect(() => {
//     //     axios.get(`http://localhost:5000/login`, {
//     //         headers: {
//     //             "Access-Control-Allow-Headers": "Content-Type",
//     //         },
//     //     })
//     //         .then((res) => {
//     //             consoyle.log(res)
//     //             // setCookie('state', res.data.state, { path: '/' })

//     //             cookies.set('state', res.data.state, { path: '/' });
//     //             // cookies.get('myCat')

//     //             localStorage.setItem('state', (res.data.state));
//     //             window.location.assign(res.data.auth_url)
//     //             window.dispatchEvent(new Event("loggedin"));
//     //         })
//     //         .catch((err) => console.log(err));
//     //     return () => {
//     //     }
//     // }, []);
//     const handleToggle = () => {
//         if (type === 'password') {
//             setIcon(eye);
//             setType('text');
//         }
//         else {
//             setIcon(eyeOff);
//             setType('password');
//         }
//     }
//     return (
//         <>
//         <div className="container">
//             <form action="" method="POST" autoComplete="on">
//                 <h1 className="title has-text-grey">Đăng nhập</h1>
//                 <div className="box">
//                     <div className="field">
//                     <input
//                         type="email"
//                         className="item input"
//                         name="email"
//                         placeholder="Email"
//                         required=""
//                         defaultValue=""
//                     />
//                     <div className="field">
//                     <input
//                         type={type}
//                         id="password"
//                         className="item input"
//                         name="password"
//                         placeholder="Mật khẩu"
//                         required=""
//                         defaultValue=""
//                     />
//                     <span onClick={handleToggle}><Icon icon={icon} size={20}/></span>
//                     </div>
//                     <button type="submit" className="item button is-signin">
//                     Đăng nhập
//                     </button>
//                     <div className="is-divider"></div>
//                     <button className="item button is-signupGG">
//                     <i className="fa-brands fa-google" />
//                     Đăng nhập Google
//                     </button>
//                 </div>
//                 <p className="has-text-grey has-text-right">
//                     <a href="./register.html">Đăng ký</a>
//                 </p>
//                 </div>
//             </form>
//         </div>
//         </>
//     );
// }
// export default Login