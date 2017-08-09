/**
 * @baconian.js 
 * Francis Bacon created this method of hiding one message within another. It is not a true cipher, but just a way to conceal your secret text within plain sight. The way it originally worked is that the writer would use two different typefaces. One would be the "A" typeface and the other would be "B". Your message would be written with the two fonts intermingled, thus hiding your message within a perfectly normal text.
 *
 * Create a div container with class .rot-13, and 2 input elements with class .rot-13-input and .rot-13-output respectively.
 * Optional is to add sliders for string cipher shift and numeric cipher shift. Create a div container for each slider.
 * 
 * You can use the constant GLOBAL_INPUT from cipherHelper if you want one input for several ciphers for example
 */
(function ($, cipherHelper) {
	"use strict";

	var c = cipherHelper;
	var GLOBAL_INPUT = $(c.GLOBAL_INPUT);
	var ALGORITHM = [
		{ "letter": "A", "code": "aaaaa" }, { "letter": "B", "code": "aaaab" }, { "letter": "C", "code": "aaaba" }, { "letter": "D", "code": "aaabb" },
		{ "letter": "E", "code": "aabaa" }, { "letter": "F", "code": "aabab" }, { "letter": "G", "code": "aabba" }, { "letter": "H", "code": "aabbb" },
		{ "letter": "I/J", "code": "abaaa" }, { "letter": "K", "code": "abaab" }, { "letter": "L", "code": "ababa" }, { "letter": "M", "code": "ababb" },
		{ "letter": "N", "code": "abbaa" }, { "letter": "O", "code": "abbab" }, { "letter": "P", "code": "abbba" }, { "letter": "Q", "code": "abbbb" },
		{ "letter": "R", "code": "baaaa" }, { "letter": "S", "code": "baaab" }, { "letter": "T", "code": "baaba" }, { "letter": "U/V", "code": "baabb" },
		{ "letter": "W", "code": "babaa" }, { "letter": "X", "code": "babab" }, { "letter": "Y", "code": "babba" }, { "letter": "Z", "code": "babbb" }
	];

	var Baconian = function (obj) {
		// If Constructor is called without "new" for instance from a call(), re-cell the constructor with this as obj argument.
		if (!(this instanceof Baconian)) {
			return new Baconian(this);
		}
		// Set the instance to make the instance available in all methods and events.
		var baconian = $.extend(this, {
			obj: $(obj),
			InputEl: $(".baconian-input", obj), // mandatory
			OutputEl: $(".baconian-output", obj), // mandatory
			RadioEl: $(".baconian-radio", obj) // mandatory		
		});
		return this.init(obj);
	};

	Baconian.prototype = {
		deCrypt: function (input) {
			var output = "";
			var tmp = "";
			input = input.replace(/\W+/g, '');

			for (var i = 0; i < input.length; i++) {
				if (input[i] == input[i].toUpperCase()) {
					tmp += "b";
				} else if (input[i] == input[i].toLowerCase()) {
					tmp += "a";
				}
			}

			// Split into array of 5s to match algorithm
			output = tmp.match(/.{1,5}/g) || [];
			return output;
		},
		decipher: function (input, objKey, objValue, decode) {
			var output = [];

			input = decode ? input.split(" ") : input;

			for (var i = 0; i < input.length; i++) {
				try {
					var obj = ALGORITHM.filter(function (obj) {
						return obj[objKey] === input[i];
					})[0];

					output.push(obj[objValue]);
				} catch (e) {
					// obj does not exist
				}
			}

			return output;
		},
		// Take regular text to baconian
		encode: function (input) {
			var output = [];

			input = input.replace(/\s+/g, '').toUpperCase();

			for (var i = 0; i < input.length; i++) {
				switch (input[i]) {
					case "I":
					case "J":
						output.push("I/J");
						break;
					case "U":
					case "V":
						output.push("U/V");
						break;
					default:
						output.push(input[i]);
				}
			}

			return this.decipher(output, "letter", "code");
		},
		updatePanels: function () {
			var input = $.trim(this.InputEl.val());
			var output = "";

			switch (this.RadioEl.val()) {
				default:
				case "decipher":
					output = this.decipher(this.deCrypt(input), "code", "letter", false);
					output = output.toString().replace(/,/g, "");
					break;
				case "encode":
					output = this.encode(input);
					output = output.toString().replace(/,/g, " ");
					break;
				case "decode":
					output = this.decipher(input, "code", "letter", true);
					output = output.toString().replace(/,/g, "");
					break;
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

			this.RadioEl.change(function (e) {
				var selectedRadio = $(this).val();
				//_this.InputEl.val("");
				_this.OutputEl.val("");

				switch (selectedRadio) {
					default:
					case "decipher":
						_this.OutputEl.attr("placeholder", "Decipher coded text, example: Hold OFf uNtIl you hEar frOm mE agAin. wE May cOMpROmIse.");
						break;
					case "encode":
						_this.OutputEl.attr("placeholder", "Encode plain text to Baconian, example: my code here");
						break;
					case "decode":
						_this.OutputEl.attr("placeholder", "Decode Baconian to plain text, example: baaab baaba baaaa abaaa abaab aabaa abbaa abbab babaa");
						break;
				}
			});
		}
	};

	$('.js-baconian').each(Baconian);
	
	return Baconian;
})(jQuery, cipherHelper);