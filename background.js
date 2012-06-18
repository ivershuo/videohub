var G = {};
var videohubContextMenusId = chrome.contextMenus.create({
    title : 'Videohub',
    contexts : ['selection', 'link']
}, function(){
    /*添加子菜单*/
    var items = [
        {
            title : 'Search from Douban',
            func : function(url, name){
                chrome.tabs.create({url : siteconf.douban + encodeURIComponent(name)});
            }
        },
        {
            title : 'Download with Xunlei',
            func : function(url, name){
                chrome.tabs.create({url : siteconf.xunlei + encodeURIComponent(url)});
            }
        },
        {
            title : 'Download with qq',
            func : function(url, name){
                chrome.tabs.create({url : siteconf.qq + encodeURIComponent(url)});
            }
        }
    ];
    items.forEach(function(item){
        chrome.contextMenus.create({
            contexts : ['all'],
            title : item.title,
            parentId : videohubContextMenusId,
            onclick : function(info, tab){
                var url = info.linkUrl || info.selectionText;
                var name = info.selectionText || G.nameText;
                item.func(url, name);                
            }
        });
    });
    chrome.contextMenus.create({
        type : 'separator',
        contexts : ['all'],
        parentId : videohubContextMenusId
    });

    chrome.contextMenus.create({
        contexts : ['all'],
        parentId : videohubContextMenusId,
        title : 'test'
    });
});

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    G.nameText = request.text;
});