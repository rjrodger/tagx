# tagx

## A tag composer module for Node.js

This module lets you build a set of tags by combining and expanding existing lists of tags. Tags are character strings that don't contain any punctuation or spaces. The tags are parsed out of a comma or space separated line of text, and duplicates are removed. 

For example:

    "foo, bar, zoo" -> ['foo','bar','zoo']
    "foo bar zoo" -> ['foo','bar','zoo']


## Support

If you're using this module, feel free to contact me on twitter if you
have any questions! :) [@rjrodger](http://twitter.com/rjrodger)

This module works on both Node.js and browsers.


Current Version: 0.1.2

Tested on: Node.js 0.10.29, Chrome 29, Firefox 23, Safari 5.1, Opera 12.11

[![Build Status](https://travis-ci.org/rjrodger/tagx.png?branch=master)](https://travis-ci.org/rjrodger/tagx)



## Quick examples

To parse a string containing tags:

```JavaScript
var tagx = require('tagx')

var tags = tagx("foo bar zoo")

// prints [ 'foo', 'bar', 'zoo' ]
console.log(tags)  
```


You can combine multiple tag strings:

```JavaScript
var tagx = require('tagx')

tags = tagx("a b c","d e f")

// prints [ 'a', 'b', 'c', 'd', 'e', 'f' ]
console.log(tags)  
```


You can make tags case-insensitive:

```JavaScript
var uncase = tagx({case:false})
tags = uncase("a A bb bB BB")

// prints [ 'a', 'bb' ]
console.log(tags)
```


You can define fixed tags that get added to any parsed tags:

```JavaScript
var abc = tagx({},'a b c')
tags = abc("x y z")

// prints [ 'a', 'b', 'c', 'x', 'y', 'z' ]
console.log(tags)
```


You can define negative tags (prefix with <code>!</code>) that cancel out positive tags:

```JavaScript
tags = tagx("a  b !b  !c c")

// prints [ 'a' ]
console.log(tags)
```

You can also define tag expansions, where certain tags expand to
become a set of tags (negatives still work, and infinite cycles are
detected):

```JavaScript
var expand = tagx({expand:{ foo:'a b c !d', u:'v', v:'u' }})
tags = expand("foo !c d e f u")

// prints [ 'a', 'b', 'e', 'f', 'u' ]
// foo -> a,b as !c and d cancel c !d
// u -> v -> u and stops
console.log(tags)
```



<!--
## Example

The [seneca-data-editor](http://github.com/rjrodger/seneca-data-editor)
module uses tags combinations to customize a user interface for different classes
of user.
-->     




# Development

You'll need:

```bash
sudo npm install phantomjs uglify-js -g
```

Test with:

```bash
npm test
```
