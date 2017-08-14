'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @atbash.js 
 * The Atbash cipher is a very common, simple cipher. Basically, when encoded, an "A" becomes a "Z", "B" turns into "Y", etc.
 * 
 * You can use the constant GLOBAL_INPUT from cipherHelper if you want one input for several ciphers for example
 */

(function (cipherHelper) {
  'use strict';

  var Atbash = function () {
    function Atbash(wrapper) {
      var _this = this;

      _classCallCheck(this, Atbash);

      this.c = cipherHelper;
      this.ALPHABET = this.c.alphabet;
      this.ALPHALENGTH = this.ALPHABET.length;
      this.GLOBAL_INPUT = this.c.GLOBAL_INPUT;
      this.inputElement = this.GLOBAL_INPUT || wrapper.querySelector('.atbash-input');
      this.outputElement = wrapper.querySelector('.atbash-output');

      this.inputElement.value.length > 0 && this.update();

      this.inputElement.addEventListener('input', function () {
        return _this.update();
      });
    }

    _createClass(Atbash, [{
      key: 'encode',
      value: function encode(input) {
        var _this2 = this;

        var inputToArray = input.toUpperCase().split('');

        return inputToArray.map(function (letter) {
          var index = _this2.ALPHABET.indexOf(letter);
          return index === -1 ? letter : _this2.ALPHABET[_this2.ALPHALENGTH - 1 - index];
        }).join('');
      }
    }, {
      key: 'update',
      value: function update() {
        var input = this.inputElement.value.trim();
        var output = this.encode(input);

        this.outputElement.value = output;
      }
    }]);

    return Atbash;
  }();

  // Init


  var list = document.querySelectorAll('.js-atbash');

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = list[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var item = _step.value;

      new Atbash(item);
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