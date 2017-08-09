/*eslint-disable no-unused-vars */

/**
 * @main.js 
 * Helpers for ciphers
 * 
 * You can use the constant GLOBAL_INPUT from cipherHelper if you want one input for several ciphers for example
 */

const cipherHelper = {
	GLOBAL_INPUT : document.getElementById("cipherHelper-global-input"),
	alphabet : ["A","B","C","D","E","F","G","H","I","J","K","L","M","N",
				"O","P","Q","R","S","T","U","V","W","X","Y","Z","Å", "Ä", "Ö"],
	alphabetLength : function () { return this.alphabet.length; },
	isNumeric : function (num){
		return !isNaN(num);
	},
	isString : function (str) {
		if(typeof str == "string" && str.match(/[a-zA-Z]/g)) {
			return true;
		}
		
		return false;
	},
	removeWhiteSpace : function (input) {
		
		return input.replace(/,\s*$/, "");
	}
};