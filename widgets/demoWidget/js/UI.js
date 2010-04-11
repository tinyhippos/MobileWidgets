// ----------------- Main ----------------- \\
(Demo.UI = function ($, JQuery){

    return {

        loadView: function(str){
            JQuery("#container").html(str);
            return this;
        },

        hideHeader: function () {
            JQuery("header").addClass("irrelevant");
            return this;
        },

        showHeader: function () {
            JQuery("header").removeClass("irrelevant");
            this.setTitle();
            return this;
        },

        setTitle: function (text){
            JQuery("header").html((text === "" || !text) ? "&nbsp;" : text);
            return this;
        }
    };

}(Demo, $));