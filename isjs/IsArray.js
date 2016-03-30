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
        return Rules.call(self, IsArrayLinker, function (value) {
            var max = (!options.end ? value.length : (options.end < 0 ? value.length + options.end : options.end));
            var min = (typeof options.start === 'undefined' ? 0 : (options.start < 0 ? max + options.start : options.start));
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