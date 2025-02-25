"use strict";

/**
 * emojiUnicode
 * Get the unicode code of an emoji in base 16.
 *
 * @name emojiUnicode
 * @function
 * @param {String} input The emoji character.
 * @returns {String} The base 16 unicode code.
 */
function emojiUnicode (input) {
    return emojiUnicode.raw(input).split(' ').map(val => parseInt(val).toString(16)).join(' ')
}

/**
 * emojiunicode.raw
 * Get the unicode code of an emoji in base 16.
 *
 * @name emojiunicode.raw
 * @function
 * @param {String} input The emoji character.
 * @returns {Number} The unicode code.
 */
emojiUnicode.raw = function (input) {
    if (input.length === 1) {
        return input.charCodeAt(0);
    }
    if (input.length > 1) {
        const pairs = [];
        for (var i = 0; i < input.length; i++) {
            if (
                // high surrogate
                input.charCodeAt(i) >= 0xd800 && input.charCodeAt(i) <= 0xdbff
            ) {
                if (
                    input.charCodeAt(i + 1) >= 0xdc00 && input.charCodeAt(i + 1) <= 0xdfff
                ) {
                    // low surrogate
                    let comp = (
                        (input.charCodeAt(i) - 0xd800) * 0x400
                      + (input.charCodeAt(i + 1) - 0xdc00) + 0x10000
                    );
                    pairs.push(comp)
                }
            } else if (input.charCodeAt(i) < 0xd800 || input.charCodeAt(i) > 0xdfff) {
                // modifiers and joiners
                pairs.push(input.charCodeAt(i))
            }
        }
        return pairs.join(' ')
    }
    if (comp < 0) {
        return input.charCodeAt(0);
    }
    return comp;
};

module.exports = emojiUnicode;
