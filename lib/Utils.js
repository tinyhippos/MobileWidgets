// tinyHippos is the global object used to encapsulate all of our helper libraries.
// Feel free to change this object to whatever best suits your project
if (!tinyHippos) {
	var tinyHippos = {};
}

(tinyHippos.Utils = function (){

	return {

		validateNumberOfArguments: function (lowerBound, upperBound, numberOfArguments){

			if (arguments.length < 3 || arguments.length > 3) {
				// Throwing a generic exception here. Please modify this to better fit with
				// whatever exception management you are using
				throw {
					type: "ArgumentLengthException",
					message: "Wrong number of arguments when calling: tinyHippos.Utils.validateNumberOfArguments()"
				}
			}

			if (isNaN(lowerBound) && isNaN(upperBound) && isNaN(numberOfArguments)) {
				// Throwing a generic exception here. Please modify this to better fit with
				// whatever exception management you are using
				throw {
					type: "ArgumentTypeException",
					message: "Arguments were expected to be of type: number"
				}
			}

			lowerBound = parseInt(lowerBound, 10);
			upperBound = parseInt(upperBound, 10);
			numberOfArguments = parseInt(numberOfArguments, 10);

			if (numberOfArguments < lowerBound || numberOfArguments > upperBound) {
				// Throwing a generic exception here. Please modify this to better fit with
				// whatever exception management you are using
				throw {
					type: "ArgumentLengthException",
					message: "Wrong number of arguments"
				}
			}

		},
        
		validateArgumentType: function (arg, argType){
			var invalidArg = false;
			switch (argType) {
				case "array":
					if (!arg instanceof Array){ invalidArg = true; }
				break;
				case "date":
					if (!arg instanceof Date){ invalidArg = true; }
				break;
				default:
					if (typeof arg !== argType){ invalidArg = true; }
				break;
			}
			if(invalidArg) {
				// Throwing a generic exception here. Please modify this to better fit with
				// whatever exception management you are using
				throw {
					type: "ArgumentTypeException",
					message: "Invalid Argument type. argument: " + arg + " ==> was expected to be of type: " + argType
				}
			}
		},

		validateMultipleArgumentTypes: function (argArray, argTypeArray){
			for (var i = 0; i < argArray.length; i+=1){
				this.validateArgumentType(argArray[i], argTypeArray[i]);
			}
		}
	};
    
}());