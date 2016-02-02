/**
 * @letterNumber.js 
 * One of the first ciphers that kids learn is this "letter number" cipher. You replace letters with a number: A=1, B=2, C=3, etc.
 * 
 * You can use the constant GLOBAL_INPUT from cipherHelper if you want one input for several ciphers for example
 */
(function ($, cipherHelper) {
    "use strict";
	
	var c = cipherHelper;
	var ALPHABET = c.alphabet;
	var GLOBAL_INPUT = $(c.GLOBAL_INPUT);
	
    var LetterNumber = function (obj) {
        // If Constructor is called without "new" for instance from a call(), re-cell the constructor with this as obj argument.
        if (!(this instanceof LetterNumber)) {
            return new LetterNumber(this);
        }
        // Set the instance to make the instance available in all methods and events.
        var letterNumber = $.extend(this, {
            obj: $(obj),
			InputEl : $(".letter-number-input", obj), // mandatory
			OutputEl : $(".letter-number-output", obj) // mandatory
        });
        return this.init(obj);
    };

    LetterNumber.prototype = {
		deCipher : function (input) {
			var output = "";
			input = input.replace(/,\s*$/, "");
			input = input.split(",");

			for(var i=0; i<input.length; i++) {
				var index = ALPHABET[input[i] - 1];
				// If input is not a character
				if(input[i].match(/[^a-zA-Z]/) && typeof index != "undefined") {
					output += index;
				}
			}
			
			return output;
		},
		enCipher : function (input) {
			var output = "";
			 
			input = input.toUpperCase();
			
			for(var i=0; i<input.length; i++) {
				var index = ALPHABET.indexOf(input[i]);
				if(index !== -1) {
					output += index + 1;
				}
			}
			
			return output;
		},		
		updatePanels : function () {
			var input = $.trim(this.InputEl.val());
			var output = "";
		
			if(input.length > 0) {
				if(input.indexOf(",") !== -1 || c.isNumeric(input)) {
					output = $.trim(this.deCipher(input));
				} else {
					output = $.trim(this.enCipher(input));
				}
				
				this.OutputEl.val(output);
			}
		},		
        init: function () {
			var _this = this;

			this.InputEl = GLOBAL_INPUT.length > 0 ? GLOBAL_INPUT : this.InputEl;	

			if(this.InputEl.val().length > 0) {
				this.updatePanels();
			}
			
			this.InputEl.bind('input propertychange', function() {
				_this.updatePanels();
			});  
        }
    };
    $(document).on('ready initDom', function (e) {
        var container = e.target;

        $('.js-letter-number', container).each(LetterNumber);
    });
    return LetterNumber;
})(jQuery, cipherHelper);