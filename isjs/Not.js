function NotLinker(linker) {
    var self = this;
    
    if (typeof self._isNotContext === "undefined") {
        self.not = function (value, next) {
            return self(value, function () {
                return !next();
            });
        }
        self.not._isNotContext = true;
        linker.call(self.not);
    }
    else
        delete self['_isNotContext'];
}

module.exports = NotLinker;