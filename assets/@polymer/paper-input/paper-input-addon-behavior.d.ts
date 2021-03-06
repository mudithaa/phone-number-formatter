/**
 * DO NOT EDIT
 *
 * This file was automatically generated by
 *   https://github.com/Polymer/tools/tree/master/packages/gen-typescript-declarations
 *
 * To modify these typings, edit the source file(s):
 *   paper-input-addon-behavior.js
 */

export {PaperInputAddonBehavior};

/**
 * Use `Polymer.PaperInputAddonBehavior` to implement an add-on for
 * `<paper-input-container>`. A add-on appears below the input, and may display
 * information based on the input value and validity such as a character counter
 * or an error message.
 */
interface PaperInputAddonBehavior {
  attached(): void;

  /**
   * The function called by `<paper-input-container>` when the input value or
   * validity changes.
   *
   * @param state     inputElement: The input element.
   *     value: The input value.
   *     invalid: True if the input value is invalid.
   */
  update(state: {invalid: boolean, inputElement?: Element|null, value?: string}): void;
}

declare const PaperInputAddonBehavior: object;
