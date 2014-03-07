
var grokfaster = {
	/**
	*  displaySettings - this shows the menu with the extension settings
	*  
	**/
	displaySettings: function(mode){
		//Çvar form = document.createElement('form');
		//form.setAttribute('id', 'grokfasterOptions');
		//document.body.appendChild(form);
		var options = {};
		var wpm_el = document.getElementById('wpm');
		var wpm_val_el = document.getElementById('wpm_val');
		var focal_point_el = document.getElementById('focal_point');

		var save_el = document.getElementById('save');
		
		save_el.addEventListener('click', 
			function(){ 
				var focal_point = focal_point_el.checked ? true : false;
				console.log(focal_point);
				chrome.runtime.sendMessage({action: "options", options: { 'wpm': wpm_el.value, 'focal_point': focal_point }}, 
				function(response) { 
					window.close(); 
				});
			}, false);

		wpm_el.addEventListener('change', function(){ wpm_val_el.value = this.value; }, false);

		chrome.runtime.sendMessage({action: "options"}, function(response) {
			options = response;
  			console.log(options);
			wpm_el.value = options.wpm;
			wpm_val_el.value = options.wpm;

			focal_point_el.checked = options.focal_point ? true : false;
			save_el.removeAttribute('disabled');
		});
		

		
		
	}
}


document.addEventListener('DOMContentLoaded', function () {
  grokfaster.displaySettings();
});