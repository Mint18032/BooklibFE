import React from 'react';
import '../styles/general.css'
import { useState } from 'react';
import axios from "axios";
import { Icon } from 'react-icons-kit';
import {eyeOff} from 'react-icons-kit/feather/eyeOff'
import {eye} from 'react-icons-kit/feather/eye'
import { Helmet } from 'react-helmet';
import Cookies from 'universal-cookie';


function Register() {

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [email, setEmail] = useState();
    const [type, setType] = useState('password');
    const [icon, setIcon] = useState(eyeOff);
    const cookies = new Cookies();

    const handleRegister = (e) => {
        // Prevent the default submit and page reload
        e.preventDefault();
    
        // Handle validations
        axios
          .post("http://localhost:5000/register", {email, username, password})
          .then((res) => {
            console.log(res);
            // setCookie('state', res.data.state, { path: '/' })
            cookies.set("state", res.data.user, { path: "/" });
            // cookies.get('myCat')
    
            localStorage.setItem("state", res.data.user);
            Noti();
            window.location.assign("http://localhost:3000/login");
            window.dispatchEvent(new Event("loggedin"));

          })
          .catch((err) => console.log(err));
        return () => {};
    };

    function Noti() {
        alert("Đăng ký thành công");
    }

    const handleToggle = () => {
        if(type==='password') {
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
        <Helmet>
            <title>Đăng ký</title>
        </Helmet>
        
        <div className="container">
            <form action="" method="POST" autoComplete="on" onSubmit={handleRegister}>
                <div>
                <h1 className="title has-text-grey">Đăng ký</h1>
                <div className="box">
                    <div className="field">
                    <input
                        type="email"
                        className="item input"
                        name="email"
                        placeholder="Email"
                        required=""
                        defaultValue=""
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    </div>
                    <div className="field">
                    <input
                        type="text"
                        className="item input"
                        name="username"
                        placeholder="Tên bạn"
                        required=""
                        defaultValue=""
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    </div>
                    <div className="field">
                    <input
                        type={type}
                        id="password"
                        className="item input"
                        name="password"
                        placeholder="Mật khẩu"
                        required=""
                        defaultValue=""
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <span onClick={handleToggle}><Icon icon={icon} size={20}/></span>
                    </div>
                    <button type="submit" className="item button is-signin" onClick={Noti}>
                    Đăng ký
                    </button>

                </div>
                <p className="has-text-grey has-text-right">
                    <a href="./login">Đăng nhập</a>
                </p>
                </div>
            </form>
        </div>
        </>     
 );
}
export default Register