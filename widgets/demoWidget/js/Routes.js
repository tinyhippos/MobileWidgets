(Demo.Routes = function($, jQuery){

	var _history = [],
		_routes = {

			"index.html": function(){

				$.Routes.clearHistory();

				$.UI.setLeftNav()
					.setTitle("Demo")
					.setRightNav();

			},

			"platforms.html": function(){

				$.UI.setLeftNav("Back")
					.setRightNav("Home", "index.html");

			},

			"infopane.html": function(){

				$.UI.setLeftNav("Back")
					.setRightNav("Home", "index.html");

			},

			"config.html": function(){

				$.UI.setLeftNav("Back")
					.setRightNav("Home", "index.html");

			},

			"gps.html": function(){

				$.UI.setLeftNav("Back")
					.setRightNav("Home", "index.html");
					
				if (GBrowserIsCompatible()) {
					
					var map = new GMap2(document.getElementById("map_canvas"));

					map.setUIToDefault();

					// callback to update map info
					function updateMap(positionInfo){

						var point = new GLatLng(positionInfo.latitude, positionInfo.longitude);

						map.setCenter(point, 13);

						map.clearOverlays();

						map.addOverlay(new GMarker(point));

					}					

					// Register for JIL callback
					Widget.Device.DeviceStateInfo.onPositionRetrieved = updateMap;

					Widget.Device.DeviceStateInfo.requestPositionInfo("gps");

					jQuery("#refreshMapButton").bind("mousedown", function () {
						Widget.Device.DeviceStateInfo.requestPositionInfo("gps");
					});
					

				}

			},

			"persistence.html": function(){

				var saveMethod = function() {
						$.Persistence.save(jQuery("#persistenceKey")[0].value, jQuery("#persistenceValue")[0].value);
						jQuery("#persistenceResult").removeClass("irrelevant");
					},
					deleteMethod = function() {
						$.Persistence.remove(jQuery("#persistenceKey")[0].value);
						jQuery("#persistenceResult").removeClass("irrelevant");
					};

				$.UI.setLeftNav("Back")
					.setRightNav("Home", "index.html");
	
				jQuery("#persistenceSaveButton")
					.unbind("mousedown", saveMethod)
					.mousedown(saveMethod);

				jQuery("#persistenceDeleteButton")
					.unbind("mousedown", deleteMethod)
					.mousedown(deleteMethod);

			},

			"events.html": function() {

				function notifyEventWasCalled(eventName) {
					var eventDiv = jQuery("#eventResult"),
						eventResultDiv;

					if (eventDiv) {

						eventResultDiv = eventDiv.children("#eventResultInfo")
						eventDiv
							.show(0, function() {
								eventResultDiv.html("Widget." + eventName + " was fired and successfully captured!");
							})
							.delay(5000)
							.hide(0, function() {
								eventResultDiv.html("");
							});
					}

				}

				$.UI.setLeftNav("Back")
					.setRightNav("Home", "index.html");

				Widget.onMaximize = function() {
					notifyEventWasCalled("onMaximize");
				};
				
				Widget.onWakeup = function() {
					notifyEventWasCalled("onWakeup");
				};
				
				Widget.onFocus = function() {
					notifyEventWasCalled("onFocus");
				};
				
				Widget.onRestore = function() {
					notifyEventWasCalled("onRestore");
				};
				
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