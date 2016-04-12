var inherit = require('./tools/inherit.js');
var Rules = require('./Rules.js');
var IsNumberLinker = require('./IsNumber.js').linker;
var NotLinker = require('./Not.js');
var LengthLinker = require('./LengthLinker')

function IsArrayLinker() {
    var self = this;
    
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
    
    LengthLinker.call(self, IsArrayLinker);
    NotLinker.call(self, IsArrayLinker);

    return self;
}

function IsArray(value, next) {
    if (!(typeof value === 'object' && value instanceof Array))
        return false;
    return next ? next(value) : true;
}
inherit(IsArray, IsArrayLinker)

module.exports = IsArray;