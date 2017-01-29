//add a message listener that will modify the context menu however you see fit
chrome.extension.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.message == 'updateContextMenu') {
        if (request.selection) {
            chrome.contextMenus.update('text_url_open', {
                'title': 'Open in new tab',
                'enabled': true,
                "contexts": ["all"],
                'onclick': onRequest
            });
        } else {
            chrome.contextMenus.update('text_url_open', {
                'title': 'Select some text first',
                'enabled': false,
                "contexts": ["all"]
            });
        }
    } else {
        sendResponse({});
    }
});

function onRequest(info, tab) {
    if (info.linkUrl) {
        alert('link ' + info.linkUrl);
        //        chrome.tabs.create({
        //            url: serviceCall
        //        });
        return;
    }

    if (info.selectionText) {
        var selection = info.selectionText;
        alert('selection ' + selection);
        var urlRegex = /((?:(http|https|Http|Https|rtsp|Rtsp):\/\/(?:(?:[a-zA-Z0-9\$\-\_\.\+\!\*\'\(\)\,\;\?\&\=]|(?:\%[a-fA-F0-9]{2})){1,64}(?:\:(?:[a-zA-Z0-9\$\-\_\.\+\!\*\'\(\)\,\;\?\&\=]|(?:\%[a-fA-F0-9]{2})){1,25})?\@)?)?((?:(?:[a-zA-Z0-9][a-zA-Z0-9\-]{0,64}\.)+(?:(?:aero|arpa|asia|a[cdefgilmnoqrstuwxz])|(?:biz|b[abdefghijmnorstvwyz])|(?:cat|com|coop|c[acdfghiklmnoruvxyz])|d[ejkmoz]|(?:edu|e[cegrstu])|f[ijkmor]|(?:gov|g[abdefghilmnpqrstuwy])|h[kmnrtu]|(?:info|int|i[delmnoqrst])|(?:jobs|j[emop])|k[eghimnrwyz]|l[abcikrstuvy]|(?:mil|mobi|museum|m[acdghklmnopqrstuvwxyz])|(?:name|net|n[acefgilopruz])|(?:org|om)|(?:pro|p[aefghklmnrstwy])|qa|r[eouw]|s[abcdeghijklmnortuvyz]|(?:tel|travel|t[cdfghjklmnoprtvwz])|u[agkmsyz]|v[aceginu]|w[fs]|y[etu]|z[amw]))|(?:(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9])\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9]|0)\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9]|0)\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[0-9])))(?:\:\d{1,5})?)(\/(?:(?:[a-zA-Z0-9\;\/\?\:\@\&\=\#\~\-\.\+\!\*\'\(\)\,\_])|(?:\%[a-fA-F0-9]{2}))*)?(?:\b|$)/gi;;
        var theUrls = selection.match(urlRegex);
        if (theUrls.length == 0) {
            return;
        }
        alert('theUrl ' + theUrls[0]);
        //do something with the selection
        //var serviceCall = urls[0];
        //chrome.tabs.create({
        //    url: serviceCall
        //});
    }
};

alert('load');
chrome.contextMenus.create({
    id: "text_url_open",
    title: "Open in new tab......",
    "contexts": ["selection"],
    "onclick": onRequest
});