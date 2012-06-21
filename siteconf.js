var siteconf = {
	'douban'  : 'http://movie.douban.com/subject_search?cat=1002&search_text=%s',
	'xunlei'  : 'http://lixian.vip.xunlei.com/lixian_login.html?furl=%l',
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

/*默认在线观看和下载接口地址*/
if (!localStorage.apiurl) {
	var apiDefault = 'http://videohub.duapp.com/douban2360?title=$title&imdb=$imdb&did=$did';
	localStorage.setItem('apiurl', apiDefault);
};