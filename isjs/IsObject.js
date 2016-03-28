var inherit = require('./tools/inherit.js');
var Rules = require('./Rules.js');

function IsObjectLinker() {
    var self = this;

    self.instanceOf = function (type) {
        return Rules.call(self, IsObjectLinker, function (value) {
            return value instanceof type;
        });
    }

    return self;
}

function IsObject(value, next) {
    if (!(typeof value === 'object'))
        return false;
    return next ? next(value) : true;
}
inherit(IsObject, IsObjectLinker);

module.exports = IsObject;