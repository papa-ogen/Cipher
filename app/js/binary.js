'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @binary.js 
 * Using ASCII standard
 * 
 * You can use the constant GLOBAL_INPUT from cipherHelper if you want one input for several ciphers for example
 */

(function (cipherHelper) {
  'use strict';

  var Binary = function () {
    function Binary(wrapper) {
      var _this = this;

      _classCallCheck(this, Binary);

      this.c = cipherHelper;
      this.GLOBAL_INPUT = this.c.GLOBAL_INPUT;
      // this.ASCI = {
      //   "31": "", "32": " ", "33": "!", "34": "\"", "35": "#",
      //   "36": "$", "37": "%", "38": "&", "39": "'", "40": "(",
      //   "41": ")", "42": "*", "43": "+", "44": ",", "45": "-",
      //   "46": ".", "47": "/", "48": "0", "49": "1", "50": "2",
      //   "51": "3", "52": "4", "53": "5", "54": "6", "55": "7",
      //   "56": "8", "57": "9", "58": ":", "59": ";", "60": "<",
      //   "61": "=", "62": ">", "63": "?", "64": "@", "65": "A",
      //   "66": "B", "67": "C", "68": "D", "69": "E", "70": "F",
      //   "71": "G", "72": "H", "73": "I", "74": "J", "75": "K",
      //   "76": "L", "77": "M", "78": "N", "79": "O", "80": "P",
      //   "81": "Q", "82": "R", "83": "S", "84": "T", "85": "U",
      //   "86": "V", "87": "W", "88": "X", "89": "Y", "90": "Z",
      //   "91": "[", "92": "\\", "93": "]", "94": "^", "95": "_",
      //   "96": "`", "97": "a", "98": "b", "99": "c", "100": "d",
      //   "101": "e", "102": "f", "103": "g", "104": "h", "105": "i",
      //   "106": "j", "107": "k", "108": "l", "109": "m", "110": "n",
      //   "111": "o", "112": "p", "113": "q", "114": "r", "115": "s",
      //   "116": "t", "117": "u", "118": "v", "119": "w", "120": "x",
      //   "121": "y", "122": "z", "123": "{", "124": "|", "125": "}",
      //   "126": "~", "127": ""
      // };
      this.inputEl = this.GLOBAL_INPUT || wrapper.querySelector('.binary-input');
      this.outputEl = wrapper.querySelector('.binary-output');

      if (this.inputEl.value.length > 0) {
        this.update();
      }

      this.inputEl.addEventListener('input', function (e) {
        return _this.update(e);
      });
    }

    _createClass(Binary, [{
      key: 'toAscii',
      value: function toAscii(input) {
        return input.split('').map(function (char) {
          return char.charCodeAt(0);
        });
      }

      // ASCII to comma-separated string

    }, {
      key: 'fromAscii',
      value: function fromAscii(input) {
        var str = "";
        input = input.replace(/,\s*$/, "");
        input = input.split(",");

        for (var i = 0; i < input.length; i++) {
          str += String.fromCharCode(parseInt(input[i])) + ",";
        }

        str = str.replace(/,+$/, '');

        return str;
      }
    }, {
      key: 'update',
      value: function update() {
        var input = this.inputEl.value.trim();
        var output = "";

        if (this.c.isString(input)) {
          output = this.toAscii(input);
        } else {
          output = this.fromAscii(input);
        }

        this.outputEl.value = output;
      }
    }]);

    return Binary;
  }();

  // Init


  var list = document.querySelectorAll('.js-binary');

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = list[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var item = _step.value;

      new Binary(item);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
})(cipherHelper); // eslint-disable-line no-undef