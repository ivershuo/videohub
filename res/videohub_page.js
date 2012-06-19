(function(){
	document.addEventListener('mousedown', function(e){		
		if(2 == e.button){
			var text = e.target.innerText;
			chrome.extension.sendMessage({text : text});
		}
	});
})();