// ----------------- Main ----------------- \\
var Demo = {};


(Demo.Main = function ($){

	return {

		initialize: function(){
			$.Persistence.detect();
			$.Routes.navigate("index.html");
		}
	};

}(Demo));