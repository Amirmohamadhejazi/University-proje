import Cookies from 'universal-cookie';
import {useNavigate} from 'react-router-dom';
import {useEffect, useState} from "react";

import {
    Register,
    login,
    ChangePassword,
    SendPassword,
    LoginLoading, LoginStep
} from "../../Redux/Login/LoginSlice";
import {MakeToken} from "../../constants/HelperFunction";
import LinearProgress from '@mui/material/LinearProgress';

import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import Bounce from 'react-reveal/Bounce';
import CircularProgress from '@mui/material/CircularProgress';
import Button from "../Items/Button";
import ButtonMui from '@mui/material/Button';
import {useDispatch, useSelector} from "react-redux";
import Loader from "../Items/Loader";
import TextField from "@material-ui/core/TextField";
import { useFormik } from 'formik';
import * as yup from 'yup';
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import Modal from "@mui/material/Modal";


const validationSchemaLogin = yup.object({
    emailLogin: yup
        .string('Enter your email').matches(/^\S*$/, 'Whitespace is not allowed')
        .email('Enter a valid email')
        .min(8, 'Email should be of minimum 8 characters length')
        .max(100, 'Email should be of maximum 100 characters length')
        .required('Email is required'),
    passwordLogin: yup
        .string('Enter your password').matches(/^\S*$/, 'Whitespace is not allowed')
        .min(8, 'Password should be of minimum 8 characters length')
        .max(100, 'Password should be of maximum 100 characters length')
        .required('Password is required'),
});

const validationSchemaRegister = yup.object({
    emailRegister: yup
        .string('Enter your email').matches(/^\S*$/, 'Whitespace is not allowed')
        .email('Enter a valid email')
        .min(8, 'Email should be of minimum 8 characters length')
        .max(100, 'Email should be of maximum 100 characters length')
        .required('Email is required'),
    usernameRegister: yup
        .string('Enter your username').matches(/^\S*$/, 'Whitespace is not allowed')
        .min(2, 'username should be of minimum 2 characters length')
        .max(32, 'username should be of maximum 32 characters length')
        .required('username is required'),
    phoneRegister: yup
        .string('Enter your phone').matches(/^\S*$/, 'Whitespace is not allowed')
        .min(8, 'phone should be of minimum 8 characters length')
        .max(20, 'phone should be of maximum 20 characters length')
        .required('phone is required'),
    passwordRegister: yup
        .string('Enter your password').matches(/^\S*$/, 'Whitespace is not allowed')
        .min(8, 'Password should be of minimum 8 characters length')
        .max(100, 'Password should be of maximum 100 characters length')
        .required('Password is required'),
});
const validationSchemaPassword = yup.object({
    email: yup
        .string('Enter your email').matches(/^\S*$/, 'Whitespace is not allowed')
        .email('Enter a valid email')
        .min(8, 'Email should be of minimum 8 characters length')
        .max(100, 'Email should be of maximum 100 characters length')
        .required('Email is required'),
});




