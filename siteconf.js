var siteconf = {
	'douban'  : 'http://movie.douban.com/subject_search?cat=1002&search_text=%s',
	'xunlei'  : 'http://dynamic.lixian.vip.xunlei.com/user_task?userid=%u&furl=%s',
	'qq'      : 'http://lixian.qq.com/main.html?url=%s',
	'shooter' : 'http://shooter.cn/search/%s/'
}

/*更新迅雷id*/
chrome.extension.onMessage.addListener(function(message, sender, sendResponse) {	
	if('xunlei_on_change' == message) {
		chrome.cookies.get({
		    url  : siteconf.xunlei.match(/^.*?\w\//)[0],
		    name : 'userid'
		}, function(data){			
		    if(data && data.value){		    	
		        siteconf.xunlei = siteconf.xunlei.replace('%u', data.value).replace(/\d+/, data.value);
		    } else {
		    	siteconf.xunlei = siteconf.xunlei.replace(/\d+/, '%u');
		    }		    
		});
	}
});

/*默认其他站*/
var siteDefault = [
	{
		'name' : 'v.360.cn',
		'url' : 'http://so.v.360.cn/index.php?kw=%s',
		'replace' : 'name'
	},
	{
		'name' : 'Quanloo',
		'url' : 'http://www.quanloo.com/search?q=%s',
		'replace' : 'name'
	}
]