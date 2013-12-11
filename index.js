'use strict';

var re = {
  'default': /^[b-df-hj-np-tv-z0-9]{8,}$/,
  'WorldService': /^[b-df-hj-np-tv-z0-9]{11,}$/
};

var strategiesMap = {
  b: re.default,
  p: re.default,
  s: re.default,
  w: re.WorldService
};

function PidObject(pid) {
  this.crid = 'crid://bbc.co.uk/programmes/' + pid;
  this.iplayer = 'http://www.bbc.co.uk/iplayer/episodes/' + pid + '.json';
  this.programme = 'http://www.bbc.co.uk/programmes/' + pid + '.json';
  this.tag = 'bbc:programme=' + pid;
}

// --- public API

function pid(pid) {
  if (!isValid(pid)) {
    throw new Error("Provided PID is invalid [" + pid + "].");
  }

  return new PidObject(pid);
}

function isValid(pid) {
  if (typeof pid !== 'string' || !pid) {
    return false;
  }

  var strategy = strategiesMap[ pid[0] ];

  return (strategy !== undefined) && (pid.search(strategy) !== -1);
}

pid.isValid = isValid;

module.exports = pid;