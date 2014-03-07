var default_options = {
	'settings_mode': 'simple', //simple or advanced
	'wpm': 300, //words per minut
	'focal_point': true, //highlight the focal point
	'dim_background': true, //fade the background
	'pause_sentence': true, // slight pause after each full stop
	'pause_sentence_time': 300, //additional time in ms to pause
	'pause_paragraph': false, //extra pause for end of P?
	'pause_paragraph_time': 0,
	'pause_other': false, //comma, semicolon, colon, etc
	'pause_other_time': 300, //additional time in ms to pause
	'show_additional': true // show the previous and next words
};

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
  	switch (request.action){ 
  		case 'options':
	    	var options = default_options;
	    	try {
	    		if(localStorage['options']){
	    			options = JSON.parse(localStorage['options']);
	    		}
	    	}catch(err){
				options = default_options;
	    	}
	    	if(typeof options === 'string'){

	    		options = JSON.parse(options);
	    	}
	    	var new_options = {};
	    	//save first
	    	if(request.options){
	    		for(var option in default_options){
	    			//for some reason using options[option] results in undefined???
	    			new_options[option] = (request.options[option] !== undefined) ? request.options[option] : default_options[option];
	    		}
	    		options = new_options;
	    		localStorage['options'] = JSON.stringify(options);
	    		//chrome.storage.sync.set({options: options});
	    	}
	    	//TODO: add chrome sync for options...annoyingly this is an async call
	    	//chrome.storage.sync.get('options', function(obj){
	    	//	sendResponse(options);
	    	//});
			sendResponse(options);
	    	break;
	}
  }
);
chrome.runtime.onInstalled.addListener(function(){
	chrome.contextMenus.create({
		'id': 'grokfaster_context_menu',
	    'title': 'grokfaster',
	    'contexts': ['selection']
	});
});

chrome.contextMenus.onClicked.addListener(
	function(info, tab) {
    	chrome.tabs.query({
        	'active': true,
        	'currentWindow': true
    	}, function (tabs) {
        	chrome.tabs.sendMessage(tabs[0].id, {
            	'action': 'grok_start',
        	});
    	});
	}
);

