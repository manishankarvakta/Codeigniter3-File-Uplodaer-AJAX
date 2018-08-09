var app = app || {};

(function(o){
	

	// Privaate mathode
	var ajax, getFormData, setProgress; 

	ajax = function(data){
		var xmlhttp = new XMLHttpRequest();
		var uploaded;

		xmlhttp.addEventListener('readystatechange', function(){
			if (this.readyState === 4) {
				if (this.status === 200) {
					// console.log(this.response);
					uploaded = JSON.parse(this.response);
					if (typeof o.options.finished === 'function') {

						o.options.finished(uploaded);
						
					};

				}else{
					if (typeof o.options.error === 'function') {
						o.options.error();
					};
				}
			};
		});

		xmlhttp.upload.addEventListener('progress' , function(e){
			var percent;

			if (e.lengthComputable === true) {

			percent = Math.round(e.loaded / e.total * 100);
			setProgress(percent);
			
			};
		});

		xmlhttp.open('post', o.options.processor);
		xmlhttp.send(data);
	};  

	getFormData = function(source){
		// console.log(source);
		var data = new FormData();
		var i;

		for (i = 0;i< source.length; i = i+1) {
			data.append('files[]', source[i]);
		};

		return data; 
	};

	setProgress = function(value){
		if (o.options.progressBar !== undefined) {
			o.options.progressBar.style.width = value ? value + '%' : 0;
		};

		if (o.options.progressText !== undefined) {
			o.options.progressText.textContent = value ? value + '%' : '';
		};
	};

	o.uploader = function(options){
		o.options = options;
		// console.log(o.options.file);

			if (o.options.file !== undefined) {
		 		// ajax(getFormData(o.options.files));
				ajax(getFormData(o.options.file));
			}
	
};
}(app));