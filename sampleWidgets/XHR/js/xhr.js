var nameSpace = nameSpace || {};

(nameSpace.CreateNetworkManager = jQuery => {
    var url = "http://rippledocs.tinyhippos.com";

    var callback = null;

    function _getDataWithJQuery() {
        jQuery.ajax({
            type: "GET",
            url,
            success(msg) {
                if(typeof callback === "function") {
                    callback("jQuery");
                }
            }
        });
    }

    function _getDataWithXHR() {
        var xhr = new XMLHttpRequest();

        if(typeof callback === "function") {
            xhr.onreadystatechange = () => {
                if(xhr.readyState === 4) {
                    callback("XHR");
                }
            }
        }

        xhr.open("GET", url, true);
        xhr.send(null);
    }

    return {
        registerCallback(cb) {
            callback = cb;
        },

        getContentWithJQuery() {
            _getDataWithJQuery();
        },

        getContentWithXHR() {
            _getDataWithXHR();
        }
    };
});

window.addEventListener("load", () => {
    nameSpace.NetworkManager = new nameSpace.CreateNetworkManager($);
    nameSpace.NetworkManager.registerCallback(method => {
        document.getElementById("xhr-result").innerHTML = "Great Success using: " + method + "!";
    });
});
