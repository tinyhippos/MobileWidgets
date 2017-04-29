var nameSpace = nameSpace || {};

(nameSpace.BatteryLevel = (() => {
    // private properties/methods
    var lastState;

    var batteryContainerNode;
    var batteryChargeLevelNode;
    var batteryChargeTextNode;
    var CHARGING = "charging";
    var FULL = "full";
    var DISCHARGING = "discharging";
    var setIntervalId;
    var animationLevel = 0;

    function updateChargeLevel(percentRemaining) {
        // set height in % on div
        var currentPower = percentRemaining || Widget.Device.PowerInfo.percentRemaining;

        var color = percentRemaining <= 10 ? "#FF0000" : "#00FF00";

        batteryChargeLevelNode.setAttribute("style", "background-color: " + color + "; height: " + currentPower + "%;");
        batteryChargeTextNode.setAttribute("style", "color: " + color + ";");
    }

    function animateChargeLevel() {
		var modulus = animationLevel % 20;
		updateChargeLevel(animationLevel);
		if(animationLevel >= 100) {
			animationLevel = 0;
		}
		animationLevel += (modulus === 0 ? 20 : 20 - modulus);
	}

    function switchState(state) {
		try{
			var currentPower = Widget.Device.PowerInfo.percentRemaining;

			if(!state) {
				state = Widget.Device.PowerInfo.isCharging ? CHARGING : DISCHARGING;
				state = currentPower === 100 ? FULL : state;
			}

			batteryChargeTextNode.innerText = state;
			
			switch (state)
			{
				case CHARGING:

					// do charging thing
					if(lastState !== CHARGING) {
						animationLevel = currentPower;
						setIntervalId = window.setInterval(animateChargeLevel, 500); 
					}
					
				break;
				
				case DISCHARGING:
				
					// if last state was charging, then end interval
					if(lastState === CHARGING || lastState === FULL) {
						window.clearInterval(setIntervalId);
					}

					updateChargeLevel(currentPower);
					
				break;
				
				case FULL:
				default:
					if(currentPower) {
						updateChargeLevel(currentPower);
					}
			}

			lastState = state;
			
		}
		catch (e){
			nameSpace.Helpers.handleException(e);
		}
	}

    function initialize() {

		// register for whevenever the charge level changes
		Widget.Device.PowerInfo.onChargeLevelChange = updateChargeLevel;

		// register for whenever the state changes ("full", "charging", "discharging")
		Widget.Device.PowerInfo.onChargeStateChange = switchState;

		// Store our the nodes we deal with in closure
		batteryContainerNode = document.getElementById('battery-container');
		batteryChargeLevelNode = document.getElementById('battery-level');
		batteryChargeTextNode = document.getElementById('battery-charge-text');

		// intialize battery control
		switchState();

		// We dont use this since the property is polled in switchState
		//Widget.Device.PowerInfo.onLowBattery = function(percentRemaining) { }
	}

    // register for window loaded
    window.addEventListener("load", () => {
		try{
			initialize();
		}
		catch (e){
			nameSpace.Helpers.handleException(e);
		}
	}, false);

    // public properties/methods
    return {};
})());