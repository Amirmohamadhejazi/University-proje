import { createSlice } from "@reduxjs/toolkit";
import MoneyHeistMovie from "../../assets/pic/movie/moneyheist.png";
import wednesdayMovie from "../../assets/pic/movie/wednesday.jpg";
import YellowstoneMovie from "../../assets/pic/movie/Yellowstone-bann.jpg";
import shantMovie from "../../assets/pic/movie/shant.jpg";
import hisdarkmaterialMovie from "../../assets/pic/movie/hisdarkmaterial.jpg";
import kindredMovie from "../../assets/pic/movie/kindred.jpg";
import slowHorse from "../../assets/pic/movie/slowHorse.jpg";
import insideJob from "../../assets/pic/movie/insideJob.jpg";
import RickAndmorty from "../../assets/pic/movie/RickAndmorty.jpg";
import LovingAdults from "./../../assets/pic/movie/Loving Adults.jpg"
import Christmas from "./../../assets/pic/movie/ChristmasBloodyChristmas2022.jpg"
import JerrySnowman from "./../../assets/pic/movie/JerrySnowman.jpg"
import MyNameIsVendetta from "./../../assets/pic/movie/My Name Is Vendetta 2022.jpg"
import bardo from "./../../assets/pic/movie/bardo.jpg"
import nanny from "./../../assets/pic/movie/nanny.jpg"
import gameoflove from "./../../assets/pic/movie/game of love.jpg"

const HomeSlice = createSlice({
    name: "HomeSlice",
    initialState: {
        loading: false,
        DataHome:[],
        DataSIde: [
            {
                name:"money Heist",
                season:"1",
                Section:"12",
                img:MoneyHeistMovie
            },
            {
                name:"Yellow Stone",
                season:"5",
                Section:"6",
                img:wednesdayMovie
            },
            {
                name:"Wednesday",
                season:"1",
                Section:"8",
                img:YellowstoneMovie
            },
            {
                name:"shant Movie",
                season:"12",
                Section:"1",
                img:shantMovie
            },
            {
                name:"his dark material Movie",
                season:"8",
                Section:"1",
                img:hisdarkmaterialMovie
            },
            {
                name:"kindredMovie",
                season:"4",
                Section:"3",
                img:kindredMovie
            },
            {
                name:"slowHorse",
                season:"2",
                Section:"4",
                img:slowHorse
            },
            {
                name:"insideJob",
                season:"2",
                Section:"8",
                img:insideJob
            },
            {
                name:"RickAndmorty",
                season:"6",
                Section:"10",
                img:RickAndmorty
            }

        ],
        DataContent:[
            {
                name:"Loving Adults 2022",
                quality:"1080p WEB-DL",
                time:"105",
                category:"جنایی , درام , هیجان انگیز",
                Director:" Barbara Topsøe-Rothenborg",
                Stars:"Dar Salim,Sonja Richter,Sus Noreen Jondahl Wilkins",
                Country:"دانمارک",
                About:"داستان یک زوج که پس از بهبود یافتن پسرشان از یک بیماری طولانی مدت، حالا به ظاهر یک زندگی بی‌نقص دارند.",
                imbd:"6.5",
                vote:"8.6k",
                img:LovingAdults
            },
            {
                name:"Christmas Bloody Christmas 2022",
                quality:"1080p BluRay",
                time:"86",
                category:"ترسناک",
                Director:" Joe Begos",
                Stars:"Riley Dandy,Sam Delich,Jonah Ray",
                Country:"آمریکا",
                About:"شب کریسمس است و توری می‌خواهد فقط جشن بگیرد و نوشیدنی بخورد، اما در یک اسباب بازی فروشی یک ربات بابانوئل خراب می‌شود و شروع به کشتار می‌کند. حالا توری باید با او برای زنده ماندن وارد مبارزه شود",
                imbd:"5.2",
                vote:"2.2K",
                img:Christmas
            },
            {
                name:"Tom and Jerry: Snowman’s Land 2022",
                quality:"1080p WEB-DL",
                time:"76",
                category:"انیمیشن , کمدی , ماجراجویی",
                Director:"carlos alazraqui,Kimberly Brooks,Joey D'Auria",
                Stars:"Dar Salim,Sonja Richter,Sus Noreen Jondahl Wilkins",
                Country:"آمریکا",
                About:"جری و برادرزاده‌اش تافی، موشی برفی می‌سازند و زنده می‌شود. برای زنده ماندن او تافی و جری باید به روستای آدم برفی افسانه‌ای بروند.",
                imbd:"5.0",
                vote:"1k",
                img:JerrySnowman
            },
            {
                name:"My Name Is Vendetta 2022",
                quality:"1080p WEB-DL",
                time:"92",
                category:" اکشن , جنایی , درام",
                Director:" Cosimo Gomez",
                Stars:"Alessandro Gassmann,Ginevra Francesconi,alessio praticò",
                Country:"ایتالیا",
                About:"یک عضو مافیا زمانی که خانواده‌اش به قتل می‌رسد، با دخترش به میلان فرار می‌کنند و مخفی می‌شوند و نقشه‌ی انتقام می‌کشند.",
                imbd:"5.5",
                vote:"2.7K",
                img:MyNameIsVendetta
            },
            {
                name:"Bardo: False Chronicle of a Handful of Truths 2022",
                quality:"1080p WEB-DL",
                time:"159",
                category:"درام , کمدی",
                Director:"alejandro g. iñárritu",
                Stars:"daniel giménez cacho,Griselda Siciliani,Ximena Lamadrid",
                Country:"مکزیک",
                About:"یک روزنامه‌نگار مطرح که به مستندساز تبدیل شده به سفری رویایی خودشناختی می‌رود تا حال، گذشته و هویت مکزیکی‌اش را تطابق دهد.",
                imbd:"7.4",
                vote:"2.7K",
                img:bardo
            },
            {
                name:"Nanny 2022",
                quality:"1080p WEB-DL",
                time:"99",
                category:"ترسناک , درام , هیجان انگیز",
                Director:"Nikyatu Jusu",
                Stars:"Anna Diop,michelle monaghan,Sinqua Walls",
                Country:"آمریکا",
                About:"یک پرستار بچه مهاجر به اسم عایشه که در نیویورک در حال ساختن یک زندگی جدید است و از بچه‌ی یک خانواده نگه‌داری می‌کند، به اجبار با حقیقتی روبه‌رو می‌شود که زندگی رویایی آمریکایی تازه ساخته‌شده‌اش را تهدید می‌کند.",
                imbd:"6",
                vote:"1.3k",
                img:nanny
            },
            {
                name:"Game of Love 2022",
                quality:"1080p WEB-DL",
                time:"91",
                category:"عاشقانه",
                Director:"Elisa Amoruso",
                Stars:"bella thorne,Benjamin Mascolo,Michael E. Rodgers",
                Country:"ایتالیا",
                About:"ویوین و شریک زندگی‌اش روی به خانه کودکی روی می‌روند تا آنجا را بفروشند اما رابطه آنها زمانی به خطر می‌افتد که رازهایی از گذشته‌ی روی برملا می‌شود.",
                imbd:"2.9",
                vote:"0.3k",
                img:gameoflove
            },
        ]
    },
    reducers: {

        HomeLoading(state, action) {
            return { ...state, loading: action.payload  };
        },
        getData(state, action) {
            return { ...state};
        },
        SetData(state, action) {
            return {...state, DataHome:action.payload};
        },

    },
});

export const {
    HomeLoading,
    getData,
    SetData,
} =
    HomeSlice.actions;

export default HomeSlice.reducer;
