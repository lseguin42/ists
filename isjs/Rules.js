function Rules(linker, validator) {
    var self = this;
    
    var rules = function (value) {
        return self(value, function (_value) {
            return validator(_value);
        });
    }
    
    rules.or = function (valueOrRules, next) {
        if (typeof next === 'function') {
            return rules(valueOrRules) || (linker.__type__(valueOrRules) && next(valueOrRules));
        }
        return Rules.call(function (value, next) {
            return rules(value) || next(value);
        }, null, valueOrRules);
    }
    
    if (linker)
        linker.call(rules.or);
    
    rules.and = function (valueOrRules, next) {
        if (typeof next === 'function') {
            return rules(valueOrRules) && next(valueOrRules);
        }
        return Rules.call(rules.and, null, valueOrRules);
    }
    
    if (linker)
        linker.call(rules.and);
    
    return rules;
}

module.exports = Rules;