import {welcome} from "../topBar.js";
import {getCookie, isLogin} from "../cookie.js";
import {getUserName} from "../Band/myBand.js";


let mails=[];
let user_name=[];
window.onload=function(){
    welcome();
    isLogin();
    getUserName(getCookie("id"),user_name);
    getMails(mails);
};

function getMails(mails) {
    let xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("microsoft.XMLHttp");
    xhr.onreadystatechange = () =>{
        if(xhr.readyState === 4) {
            if (xhr.status === 200) {
                if(xhr.responseText!=="[]") {
                    let str = xhr.responseText.substr(1, xhr.responseText.length - 2);
                    str = str.split("},");
                    str[str.length - 1] = str[str.length - 1].slice(0, str[str.length - 1].length - 1);
                    for (let i = 0; i < str.length; i++) {
                        str[i] = str[i].substr(1, str[i].length - 1);
                        let a = str[i].split(",");
                        //alert(a);
                        let mail = {
                            mail_date: a[0].substr(13, a[0].length - 14),
                            sender_name: a[1].substr(15, a[1].length - 16),
                            content: a[3].substr(11, a[3].length - 12).split("\\n").join("</br>")
                        };
                        mails.push(mail);
                    }
                    showMails(mails);
                }
            }
            else
                alert("请检查您的网络连接2");
        }
    };
    xhr.open("post", "http://localhost:8080/mail/getMails", false);
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhr.send("receiver_name="+user_name[0]);
}

function showMails(mails) {
    let mailList = document.getElementById("mail_list");
    for(let i=mails.length-1 ; i>=0;i--){
        let mail = document.createElement("div");
        mail.classList.add("mail");

        let sender = document.createElement("div");
        sender.innerText="发件人："+mails[i].sender_name;
        sender.classList.add("sender");

        let date = document.createElement("div");
        date.innerText=mails[i].mail_date;
        date.classList.add("date");

        let content = document.createElement("div");
        content.innerHTML=mails[i].content;
        content.classList.add("content");

        let deleteButton = document.createElement("button");
        deleteButton.innerText="删除邮件";
        deleteButton.id=mails[i].mail_date;
        deleteButton.classList.add("deleteButton");
        deleteButton.addEventListener("click",deleteMail);

        mail.appendChild(sender);
        mail.appendChild(content);
        mail.appendChild(date);

        mail.appendChild(deleteButton);
        mailList.appendChild(mail);
    }
}

function deleteMail() {
    let mail_date = this.id;
    let receiver_name = user_name[0];
    let xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("microsoft.XMLHttp");
    xhr.onreadystatechange = () =>{
        if(xhr.readyState === 4) {
            if (xhr.status === 200) {
                if(xhr.responseText==="1"){
                    alert("删除邮件成功");
                    window.location.reload();
                }
                else {
                    alert("未知错误，请联系管理员");
                }
            }
            else
                alert("请检查您的网络连接");
        }
    };
    xhr.open("post", "http://localhost:8080/mail/deleteMail", false);
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhr.send("mail_date="+mail_date+"&receiver_name="+receiver_name);
}

export function sendMail(date,sender,receiver,content) {
    let xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("microsoft.XMLHttp");
    xhr.onreadystatechange = () =>{
        if(xhr.readyState === 4) {
            if (xhr.status === 200) {
                //alert("发送消息成功");
            }
            else
                alert("请检查您的网络连接");
        }
    };
    xhr.open("post", "http://localhost:8080/mail/addMail", false);
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhr.send("mail_date="+date+"&sender_name="+sender+"&receiver_name="+receiver+"&content="+content);
}

