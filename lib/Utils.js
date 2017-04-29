// tinyHippos is the global object used to encapsulate all of our helper libraries.
// Feel free to change this object to whatever best suits your project
if (!tinyHippos) {
    var tinyHippos = {};
}

(tinyHippos.Utils = (() => ({
    validateNumberOfArguments(lowerBound, upperBound, numberOfArguments) {

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

    validateArgumentType(arg, argType) {
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

    validateMultipleArgumentTypes(argArray, argTypeArray) {
        for (var i = 0; i < argArray.length; i+=1){
            this.validateArgumentType(argArray[i], argTypeArray[i]);
        }
    },

    map(obj, func, scope) {
        var i;
        var returnVal = null;
        var result = [];

        if (obj instanceof Array) {
            return obj.map(func, scope);
        }
        else {
            for (i in obj) {
                if (obj.hasOwnProperty(i)) {
                    returnVal = func.apply(scope, [obj[i], i]);
                    result.push(returnVal);
                }
            }
        }

        return result;
    },

    reduce(obj, func, init, scope) {
        var i;
        var initial = init === undefined ? 0 : init;
        var result = initial;


        if (obj instanceof Array) {
            return obj.reduce(func, initial);
        }
        else {
            for (i in obj) {
                if (obj.hasOwnProperty(i)) {
                    result = func.apply(scope, [result, obj[i], i]);
                }
            }
        }

        return result;
    },

    sum(obj, selector, scope) {
        var values = $.Utils.map(obj, selector, scope);
        return $.Utils.reduce(values, (total, value) => total + value);
    },

    max(obj, selector, scope) {
        var values = $.Utils.map(obj, selector, scope);
        return $.Utils.reduce(values, (max, value) => max < value ? value : max, Number.MIN_VALUE);
    },

    min(obj, selector, scope) {
        var values = $.Utils.map(obj, selector, scope);
        return $.Utils.reduce(values, (min, value) => min > value ? value : min, Number.MAX_VALUE);
    },

    forEach(obj, action, scope) {
        $.Utils.map(obj, action, scope);
    },

    isAny(obj, predicate, scope) {
        var values = $.Utils.map(obj, predicate, scope);
        return $.Utils.reduce(values, (isAny, value) => value ? value : isAny, false);
    }
}))());
