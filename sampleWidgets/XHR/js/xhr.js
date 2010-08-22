var nameSpace = nameSpace || {};

(nameSpace.NetworkManager = function (jQuery){
    var url = "http://www.google.com";

    var callback = null;

    function _getDataWithJQuery() {
        jQuery.ajax({
            type: "GET",
            url: url,
            success: function(msg) {
                if(typeof callback === "function") {
                    callback("jQuery");
                }
            }
        });
    }

    function _getDataWithXHR() {
        var xhr = new XMLHttpRequest();

        if(typeof callback === "function") {
            xhr.onreadystatechange = function() {
                callback("XHR");
            }
        }

        xhr.open("GET", url, true);
        xhr.send(null);
    }

    return {
        registerCallback: function(cb) {
            callback = cb;
        },

        getContentWithJQuery: function() {
            _getDataWithJQuery();
        },

        getContentWithXHR: function() {
            _getDataWithXHR();
        }
    };
});

var network = new nameSpace.NetworkManager($);
network.registerCallback(function(method) {
    document.getElementById("xhr-result").innerHTML = "Great Success using: " + method + "!";
});
