/**
 * Created by VEDANT KASHYAP on 5/26/2017.
 */

let channels=["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "habathcx", "RobotCaleb", "noobs2ninjas"];
let details,title,logo1,url;

function displayChannelStatus(JSONObject,channel_name) {
    if (JSONObject.stream!=null)
        $("#"+channel_name).addClass("online");
    else
        $("#"+channel_name).addClass("offline");
}

function displayChannelDetails(JSONResponse, name) {
    if(JSONResponse.stream!=null) {
        title=name;
        url="https://www.twitch.tv/"+name;
        details=JSONResponse.stream.channel.status;
        logo1=JSONResponse.stream.channel.logo;
        $("#"+name).html("" +
            "<div class='row'>" +
            "<div class='col-xs-2 text-center'><img src="+logo1+" width='50' height='50'></div>" +
            "<div class='col-xs-4 text-center'>"+"<a href="+url+">"+name+"</a></div>" +
            "<div class='col-xs-6 text-center'>"+details+"</div>" +
            "</div>" +
            "");
    }

    else {
        let logoa;
        details="Offline";
        $.getJSON("https://wind-bow.glitch.me/twitch-api/users/"+name,function (response) {
            url="https://www.twitch.tv/"+response.name;
            title=response.name;
            logoa=response.logo;
            $("#"+name).html("" +
                "<div class='row'>" +
                "<div class='col-xs-2 text-center'><img src="+logoa+" width='50' height='50'></div>" +
                "<div class='col-xs-4 text-center'>"+"<a href="+url+">"+title+"</a></div>" +
                "<div class='col-xs-6 text-center'>"+details+"</div>" +
                "</div>" +
                "");
        });
    }

}

function showAll() {
    for (let i=0; i<channels.length; i++) {
        document.getElementById(channels[i]).setAttribute("style","display:block");
        $.getJSON("https://wind-bow.glitch.me/twitch-api/streams/"+channels[i],function (liveStatus) {
            displayChannelStatus(liveStatus,channels[i]);
            displayChannelDetails(liveStatus,channels[i]);
        });
    }
}

function showOnline() {
    showAll();
    for (let j=0; j<channels.length; j++) {
        var classes=document.getElementById(channels[j]).getAttribute("class").split(" ");
        if(classes[1]=="offline") {
            document.getElementById(channels[j]).setAttribute('style',"display: none");
        }
    }
}

function showOffline() {
    showAll();
    for (let j=0; j<channels.length; j++) {
        var classes=document.getElementById(channels[j]).getAttribute("class").split(" ");
        if(classes[1]=="online") {
            document.getElementById(channels[j]).setAttribute('style',"display: none");
        }
    }
}