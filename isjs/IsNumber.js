var Rules = require('./Rules.js');
var NotLinker = require('./Not.js');
var InLinker = require('./In.js').extends;

function IsNumberLinker() {
    var self = this;
    
    self.equal = function (cmp) {
        return Rules.call(self, IsNumberLinker, function (value) {
            return value === cmp;
        });
    }

    self.inf = function (cmp) {
        return Rules.call(self, IsNumberLinker, function (value) {
            return value < cmp;
        });
    }

    self.sup = function (cmp) {
        return Rules.call(self, IsNumberLinker, function (value) {
            return value > cmp;
        });
    }
    
    NotLinker.call(self, IsNumberLinker);
    InLinker.call(self, IsNumberLinker);
    
    return self;
}

function IsNumber(value, next) {
    if (typeof next === 'function')
        return typeof value === 'number' && next();
    return typeof value === 'number';
}
IsNumberLinker.call(IsNumber);
IsNumberLinker.__type__ = IsNumber;

module.exports = IsNumber;