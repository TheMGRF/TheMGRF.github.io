var darkMode = false;

document.addEventListener('DOMContentLoaded', function() {     
    if (getCookie("darkmode") != "") {
        dark();
    }

    document.getElementById('logo').onclick = function() {
        if (darkMode) {
            white();
        } else {
            dark();
        }
    };
}, false);

function dark() {
    document.body.style.backgroundColor = "#2C2F33";
    document.body.style.color = "white";
    darkMode = true;
    document.cookie = "darkmode=true";
}

function white() {
    document.body.style.backgroundColor = "white";
    document.body.style.color = "black";
    darkMode = false;
    document.cookie = "darkmode=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}