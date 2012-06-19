document.addEventListener("DOMContentLoaded", function(){
	var $ = function(v){
		return typeof(v) == 'string' ? document.getElementById(v) : v;
	}

	/*存储*/
	$('f').addEventListener('submit', function(){
		var sites = $.getElementsByTagName('li');
		sites.
		localStorage.setItem('x', 'y');		
	});

	/*写到页面*/
	var tmp = $('temp').value;
	var _html = [];
	siteDefault.forEach(function(site){
		var _html_li = tmp.replace('$name', site.name)
						  .replace('$url', site.url)
		_html.push(_html_li);		
	});
	$('sitelist').innerHTML = _html.join('');
});