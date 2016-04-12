var IsNumberLinker = require('./IsNumber.js').linker;

function LengthLinker(ParentLinker) {
    var self = this;
    
    Object.defineProperty(self, 'length', {
        get: function () {
            var length = function (value, next) {
                return self(value, function (value) {
                    return next(value.length);
                })
            }
            IsNumberLinker.call(length, ParentLinker);
            return length;
        }
    })
}

module.exports = LengthLinker