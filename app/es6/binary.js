/**
 * @binary.js 
 * Using ASCII standard
 * 
 * You can use the constant GLOBAL_INPUT from cipherHelper if you want one input for several ciphers for example
 */
(function ($, cipherHelper) {
  "use strict";

  var c = cipherHelper;
  var GLOBAL_INPUT = $(c.GLOBAL_INPUT);
  var ASCI = {
    "31": "", "32": " ", "33": "!", "34": "\"", "35": "#",
    "36": "$", "37": "%", "38": "&", "39": "'", "40": "(",
    "41": ")", "42": "*", "43": "+", "44": ",", "45": "-",
    "46": ".", "47": "/", "48": "0", "49": "1", "50": "2",
    "51": "3", "52": "4", "53": "5", "54": "6", "55": "7",
    "56": "8", "57": "9", "58": ":", "59": ";", "60": "<",
    "61": "=", "62": ">", "63": "?", "64": "@", "65": "A",
    "66": "B", "67": "C", "68": "D", "69": "E", "70": "F",
    "71": "G", "72": "H", "73": "I", "74": "J", "75": "K",
    "76": "L", "77": "M", "78": "N", "79": "O", "80": "P",
    "81": "Q", "82": "R", "83": "S", "84": "T", "85": "U",
    "86": "V", "87": "W", "88": "X", "89": "Y", "90": "Z",
    "91": "[", "92": "\\", "93": "]", "94": "^", "95": "_",
    "96": "`", "97": "a", "98": "b", "99": "c", "100": "d",
    "101": "e", "102": "f", "103": "g", "104": "h", "105": "i",
    "106": "j", "107": "k", "108": "l", "109": "m", "110": "n",
    "111": "o", "112": "p", "113": "q", "114": "r", "115": "s",
    "116": "t", "117": "u", "118": "v", "119": "w", "120": "x",
    "121": "y", "122": "z", "123": "{", "124": "|", "125": "}",
    "126": "~", "127": ""
  };

  var Binary = function (obj) {
    // If Constructor is called without "new" for instance from a call(), re-cell the constructor with this as obj argument.
    if (!(this instanceof Binary)) {
      return new Binary(this);
    }
    // Set the instance to make the instance available in all methods and events.
    var binary = $.extend(this, {
      obj: $(obj),
      InputEl: $(".binary-input", obj),
      OutputEl: $(".binary-output", obj), // mandatory	
    });
    return this.init(obj);
  };

  Binary.prototype = {
    // String to ASCII
    toAscii: function (input) {
      return input.split('').map(function (char) { return char.charCodeAt(0); });
    },
    // ASCII to , sepparated String
    fromAscii: function (input) {
      var str = "";
      input = input.replace(/,\s*$/, "");
      input = input.split(",");

      for (var i = 0; i < input.length; i++) {
        str += String.fromCharCode(parseInt(input[i])) + ",";
      }

      str = str.replace(/,+$/, '');

      return str;
    },
    updatePanels: function () {
      var input = $.trim(this.InputEl.val());
      var output = "";

      if (c.isString(input)) {
        output = this.toAscii(input);
      } else {
        output = this.fromAscii(input);
      }

      this.OutputEl.val(output);
    },
    init: function () {
      var _this = this;

      this.InputEl = GLOBAL_INPUT.length > 0 ? GLOBAL_INPUT : this.InputEl;

      if (this.InputEl.val().length > 0) {
        this.updatePanels();
      }

      this.InputEl.bind('input propertychange', function () {
        _this.updatePanels();
      });
    }
  };

  $('.js-binary').each(Binary);

  return Binary;
})(jQuery, cipherHelper);