function Login() {

    const [PositionLogin , SetPositionLogin] = useState(1)
    const [progress , setProgress] = useState(0)


    const [open, setOpen] = useState(false)
    const Dispatch = useDispatch();
    let{loading , PasswordPosition , loginRegisterStep , TokenStep}=useSelector(state=>state.LoginSlice)
    const navigate = useNavigate();

    const FuncSubmit = (value , position)=>{
        let DataPostReg = {
            Email: value.emailRegister,
            Password:  value.passwordRegister,
            Phone:  `${value.phoneRegister}`,
            Username:  value.usernameRegister,
        }
        let DataPostLog = {
            Email: value.emailLogin,
            Password: value.passwordLogin,
        }
        Dispatch(LoginLoading(true))

        setTimeout(()=>{
            Dispatch(LoginLoading(false))
            Dispatch(LoginStep({Step : true , Token:MakeToken(2000)}))
            console.log(DataPostLog)
        },2000)
        switch(position) {
            case "0":
                Dispatch(LoginLoading(true))
                console.log(DataPostReg)
                // Dispatch(Register(DataPostReg))
                break;
            case  "1":
                Dispatch(LoginLoading(true))
                // Dispatch(login(DataPostLog))
                console.log(DataPostLog)
                break;
            case  "2":
                Dispatch(LoginLoading(true))
                console.log({Email:value.email})
                // Dispatch(ChangePassword({Email:value.email}))
                break;
            default:
        }
    }

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

    const initialValues = {
        emailLogin: '',
        passwordLogin: '',
        emailRegister: '',
        usernameRegister: '',
        phoneRegister: '',
        passwordRegister: '',
    }

    const initialValuesPassword = {
        email: ''
    }

    const formik = useFormik({
        initialValues:  initialValues,
        validationSchema: PositionLogin === 0 ? validationSchemaRegister : PositionLogin === 1 && validationSchemaLogin ,
        onSubmit: (values) => {FuncSubmit(values,`${PositionLogin}`) },
    });

    const formikPassword = useFormik({
        initialValues:  initialValuesPassword,
        validationSchema:  validationSchemaPassword,
        onSubmit: (values) => {FuncSubmit(values,`2`) },
    });


    let TokenUser = localStorage.getItem('DigiMovies');

    useEffect(()=>{
        if (TokenUser){
            navigate('/');
        }
    },[TokenUser, navigate])

    useEffect(()=>{
        if (TokenStep){
            let time = 0
            function LoadPro() {
                const interval = setInterval(() => {
                    if (time < 1.25){
                        time=time+0.25
                        setProgress(time+0.25)
                    }
                }, 250);
                return () => clearInterval(interval);
            }
            LoadPro()
            setTimeout(()=>{
                // console.log("1500")
                localStorage.setItem('DigiMovies', JSON.stringify(TokenStep))
                navigate('/');
                setProgress(0)
                time= -0.25
            },1700)
        }
    },[TokenStep, navigate])

    function funcSwitchPage(number) {
        SetPositionLogin(number)
    }
    function handlerModal(data) {
        setOpen(data)
        Dispatch(SendPassword(0))
    }


    return (
        <div id="login" >
            <div className="App"   data-aos="zoom-in" data-aos-duration={`700`}>
                <form style={{zIndex:2}} className="form flex-center " onSubmit={formik.handleSubmit}>
                        <div className="w-100 d-flex flex-row mb-2">
                            <div className={["w-50 cursor_pointer ", PositionLogin === 1 && "bg-primary"].join(" ")} onClick={() => funcSwitchPage(1)} style={{borderRadius: "10px", padding: "5px"}}><span>Login</span></div>
                            <div className={["w-50 cursor_pointer ", PositionLogin === 0 && "bg-primary"].join(" ")} onClick={() => funcSwitchPage(0)} style={{borderRadius: "10px", padding: "5px"}}><span>Register</span></div>
                        </div>
                        <div className="mt-4">
                            {
                                PositionLogin === 0 &&
                                <>
                                    <TextField
                                        fullWidth
                                        id="usernameRegister"
                                        name="usernameRegister"
                                        label="username"
                                        value={formik.values.usernameRegister}
                                        onChange={formik.handleChange}
                                        error={formik.touched.usernameRegister && Boolean(formik.errors.usernameRegister)}
                                        helperText={formik.touched.usernameRegister && formik.errors.usernameRegister}
                                    />
                                    <TextField
                                        fullWidth
                                        id="emailRegister"
                                        name="emailRegister"
                                        label="Email"
                                        type="email"
                                        value={formik.values.emailRegister}
                                        onChange={formik.handleChange}
                                        error={formik.touched.emailRegister && Boolean(formik.errors.emailRegister)}
                                        helperText={formik.touched.emailRegister && formik.errors.emailRegister}
                                    />


                                    <TextField
                                        fullWidth
                                        id="phoneRegister"
                                        name="phoneRegister"
                                        label="Phone"
                                        type="number"
                                        value={formik.values.phoneRegister}
                                        onChange={formik.handleChange}
                                        error={formik.touched.phoneRegister && Boolean(formik.errors.phoneRegister)}
                                        helperText={formik.touched.phoneRegister && formik.errors.phoneRegister}
                                    />


                                    <TextField
                                        fullWidth
                                        id="passwordRegister"
                                        name="passwordRegister"
                                        label="Password"
                                        type="password"
                                        value={formik.values.passwordRegister}
                                        onChange={formik.handleChange}
                                        error={formik.touched.passwordRegister && Boolean(formik.errors.passwordRegister)}
                                        helperText={formik.touched.passwordRegister && formik.errors.passwordRegister}
                                    />
                                </>
                            }
                            {
                                PositionLogin === 1&&
                                <>
                                    <TextField
                                        fullWidth
                                        id="emailLogin"
                                        name="emailLogin"
                                        label="Email"
                                        type="email"
                                        value={formik.values.emailLogin}
                                        onChange={formik.handleChange}
                                        error={formik.touched.emailLogin && Boolean(formik.errors.emailLogin)}
                                        helperText={formik.touched.emailLogin && formik.errors.emailLogin}
                                    />
                                    <TextField
                                        fullWidth
                                        id="passwordLogin"
                                        name="passwordLogin"
                                        label="Password"
                                        type="password"
                                        value={formik.values.passwordLogin}
                                        onChange={formik.handleChange}
                                        error={formik.touched.passwordLogin && Boolean(formik.errors.passwordLogin)}
                                        helperText={formik.touched.passwordLogin && formik.errors.passwordLogin}
                                    />
                                    <div className="forgetPassword">
                                        <ButtonMui variant="text" onClick={()=>setOpen(true)}>Forgot your password?</ButtonMui>
                                    </div>
                                </>
                            }

                        </div>
                        {loading ? <CircularProgress/> :
                            <Button  color="facebook" className="form__custom-button" type={"submit"}>
                                <span >{PositionLogin === 0 ? "Register" : "Login"}</span>
                            </Button>
                        }

                    </form>
                <Bounce bottom when={loginRegisterStep} >
                        <div className={[" position-absolute ModalTop" , loginRegisterStep ?"z_index_5": ""].join(" ")}>
                            <div className="position-relative w-100 h-100 flex-center">
                                <div className="d-flex flex-column  align-items-center">
                                    <RocketLaunchIcon className="IconRocket"/>
                                    <div className="Icon1 mt-3  "/>
                                    <div className="Icon2 mt-3"/>
                                    <div className="Icon3 mt-3"/>
                                    <Box className="position-absolute" sx={{ width: '100%' , top:"10.7%"}}>
                                        {/*<LinearProgress variant="buffer" value={progress/3 *100} valueBuffer={progress/3 *100 + 0.25} />*/}
                                        <LinearProgress variant="determinate" value={progress/1.5 *100}    />
                                    </Box>
                                </div>
                            </div>
                        </div>
                </Bounce>


                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={open}
                    onClose={()=>handlerModal(false)}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                    data-aos="fade" data-aos-duration={`700`}
                >
                    <Box className="W_boxModalLogin" sx={style}>
                        <div className="d-flex w-100 flex-column" style={{direction:"ltr"}}>
                            <div className="w-100 h-100">
                                <div className="position-absolute" style={{top:"-50px" , left:"10px"}}>
                                    <VpnKeyIcon style={PasswordPosition === 0 ?{fontSize:"100px",color:"darkcyan"} :{fontSize:"100px" ,color:"green"}}/>
                                </div>

                                <div className="d-flex flex-column text-center"  style={{direction:"ltr"}}>
                                    {PasswordPosition === 0 ? <h4  className="mt-3 mb-0">Change Password</h4> : <h4  className="mt-3 mb-0">Email sent!</h4> }
                                    {PasswordPosition === 0 ? <h5 className=" mb-0 mt-3">To change your password, we need your email to send you a password reset link</h5>: <h5 className=" mb-0 ">Please check your email for reset password.</h5> }

                                    <form className="form flex-column" onSubmit={formikPassword.handleSubmit}>

                                        {PasswordPosition === 0 &&
                                            <TextField
                                                fullWidth
                                                id="email"
                                                name="email"
                                                label="Email"
                                                type="email"
                                                className="mt-3"
                                                value={formikPassword.values.email}
                                                onChange={formikPassword.handleChange}
                                                error={formikPassword.touched.email && Boolean(formikPassword.errors.email)}
                                                helperText={formikPassword.touched.email && formikPassword.errors.email}
                                            />
                                        }
                                        <div className="d-flex w-100 flex-column mt-4 align-items-center">

                                            {loading ? <CircularProgress/> :
                                                <>
                                                    {PasswordPosition === 0 && <ButtonMui variant="contained" type="submit" className="w-100">Send Email</ButtonMui>}
                                                    <ButtonMui color="primary" className={["w-50", PasswordPosition === 0 ? "mt-3" : "mt-3"].join(" ")} onClick={(e) => handlerModal(false, null)}>Close</ButtonMui>
                                                </>
                                            }
                                        </div>
                                    </form>

                                </div>

                            </div>
                        </div>
                    </Box>
                </Modal>
            </div>
        </div>
    );
}

export default Login;
