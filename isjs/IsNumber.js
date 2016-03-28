var Rules = require('./Rules.js');
var NotLinker = require('./Not.js');
var InLinker = require('./In.js').extends;
var bindArgs = require('./tools/bindArgs.js');
var inherit = require('./tools/inherit.js');

function IsNumberLinker(ParentLinker) {
    var self = this;
    var linker = ParentLinker || IsNumberLinker;
    
    self.equal = function (cmp) {
        return Rules.call(self, linker, function (value) {
            return value === cmp;
        });
    }

    self.inf = function (cmp) {
        return Rules.call(self, linker, function (value) {
            return value < cmp;
        });
    }

    self.sup = function (cmp) {
        return Rules.call(self, linker, function (value) {
            return value > cmp;
        });
    }
    
    self.supeq = function (cmp) {
        return Rules.call(self, linker, function (value) {
            return value >= cmp;
        });
    }
    
    self.infeq = function (cmp) {
        return Rules.call(self, linker, function (value) {
            return value <= cmp;
        });
    }
    
    NotLinker.call(self, bindArgs(IsNumberLinker, [ParentLinker]));
    InLinker.call(self, linker);
    
    return self;
}

function IsNumber(value, next) {
    if (typeof next === 'function')
        return typeof value === 'number' && next(value);
    return typeof value === 'number';
}
inherit(IsNumber, IsNumberLinker);

module.exports = IsNumber;