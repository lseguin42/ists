var inherit = require('./tools/inherit.js');

function IsUndefinedLinker() {
    var self = this;
    return self;
}

function IsUndefined(value, next) {
    if (!(typeof value === 'undefined'))
        return false;
    return next ? next(value) : true;
}
inherit(IsUndefined, IsUndefinedLinker);

module.exports = IsUndefined;