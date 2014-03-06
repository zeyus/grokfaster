
var options = {};

var grokfaster = {
	grok: function(text){
		var word_el = document.createElement('div');
		var words = text.split(' ');
		var delay = 60/options.wpm*1000;

		word_el.setAttribute('id', 'grokCurrentWord')
		document.body.appendChild(word_el);
		var jobID = setInterval(function(){
			var word = words.shift();
			if(!word){
				clearInterval(jobID);
				document.body.removeChild(word_el);
				return;
			}
			word_el.innerHTML=word;

		}, delay);
	}
};

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
  	switch (request.action){ 
  		case 'parse_text':
  			chrome.runtime.sendMessage({action: "options"}, function(response) {
				options = response;
	  			grokfaster.grok(request.text);
			});
  			
	    	break;
	}
  }
);