'use strict';

var pid = require('./index.js');
var test = require('tape');


test('pid()', function(t){
  t.throws(pid.bind(null, null), 'non-string pid is not valid');
  t.throws(pid.bind(null, ''), 'empty string is not valid');
  t.throws(pid.bind(null, 'b062mazcw'), 'valid except it contains a vowel');

  t.deepEqual(pid('b062mzcw'), {
    crid: 'crid://bbc.co.uk/programmes/b062mzcw',
    iplayer: 'http://www.bbc.co.uk/iplayer/episodes/b062mzcw.json',
    programme: 'http://www.bbc.co.uk/programmes/b062mzcw.json',
    tag: 'bbc:programme=b062mzcw'
  });

  t.end();
});

test('pid.isValid', function(t){
  t.equal(pid.isValid(null), false, 'non-string pid is not valid');

  // strings but not pids
  t.equal(pid.isValid(''), false, 'empty string is not valid');
  t.equal(pid.isValid('thedoctor'), false, 'string breaks the spec');
  t.equal(pid.isValid('b062mazcw'), false, 'valid except it contains a vowel');

  // regular pid
  t.equal(pid.isValid('b062mzcw'), true, 'Red Bee PID');
  t.equal(pid.isValid('p009y95q'), true, 'PIPs PID');
  t.equal(pid.isValid('s009y95q'), true, 'special PID');

  // world service
  t.equal(pid.isValid('wcr5dr3dnl3'), true, 'world service');

  t.end();
});
