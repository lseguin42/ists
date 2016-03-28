var Rules = require('./Rules.js');
var NotLinker = require('./Not.js');
var InLinker = require('./In.js').extends;

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
    
    NotLinker.call(self, IsNumberLinker, [ParentLinker]);
    InLinker.call(self, linker);
    
    return self;
}

function IsNumber(value, next) {
    if (typeof next === 'function')
        return typeof value === 'number' && next(value);
    return typeof value === 'number';
}
IsNumberLinker.call(IsNumber);
IsNumberLinker.__type__ = IsNumber;
IsNumber.linker = IsNumberLinker;

module.exports = IsNumber;