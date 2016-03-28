var Rules = require('./Rules.js');
var inherit = require('./tools/inherit.js');

function IsBooleanLinker() {
    var self = this;
    
    self.equal = function (bool) {
        return Rules.call(self, IsBooleanLinker, function (value) {
            return value === bool;
        });
    }
    
    return self;
}

function IsBoolean(value, next) {
    if (!(typeof value === 'boolean'))
        return false;
    return next ? next(value) : true;
}
inherit(IsBoolean, IsBooleanLinker);

module.exports = IsBoolean;