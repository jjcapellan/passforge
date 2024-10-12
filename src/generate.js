import {
    lowercaseArr,
    numbersArr,
    spOut,
    symbolsArr,
    uppercaseArr,
    validatePass,
} from "./index.js";

export async function genPass(str, iterations, passLength, inclUpper, inclLower, inclNum, inclSym) {
    // Generate password (pass)
    let byteArray = await getByteArray(str, iterations);
    let pass = "";

    // Build chars array
    const chars = [];
    if (inclUpper) chars.push(...uppercaseArr);
    if (inclLower) chars.push(...lowercaseArr);
    if (inclNum) chars.push(...numbersArr);
    if (inclSym) chars.push(...symbolsArr);

    // Maps bytes array to chars array and converts to string
    byteArray.map(v => {
        const num = v.valueOf();
        const maxUtf8Value = 255;
        const idx = Math.round((num * (chars.length - 1)) / maxUtf8Value);
        pass += chars[idx];
    });

    pass = pass.substring(0, passLength);
    pass = validatePass(pass, inclUpper, inclLower, inclNum, inclSym);
    return pass;
}

export async function getByteArray(str, iterations, isTest) {
    let byteArray;

    for (let i = 0; i < iterations; i++) {
        const utf8 = new TextEncoder().encode(str);
        const hashBuffer = await crypto.subtle.digest('SHA-256', utf8);
        byteArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = byteArray
            .map((byte) => byte.toString(16).padStart(2, '0'))
            .join('');

        str = hashHex;
        if (!isTest) {
            spOut.innerText = `${Math.round(i / iterations * 100)}%`;
        }
    }

    return byteArray;
}