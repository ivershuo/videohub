(function(){
	document.addEventListener('mousedown', function(e){		
		if(2 == e.button){
			var text = e.target.innerText;
            if(undefined == chrome.extension.sendMessage){
                chrome.extension.sendMessage = chrome.extension.sendRequest
            }            
			chrome.extension.sendMessage({text : text});
		}
	});
})();