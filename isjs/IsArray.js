var inherit = require('./tools/inherit.js');
var Rules = require('./Rules.js');
var IsNumberLinker = require('./IsNumber.js').linker;
var NotLinker = require('./Not.js');

function IsArrayLinker() {
    var self = this;

    self.len = function (value, next) {
        return self(value, function (value) {
            return next(value.length);
        })
    }
    
    self.each = function (rules, options) {
        if (!options)
            options = {};
        if (!options.end)
            options.end = 0;
        if (!options.start)
            options.start = 0;
        return Rules.call(self, IsArrayLinker, function (value) {
            var max = ((value.length + (options.end - 1)) % value.length) + 1
            var min = (options.start < 0 ? max + options.start : options.start);
            for (var i = min; i < max; i++) {
                if (!rules(value[i]))
                    return false;
            }
            return true;
        });
    }
    
    IsNumberLinker.call(self.len, IsArrayLinker);
    NotLinker.call(self, IsArrayLinker);

    return self;
}

function IsArray(value, next) {
    if (!(typeof value === 'object' && value instanceof Array))
        return false;
    return next ? next(value) : true;
}
IsArrayLinker.call(IsArray);
IsArrayLinker.__type__ = IsArray;
IsArray.linker = IsArrayLinker;

module.exports = IsArray;