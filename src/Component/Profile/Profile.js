import { useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import {getProfileUser , PasswordUser, UsernameUser,ChangeEmail,SendEmail,ProfileLoading,ChangeAvatarColor , setOpenModal} from "../../Redux/Profile/ProfileSlice";
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import FilterIcon from '@mui/icons-material/Filter';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { useFormik } from 'formik';
import * as yup from 'yup';
import CircularProgress from '@mui/material/CircularProgress';
import { HexColorPicker } from "react-colorful";
import ProfileImg1 from "../Home/picture/avatar1.png"
import ProfileImg2 from "../Home/picture/avatar7.png"
import ProfileImg3 from "../Home/picture/avatar3.png"
import ProfileImg4 from "../Home/picture/avatar4.png"
import ProfileImg5 from "../Home/picture/avatar5.png"
import ProfileImg6 from "../Home/picture/avatar6.png"
import ProfileImg7 from "../Home/picture/avatar2.png"
import ProfileImg8 from "../Home/picture/avatar8.png"


const validationSchema0 = yup.object({
    new_username: yup
    .string('Enter your username').matches(/^\S*$/, 'Whitespace is not allowed')
    .min(2, 'username should be of minimum 2 characters length')
    .max(32, 'username should be of maximum 32 characters length')
    .required('username is required'),
    password0: yup
        .string('Enter your password').matches(/^\S*$/, 'Whitespace is not allowed')
        .min(8, 'Password should be of minimum 8 characters length')
        .max(100, 'Password should be of maximum 100 characters length')
        .required('Password is required'),
});

const validationSchema2 = yup.object({
    phone: yup
        .string('Enter your phone').matches(/^\S*$/, 'Whitespace is not allowed')
        .min(8, 'phone should be of minimum 8 characters length')
        .max(20, 'phone should be of maximum 20 characters length')
        .required('phone is required'),
    password2: yup
        .string('Enter your password').matches(/^\S*$/, 'Whitespace is not allowed')
        .min(8, 'Password should be of minimum 8 characters length')
        .max(100, 'Password should be of maximum 100 characters length')
        .required('Password is required'),
});

const validationSchema3 = yup.object({
    new_password: yup
        .string('Enter your New password').matches(/^\S*$/, 'Whitespace is not allowed')
        .min(8, 'New Password should be of minimum 8 characters length')
        .max(100, 'New Password should be of maximum 100 characters length')
        .required('New Password is required'),
    old_password: yup
        .string('Enter your Old password').matches(/^\S*$/, 'Whitespace is not allowed')
        .min(8, 'Old Password should be of minimum 8 characters length')
        .max(100, 'Old Password should be of maximum 100 characters length')
        .required('Old Password is required'),
});



const style = {
    position: 'absolute',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color:'black',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    borderRadius:'10px',
    p: 4,
};

function Profile() {
    const Dispatch = useDispatch();

    const navigate = useNavigate();
    let{loading , DataProfile , EmailPosition , ModalProfile , ModalNumberProfile}=useSelector(state=>state.ProfileSlice)
    const [ProfileModalData, SetProfileModalData] = useState({profile:DataProfile?.Avatar? parseInt(DataProfile?.Avatar) : 0 , color:DataProfile?.Color_id? `#${DataProfile?.Color_id}` : "#ab1e5b"})

    useEffect(()=>{
        Dispatch(getProfileUser())
    },[Dispatch])

    useEffect(()=>{
        SetProfileModalData({profile:DataProfile?.Avatar? parseInt(DataProfile?.Avatar) : 0 , color:DataProfile?.Color_id? `#${DataProfile?.Color_id}` : "#ab1e5b"})
    },[DataProfile])

    const FuncSubmit = (value)=>{
        switch (ModalNumberProfile) {
            case 0:
                let Data0 = {
                    new_username:value.new_username ,
                    password:value.password0 ,
                }
                Dispatch(ProfileLoading(true))
                Dispatch(UsernameUser(Data0))
                break;
            case  2:
                let Data2 = {
                    phone:`${value.phone}` ,
                    password:value.password2 ,
                }
                Dispatch(ProfileLoading(true))
                setTimeout(()=>{
                    Dispatch(ProfileLoading(false))
                },2000)
                console.log(Data2)
                break;
            case  3:
                let Data3 = {
                    new_password:value.new_password ,
                    old_password:value.old_password ,
                }
                Dispatch(ProfileLoading(true))
                Dispatch(PasswordUser(Data3))
                break;
            default:
        }
    }

    const initialValues = {
        new_username: '',
        password0: '',
        password1: '',
        password2: '',
        email: '',
        phone: '',
        new_password: '',
        old_password: '',
    }



    const formik = useFormik({
        initialValues:  initialValues,
        validationSchema: ModalNumberProfile === 0 ? validationSchema0 : ModalNumberProfile === 2 ? validationSchema2 : ModalNumberProfile === 3 && validationSchema3 ,
        onSubmit: (values) => {FuncSubmit(values) },
    });

    function handlerModal(position , number) {
        if(position){
            Dispatch(setOpenModal({number:number , modal:true}))
        }else {
            Dispatch(setOpenModal({number:number , modal:false}))
            SetProfileModalData({profile:DataProfile?.Avatar? parseInt(DataProfile?.Avatar) : 0 , color:DataProfile?.Color_id? `#${DataProfile?.Color_id}` : "#ab1e5b"})
            Dispatch(SendEmail(0))
        }
    }

    function handlerSendEmail() {
        Dispatch(ProfileLoading(true))
        Dispatch(ChangeEmail())
    }

    function handlerSendProfileImgColor() {
        let Data = {
            Avatar :`${ProfileModalData.profile}`,
            Color_id :`${ProfileModalData.color.split("#")[1]}`,
        }
        Dispatch(ProfileLoading(true))
        Dispatch(ChangeAvatarColor(Data))
    }


    let ArrayShowDiv = [
        {
            name:"USERNAME",
            value: DataProfile ? DataProfile.Username :"_________",
            key:0,
            class:""
        },
        {
            name:"EMAIL",
            value:DataProfile ? DataProfile.Email :"_________",
            key:1,
            class:"mt-2"
        },
        {
            name:"PHONE",
            value:DataProfile ? DataProfile.Phone :"_________",
            key:2,
            class:"mt-2"
        },
    ]


    let DataImgProfile =[
        {key:0},
        {key:1},
        {key:2},
        {key:3},
        {key:4},
        {key:5},
        {key:6},
        {key:7},
    ]

    let imgProfile = [ProfileImg1,ProfileImg2,ProfileImg3,ProfileImg4,ProfileImg5,ProfileImg6,ProfileImg7,ProfileImg8]

    return (
        <div className="container text-white mt-5 p-0" id="profile" style={{direction:"ltr"}}>
            <div className="position-relative w-100 " style={{height:"65px",background:"black"}}>
                <div className="d-flex justify-content-end cursor_pointer position-absolute" onClick={(e)=> navigate('/') } style={{right:"0" , top:"10" ,padding:"0 20px 0 20px" , zIndex:"1"}}>
                    <ArrowBackIosIcon/><span>back to home</span>
                </div>
                <div className="d-flex justify-content-center  py-5 position-absolute w-100 "   >
                    <div >
                        <div className="position-relative" style={{width:"110px"}}>
                            <div className="d-flex flex-column ">
                                <Avatar
                                    className="me-2 cursor_pointer"
                                    style={{display: "flex", borderRadius:"50%",backgroundColor:`${DataProfile?.Color_id? `#${DataProfile?.Color_id}` : "#ab1e5b"} `  ,transition: "0.2s"}}
                                    alt="Prof"
                                    src={imgProfile[DataProfile?.Avatar? parseInt(DataProfile?.Avatar)   : 0]}
                                    sx={{ width: 110, height: 110 }}
                                    onClick={(e)=>handlerModal(true ,4)}
                                />
                                <span className="font-weight-bold fw-bold mt-2 text-center" style={{fontSize:"20px"}}>{ DataProfile? DataProfile.Username : "______"}</span>
                            </div>
                            <div className="position-absolute cursor_pointer" style={{bottom:"43px",right:"5px",zIndex:"10px"}} onClick={(e)=>handlerModal(true ,4)} >
                                <FilterIcon/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-12" style={{borderRadius:"200px"}}>
                <div className="boxEdit ">
                    <div className="boxEditItems">
                        {
                            ArrayShowDiv.map((item)=>
                                <div className={["d-flex flex-row align-items-center justify-content-between col-12 " , item.class].join(" ")} key={item.key}>
                                    <div className="col-6 d-flex flex-column">
                                        <span className="fs-14 text_overflow_ellipsis fw-bold">{item.name}</span>
                                        <span className="fs-16 text_overflow_ellipsis ">{item.value}</span>
                                    </div>
                                    <div className="col-6 d-flex justify-content-end">
                                        <Button variant="outlined" onClick={(e)=>handlerModal(true ,item.key)}>Edit</Button>
                                    </div>
                                </div>
                            )
                        }
                        <div className={["d-flex flex-row align-items-center justify-content-between col-12 " ,""].join(" ")}>
                            <div className="col-12 d-flex justify-content-center">
                                <Button variant="outlined" onClick={(e)=>handlerModal(true ,3)}>Edit Password</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={ModalProfile}
                onClose={()=>handlerModal(false)}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}

            >
                    <Box className="W_boxModalProfile" sx={style}>
                        <div className="d-flex w-100 flex-column">
                            <form className="form justify-content-center flex-column" onSubmit={formik.handleSubmit}>

                                    {
                                        ModalNumberProfile === 4 && <div className="w-100 text-left  h_modalProfile position-relative" >
                                            <h4>Avatars <AccountBoxIcon  className="iconAvatarProf"/> </h4>
                                            <div className="w-100 d-flex flex-wrap flex-row justify-content-center">
                                                {DataImgProfile.map((e) =>
                                                    <div  className={["m-3 cursor_pointer" , e.key === ProfileModalData.profile && "SelectProfile"].join(" ")}  key={e.key}>
                                                        <img className="rounded-circle" src={imgProfile[e.key]}
                                                             onClick={()=>SetProfileModalData({...ProfileModalData,profile:e.key})} width="70" alt=""/>
                                                    </div>
                                                )}
                                            </div>
                                            <h4>Colors <ColorLensIcon  className="iconAvatarProf"/> </h4>
                                            <div className="d-flex flex-row flex-wrap justify-content-around" style={{direction:"ltr"}}>
                                                <HexColorPicker className="mt-3"  color={ProfileModalData.color} onChange={(e)=>SetProfileModalData({...ProfileModalData,color:e})} />
                                                <div className="flex-center mt-3">
                                                    <Avatar
                                                        className=" cursor_pointer"
                                                        style={{display: "flex", borderRadius:"50%",backgroundColor:`${ProfileModalData.color} `  ,transition: "0.2s"}}
                                                        alt="Prof"
                                                        src={imgProfile[ProfileModalData.profile]}
                                                        sx={{ width: 90, height: 90 }}
                                                        onClick={(e)=>handlerModal(true ,4)}
                                                    />
                                                </div>
                                            </div>
                                            {loading ? <div className="flex-center mt-4"><CircularProgress/></div>:
                                                <div className="d-flex justify-content-between mt-4">
                                                    <Button variant="outlined" onClick={(e)=>handlerSendProfileImgColor()}>Edit</Button>
                                                    <Button variant="outlined" onClick={(e)=>handlerModal(false ,null)}>Close</Button>
                                                </div>
                                            }
                                        </div>
                                    }

                                    {
                                        ModalNumberProfile === 0&&
                                        <>
                                            <TextField
                                                fullWidth
                                                id="new_username"
                                                name="new_username"
                                                label="New username"
                                                className="mt-2"
                                                value={formik.values.username}
                                                onChange={formik.handleChange}
                                                error={formik.touched.new_username && Boolean(formik.errors.new_username)}
                                                helperText={formik.touched.new_username && formik.errors.new_username}
                                            />
                                            <TextField
                                                fullWidth
                                                id="password0"
                                                name="password0"
                                                label="Password"
                                                type="password0"
                                                className="mt-2"
                                                value={formik.values.password0}
                                                onChange={formik.handleChange}
                                                error={formik.touched.password0 && Boolean(formik.errors.password0)}
                                                helperText={formik.touched.password0 && formik.errors.password0}
                                            />

                                        </>
                                    }
                                    {
                                        ModalNumberProfile === 1&&
                                        <>
                                            <div className="w-100 h-100  flex-center">
                                                <div className="position-absolute" style={{top:"-50px" , left:"10px"}}>
                                                    <ForwardToInboxIcon style={EmailPosition === 0 ?{fontSize:"100px",color:"darkcyan"} :{fontSize:"100px" ,color:"green"}}/>
                                                </div>

                                                <div className="d-flex flex-column text-center align-items-center"  style={{direction:"ltr"}}>
                                                    {EmailPosition === 0 ? <h4  className="mt-3 ">Change email address</h4> : <h4  className="mt-3 ">Email sent!</h4> }

                                                    {EmailPosition === 0 ? <span className="mt-3">We will sent an email to <strong>{DataProfile? DataProfile.Username : "_________"}</strong> You can change your email there.</span> : <span className="mt-3">Check your email inbox and change your email address</span>}

                                                    {EmailPosition === 0 && <span  className="mt-3">Lost access to your email? Please contact your email provider to regain access.</span> }

                                                    <div className="d-flex w-100 flex-column mt-4 align-items-center">

                                                        {loading ? <div className="flex-center mt-4"><CircularProgress/></div> :
                                                            <>
                                                                {EmailPosition ===0 && <Button variant="contained"  className="w-100"  onClick={(e)=>handlerSendEmail()}>Send Email</Button>}
                                                                <Button color="primary" className={["w-50" , EmailPosition === 0 ?"mt-3": ""].join(" ")} onClick={(e)=>handlerModal(false ,null)}>Close</Button>
                                                            </>
                                                        }
                                                    </div>
                                                </div>

                                            </div>
                                        </>
                                    }
                                    {
                                        ModalNumberProfile === 2&&
                                        <>
                                            <TextField
                                                fullWidth
                                                id="phone"
                                                name="phone"
                                                label="Phone"
                                                type="number"
                                                value={formik.values.phone}
                                                onChange={formik.handleChange}
                                                error={formik.touched.phone && Boolean(formik.errors.phone)}
                                                helperText={formik.touched.phone && formik.errors.phone}
                                            />

                                            <TextField
                                                fullWidth
                                                id="password2"
                                                name="password2"
                                                label="Password"
                                                type="password"
                                                className="mt-2"
                                                value={formik.values.password2}
                                                onChange={formik.handleChange}
                                                error={formik.touched.password2 && Boolean(formik.errors.password2)}
                                                helperText={formik.touched.password2 && formik.errors.password2}
                                            />
                                        </>
                                    }
                                    {
                                        ModalNumberProfile === 3&&
                                        <>
                                            <TextField
                                                fullWidth
                                                id="new_password"
                                                name="new_password"
                                                label="New password"
                                                type="password"
                                                value={formik.values.new_password}
                                                onChange={formik.handleChange}
                                                error={formik.touched.new_password && Boolean(formik.errors.new_password)}
                                                helperText={formik.touched.new_password && formik.errors.new_password}
                                            />
                                            <TextField
                                                fullWidth
                                                id="old_password"
                                                name="old_password"
                                                label="Old password"
                                                type="password"
                                                className="mt-2"
                                                value={formik.values.old_password}
                                                onChange={formik.handleChange}
                                                error={formik.touched.old_password && Boolean(formik.errors.old_password)}
                                                helperText={formik.touched.old_password && formik.errors.old_password}
                                            />

                                        </>
                                    }
                                    {
                                        ModalNumberProfile === 1 || ModalNumberProfile === 4 ? "" :
                                            <div className="">
                                                {loading ? <div className="flex-center mt-4"><CircularProgress/></div>:

                                                    <div className="d-flex justify-content-between mt-4">
                                                        <Button variant="outlined" type="submit">Edit</Button>
                                                        <Button variant="outlined" onClick={(e)=>handlerModal(false ,null)}>Close</Button>
                                                    </div>
                                                }
                                            </div>
                                    }

                            </form>

                        </div>
                    </Box>
            </Modal>
        </div>
    );
}

export default Profile;