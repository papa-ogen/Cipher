'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @letterNumber.js 
 * One of the first ciphers that kids learn is this 'letter number' cipher. You replace letters with a number: A=1, B=2, C=3, etc.
 * 
 * You can use the constant GLOBAL_INPUT from cipherHelper if you want one input for several ciphers for example
 */

(function (cipherHelper) {
  'use strict';

  var LetterNumber = function () {
    function LetterNumber(wrapper) {
      var _this = this;

      _classCallCheck(this, LetterNumber);

      this.c = cipherHelper;
      this.ALPHABET = this.c.alphabet;
      this.GLOBAL_INPUT = this.c.GLOBAL_INPUT;
      this.inputEl = this.GLOBAL_INPUT || wrapper.querySelector('.letter-number-input');
      this.outputEl = wrapper.querySelector('.letter-number-output');

      if (this.inputEl.value.length > 0) {
        this.update();
      }

      this.inputEl.addEventListener('input', function (e) {
        return _this.update(e);
      });
    }

    _createClass(LetterNumber, [{
      key: 'decipher',
      value: function decipher(input) {
        var output = '';
        input = input.replace(/,\s*$/, '');
        input = input.split(',');

        for (var i = 0; i < input.length; i++) {
          var index = this.ALPHABET[input[i] - 1];
          // If input is not a character
          if (input[i].match(/[^a-zA-Z]/) && typeof index != 'undefined') {
            output += index;
          }
        }

        return output;
      }
    }, {
      key: 'encipher',
      value: function encipher(input) {
        var output = '';

        input = input.toUpperCase();

        for (var i = 0; i < input.length; i++) {
          var index = this.ALPHABET.indexOf(input[i]);
          if (index !== -1) {
            output += index + 1;
          }
        }

        return output;
      }
    }, {
      key: 'update',
      value: function update() {
        var input = this.inputEl.value.trim();
        var output = '';

        if (input.length > 0) {
          if (input.indexOf(',') !== -1 || this.c.isNumeric(input)) {
            output = this.decipher(input).trim();
          } else {
            output = this.encipher(input).trim();
          }

          this.outputEl.value = output;
        }
      }
    }]);

    return LetterNumber;
  }();

  // Init


  var list = document.querySelectorAll('.js-letter-number');

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = list[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var item = _step.value;

      new LetterNumber(item);
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