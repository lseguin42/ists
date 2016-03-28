var inherit = require('./tools/inherit.js');

function IsFunctionLinker() {
    var self = this;

    return self;
}

function IsFunction(value, next) {
    if (!(typeof value === 'function'))
        return false;
    return next ? next(value) : true;
}
IsFunctionLinker.call(IsFunction);
IsFunctionLinker.__type__ = IsFunction;
IsFunction.linker = IsFunctionLinker;

module.exports = IsFunction