document.addEventListener("DOMContentLoaded", function(){
	var $ = function(v){
		return typeof(v) == 'string' ? document.getElementById(v) : v;
	}

	/*存储*/
	$('submit').addEventListener('click', function(){
		var sites = $('sitelist').getElementsByTagName('li'),
			sites2db = [];
		[].forEach.call(sites, function(site){
			var name = site.querySelector('input[name=name]').value,
				url  = site.querySelector('input[name=url]').value;
			if(name && url){
				var siteData = {
					'name': name,
					'url' : url,
				}
				sites2db.push(siteData);
			}			
		});		
		localStorage.setItem('siteDatas', JSON.stringify(sites2db));
		window.location.reload();
	});

	/*写到页面*/
	var tmp = $('temp').value;
	var _html = [];
	JSON.parse(localStorage.siteDatas || '[]').forEach(function(site){
		var _html_li = tmp.replace('$name', site.name)
						  .replace('$url', site.url)
		_html.push(_html_li);
	});
	/*添加一行新的空表单*/
	_html.push(tmp.replace(/\$\w+/g, ''));
	$('sitelist').innerHTML = _html.join('');
});