import {
    lowercaseArr,
    numbersArr,
    symbolsArr,
    uppercaseArr,
} from "./index.js";

export function validatePass(pass, useUpper, useLower, useNum, useSym) {
    const freePositions = Array(pass.length).fill(true);
    if (useLower) {
        pass = validateCharType(pass, isLowercase, lowercaseArr, freePositions);
    }
    if (useUpper) {
        pass = validateCharType(pass, isUpperCase, uppercaseArr, freePositions);
    }
    if (useNum) {
        pass = validateCharType(pass, isNumber, numbersArr, freePositions);
    }
    if (useSym) {
        pass = validateCharType(pass, isSymbol, symbolsArr, freePositions);
    }
    return pass;
}

function validateCharType(pass, isCharTypeFn, charsTypeArr, freePositions) {
    let hasCharType = false;
    pass.split("").map((char, i) => {
        if (isCharTypeFn(char)) {
            hasCharType = true;
        }
    });
    if (!hasCharType) {
        const pos = getInsertPos(pass, freePositions);
        const char = getInsertChar(pass, charsTypeArr);
        pass = replaceAt(pass, pos, char);
    }
    return pass;
}

function getInsertPos(str, freePositions) {
    const c = str.substr(0, 1);

    let relPos = 0;
    if (isLowercase(c)) {
        relPos = getRelPos(c, lowercaseArr);
    }
    if (isUpperCase(c)) {
        relPos = getRelPos(c, uppercaseArr);
    }
    if (isNumber(c)) {
        relPos = getRelPos(c, numbersArr);
    }
    if (isSymbol(c)) {
        relPos = getRelPos(c, symbolsArr);
    }

    let pos = Math.round(relPos * (str.length - 1));

    for (let i = 0; i < str.length; i++) {
        if (!freePositions[pos]) {
            pos++;
            continue;
        }
        if (pos >= str.length) {
            pos = 0;
            continue;
        }
        freePositions[pos] = false;
        return pos;
    }
    return pos;
}

function getInsertChar(str, chars) {
    const code = str.charCodeAt(1);
    const index = Math.round((code / 255) * (chars.length - 1));
    return chars[index];
}

function getRelPos(char, arr) {
    const idx = arr.indexOf(char);
    return idx / arr.length;
}

function isNumber(char) {
    const code = char.charCodeAt(0);
    return code >= 48 && code <= 57;
}

function isLowercase(char) {
    const code = char.charCodeAt(0);
    return code >= 97 && code <= 122;
}

function isUpperCase(char) {
    const code = char.charCodeAt(0);
    return code >= 65 && code <= 90;
}

function isSymbol(char) {
    const code = char.charCodeAt(0);
    return (code >= 33 && code <= 47) ||
        (code >= 58 && code <= 63) ||
        (code >= 91 && code <= 96) ||
        (code >= 123 && code <= 126);
}

function replaceAt(str, idx, char) {
    const str1 = str.substr(0, idx);
    const str2 = str.substr(idx + 1);
    return str1 + char + str2;
}