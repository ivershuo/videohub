var siteconf = {
	'douban'  : 'http://movie.douban.com/subject_search?cat=1002&search_text=%s',
	'xunlei'  : 'http://dynamic.lixian.vip.xunlei.com/user_task?userid=%u&furl=%l',
	'qq'      : 'http://lixian.qq.com/main.html?url=%l',
	'shooter' : 'http://shooter.cn/search/%s/'
}

/*默认其他站*/
if (!localStorage.siteDatas) {
	var siteDefault = [
		{
			'name' : 'v.360.cn',
			'url' : 'http://so.v.360.cn/index.php?kw=%s',
		},
		{
			'name' : 'Quanloo',
			'url' : 'http://www.quanloo.com/search?q=%s',
		},
		{
			'name' : 'Simplecd',
			'url' : 'http://www.simplecd.org/?q=%s',
		},
	];
	localStorage.setItem('siteDatas', JSON.stringify(siteDefault));
};