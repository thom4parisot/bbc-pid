# bbc-pid [![Build Status](https://travis-ci.org/oncletom/bbc-pid.svg?branch=master)](https://travis-ci.org/oncletom/bbc-pid)

> Simple JavaScript API to validate Programme Identifier (PID) syntax and to compute BBC URLs.

BBC Programmes Identifiers 0.4 spec defines a PID as following:

> Characters: digits 0-9 and lower case letters, less vowels.
> 
> Length: Minimum 8 digits. No defined maximum – they will grow as necessary.
> 
> For historical reasons there are some 15 character pids existing for World Service content.

# Install

```bash
npm i --save bbc-pid
```

# Use

```js
var pid = require('bbc-pid');
var request = require('superagent');

request.get(pid('b062mzcw').programme).end(function(err, res){
  console.log(res.body.programme.short_synopsis);
});
```


# API

## `pid(pid)`

Returns programmatic URLs for a given PID. Expect a `301` redirect from the `iplayer` URL and a `404` if the PID does not match any programme at all.

```js
pid('p01l1z04')
// {
//  programme: "http://www.bbc.co.uk/programmes/b062mzcw.json",
//  iplayer: "http://www.bbc.co.uk/iplayer/episode/b062mzcw.json",
//  crid: "crid://bbc.co.uk/programmes/b062mzcw",
//  tag: "bbc:programme=b062mzcw"
// }

pid('thedoctor')
// Error: invalid pid
//  at script.js:xx
//  
```


## `pid.isValid(pid)`

The underlying method used in `pid()` to validate if a given string is PID compliant.

```js
pid.isValid('p01l1z04');
// -> true

pid.isValid('thedoctor');
// -> false
```




