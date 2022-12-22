import {useEffect , useState} from "react";
import React from "react";
import { FaTelegramPlane } from 'react-icons/fa';
import { BsInstagram } from 'react-icons/bs';



function Footer() {

    let dataMedia = [
        {
            name:"عضویت در کانال تلگرام ",
            text:"TELEGRAM CHANNEL",
            url:"../",
            icon:<FaTelegramPlane  className="c-yellow fs-24"/>
        },
        {
            name:"مشاهده در اینستاگرام",
            text:"INSTAGRAM PAGE",
            url:"../",
            icon:<BsInstagram  className="c-yellow fs-24"/>
        }
    ]
    return (
        <div id="Footer" className="flex-center">
            <div className="container" >
                <div className="d-flex flex-row-reverse justify-content-Footer flex-wrap-Footer">

                    <div className="d-flex flex-column">
                        {dataMedia.map((item , index)=>

                            <div className="boxMedia bg-gray d-flex flex-row-reverse justify-content-center align-items-center mt-4" key={index}>
                                <div className="d-flex flex-column w-75 flex-center">
                                    <span>{item.name}</span>
                                    <span className="c-yellow">{item.text}</span>
                                </div>

                                <div className="w-25 flex-center">
                                    {item.icon}
                                </div>
                            </div>

                        )}
                    </div>
                    <div className="d-flex justify-content-between mt-4" style={{width:"auto"}}>
                        <div className="d-flex flex-column ms-5">
                            <span className="">دانلود فیلم</span>
                            <span className="mt-2">پخش آنلاین سریال ها</span>
                            <span className="mt-2"> ۲۵۰ سریال برتر تاریخ</span>
                            <span className="mt-2">سوالات متداول</span>
                            <span className="mt-2">DMCA POLICY</span>
                        </div>

                        <div className="d-flex flex-column ">
                            <span>دانلود سریال‌</span>
                            <span className="mt-2">پخش آنلاین فیلم ها</span>
                            <span className="mt-2">۲۵۰ فیلم برتر تاریخ</span>
                            <span className="mt-2"> باکس آفیس</span>
                            <span className="mt-2">قوانین و مقررات</span>
                        </div>
                    </div>

                </div>

                <div className="flex-center text-center mt-5">
                    <span>تمامی حقوق مادی و معنوی این وبسایت محفوظ می باشد و کپی برداری به هر نحوه پیگرد قانونی خواهد داشت</span>
                </div>
            </div>

        </div>
    );
}

export default Footer;
