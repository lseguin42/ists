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
    
    /*
    is.object.with.properties({
        attr: is.string.match(/^[A-Z]/).or(is.undefined), // is optional
        name: is.string.match(/^[A-Za-z]{3,10}$/),
        obj: is.object.instanceOf(A)
    })
    */
];

var exemples = [ "natoo", "miaou", "fuckit", "haha", 313, 67, 34, "AZER", 6, 21, 43, -1, -9, "Nuloss", "norbert", "aa", "BcD" ];

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

/** ********************************************** *
 *  TEST    [0]     [1]     [2]     [3]     [4]    *
 * _______________________________________________ *
 *  natoo   [ ]     [ ]     [x]     [ ]     [ ]
 *  miaou   [ ]     [ ]     [x]     [x]     [ ]
 *  fuckit  [ ]     [ ]     [x]     [x]     [ ]
 *  haha    [ ]     [ ]     [x]     [ ]     [x]
 *  313     [ ]     [x]     [ ]     [ ]     [ ]
 *  67      [ ]     [x]     [ ]     [ ]     [x]
 *  34      [ ]     [ ]     [ ]     [ ]     [x]
 *  AZER    [ ]     [ ]     [x]     [ ]     [x]
 *  6       [x]     [ ]     [ ]     [ ]     [ ]
 *  21      [ ]     [ ]     [ ]     [ ]     [ ]
 *  43      [ ]     [ ]     [ ]     [ ]     [ ]
 *  -1      [ ]     [ ]     [ ]     [ ]     [ ]
 *  -9      [ ]     [x]     [ ]     [ ]     [ ]
 *  Nuloss  [ ]     [ ]     [x]     [x]     [ ]
 *  norbert [ ]     [ ]     [x]     [x]     [ ]
 *  aa      [ ]     [ ]     [x]     [ ]     [x]
 *  BcD     [ ]     [ ]     [x]     [ ]     [ ]
 */