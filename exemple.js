var _ = require('lodash');
var is = require('./isjs');

var rules = is.number.in.list(67, 34, 21, 43).and.not.in.list(15, 85, 21, 78, 43)
               .or(is.string.in.list("hello", "miaou", "toto").or.match(/^n/))

var exemples = [
    "natoo",
    "miaou",
    "fuckit",
    "haaha",
    313,
    67,
    34,
    21,
    43,
    "Nuloss",
    "norbert"
];

_.forEach(exemples, function(elem) {
    console.log(elem + "\t[" + rules(elem) + "]");
})

