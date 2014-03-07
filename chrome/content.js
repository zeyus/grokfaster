
var options = {};
var grokfaster_running = false;

var grokfaster = {
	shiftword: function(words){
		var word = '';
		while(word === ''){
			word = words.shift();
			if(!word){return false;}
			word = word.replace(/\r|\n|\s/gm,'');
		}
		return word;
	},
	grok: function(text){
		if(grokfaster_running){return;}

		var container_el = document.createElement('div');
		var prev_word_el =  document.createElement('div');
		var next_word_el =  document.createElement('div');
		var word_el = document.createElement('div');

		var bg_el = document.createElement('div');
		var words = text.split(' ');

		if(words.length<2){return;}
		grokfaster_running = true;
		var delay = 60/options.wpm*1000;

		bg_el.setAttribute('id','grokFadeBG');
		container_el.setAttribute('id', 'grokReader');
		prev_word_el.setAttribute('id', 'grokPreviousWord');
		next_word_el.setAttribute('id', 'grokNextWord');
		word_el.setAttribute('id', 'grokCurrentWord');

		container_el.appendChild(prev_word_el);
		container_el.appendChild(word_el);
		container_el.appendChild(next_word_el);
		
		prev_word_el.innerHTML = '&nbsp;';
		word_el.innerHTML = '&nbsp;';
		next_word_el.innerHTML = '&nbsp;';

		document.body.appendChild(bg_el);
		document.body.appendChild(container_el);
		var jobID = 0;

		function grokfaster_kill(){
			if(jobID){
				clearInterval(jobID);
			}
			document.body.removeChild(bg_el);
			document.body.removeChild(container_el);
			grokfaster_running = false;
		}

		bg_el.addEventListener('click', grokfaster_kill);
		document.addEventListener('keyup', function(e){
			e = e || window.event;
    		if (e.keyCode == 27) {
    			grokfaster_kill();
    		}
		});

		var nextWord = '';
		var first = true;

		jobID = setInterval(function(){
			if(first){
				first = false;
				word_el.innerHTML=grokfaster.shiftword(words);
				next_word_el.innerHTML=grokfaster.shiftword(words);
				return;
			}
			nextWord = grokfaster.shiftword(words);
			prev_word_el.innerHTML = word_el.innerHTML;
			word_el.innerHTML=next_word_el.innerHTML;
			if(!nextWord){
				next_word_el.innerHTML = '&nbsp;';
				clearInterval(jobID);
				setTimeout(grokfaster_kill,delay+1000);
				//grokfaster_running = false;
				return;
			}
			
			next_word_el.innerHTML = nextWord;

			curWord=nextWord;

		}, delay);
	}
	
};

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
  	switch (request.action){ 
  		case 'grok_start':
  			chrome.runtime.sendMessage({action: "options"}, function(response) {
				options = response;
	  			grokfaster.grok(window.getSelection().toString());
			});
  			
	    	break;
	}
  }
);