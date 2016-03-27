function Rules(linker, validator) {
    var self = this;
    var requireCheckType = true;
    
    var rules = function (value) {
        return self(value, function () {
            return validator(value);
        });
    }
    
    rules.or = function (valueOrRules, next) {
        if (typeof next === 'function') {
            return rules(valueOrRules) || (linker.__type__(valueOrRules) && next());
        }
        requireCheckType = false;
        return Rules.call(function (value, next) {
            return rules(value) || next();
        }, null, valueOrRules);
    }
    
    if (linker)
        linker.call(rules.or);
    
    rules.and = function (valueOrRules, next) {
        if (typeof next === 'function') {
            return rules(valueOrRules) && next();
        }
        return Rules.call(rules.and, null, valueOrRules);
    }
    
    if (linker)
        linker.call(rules.and);
    
    return rules;
}

module.exports = Rules;