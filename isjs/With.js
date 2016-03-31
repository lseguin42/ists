var Rules = require('./Rules.js');

function WithLinker(linker) {
    var self = this;
    
    self.with = {};
    
    self.with.properties = function (cmpObject) {
        return Rules.call(self, linker, function (object) {
            for (attr in cmpObject) {
                if (!cmpObject[attr](object[attr]))
                    return false;
            }
            return true;
        });
    }
    
    self.with.property = function (name, rule) {
        return Rules.call(self, linker, function (object) {
            if (!rule && typeof object[name] !== 'undefined')
                return true;
            else if (rule)
                return rule(object[name]);
            return false;
        });
    }
    
    return self;
}

module.exports = WithLinker;