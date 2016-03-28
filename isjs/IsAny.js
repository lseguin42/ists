var inherit = require('./tools/inherit.js');

function IsAnyLinker() {
    var self = this;
    return self;
}

function IsAny(value, next) {
    return next ? next(value) : true;
}
inherit(IsAny, IsAnyLinker);

module.exports = IsAny;