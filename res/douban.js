(function(){
	chrome.extension.sendMessage({doubanloaded : true}, function(ret){
		console.log(ret);
		var srvUrl = ret;

		var movieTitle = document.querySelectorAll('h1>span')[0].innerText,
		imdb = document.querySelectorAll('a[href^="http://www.imdb.com"]')[0] ? document.querySelectorAll('a[href^="http://www.imdb.com"]')[0].innerText : '',
		doubanId = window.location.pathname.match(/^\/subject\/(\d+)/)[1];		
		queryUrl = srvUrl.replace('$title', encodeURIComponent(movieTitle))
				   		 .replace('$imdb', encodeURIComponent(imdb))
				   		 .replace('$did', encodeURIComponent(doubanId));

		/*获取电影数据*/
		var xhr = new XMLHttpRequest();
		xhr.open('GET', queryUrl, true);
		xhr.onreadystatechange = function() {
		  	if (xhr.readyState == 4) {
		  		var resData = JSON.parse(xhr.responseText);
		  		var parNode = document.getElementById('interest_sect_level'),
		  			chdLastNode = parNode.getElementsByTagName('div')[0];
				/*添加播放按钮*/
				if(resData.playurl){
					var onlineBtn = document.createElement('a');
					onlineBtn.className = 'colbutt ll';
					onlineBtn.innerHTML = '<span>在线观看</span>';
					onlineBtn.setAttribute('target', '_blank');
					onlineBtn.setAttribute('href', encodeURI(resData.playurl));
					parNode.insertBefore(onlineBtn, chdLastNode);
				}
				/*添加下载按钮*/
				if(resData.downurl){
					var onlineBtn = document.createElement('a');
					onlineBtn.className = 'colbutt ll';
					onlineBtn.innerHTML = '<span>下载</span>';
					onlineBtn.setAttribute('target', '_blank');
					onlineBtn.setAttribute('href', encodeURI(resData.downurl));
					parNode.insertBefore(onlineBtn, chdLastNode);
				}
		    }
		}
		xhr.send();
	});
})();