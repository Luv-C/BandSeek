import {welcome} from "../topBar.js";
import {getCookie, isLogin} from "../cookie.js";
import {getUserName} from "./myBand.js";

window.onload=function () {
    welcome();
    isLogin();

    let button = document.getElementById("create");
    button.addEventListener("click",createBand);
};

function createBand() {
    let band_name = document.getElementById("band_name").value;
    let band_description = document.getElementById("band_description").value;
    if(band_name===""||band_description===""){
        alert("输入字段不能为空");
    }
    else{
        let xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("microsoft.XMLHttp");
        xhr.onreadystatechange = () =>{
            if (xhr.readyState === 4){
                if(xhr.status === 200) {
                    if(xhr.responseText==="2"){
                        alert("该乐队名已经存在");
                    }
                    else if(xhr.responseText==="3"){
                        alert("数据库发生错误，请联系管理员处理");
                        window.location.reload();
                    }
                    else{
                        alert("乐队创建成功");
                        window.location.href="myBand.html";
                    }
                }
                else
                    alert("请检查您的网络连接");
            }
        };
        xhr.open("post", "http://localhost:8080/band/createBand", false);
        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        xhr.send("band_name="+band_name+"&band_description="+band_description+"&user_id="+getCookie("id"));
    }
}