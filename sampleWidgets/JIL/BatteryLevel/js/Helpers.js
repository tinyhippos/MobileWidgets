var nameSpace = nameSpace || {};

(nameSpace.Helpers = (() => ({
    handleException: function handleException(exception){
        var eMsg = exception.message || "exception caught!";
        var msg = eMsg+"\n\n"+(exception.stack || "*no stack provided*")+"\n\n";

        if(window.console){
            console.error ? console.error(msg) : console.log(msg);
        }
    }
}))());