var _ = require('lodash');
var is = require('./isjs');

var rules = [
    
    is.number.equal(6),
    
    is.number.inf(-5).or.sup(50),
    
    is.number.not.in.range(5, 50).or(is.string),
    
    is.string.len.not.inf(6).or.match(/^m/),
    
    is.number.in.list(67, 34, 21, 43).and.not.in.list(15, 85, 21, 78, 43)
      .or(is.string.len.not.in.list(4, 7).or.equal("norbert"))
    
];

var exemples = [ "natoo", "miaou", "fuckit", "haha", 313, 67, 34, 6, 21, 43, -1, -9, "Nuloss", "norbert" ];

_.forEach(exemples, function(e) {
    process.stdout.write("" + e);
    _.forEach(rules, function (f) {
        if (f(e))
            process.stdout.write("\t[x]");
        else
            process.stdout.write("\t[ ]");
    });
    process.stdout.write("\n");
});

/**
natoo   [ ]     [ ]     [x]     [ ]     [x]
miaou   [ ]     [ ]     [x]     [x]     [x]
fuckit  [ ]     [ ]     [x]     [x]     [x]
haha    [ ]     [ ]     [x]     [ ]     [ ]
313     [ ]     [x]     [x]     [ ]     [ ]
67      [ ]     [x]     [x]     [ ]     [x]
34      [ ]     [ ]     [ ]     [ ]     [x]
6       [x]     [ ]     [ ]     [ ]     [ ]
21      [ ]     [ ]     [ ]     [ ]     [ ]
43      [ ]     [ ]     [ ]     [ ]     [ ]
-1      [ ]     [ ]     [x]     [ ]     [ ]
-9      [ ]     [x]     [x]     [ ]     [ ]
Nuloss  [ ]     [ ]     [x]     [x]     [x]
norbert [ ]     [ ]     [x]     [x]     [x]
 */