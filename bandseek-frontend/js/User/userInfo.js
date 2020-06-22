import {welcome} from "../topBar.js";
import {isLogin,getCookie} from "../cookie.js";
import {getUserBand, getUserInfo} from "./user.js";

layui.use('form', function() {
    var form = layui.form;
    form.render();
});

let user_band=[];
let user_info=[];
window.onload=function () {
    welcome();

    getUserBand(user_band);
    //alert(user_band);
    getUserInfo(user_band,user_info);
    isLogin();

    let button =document.getElementById("modify");
    button.addEventListener("click",modifyUserInfo);
};

function modifyUserInfo() {
    let user_pwd=document.getElementById("user_pwd").value;
    let re_pwd=document.getElementById("re_pwd").value;
    let user_name=document.getElementById("user_name").value;
    let user_role=parseInt(document.getElementById("role").value);
    let user_intro=document.getElementById("user_intro").value;

    if(user_pwd===""||re_pwd===""||user_name===""||user_intro===""){
        alert("填写字段不能为空");
        window.location.href="userInfo.html";
    }
    else if(user_pwd!==re_pwd){
        alert("两次输入的密码不匹配");
        window.location.href="userInfo.html";
    }
    else if(user_role===0){
        alert("请选择修改后的乐手角色");
        window.location.href="userInfo.html";
    }
    else {
        let xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("microsoft.XMLHttp");
        xhr.onreadystatechange = () =>{
            if(xhr.readyState === 4) {
                if (xhr.status === 200) {
                   if(parseInt(xhr.responseText)===1){
                       alert("修改信息成功！");
                       window.location.href="userInfo.html";
                   }
                }
                else
                    alert("请检查您的网络连接3");
            }
        };
        xhr.open("post", "http://localhost:8080/user/editUserInfo", false);
        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        xhr.send("user_id="+getCookie("id")+"&user_name="+user_name+"&user_pwd="+user_pwd+"&user_type="+user_role+"&user_intro="+user_intro);
        // alert(user_pwd);
        // alert(re_pwd);
        // alert(user_name);
        // alert(user_role);
        // alert(user_intro);
    }
}

