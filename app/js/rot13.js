'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @rot-13.js 
 * Encipher and Decipher rot-13 algorithm and rot-5 (for numbers)
 *
 * Create a div container with class .rot-13, and 2 input elements with class .rot-13-input and .rot-13-output respectively.
 * Optional is to add sliders for string cipher shift and numeric cipher shift. Create a div container for each slider.
 * 
 * You can use the constant GLOBAL_INPUT from cipherHelper if you want one input for several ciphers for example
 */

(function (cipherHelper) {
  'use strict';

  var Rot13 = function () {
    function Rot13(wrapper) {
      var _this = this;

      _classCallCheck(this, Rot13);

      this.c = cipherHelper;
      this.ALPHABET = this.c.alphabet;
      this.ALPHALENGTH = this.ALPHABET.length;
      this.GLOBAL_INPUT = this.c.GLOBAL_INPUT;
      this.CIPHER = 10;
      this.NRCIPHER = 5;
      this.inputElement = this.GLOBAL_INPUT || wrapper.querySelector('.rot-13-input');
      this.outputElement = wrapper.querySelector('.rot-13-output');
      this.rangeSlider = wrapper.querySelector('.rot-13-range');
      this.cipherValueElement = wrapper.querySelector('.rot-13-cipher-value');
      this.rangeSlider.value = this.CIPHER;
      this.cipherValueElement.innerHTML = this.CIPHER;

      if (this.inputElement.value.length > 0) {
        this.update();
      }

      this.inputElement.addEventListener('keyup', function () {
        return _this.update();
      });
      this.rangeSlider.addEventListener('change', function (e) {
        _this.CIPHER = e.target.value;
        _this.cipherValueElement.innerHTML = e.target.value;
        _this.update();
      });
    }

    _createClass(Rot13, [{
      key: 'getLetterIndex',
      value: function getLetterIndex(letter) {
        return this.ALPHABET.indexOf(letter.toUpperCase());
      }
    }, {
      key: 'decipher',
      value: function decipher(input) {
        var _this2 = this;

        return input.split('').map(function (letter) {
          var letterIndex = _this2.getLetterIndex(letter);
          var cipher = _this2.CIPHER;
          var alength = _this2.ALPHALENGTH;

          return letterIndex + cipher >= alength ? _this2.ALPHABET[letterIndex + cipher - alength] : _this2.ALPHABET[letterIndex + cipher];
        });
      }
    }, {
      key: 'decipherNumber',
      value: function decipherNumber(input) {
        var cipher = this.NRCIPHER;

        return input.split('').map(function (number) {
          return number + cipher;
        });
      }
    }, {
      key: 'update',
      value: function update() {
        var isNumber = /^\d+$/;
        var input = this.inputElement.value.trim();
        var output = isNumber.test(input) ? this.decipherNumber(input) : this.decipher(input);

        this.outputElement.value = output.join('');
      }
    }]);

    return Rot13;
  }();

  // Init


  var list = document.querySelectorAll('.js-rot-13');

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = list[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var item = _step.value;

      new Rot13(item);
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