var _ = require('lodash');
var is = require('./isjs');

function A() {}

var rules = [
    
    is.number.equal(6),
    
    is.number.inf(-5).or.sup(50),
    
    is.string,
    
    is.string.len.not.inf(6).or.match(/^m/),
    
    is.number.in.list(67, 34, 21, 43).and.not.in.list(15, 85, 21, 78, 43)
      .or(is.string.len.in.list(2, 4, 10).and.len.in.range(0, 5)),
    
    is.object.with.properties({
        a: is.object.instanceOf(A),
        b: is.string.match(/^[A-Z]/).or(is.undefined) // property 'b' is optional
    }).or(is.string.len.inf(5)),
    
    is.array.each(is.number).or.each(is.string.match(/^m/))

];

var exemples = [
    [ 5, 1, 0, -1, -2 ],
    [ "maa", "mbb", "mcc" ],
    { a: new A(), b: "Aaaa" },
    { a: new A(), b: "bbbb" },
    { a: new A() },
    { a: null, b: "Aaaa" },
    "natoo",
    "miaou",
    "fuckit",
    "haha",
    313,
    67,
    34,
    "AZER",
    6,
    21,
    43,
    -1,
    -9,
    "Nuloss",
    "norbert",
    "aa",
    "BcD"
];



var max = 0;
var table = [];
_.forEach(exemples, function(e) {
    var name = e + "";
    var raw = [name];
    max = (name.length > max ? name.length : max);
    
    // rules
    _.forEach(rules, function (f) {
        raw.push(f(e));
    });
   
    table.push(raw);
});
_.forEach(table, function (raw) {
    var name = raw[0];
    var line = " " + name;
    for (var i = 0; i < (max - name.length) + 1; i++)
        line += " ";
    for (var i = 1; i < raw.length; i++)
        line += "[" + (raw[i] ? 'x' : ' ') + "]     ";
    console.log(line);
});

/** **************************************************************** *
 *  TEST         [0]     [1]     [2]     [3]     [4]     [5]     [6] *
 * _________________________________________________________________ *
 5,1,0,-1,-2     [ ]     [ ]     [ ]     [ ]     [ ]     [ ]     [x]
 maa,mbb,mcc     [ ]     [ ]     [ ]     [ ]     [ ]     [ ]     [x]
 [object Object] [ ]     [ ]     [ ]     [ ]     [ ]     [x]     [ ]
 [object Object] [ ]     [ ]     [ ]     [ ]     [ ]     [ ]     [ ]
 [object Object] [ ]     [ ]     [ ]     [ ]     [ ]     [x]     [ ]
 [object Object] [ ]     [ ]     [ ]     [ ]     [ ]     [ ]     [ ]
 natoo           [ ]     [ ]     [x]     [ ]     [ ]     [ ]     [ ]
 miaou           [ ]     [ ]     [x]     [x]     [ ]     [ ]     [ ]
 fuckit          [ ]     [ ]     [x]     [x]     [ ]     [ ]     [ ]
 haha            [ ]     [ ]     [x]     [ ]     [x]     [x]     [ ]
 313             [ ]     [x]     [ ]     [ ]     [ ]     [ ]     [ ]
 67              [ ]     [x]     [ ]     [ ]     [x]     [ ]     [ ]
 34              [ ]     [ ]     [ ]     [ ]     [x]     [ ]     [ ]
 AZER            [ ]     [ ]     [x]     [ ]     [x]     [x]     [ ]
 6               [x]     [ ]     [ ]     [ ]     [ ]     [ ]     [ ]
 21              [ ]     [ ]     [ ]     [ ]     [ ]     [ ]     [ ]
 43              [ ]     [ ]     [ ]     [ ]     [ ]     [ ]     [ ]
 -1              [ ]     [ ]     [ ]     [ ]     [ ]     [ ]     [ ]
 -9              [ ]     [x]     [ ]     [ ]     [ ]     [ ]     [ ]
 Nuloss          [ ]     [ ]     [x]     [x]     [ ]     [ ]     [ ]
 norbert         [ ]     [ ]     [x]     [x]     [ ]     [ ]     [ ]
 aa              [ ]     [ ]     [x]     [ ]     [x]     [x]     [ ]
 BcD             [ ]     [ ]     [x]     [ ]     [ ]     [x]     [ ]
 */