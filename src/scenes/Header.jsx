import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import '../styles/general.css';
import Cookies from "universal-cookie";

/**
 * Header for user's pages.
 */
function Header() {
  const cookies = new Cookies();
  const isLogin = () => {
    if (cookies.get('state') == null) { return false };

   return true;
  }

  const [signedin, signin] = useState(isLogin());

  const logoutReqHandler = () => {
    // axios.get(`http://localhost:5000/logout`)
    // .then(res => {
      // if (res.status === 202) {
        signin(!signedin);
        cookies.remove('state');
        console.log('User logged out.');  
        window.location.assign("/");      
      // } else {
      //   alert("Đăng xuất thất bại. Error code: ", res.status);
      // }
    // })
    // .catch((err) => console.log(err));
  }

  useEffect(() => {
    window.addEventListener('loggedin', () => {
      console.log("User logged in!");
      if(signedin === false)
        signin(!signedin);
    })
  }, [signedin]);

  return (
    <header className="header1">
      <Link to="/">
        <div className="sitelogo"  /></Link>
      <nav className="toolBar">
        <Link className="tabBtn" role="button" to="/">Trang chủ</Link>
        <Link className="tabBtn" role="button" to="/search">
          <div style={{WebkitTransform: 'rotate(-45deg)', MozTransform: 'rotate(-45deg)', OTransform: 'rotate(-45deg)', transform: 'rotate(-45deg)', display: 'inline-block'}}>
            ⚲
          </div> Tìm kiếm
        </Link>
        <Link className="tabBtn" role="button" to="/account">Tài khoản</Link>
      </nav>
      
      <Link id="sign-in" className={signedin ? "hidden" : "redBtn"} role="button" to="/login">Đăng nhập</Link>
      <Link id="sign-out" className={signedin ? "redBtn" : "hidden"} role="button" onClick={() => {if(window.confirm('Bạn sẽ đăng xuất khỏi trang.')){ logoutReqHandler()};}}>Đăng xuất</Link>
    </header>
  );
}
export default Header