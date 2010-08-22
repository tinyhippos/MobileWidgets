var nameSpace =nameSpace || {};

(nameSpace.Helpers = function() {

    return {
        handleException: function handleException(exception){
			
			var eMsg = exception.message || "exception caught!",
			msg = eMsg+"\n\n"+(exception.stack || "*no stack provided*")+"\n\n";

			if(window.console){
				console.error ? console.error(msg) : console.log(msg);
			}

		}
    };

}());