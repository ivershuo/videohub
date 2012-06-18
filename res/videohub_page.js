(function(){
	document.addEventListener('mousedown', function(e){		
		if(2 == e.button){
			var text = e.target.innerText;
			chrome.extension.sendRequest({text : text}, function(){});
		}
	});
})();