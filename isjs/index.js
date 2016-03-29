var is = {
    
    number: require('./IsNumber.js'),
    
    string: require('./IsString.js'),
    
    object: require('./IsObject.js'),
    
    array: require('./IsArray.js'),
    
    any: require('./IsAny.js'),
    
    boolean: require('./IsBoolean.js'),
    
    undefined: require('./IsUndefined.js'),
    
    function: require('./IsFunction.js')
    
};

module.exports = is;