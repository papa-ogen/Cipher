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

  class Rot13 {
    constructor(wrapper) {
      this.c = cipherHelper;
      this.ALPHABET = this.c.alphabet;
      this.ALPHALENGTH = this.ALPHABET.length;
      this.GLOBAL_INPUT = this.c.GLOBAL_INPUT;
      this.DEFAULT_CIPHER = 13;
      this.DEFAULT_NRCIPHER = 5;
      this.inputEl = this.GLOBAL_INPUT || wrapper.querySelector('.rot-13-input');
      this.outputEl = wrapper.querySelector('.rot-13-output');

      if (this.inputEl.value.length > 0) {
        this.update();
      }

      this.inputEl.addEventListener('input', e => this.update(e));
    }

    getLetterIndex(letter) {
      return this.ALPHABET.indexOf(letter.toUpperCase());
    }

    decipher(input) {
      return input.split('').map((letter) => {
        const letterIndex = this.getLetterIndex(letter);
        const cipher = this.DEFAULT_CIPHER;
        const alength = this.ALPHALENGTH;

        return letterIndex + cipher >= alength ? this.ALPHABET[(letterIndex + cipher - alength)] : this.ALPHABET[letterIndex + cipher];
      });
    }

    decipherNumber(input) {
      const cipher = this.DEFAULT_NRCIPHER;

      return input.split('').map((number) => { return number + cipher; });
    }

    update() {
      const reg = /^\d+$/;
      const input = this.inputEl.value.trim();
      const output = reg.test(input) ? this.decipherNumber(input) : this.decipher(input);
      
      this.outputEl.value = output.join('');
    }
  }

  // Init
  const list = document.querySelectorAll('.js-rot-13');

  for (let item of list) {
    new Rot13(item);
  }

})(cipherHelper); // eslint-disable-line no-undef
