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
      this.inputEl = this.GLOBAL_INPUT || wrapper.querySelector('.atbash-input');
      this.outputEl = wrapper.querySelector('.atbash-output');

      if (this.inputEl.value.length > 0) {
        this.update();
      }

      this.inputEl.addEventListener('input', function (e) {
        return _this.update(e);
      });
    }

    _createClass(Atbash, [{
      key: 'decipher',
      value: function decipher(input) {
        var output = '';

        input = input.toUpperCase();

        for (var i = 0; i < input.length; i++) {
          var index = this.ALPHABET.indexOf(input[i]);

          if (index !== -1) {
            var tmp = index - this.ALPHALENGTH + 1;
            tmp = tmp - tmp + -tmp;
            output += this.ALPHABET[tmp];
          } else {
            output += input[i];
          }
        }

        return output.trim();
      }
    }, {
      key: 'update',
      value: function update() {
        var input = this.inputEl.value.trim();
        var output = this.decipher(input);

        this.outputEl.value = output;
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