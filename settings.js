const cookieDefaults = [
    {
        "key": "numberOfBots",
        "value": 0
    },
    {
        "key": "numberOfDecks",
        "value": 1
    },
    {
        "key": "trueCountThreshold",
        "value": 3
    }
 ]

const cookieStringEnd = "; SameSite=None; Secure";

function initCookies() {
    if (document.cookie === "")
        for (const i in cookieDefaults)
            document.cookie = cookieDefaults[i].key + "=" + cookieDefaults[i].value + cookieStringEnd
}

function resetSettings() {
    deleteAllCookies()
    initCookies()
}

function updateNumberOfBots() {
    const newGameMode = document.getElementById("gameModeSetting").checked
    if (!newGameMode){
        document.cookie = "numberOfBots=0" + cookieStringEnd
        document.getElementById("numberOfBotsSetting").style = "visibility: hidden"
        document.getElementById("numberOfBotsSettingLabel").style = "visibility: hidden"
    } else {
        document.getElementById("numberOfBotsSetting").style = "visibility: visible"
        document.getElementById("numberOfBotsSettingLabel").style = "visibility: visible"
        if (getCookie("numberOfBots") === "0")
            document.getElementById("numberOfBotsSetting").value = 1
        const newNumberOfBots = document.getElementById("numberOfBotsSetting").value
        document.cookie = "numberOfBots=" + newNumberOfBots + cookieStringEnd
    }
}

function updateNumberOfDecks() {
    const newNumberOfDecks = document.getElementById("numberOfDecksSetting").value
    document.cookie = "numberOfDecks=" + newNumberOfDecks + cookieStringEnd
}

function updateTrueCountThreshold() {
    const newTrueCountThreshold = document.getElementById("trueCountSetting").value
    document.cookie = "trueCountThreshold=" + newTrueCountThreshold + cookieStringEnd
}

function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function deleteAllCookies() {
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}

function logCookies() {
    console.log(document.cookie)
}

initCookies()