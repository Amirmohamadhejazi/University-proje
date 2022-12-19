import {useEffect , useState} from "react";
import React from "react";
import "react-multi-carousel/lib/styles.css";
import { useNavigate} from "react-router-dom";
import logo1 from "./../../assets/pic/logo.png"
import logo2 from "./../../assets/pic/digi_dark_logo.png"
import Avatar from "./../../assets/pic/avatar.jpg"
import Imbd from "./../../assets/pic/imbd.png"
import { FiHeart , FiMonitor } from 'react-icons/fi';
import { MdOutlineSubtitles } from 'react-icons/md';
import {BiMoviePlay , BiTimeFive  } from 'react-icons/bi';
import { IoMdNotificationsOutline , IoIosPerson } from 'react-icons/io';
import { MdHighQuality } from 'react-icons/md';
import { AiOutlineFolderOpen } from 'react-icons/ai';
import { RiUserStarLine } from 'react-icons/ri';
import { TbWorld } from 'react-icons/tb';
import { BsDownload } from 'react-icons/bs';
import {useDispatch, useSelector} from "react-redux";
import Footer from "../Footer/Footer";

function Home() {
    let{DataSIde , DataContent}=useSelector(state=>state.HomeSlice)

    const Dispatch = useDispatch();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false)

    function LogOut() {
        window.location.reload();
        setOpen(false)
        localStorage.removeItem('TokenDedsecUser')
        navigate('/login')
    }

    function IconTitle(icon , Text) {
        return <div className="d-flex flex-row mb-3">
            {icon}<span className="fs-15 fw-400">{Text}</span>
        </div>
    }
    return (
        <div className="w-100 h-100 overflow-x-hidden">
            <div className="container " id="home">

                <div className="w-100 d-flex flex-row-reverse justify-content-between text-dark ">
                    <div className="d-flex flex-row">
                        <div className="boxIcon brCircle flex-center position-relative">
                            <div className="notificationIcon notificationIconFavorite flex-center">
                                <span>2</span>
                            </div>
                            <div className="boxIn flex-center">
                                <FiHeart className="c-yellow fs-24"/>
                            </div>
                        </div>
                        <img src={logo2} alt="logo2"/>
                    </div>

                    <div className="d-flex flex-row-reverse align-items-center ">
                        <div className="position-relative me-4">
                            <div className="notificationIcon notificationIconCall flex-center">
                                <span>2</span>
                            </div>
                            <IoMdNotificationsOutline className="c-grayIcon fs-35"/>
                        </div>
                        <div className="boxLogin bg-gray d-flex flex-row-reverse justify-content-around align-items-center">
                        <span className="fs-24">
                            Amir
                        </span>
                            <div className="flex-center AvatarIcon" >
                                <img src={Avatar} width="100%" height="100%" alt="Avatar"/>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-100 d-flex flex-row-reverse boxContent flex-wrap-reverse">
                    <div className=" WLContent ">
                        {
                            DataContent.map((item)=>
                                <div className="item_def_loop d-flex flex-row flex-wrap">
                                    <div className="W_RCoverMovie d-flex flex-column ">
                                        <div className="CoverMovie">
                                            <img src={item.img} width="100%" height="100%" className="objectFitCover" alt="Avatar"/>
                                        </div>
                                        <div className="flex-center">
                                            <div className="btnTrailer d-flex flex-row justify-content-around align-items-center">
                                                <BiMoviePlay className="c-yellow fs-24"/>
                                                <span>مشاهده تریلر</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="W_LCoverMovie d-flex flex-column mb-5 position-relative" >
                                        <span className="fw-bold mt-3 mb-5" style={{fontSize:"20px"}}>دانلود فیلم {item.name}</span>
                                        {IconTitle(<MdHighQuality className="c-yellow fs-24  "/> , `کیفیت : ${item.quality}` )}
                                        {IconTitle(<BiTimeFive className="c-yellow fs-24 "/> ,  `زمان : ${item.time} دقیقه` )}
                                        {IconTitle(<AiOutlineFolderOpen className="c-yellow fs-24 "/> ,  `ژانر : ${item.category}`  )}
                                        {IconTitle(<IoIosPerson className="c-yellow fs-24 "/>  , `کارگردان : ${item.Director}`  )}
                                        {IconTitle(<RiUserStarLine className="c-yellow fs-24 "/>  , `ستارگان : ${item.Stars}`  )}
                                        {IconTitle(<TbWorld className="c-yellow fs-24"/> , `محصول کشور : ${item.Country}` )}
                                        <span className="fs-15 fw-400">{item.About}</span>

                                        <div className="d-flex flex-column position-absolute" style={{left:"50px" , bottom:"260px"}}>
                                            <div className="d-flex flex-column text-center ">
                                                <span><span className=" c-yellow fs-20">{item.imbd}</span>/10</span>
                                                <span>{item.vote} Votes</span>
                                            </div>
                                            <div className="flex-center position-relative" style={{width:"80px" , marginTop:"-20px"}}>
                                                <img src={Imbd} width="100%" height="100%" className="objectFitCover" alt="Avatar"/>
                                                <div style={{width:"80px" , height:"44px"}} className=" position-absolute"/>
                                            </div>
                                        </div>

                                        <div className="d-flex flex-column position-absolute" style={{left:"30" , bottom:"-60"}}>
                                            <span className="mb-4 fs-13" style={{zIndex:"2"}}>ادامه / <span className="c-yellow">دانلود</span></span>
                                            <div className=" flex-center boxDownload cursor_pointer" >
                                                <BsDownload className="text-white boxIn "/>
                                            </div>
                                        </div>

                                        <div className="d-flex flex-column position-absolute position-boxSubtitle" >
                                            <div className=" flex-center boxSubtitle cursor_pointer"><MdOutlineSubtitles className="boxIn"/></div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                    <div className=" WRContent">
                        <div className="inner_box_sidebar d-flex justify-content-center flex-column">
                            <div className="flex-row d-flex align-items-center">
                                <FiMonitor className="c-yellow fs-35 ms-2"/>
                                <div className="d-flex flex-column me-2">
                                    <span>سریال های</span>
                                    <span>بروز شده</span>
                                </div>
                            </div>

                            {
                                DataSIde.map((item,index)=>
                                    <div className="w-100">
                                        <div className="coverMovieRight " style={index===0?{height:"400px"} : {height:"80px"} }>
                                            <img src={item.img} width="100%" height="100%" className="objectFitCover" alt="Avatar"/>
                                        </div>
                                        <div className="TextOnCover flex-center">
                                            <span className="d-flex flex-row">قسمت<div className="iconNotif flex-center me-1 ms-1"><span className="">{`${item.Section}`}</span></div>فصل {`${item.season}`} با زیرنویس منتشر شد</span>
                                        </div>
                                    </div>
                                )
                            }

                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default Home;
