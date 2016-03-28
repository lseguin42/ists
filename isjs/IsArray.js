var inherit = require('./tools/inherit.js');

function IsArrayLinker() {
    var self = this;

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