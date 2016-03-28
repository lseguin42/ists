function NotLinker(linker, linkerArgs) {
    var self = this;
    
    if (typeof self._isNotContext === "undefined") {
        self.not = function (value, next) {
            return self(value, function (_value) {
                return !next(_value);
            });
        }
        self.not._isNotContext = true;
        linker.apply(self.not, linkerArgs);
    }
    else
        delete self['_isNotContext'];
}

module.exports = NotLinker;