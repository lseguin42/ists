function NotLinker(ParentLinker) {
    var self = this;
    
    Object.defineProperty(self, 'not', {
        get: function () {
            var not = function (value, next) {
                return self(value, function (_value) {
                    return !next(_value);
                });
            }
            ParentLinker.call(not)
            return not
        }
    })
}

module.exports = NotLinker;