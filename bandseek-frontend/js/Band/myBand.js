import {isLogin,getCookie} from "../cookie.js";
import {welcome} from "../topBar.js";
import {typeTransfer} from "../User/user.js";
import {sendMail} from "../Mail/myMail.js";


let user_band=[];//当前用户管理的乐队，内容为Band类型
let member=[];//乐队成员，全局变量，内容为String类型
let band_leader=[];//乐队队长，全局变量，内容为String类型
let my_name=[];//当前登录的用户的名称
let my_member=[];//当前登录的用户所管理的乐队队员类型User{user_name,user_type}

window.onload=function () {
    welcome();
    isLogin();
    getUserBand(band_leader,member,user_band);
    getUserName(getCookie("id"),my_name);
    getMyBand(my_member);
    let modify =document.getElementById("modify");
    modify.addEventListener("click",modifyBandInfo);

    let disband = document.getElementById("disband");
    disband.addEventListener("click",disbandMyBand);

    let myBand=document.getElementById("band_list");
    if(myBand.innerText===""){
        let bandOperation = document.getElementById("operation");
        bandOperation.classList.add("hidden");
        let CreateBand= document.createElement("a");
        CreateBand.href="createBand.html";
        CreateBand.innerHTML="<i class=\"layui-icon layui-icon-add-1\" style='font-size: 100px'></i></br>您还不是乐队队长</br>点击此处前往创建乐队";
        CreateBand.classList.add("goToCreate");
        myBand.appendChild(CreateBand);

        disband.classList.add("hidden");

    }

     //alert(user_band);
    // alert(member);
    //getBandMember(1);
    //getBandLeader(1);
};

function getMyBand(my_member) {
    let bandList=document.getElementById("band_list");
    bandList.innerText="";
    for(let i = 0 ;i<user_band.length;i++){
        if(user_band[i].band_leader==my_name[0]){
            //alert(user_band[i].band_mem[0]);
            for(let j = 0;j < user_band[i].band_mem.length;j++){
                getUser(user_band[i].band_mem[j],my_member);
            }
            showBandInfo(user_band[i]);
            showMember(my_member);
        }
    }
}

function showMember(my_member) {
    let memberList = document.getElementById("member_list");
    for(let i=0;i<my_member.length;i++){
        let member = document.createElement("div");
        member.classList.add("my_member");

        let memberName = document.createElement("div");
        memberName.innerText=my_member[i].user_name;
        memberName.classList.add("member_info");

        let memberType = document.createElement("div");
        memberType.innerText=typeTransfer(my_member[i].user_type);
        memberType.classList.add("member_info");

        let removeMember = document.createElement("button");
        removeMember.innerText="开除乐手";
        removeMember.classList.add("operation");
        removeMember.id=my_member[i].user_name;
        removeMember.addEventListener("click",removeFromBand);

        let transferLeader = document.createElement("button");
        transferLeader.innerText="转交队长";
        transferLeader.classList.add("operation");
        transferLeader.id=my_member[i].user_name;
        transferLeader.addEventListener("click",transferLeaderTo);

        let contactMember = document.createElement("button");
        contactMember.innerText="联系乐手";
        contactMember.classList.add("operation");
        contactMember.id=my_member[i].user_name;
        contactMember.addEventListener("click",goToContact);

        member.appendChild(removeMember);
        member.appendChild(transferLeader);
        member.appendChild(contactMember);

        member.appendChild(memberName);
        member.appendChild(memberType);

        memberList.appendChild(member);
    }
}


function goToContact() {
    let user_name = this.id;
    if (user_name===my_name[0]){
        alert("无法发送邮件给自己");
        window.location.reload();
    }
    let body=document.getElementById("body");
    body.innerText="";
    let field = document.createElement("fieldset");
    field.classList.add("layui-elem-field");
    field.classList.add("mail_field");

    let title = document.createElement("legend");
    title.innerText="发送邮件";
    title.classList.add("send_mail_title");

    let receiver = document.createElement("div");
    receiver.innerText="收件人："+user_name;

    receiver.classList.add("mail_receiver");

    let content_title = document.createElement("div");
    content_title.innerHTML="</br>邮件内容：";
    content_title.classList.add("mail_receiver");

    let content = document.createElement("textarea");
    content.id = "mailContent";
    content.classList.add("layui-textarea");
    content.classList.add("mail_textarea");

    let send_button = document.createElement("button");
    send_button.innerText="发送邮件";
    send_button.classList.add("send_mail_button");
    send_button.id=user_name;

    let return_button = document.createElement("button");
    return_button.innerText="返回";
    return_button.classList.add("return_button");
    return_button.addEventListener("click",function() {window.location.reload();});
    // return_button.href="myBand.html";


    body.appendChild(field);
    field.appendChild(title);
    field.appendChild(receiver);
    field.appendChild(content_title);
    field.appendChild(content);
    field.appendChild(send_button);
    field.appendChild(return_button);
    send_button.addEventListener("click",sendMyMail);
}

