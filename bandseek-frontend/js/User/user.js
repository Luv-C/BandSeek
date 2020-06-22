import {welcome} from "../topBar.js";
import {isLogin,getCookie} from "../cookie.js";


window.onload=function () {
    welcome();
    //alert(getCookie("id"));
    isLogin();

    getUserBand(user_band);
    getUserInfo(user_band,user_info);

};

let user_band=[];
let user_info=[];
export function getUserInfo(user_band,user_info) {
    let xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("microsoft.XMLHttp");
    xhr.onreadystatechange = () =>{
        if (xhr.readyState === 4){
            if(xhr.status === 200) {
                let str = xhr.responseText.slice(2, xhr.responseText.length-1);
                let a = str.split(",");
                let user={
                    user_id:a[0].split(":")[1].substr(1,a[0].split(":")[1].length-2),
                    user_name:a[2].split(":")[1].substr(1,a[2].split(":")[1].length-2),
                    user_type:a[3].split(":")[1],
                    user_intro:a[4].split(":")[1].substr(1,a[4].split(":")[1].length-2)
                };
                //alert(user.user_id);
                user_info.push(user);
                showUserInfo(user,user_band);
            }
            else
                alert("请检查您的网络连接1");
        }
    };
    xhr.open("post", "http://localhost:8080/user/findUser", false);
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhr.send("id="+getCookie("id"));
}

export function showUserInfo(user,user_band) {
    let userInfo = document.getElementById("user_info");

    let userName = document.createElement("div");
    userName.innerText = "昵称："+ user.user_name;
    userName.classList.add("userInfo");

    let userId = document.createElement("div");
    userId.innerText = "账号：" + user.user_id;
    userId.classList.add("userInfo");
    let userType = document.createElement("div");
    userType.innerText="角色：" +typeTransfer(user.user_type);
    userType.classList.add("userInfo");

    let img = document.createElement("div");
    img.classList.add("userImg");

    let userIntro = document.createElement("div");
    userIntro.innerText ="简介：" + user.user_intro;
    userIntro.classList.add("userInfo");

    let userBand = document.createElement("div");
    let str;
    if(user_band.length===0){
        str="无";
    }
    else {
        str = user_band[0];
        for (let i = 1; i < user_band.length; i++) {
            str = str + " , " + user_band[i];
        }
    }
    userBand.innerText="所属乐队："+str;
    userBand.classList.add("userInfo");

    userInfo.appendChild(userName);
    userInfo.appendChild(userType);
    userInfo.appendChild(userId);
    userInfo.appendChild(img);
    userInfo.appendChild(userIntro);
    userInfo.appendChild(userBand);
}

export function getUserBand(user_band) {
    let xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("microsoft.XMLHttp");
    xhr.onreadystatechange = () =>{
        if(xhr.readyState === 4) {
            if (xhr.status === 200) {
                let str = xhr.responseText.slice(1, xhr.responseText.length - 1);
                str = str.split(",");
                if (str[0]==="") {
                    return 0;
                }
                else {
                    for (let i = 0; i < str.length; i++) {
                        getBand(str[i],user_band);
                    }
                }

            }
            else
                alert("请检查您的网络连接2");
        }
    };
    xhr.open("post", "http://localhost:8080/band/findUserBand", false);
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhr.send("user_id="+getCookie("id"));
}

export function getBand(band_id,user_band){
    let xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("microsoft.XMLHttp");
    xhr.onreadystatechange = () =>{
        if(xhr.readyState === 4) {
            if (xhr.status === 200) {
                let str=xhr.responseText.substr(1,xhr.responseText.length-2);
                let a=str.split(",");
                let band_name=a[1].split(":")[1];
                band_name = band_name.substr(1,band_name.length-2);
                user_band.push(band_name);
            }
            else
                alert("请检查您的网络连接3");
        }
    };
    xhr.open("post", "http://localhost:8080/band/findById", false);
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhr.send("band_id="+band_id);

}

export function typeTransfer(type) {
    switch (type) {
        case "1":
            return "主唱";
        case "2":
            return "吉他手";
        case "3":
            return "贝斯手";
        case "4":
            return "鼓手";
        case "5":
            return "键盘手";
        default:
            return "观众";
    }
}