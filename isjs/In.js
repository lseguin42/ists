var Rules = require('./Rules.js');

function linkerDefault(linker) {
    var self = this;
    
    self.array = function (tab) {
        return Rules.call(self, linker, function (value) {
            //console.log('CALLED ?');
            for (var i = 0; i < tab.length; i++) {
                if (value === tab[i])
                    return true;
            }
            return false;
        });
    }
    
    self.list = function () {
        var tab = Array.prototype.slice.call(arguments);
        return Rules.call(self, linker, function (value) {
            //console.log('CALLED ?');
            for (var i = 0; i < tab.length; i++) {
                if (value === tab[i])
                    return true;
            }
            return false;
        });
    }
    
    return self;
}

function linkerExtends(linker) {
    var self = linkerDefault.call(this, linker);
    
    self.range = function (min, max) {
        return Rules.call(self, linker, function (value) {
           // console.log('CALLED ?');
            return value >= min && value <= max;
        });
    }
    
    return self;
}

function generic(linkerContainer, linker) {
    var self = this;
    self.in = function (value, next) {
        return self(value, next);
    }
    linkerContainer.call(self.in, linker);
    return self;
}

function InLinker(linker) {
    return generic.call(this, linkerDefault, linker);
}

InLinker.extends = function (linker) {
    return generic.call(this, linkerExtends, linker);
}

module.exports = InLinker;