function sendMyMail() {
    let content=document.getElementById("mailContent").value;
    if(content.length===0){
        alert("邮件内容不能为空");
    }
    else {
        let receiver = this.id;
        sendMail(Date(), my_name[0], receiver, content);
        alert("发送邮件成功");
        window.location.reload();
    }
}


function transferLeaderTo() {
    let newLeaderName=this.id;
    let band_id;
    for(let i = 0 ;i<user_band.length;i++) {
        if (user_band[i].band_leader == my_name[0]) {
            //alert(user_band[i].band_mem[0]);
            for (let j = 0; j < user_band[i].band_mem.length; j++) {
                band_id=user_band[i].band_id;
            }
        }
    }
    //alert(band_id);
    if(newLeaderName===my_name[0]){
        alert("你已经是该乐队队长");
    }
    else {
        let xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("microsoft.XMLHttp");
        xhr.onreadystatechange = () =>{
            if(xhr.readyState === 4) {
                if (xhr.status === 200) {
                    if(xhr.responseText==="1"){
                        sendMail(Date(),"System",newLeaderName,"您被 "+my_name[0]+" 设置为乐队队长，请前往我管理的乐队界面查看详情");
                        alert("转交队长成功");
                        window.location.reload();
                    }
                }
                else
                    alert("请检查您的网络连接2");
            }
        };
        xhr.open("post", "http://localhost:8080/band/transferLeader", false);
        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        xhr.send("old_name="+my_name[0]+"&new_name="+newLeaderName+"&band_id="+band_id);
    }
}

function removeFromBand() {
    let user_name=this.id;
    let band_id;
    for(let i = 0 ;i<user_band.length;i++) {
        if (user_band[i].band_leader == my_name[0]) {
            //alert(user_band[i].band_mem[0]);
            for (let j = 0; j < user_band[i].band_mem.length; j++) {
                band_id=user_band[i].band_id;
            }
        }
    }
    let xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("microsoft.XMLHttp");
    xhr.onreadystatechange = () =>{
        if(xhr.readyState === 4) {
            if (xhr.status === 200) {
                if(xhr.responseText==="2"){
                    alert("无法开除乐队队长");
                    window.location.reload();
                }
                else {
                    sendMail(Date(),"System",user_name,"队长："+my_name[0]+" 已将您开除出乐队");
                    alert("开除成功！");
                    window.location.reload();
                }
            }
            else
                alert("请检查您的网络连接2");
        }
    };
    xhr.open("post", "http://localhost:8080/band/removeBandUser", false);
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhr.send("band_id="+band_id+"&user_name="+user_name);

}

function showBandInfo(band) {
    let bandList= document.getElementById("band_list");

    let oneBand=document.createElement("div");
    oneBand.classList.add("my_band");
    oneBand.id=band.band_id;

    let bandId=document.createElement("div");
    bandId.innerText="NO."+band.band_id;
    bandId.classList.add("band_id");

    let bandName = document.createElement("div");
    bandName.innerText = band.band_name;
    bandName.classList.add("band_name");

    let bandNum = document.createElement("div");
    bandNum.innerText = "人数：" + band.band_num +" / 10";
    bandNum.classList.add("band_num");

    let bandDescription = document.createElement("div");
    bandDescription.innerText=band.band_description;
    bandDescription.classList.add("band_description");

    let bandMem = document.createElement("div");
    bandMem.innerText ="乐队成员：" + band.band_mem;
    bandMem.classList.add("band_mem");

    let bandLeader = document.createElement("div");
    bandLeader.innerText="乐队队长："+band.band_leader;
    bandLeader.classList.add("band_mem");

    oneBand.appendChild(bandId);
    oneBand.appendChild(bandName);
    oneBand.appendChild(bandDescription);
    oneBand.appendChild(bandNum);
    oneBand.appendChild(bandMem);
    oneBand.appendChild(bandLeader);

    bandList.appendChild(oneBand);

}

