function bindArgs(f, args) {
    return function () {
        f.apply(this, args.concat(Array.prototype.slice.call(arguments)));
    }
}

module.exports = bindArgs;