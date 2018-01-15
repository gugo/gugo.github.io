(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var RoundProgress;

RoundProgress = (function() {
  function RoundProgress(rootEl) {
    this.rootEl = rootEl;
    this.progressCircle = this.rootEl.querySelector('circle.progress');
    this.setProgress(0.5);
  }

  RoundProgress.prototype.setProgress = function(progress, speed) {
    var perimeter, r;
    if (speed == null) {
      speed = 1000;
    }
    progress = Math.min(1, progress);
    progress = Math.max(0, progress);
    this.progress = progress;
    r = this.progressCircle.r.baseVal.value;
    perimeter = r * Math.PI * 2;
    this.progressCircle.style.strokeDasharray = perimeter;
    this.progressCircle.style.strokeDashoffset = perimeter * (1 - progress);
    return this.progressCircle.style.transitionDuration = speed + "ms";
  };

  return RoundProgress;

})();

if (typeof module !== "undefined" && module !== null) {
  module.exports = RoundProgress;
}


},{}]},{},[1]);
