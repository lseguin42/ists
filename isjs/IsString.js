var Rules = require('./Rules.js');
var NotLinker = require('./Not.js');
var InLinker = require('./In.js');

function IsStringLinker() {
    var self = this;
    
    self.equal = function (cmp) {
        return Rules.call(self, IsStringLinker, function (value) {
            return value === cmp;
        });
    }
    
    self.match = function (regex) {
        return Rules.call(self, IsStringLinker, function (value) {
            return value.match(regex) !== null;
        });
    }
    
    NotLinker.call(self, IsStringLinker);
    InLinker.call(self, IsStringLinker);
    
    return self;
}

function IsString(value, next) {
    if (typeof next === 'function')
        return typeof value === 'string' && next();
    return typeof value === 'string';
}
IsStringLinker.call(IsString);
IsStringLinker.__type__ = IsString;

module.exports = IsString;