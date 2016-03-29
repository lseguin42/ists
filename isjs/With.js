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
    
    return self;
}

module.exports = WithLinker;