export function getUserBand(band_leader,member,user_band) {
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
                        getBand(str[i],band_leader,member,user_band);
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

export function getBand(band_id,band_leader,member,user_band){
    member=[];
    band_leader=[];
    getBandMember(band_id,member);
    getBandLeader(band_id,band_leader);
    //alert(band_leader);
    let xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("microsoft.XMLHttp");
    xhr.onreadystatechange = () =>{
        if(xhr.readyState === 4) {
            if (xhr.status === 200) {

                let str=xhr.responseText.substr(1,xhr.responseText.length-2);
                let a=str.split(",");
                //alert(a);
                let band={
                    band_id:band_id,
                    band_name:a[1].split(":")[1].substr(1,a[1].split(":")[1].length-2),
                    band_num:parseInt(a[2].split(":")[1]),
                    band_description:a[3].split(":")[1].substr(1,a[3].split(":")[1].length-2),
                    band_mem:member,
                    band_leader:band_leader
                };
                //getBandLeader(band_id);
                //alert(band.band_mem);
                user_band.push(band);

                showBandInfo(band);
            }
            else
                alert("请检查您的网络连接3");
        }
    };
    xhr.open("post", "http://localhost:8080/band/findById", false);
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhr.send("band_id="+band_id);

}

export function getBandMember(band_id,member) {
        let xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("microsoft.XMLHttp");
        xhr.onreadystatechange = () =>{
            if(xhr.readyState === 4) {
                if (xhr.status === 200) {
                    let str=xhr.responseText.substr(1,xhr.responseText.length-2);
                    str=str.split(",");
                    for(let i = 0;i<str.length;i++){
                        str[i]=str[i].substr(1,str[i].length-2);
                        getUserName(str[i],member);
                        //alert(member);
                    }
                }
                else
                    alert("请检查您的网络连接");
            }
        };
        xhr.open("post", "http://localhost:8080/band/findBandUser", false);
        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        xhr.send("band_id="+band_id);
}

export function getUserName(user_id,member) {
    //alert(getCookie("id"));
    if(getCookie("id")!=="") {
        let xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("mincrosoft.XMLHttp");
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {

                    let str = xhr.responseText.slice(2, xhr.responseText.length - 1);
                    let a = str.split(",");
                    let user_name = a[2].split(":")[1].substr(1, a[2].split(":")[1].length - 2);
                    //alert(user_name);
                    member.push(user_name);
                    // //alert(member);
                } else
                    alert("请检查您的网络连接5");
            }
        };
        xhr.open("post", "http://localhost:8080/user/findUser", false);
        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        xhr.send("id=" + user_id);
    }
}

export function getBandLeader(band_id,band_leader){
    let xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("microsoft.XMLHttp");
    xhr.onreadystatechange = () =>{
        if(xhr.readyState === 4) {
            if (xhr.status === 200) {
                band_leader.push(xhr.responseText);
                //alert(band_leader);
            }
            else
                alert("请检查您的网络连接"+band_id);
        }
    };
    xhr.open("post", "http://localhost:8080/band/getBandLeader", false);
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhr.send("band_id="+band_id);
}

function getUser(user_name,member) {
    let xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("microsoft.XMLHttp");
    xhr.onreadystatechange = () =>{
        if (xhr.readyState === 4){
            if(xhr.status === 200) {
                let str = xhr.responseText.slice(2, xhr.responseText.length-1);
                let a = str.split(",");
                let user={
                    user_name:a[2].split(":")[1].substr(1,a[2].split(":")[1].length-2),
                    user_type:a[3].split(":")[1],
                };
                //alert(user.user_type);
                member.push(user);
            }
            else
                alert("请检查您的网络连接1");
        }
    };
    xhr.open("post", "http://localhost:8080/user/findByUserName", false);
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhr.send("name="+user_name);
}

function modifyBandInfo() {
    let band_name = document.getElementById("band_name").value;
    let band_description = document.getElementById("band_description").value;
    let band_id;
    for(let i = 0 ;i<user_band.length;i++) {
        if (user_band[i].band_leader == my_name[0]) {
            //alert(user_band[i].band_mem[0]);
            for (let j = 0; j < user_band[i].band_mem.length; j++) {
                band_id=user_band[i].band_id;
            }
        }
    }
    if(band_name===""||band_description===""){
        alert("输入不能为空");
    }
    else {
        let xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("microsoft.XMLHttp");
        xhr.onreadystatechange = () =>{
            if (xhr.readyState === 4){
                if(xhr.status === 200) {
                    if(xhr.responseText==="2"){
                        alert("error!");
                    }
                    else if(xhr.responseText==="3"){
                        alert("该乐队名已经存在");
                        window.location.reload();
                    }
                    else {
                        alert("修改乐队信息成功！");
                        window.location.reload();
                    }
                }
                else
                    alert("请检查您的网络连接1");
            }
        };
        xhr.open("post", "http://localhost:8080/band/editBand", false);
        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        xhr.send("band_id="+band_id+"&band_name="+band_name+"&band_description="+band_description);

    }

}

function disbandMyBand() {
    let band;
    for(let i = 0 ;i<user_band.length;i++) {
        if (user_band[i].band_leader == my_name[0]) {
            //alert(user_band[i].band_mem[0]);
            for (let j = 0; j < user_band[i].band_mem.length; j++) {
                band=user_band[i];
            }
        }
    }
    if(band.band_num!==1){
        alert("无法解散队员存在的乐队，解散乐队之前请开出所有的乐队队员！");
        window.location.reload();
    }
    else {
        let xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("microsoft.XMLHttp");
        xhr.onreadystatechange = () =>{
            if (xhr.readyState === 4){
                if(xhr.status === 200) {
                    if(xhr.responseText==="1"){
                        alert("解散乐队成功");
                        window.location.reload();
                    }
                    else {
                        alert("未知错误！");
                        window.location.reload();
                    }

                }
                else
                    alert("请检查您的网络连接");
            }
        };
        xhr.open("post", "http://localhost:8080/band/disband", false);
        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        xhr.send("user_id="+getCookie("id")+"&band_id="+parseInt(band.band_id));
    }

}