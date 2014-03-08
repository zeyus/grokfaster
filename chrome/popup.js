
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
		var show_additional_el = document.getElementById('show_additional');
		var dim_background_el = document.getElementById('dim_background');
		var pause_sentence_time_el = document.getElementById('pause_sentence_time');
		var pause_other_time_el = document.getElementById('pause_other_time');

		var save_el = document.getElementById('save');
		
		save_el.addEventListener('click', 
			function(){ 
				var focal_point = focal_point_el.checked ? true : false;
				var show_additional = show_additional_el.checked ? true : false;
				var dim_background = dim_background_el.checked ? true : false;
				chrome.runtime.sendMessage(
					{
						action: "options", 
						options: { 
							'wpm': wpm_el.value, 
							'focal_point': focal_point,
							'show_additional': show_additional,
							'dim_background': dim_background,
							'pause_sentence_time': pause_sentence_time_el.value,
							'pause_other_time': pause_other_time_el.value
						}
					}, 
				function(response) { 
					window.close(); 
				});
			}, false);

		wpm_el.addEventListener('change', function(){ wpm_val_el.value = this.value; }, false);
		wpm_val_el.addEventListener('change', function(){ wpm_el.value = this.value; }, false);

		chrome.runtime.sendMessage({action: "options"}, function(response) {
			options = response;
			wpm_el.value = options.wpm;
			wpm_val_el.value = options.wpm;

			focal_point_el.checked = options.focal_point ? true : false;
			show_additional_el.checked = options.show_additional ? true : false;
			dim_background_el.checked = options.dim_background ? true : false;
			pause_sentence_time_el.value = options.pause_sentence_time;
			pause_other_time_el.value = options.pause_other_time;

			save_el.removeAttribute('disabled');
		});
		

		
		
	}
}


document.addEventListener('DOMContentLoaded', function () {
  grokfaster.displaySettings();
});