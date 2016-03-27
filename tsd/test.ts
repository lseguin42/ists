/// <reference path="./IsJS.d.ts" />

is.string.length.equal(4).or.equal("hello").or.length.in.range(6, 10).or.match(/^A/)

is.string.equal("miaou")("yug")

is.number.inf(-8).or.in.list(5, 85, 14, 2)

is.string.match(/^hello/).and.length.equal(7)

is.number.equal(4).or.equal(10)

is.string.in.list("hello", "miaou")

is.string.out.list("miaou", "hello world")

var rules = is.string.out.list("miaou", "haha").and.out.list("toto", "fzfezf", "fezfzef")
                .or(is.number.in.list(8, 684, 97).or.out.list(98, 8, 15))

if (rules("miaou")) {
    console.log("TRUE");
} else {
    console.log("FALSE");
}