import React from 'react';
import '../styles/general.css';
import { useEffect, useState } from 'react';
import axios from "axios";
import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye';
import Cookies from 'universal-cookie';


function Login() {
    // let nav = useNavigate()
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [type, setType] = useState('password');
    const [icon, setIcon] = useState(eyeOff);
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

    const ggSubmitAPI = (e) => {
      e.preventDefault();
        axios.get(`http://localhost:5000/loginAPI`, {
            headers: {
                "Access-Control-Allow-Headers": "Content-Type",
            },
        })
            .then((res) => {
                console.log(res)
                // setCookie('state', res.data.state, { path: '/' })

                cookies.set('state', res.data.state, { path: '/' });
                // cookies.get('myCat')

                localStorage.setItem('state', (res.data.state));
                window.location.assign(res.data.auth_url)
                window.dispatchEvent(new Event("loggedin"));
            })
            .catch((err) => console.log(err));
        return () => {
        }
    };

    const handleToggle = () => {
        if (type === 'password') {
            setIcon(eye);
            setType('text');
        }
        else {
            setIcon(eyeOff);
            setType('password');
        }
    }
    return (
        <>
        <div className="container">
            <form action="" method="POST" autoComplete="on" onSubmit={handleSubmit}>
                <h1 className="title has-text-grey">Đăng nhập</h1>
                <div className="box">
                    <div className="field">
                    <div className="field">
                    <input
                        type={username}
                        id="username"
                        className="item input"
                        name="username"
                        placeholder="Tài khoản"
                        required=""
                        defaultValue=""
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    </div>
                    <div className="field">
                    <input
                        type={'password'}
                        id="password"
                        className="item input"
                        name="password"
                        placeholder="Mật khẩu"
                        required=""
                        defaultValue=""
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {/* <span onClick={handleToggle}><Icon icon={icon} size={20}/></span> */}
                    </div>
                    <button type="submit" className="item button is-signin">
                    Đăng nhập
                    </button>
                    <div className="is-divider"></div>
                    <button className="item button is-signupGG" onClick={ggSubmitAPI}>
                    <i className="fa-brands fa-google" />
                    Đăng nhập Google
                    </button>
                </div>
                <p className="has-text-grey"> Chưa có tài khoản? 
                    <a href="./register"> Đăng ký</a>
                </p>
                </div>
            </form>
        </div>
        </>
    );
}
export default Login