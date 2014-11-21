(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper window is present,
		module.exports = global.document ?
			factory( global) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "Sleuth requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window ) {


	var Sleuth = function(args,context){

		this._init();

	}


	Sleuth.prototype = {

		constructor:Sleuth,


		_init:function(){

			this.headNode = document.getElementsByTagName('HEAD').item(0);
			this.refMapping =  mappingExport();

			this.numRef = 0;

		},

		require:function(aliass,fn){

			var i,
				me = this,
				timer,
				timeCounter = 0,
				defaultTimeout = 5000;

			if(  aliass instanceof Array){
				var len = aliass.length;

				for(i = 0 ; i < len;i++){
					this._loadScript(aliass[i]);
				}

			}else if(typeof aliass == 'string'){
				this._loadScript(aliass);
			}
			else{
				console.error('Sleuth error:the first parameter must be array or string');
			}



			if(fn && typeof fn == 'function'){
				if(!define.amd)
					window.onload = function(){
						fn();
					};
				else{
					timer = setInterval(function(){
						// if all script have been loaded successfully or time is out
						// excute fn
						timeCounter += 100;
						if(len == me.numRef || timeCounter == defaultTimeout){
							fn();
							clearInterval(timer);
						}
					},100);
				}

			}
			else if(fn){
				console.error('Sleuth error:the second parameter must be function');
			}
		},

		_loadScript:function(filePath){

		    var scriptNode= document.createElement("script"),
		    	module = '',version = '',
		    	me = this;
		    var array = filePath.split('|');

		    module = array[0];
		    version = array.length > 1 ?  array[1] : '';

		    scriptNode.type = "text/javascript";

		    // for ff,chrome
			scriptNode.onload  = function(){
			    	me.numRef++;
			}

			scriptNode.onerror = function(){
				me.numRef++;
				console.log('Sleuth error:' + module + ' load failed');
			}
		   
		    //for ie
		    scriptNode.onreadystatechange = function(){
		    	
			    if (/loaded|complete/.test(scriptNode.readyState))
			    	me.numRef++;

		    }


		    var mapping = this.refMapping[module],
		    	i;
		    
		    //new script node must insert into head before set script node's src	
		    this.headNode.appendChild(scriptNode);

		    if(mapping){

		    	if(version == '')	
				    for(i in mapping){
				    	scriptNode.src = typeof mapping[i] == 'string' ? mapping[i] : mapping[i].u;
				    	version = i;
				    	break;
				    }
			 	else{
					 	if( mapping[version])
					 		scriptNode.src = mapping[version];
					 	else
					 		console.error('Sleuth error:sorry,the version you wanna load is not in config file,you can pull request to our github,thx');
					 }
		    }else{
		    	console.error('Sleuth error:sorry,the module you wanna load is not in config file,you can pull request to our github,thx');
		    }


		    // inline function to support that create link node dynamic
		    function _inlineCreateStyleNode(url){
		    	styleNode= document.createElement("link");

		    	styleNode.setAttribute('type','text/css');
		    	styleNode.setAttribute('rel','stylesheet');
		    	styleNode.setAttribute('href',url);

		    	me.headNode.appendChild(styleNode);
		    }

		    // load css file,support one css file ,and more
		    var mappingCSS = typeof mapping[version] == 'string' ? mapping[version] : mapping[version].c,
		    	len;

		    if(mappingCSS){
		    	if(mappingCSS instanceof Array){

		    		len = mappingCSS.length
		    		for(i = 0 ; i < len ; i++){
		    			_inlineCreateStyleNode(mappingCSS[i]);
		    		}
		    	}else if(typeof mappingCSS == 'string'){
		    		_inlineCreateStyleNode(mappingCSS)
		    	}
		    }
		   
		}

	};

	var sleuth = window.Sleuth = new Sleuth(); 

	// for amd
	if ( typeof define === "function" && define.amd ) {
		define( "sleuth", [], function() {
			return sleuth;
		});
	}

	return sleuth;

}))