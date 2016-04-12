module.exports = function (IsClass, Linker) {
    Linker.call(IsClass);
    Linker.__type__ = IsClass;
    IsClass.linker = Linker;
}