var Rules = require('./Rules.js');
var NotLinker = require('./Not.js');
var InLinker = require('./In.js');
var IsNumberLinker = require('./IsNumber.js').linker;

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
    
    self.len = function (value, next) {
        return self(value, function (value) {
            return next(value.length);
        })
    }
    
    IsNumberLinker.call(self.len, IsStringLinker);
    NotLinker.call(self, IsStringLinker);
    InLinker.call(self, IsStringLinker);
    
    return self;
}

function IsString(value, next) {
    if (typeof next === 'function')
        return typeof value === 'string' && next(value);
    return typeof value === 'string';
}
IsStringLinker.call(IsString);
IsStringLinker.__type__ = IsString;
IsString.linker = IsStringLinker;

module.exports = IsString;