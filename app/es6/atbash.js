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
      this.inputElement = this.GLOBAL_INPUT || wrapper.querySelector('.atbash-input');
      this.outputElement = wrapper.querySelector('.atbash-output');

      this.inputElement.value.length > 0 && this.update();

      this.inputElement.addEventListener('input', () => this.update());
    }

    encode(input) {
      const inputToArray = input.toUpperCase().split('');

      return inputToArray.map(letter => {
        const index = this.ALPHABET.indexOf(letter);
        return index === -1 ? letter : this.ALPHABET[(this.ALPHALENGTH - 1) - index];
      }).join('');
    }

    update() {
      let input = this.inputElement.value.trim();
      let output = this.encode(input);

      this.outputElement.value = output;
    }
  }

  // Init
  const list = document.querySelectorAll('.js-atbash');

  for (let item of list) {
    new Atbash(item);
  }

})(cipherHelper); // eslint-disable-line no-undef
