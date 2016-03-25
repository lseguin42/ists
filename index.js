function IsNumber() {
    
}


function IsString(v) {
    if (typeof v === "string")
        return true;
    return false;
}


function Rules(f) {
    
    f.or = function (rules) {
        var parent = this;
        var rules = function (v) {
            return parent(v) || rules(v);
        }
        bindRules(rules);
        return rules;
    }
    
    f.and = function (rules) {
        var parent = this;
        var rules = function (v) {
            return parent(v) && rules(v);
        }
        bindRules(rules);
        return rules;
    }
    
}

Rules.prototype.or = function (rules) {
    
}

Rules.prototype.and = function (rules) {
    
}


function StringRules() {
    
}

function NumberRules() {
    
}

function ObjectRules() {
    
}

function ArrayRules() {
    
}

IsString.equalsTo = function (p) {
    var parent = this;
    var rules = function (v) {
        return (parent(v) && p === v);
    }
    bindRules(rules);
    rules.or.equalsTo = function (p) {
        var rules = function (v) {
            return ();
        } 
    };
    return rules;
}

IsString.length = IsNumber


// complexParamChecker

kuu.is.string.length.equalsTo(5)

check.is.string.length.in.interval(5, 8).or.equalsTo(10)

var rulesLengthString = check.is.string.length.in.list(3, 8, 12, 90)

var rulesMatching = check.is.string.match(/^hel/).or.equalsTo("mia")

var rulesNumber5 = check.is.number.equalsTo(5)

var rules = rulesLengthString
            .and(rulesMatching)
            .or(rulesNumber5)

rules("my string") // false






rules = check.is.number.in.interval(5, 7).or.equalsTo(9)
        .or(check.is.string.match(/^hello.?$/).or.equalsTo("miaou"))
        .or(check.is.object.exactly({
            'value': check.is.number.infTo(6),
            'attr': check.is.string.equalsTo("hello"),
            'data': check.is.string,
            'callback': check.is.func,
            'customRules': function (value) {
                return true; // or Promise
            }
        }))
        .or(check.is.array.exactly([
            check.is.number,
            check.is.string,
            check.is.string.match(/^fuckoff*$/)
        ]))

rules("hello").then(function (resolveInfo) {
    resolveInfo // 
})


rules(8) // false
rules(7) // true