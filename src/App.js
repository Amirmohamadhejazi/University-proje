import {Routes, Route, useNavigate} from "react-router-dom";
import "../src/Style/global.scss"
import 'bootstrap/dist/css/bootstrap.css';
import "../src/Component/Home/style/style.scss"
import "../src/Component/Profile/Style/Profile.scss"
import "../src/Component/Footer/style/style.scss"
import "../src/assets/font/stylesheet.css"
import "../src/Component/Login/Style/login.scss"
import 'react-notifications/lib/notifications.css';
import {NotificationContainer} from 'react-notifications';
import Home from "./Component/Home/Home";
import About from "./Component/About/About";
import Login from "./Component/Login/Login";
import Error404 from "./Component/Error/Error404/Error404";
import Profile from "./Component/Profile/Profile";
import { wrapper } from "./Redux/store";
import { useLocation } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {useEffect} from "react";
function App() {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        AOS.init();
    }, [])

    let TokenUser = localStorage.getItem('TokenDedsecUser');
    //
    // useEffect(()=>{
    //     if (!location.pathname.split("/user/me/forget/")[1] && !location.pathname.split("/user/me/email/")[1]){
    //         if (!TokenUser){
    //             navigate('/login');
    //         }
    //     }
    //
    // },[location.pathname, navigate, TokenUser])



  return (
      <>
          <Routes>
              <Route index element={<Home/>}/>
              <Route path="/" element={<Home/>}/>
              <Route path="about" element={<About/>}/>
              <Route path="login" element={<Login/>}/>
              <Route path="profile" element={<Profile/>}/>
              <Route path="*" element={<Error404/>}/>
          </Routes>
          <NotificationContainer/>
      </>
  );
}

export default wrapper.withRedux(App);