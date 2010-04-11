(Demo.Routes = function($, jQuery){

	var _history = [],
		_routes = {

			"index.html": function(){

				$.Routes.clearHistory();

			},

			"persistence.html": function(){

				jQuery("#persistenceSaveButton").mousedown(function() {
					$.Persistence.save(jQuery("#persistenceKey")[0].value, jQuery("#persistenceValue")[0].value);
					jQuery("#persistenceResult").removeClass("irrelevant");
				});

				jQuery("#persistenceDeleteButton").mousedown(function() {
					$.Persistence.remove(jQuery("#persistenceKey")[0].value);
					jQuery("#persistenceResult").removeClass("irrelevant");
				});

			}
		};

	return {

		load: function(view){

			return _routes[view] || null;

		},

		clearHistory: function (){
			_history = [];
		},

		// TODO: add other callback in case callee wants to pass a custom callback not in Routes.
		navigate: function (view, params){

			try{

				if(!view){

                    // if im going back I need to remove myself first
					_history.pop();

					var lastView = _history.pop();

					view = (lastView && lastView[0]) || "index.html";
					params = (lastView && lastView[2]) || null;

				}
				
				var xhr = new XMLHttpRequest(),
					callback;

				xhr.onreadystatechange = function (){

					if(this.readyState === 4){
						
						try{

							$.UI.loadView(this.responseText);

							callback = $.Routes.load(view);

							if (callback){
								callback.apply(null, params);
							}

							$.Routes.historyChanged(view, callback, params);
							
						}
						catch (e){
							$.Exception.handle(e);
						}

					}

				};

				xhr.open("GET", "html/" + view);

				xhr.send(null);
			}
			catch (e){
				$.Exception.handle(e);
			}

		},
		
		historyChanged: function(view, callback, params){
			_history.push([view, callback, params]);
		}

	};

}(Demo, $));