var tagx = require('..')

var tags = tagx("foo bar zoo")
console.log(tags)

tags = tagx("a b c","d e f")
console.log(tags)


var uncase = tagx({case:false})
tags = uncase("a A bb bB BB")
console.log(tags)


var abc = tagx({},'a b c')
tags = abc("x y z")
console.log(tags)


tags = tagx("a  b !b  !c c")
console.log(tags)


var expand = tagx({expand:{ foo:'a b c !d', u:'v', v:'u' }})
tags = expand("foo !c d e f u")
console.log(tags)
