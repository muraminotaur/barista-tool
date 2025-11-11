
// In this script I'm setting up the UUID system for referencing ingredients in the array.
// this implementation is taken from the cobalt.tools repository, since i'm unfamiliar with the best ways to do things
// and their implementation seems to be safe and error-handling.

// creating a constant that contains all possible valid characters within a UUID.
// the string is being indexed by a random number because...?
const digit = () => '0123456789abcdef'[Math.random() * 16 | 0];

export const uuid = () => {
    // this checks if the crypto library is available in this browser. returns a String
    /*
    > some old ass browers or certain environments wouldn't have it
    > for example you can run websites on node js
    > like
    > using node js as a browser
    > and in some cases like that, some in-browser stuff doesn't work
    > so people will use fallbacks like this
        - neil (thank you neil)
    */
    if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
        return crypto.randomUUID();
    }

    // if the crypto library isn't available in the browser, use this naive implementation instead
    const digits = Array.from({length: 32}, digit);
    digits[12] = '4';
    digits[16] = '89ab'[Math.random() * 4 | 0];

    return digits
            .join('')
            .match(/^(.{8})(.{4})(.{4})(.{4})(.{12})$/)!
            .slice(1)
            .join('-');
}