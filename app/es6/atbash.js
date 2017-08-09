/**
 * @atbash.js 
 * The Atbash cipher is a very common, simple cipher. Basically, when encoded, an "A" becomes a "Z", "B" turns into "Y", etc.
 * 
 * You can use the constant GLOBAL_INPUT from cipherHelper if you want one input for several ciphers for example
 */

(function (cipherHelper) {
  'use strict';

  class Atbash {
    constructor(wrapper) {
      this.c = cipherHelper;
      this.ALPHABET = this.c.alphabet;
      this.ALPHALENGTH = this.ALPHABET.length;
      this.GLOBAL_INPUT = this.c.GLOBAL_INPUT;
      this.inputEl = this.GLOBAL_INPUT || wrapper.querySelector('.atbash-input');
      this.outputEl = wrapper.querySelector('.atbash-output');

      if (this.inputEl.value.length > 0) {
        this.update();
      }

      this.inputEl.addEventListener('input', e => this.update(e));
    }

    decipher(input) {
      let output = '';

      input = input.toUpperCase();

      for (let i = 0; i < input.length; i++) {
        let index = this.ALPHABET.indexOf(input[i]);

        if (index !== -1) {
          let tmp = (index - this.ALPHALENGTH) + 1;
          tmp = (tmp - tmp) + -tmp;
          output += this.ALPHABET[tmp];
        } else {
          output += input[i];
        }
      }

      return output.trim();
    }

    update() {
      let input = this.inputEl.value.trim();
      let output = this.decipher(input);

      this.outputEl.value = output;
    }
  }

  // Init
  const list = document.querySelectorAll('.js-atbash');
  
  for (let item of list) {
    new Atbash(item);
  }

})(cipherHelper); // eslint-disable-line no-undef
