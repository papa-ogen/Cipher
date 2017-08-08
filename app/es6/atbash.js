/**
 * @atbash.js 
 * The Atbash cipher is a very common, simple cipher. Basically, when encoded, an "A" becomes a "Z", "B" turns into "Y", etc.
 * 
 * You can use the constant GLOBAL_INPUT from cipherHelper if you want one input for several ciphers for example
 */
(function ($, cipherHelper) {
  "use strict";

  var c = cipherHelper;
  var ALPHABET = c.alphabet;
  var ALPHALENGTH = c.alphabetLength();
  var GLOBAL_INPUT = $(c.GLOBAL_INPUT);

  var Atbash = function (obj) {
    // If Constructor is called without "new" for instance from a call(), re-cell the constructor with this as obj argument.
    if (!(this instanceof Atbash)) {
      return new Atbash(this);
    }
    // Set the instance to make the instance available in all methods and events.
    var atbash = $.extend(this, {
      obj: $(obj),
      InputEl: $(".atbash-input", obj), // mandatory
      OutputEl: $(".atbash-output", obj) // mandatory
    });
    return this.init(obj);
  };

  Atbash.prototype = {
    deCipher: function (input) {
      var output = "";

      input = input.toUpperCase();

      for (var i = 0; i < input.length; i++) {
        var index = ALPHABET.indexOf(input[i]);

        if (index !== -1) {
          var tmp = (index - ALPHALENGTH) + 1;
          tmp = (tmp - tmp) + -tmp;
          output += ALPHABET[tmp];
        } else {
          output += input[i];
        }
      }
      return output;
    },
    updatePanels: function () {
      var input = $.trim(this.InputEl.val());
      var output = $.trim(this.deCipher(input));

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
  
  $('.js-atbash').each(Atbash);

  return Atbash;
})(jQuery, cipherHelper);