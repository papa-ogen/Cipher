/**
 * @letterNumber.js 
 * One of the first ciphers that kids learn is this 'letter number' cipher. You replace letters with a number: A=1, B=2, C=3, etc.
 * 
 * You can use the constant GLOBAL_INPUT from cipherHelper if you want one input for several ciphers for example
 */

(function (cipherHelper) {
  'use strict';

  class LetterNumber {
    constructor(wrapper) {
      this.c = cipherHelper;
      this.ALPHABET = this.c.alphabet;
      this.GLOBAL_INPUT = this.c.GLOBAL_INPUT;
      this.inputEl = this.GLOBAL_INPUT || wrapper.querySelector('.letter-number-input');
      this.outputEl = wrapper.querySelector('.letter-number-output');

      if (this.inputEl.value.length > 0) {
        this.update();
      }

      this.inputEl.addEventListener('input', e => this.update(e));
    }

    decipher(input) {
      let output = '';
      input = input.replace(/,\s*$/, '');
      input = input.split(',');

      for (let i = 0; i < input.length; i++) {
        let index = this.ALPHABET[input[i] - 1];
        // If input is not a character
        if (input[i].match(/[^a-zA-Z]/) && typeof index != 'undefined') {
          output += index;
        }
      }

      return output;
    }

    encipher(input) {
      let output = '';

      input = input.toUpperCase();

      for (let i = 0; i < input.length; i++) {
        let index = this.ALPHABET.indexOf(input[i]);
        if (index !== -1) {
          output += index + 1;
        }
      }

      return output;
    }

    update() {
      let input = this.inputEl.value.trim();
      let output = '';

      if (input.length > 0) {
        if (input.indexOf(',') !== -1 || this.c.isNumeric(input)) {
          output = this.decipher(input).trim();
        } else {
          output = this.encipher(input).trim();
        }

        this.outputEl.value = output;
      }
    }
  }

  // Init
  const list = document.querySelectorAll('.js-letter-number');

  for (let item of list) {
    new LetterNumber(item);
  }

})(cipherHelper); // eslint-disable-line no-undef
