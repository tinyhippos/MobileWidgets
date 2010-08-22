var nameSpace = nameSpace || {};

(nameSpace.CreateNetworkManager = function (jQuery){
    var url = "http://rippledocs.tinyhippos.com";

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
                if(xhr.readyState === 4) {
                    callback("XHR");
                }
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

window.addEventListener("load", function() {
    nameSpace.NetworkManager = new nameSpace.CreateNetworkManager($);
    nameSpace.NetworkManager.registerCallback(function(method) {
        document.getElementById("xhr-result").innerHTML = "Great Success using: " + method + "!";
    });
});
