(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Animatior;

Animatior = (function() {
  function Animatior() {}

  Animatior.prototype.start = function() {
    var last, step;
    last = Date.now();
    step = (function(_this) {
      return function() {
        var delta, time;
        time = Date.now();
        delta = time - last;
        _this.step(time, delta);
        last = time;
      };
    })(this);
    this.timer = setInterval(step, 1000 / 30);
    return step();
  };

  Animatior.prototype.stop = function() {
    clearInterval(this.timer);
    return this.timer = null;
  };

  Animatior.prototype.step = function(time, delta) {};

  return Animatior;

})();

if (typeof module !== "undefined" && module !== null) {
  module.exports = Animatior;
}


},{}]},{},[1]);
