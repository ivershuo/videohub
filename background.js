var G = {};
var S = {
    get : function(k){
        return localStorage.getItem(k) || '';
    },
    set : function(k, v){
        localStorage.setItem(k, v);
    }
}
var videohubContextMenusId = chrome.contextMenus.create({
    title : 'Videohub',
    contexts : ['selection', 'link']
}, function(){
    /*默认子菜单*/
    var items = [
        {
            title : 'Search from Douban',
            site : {
                name : 'douban',
                replace : 'name'
            }
        },
        {
            title : 'Download with Xunlei',
            site : {
                name : 'xunlei',
                replace : 'url'
            }
        },
        {
            title : 'Download with qq',
            site : {
                name : 'qq',
                replace : 'url'
            }
        },
        {
            title : 'Search subtitle in Shooter',
            site : {
                name : 'shooter',
                replace : 'name'
            }
        }
    ];

    /*跳转*/
    var jumpTo = function(info, siteUrl, r){
        var url = info.linkUrl || info.selectionText,
            name = info.selectionText || G.nameText;        
        var jumpUrl = siteUrl.replace('%s', encodeURIComponent('url' == r? url : name));                
        chrome.tabs.create({url : jumpUrl});
    }

    /*添加子菜单到主菜单*/
    items.forEach(function(item){
        chrome.contextMenus.create({
            contexts : ['all'],
            title : item.title,
            parentId : videohubContextMenusId,
            onclick : function(info, tab){
                jumpTo(info, siteconf[item.site.name], item.site.replace);
            }
        });
    });
    chrome.contextMenus.create({
        type : 'separator',
        contexts : ['all'],
        parentId : videohubContextMenusId
    });

    /*自定义子菜单*/
    siteDefault.forEach(function(item){
        chrome.contextMenus.create({
            contexts : ['all'],
            title : 'Search from ' + item.name,
            parentId : videohubContextMenusId,
            onclick : function(info, tab){
                jumpTo(info, item.url, item.replace);
            }
        });
    });    
});

chrome.extension.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.text){
        G.nameText = message.text;
    }
});

chrome.extension.sendMessage('xunlei_on_change');