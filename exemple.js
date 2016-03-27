var _ = require('lodash');
var is = require('./isjs');


var _1 = is.number.equal(6);

var _2 = is.number.inf(-5).or.sup(50);

var _3 = is.number.not.in.range(5, 50).or(is.string);

var _4 = is.number.in.list(67, 34, 21, 43).and.not.in.list(15, 85, 21, 78, 43)
               .or(is.string.in.list("hello", "miaou", "toto").or.match(/^n/))



var exemples = [
    "natoo",
    "miaou",
    "fuckit",
    "haaha",
    313,
    67,
    34,
    6,
    21,
    43,
    -1,
    -9,
    "Nuloss",
    "norbert"
];

var d = function (b) {
    return b ? 'x' : ' ';
}

_.forEach(exemples, function(e) {
    console.log(e + "\t[" + d(_1(e)) + "]\t[" + d(_2(e)) + "]\t[" + d(_3(e)) + "]\t[" + d(_4(e)) + "]");
})

