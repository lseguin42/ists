var Rules = require('./Rules.js');

function defaultComparator(a, b) {
    return a - b;
}

function InLinker(linker, comparator) {
    var self = this;
    
    if (!comparator)
        comparator = defaultComparator;
    
    self.in = {};
    
    self.in.array = function (tab) {
        return Rules.call(self, linker, function (value) {
            for (var i = 0; i < tab.length; i++) {
                if (comparator(value, tab[i]) === 0)
                    return true;
            }
            return false;
        });
    }
    
    self.in.list = function () {
        var tab = Array.prototype.slice.call(arguments);
        return Rules.call(self, linker, function (value) {
            for (var i = 0; i < tab.length; i++) {
                if (comparator(value, tab[i]) === 0)
                    return true;
            }
            return false;
        });
    }
    
    return self;
}

InLinker.extends = function (linker, comparator) {
    var self = InLinker.apply(this, arguments);
    
    if (!comparator)
        comparator = defaultComparator;
    
    self.in.range = function (min, max) {
        return Rules.call(self, linker, function (value) {
            return comparator(value, min) >= 0 && comparator(value, max) < 0;
        });
    }
    
    return self;
}

module.exports = InLinker;