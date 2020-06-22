import {getCookie,delCookie} from "./cookie.js";

let user_name;
export function welcome() {
    getUserName(getCookie("id"));
    let content=document.getElementById("welcome");
    if(getCookie("id").length!==0){
        let str="用户："+user_name+"，欢迎使用bandseek！";
        content.innerText=str;
        let operation1 = document.getElementById("goLogin");
        operation1.classList.add("hidden");
        let operation2 = document.getElementById("goRegister");
        operation2.classList.add("hidden");
        let BarLogout = document.getElementById("logout");
        BarLogout.addEventListener("click", logout);
    }
    else {
        let str="为了提供更好的体验，您可以选择：";
        content.innerText=str;
        let operation = document.getElementById("logout");
        operation.classList.add("hidden");
        let buttonGroup = document.getElementById("buttonGroup");
        buttonGroup.classList.add("hidden");
    }
}

export function getUserName(user_id) {
    //alert(getCookie("id"));

    if(getCookie("id")!=="") {
        let xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("mincrosoft.XMLHttp");
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    let str = xhr.responseText.slice(2, xhr.responseText.length - 1);
                    let a = str.split(",");
                    user_name = a[2].split(":")[1].substr(1, a[2].split(":")[1].length - 2);
                    //alert(user_name);
                } else
                    alert("请检查您的网络连接");
            }

        };
        xhr.open("post", "http://localhost:8080/user/findUser", false);
        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        xhr.send("id=" + user_id);
    }
}

export function logout() {
    delCookie("id");
    delCookie("password");
    window.location.href="/html/login.html";
}
