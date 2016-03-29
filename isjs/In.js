var Rules = require('./Rules.js');

function InLinker(linker) {
    var self = this;
    
    self.in = {};
    
    self.in.array = function (tab) {
        return Rules.call(self, linker, function (value) {
            for (var i = 0; i < tab.length; i++) {
                if (value === tab[i])
                    return true;
            }
            return false;
        });
    }
    
    self.in.list = function () {
        var tab = Array.prototype.slice.call(arguments);
        return Rules.call(self, linker, function (value) {
            for (var i = 0; i < tab.length; i++) {
                if (value === tab[i])
                    return true;
            }
            return false;
        });
    }
    
    return self;
}

InLinker.extends = function (linker) {
    var self = InLinker.call(this, linker);
    
    self.in.range = function (min, max) {
        return Rules.call(self, linker, function (value) {
            return value >= min && value <= max;
        });
    }
    
    return self;
}

module.exports = InLinker;