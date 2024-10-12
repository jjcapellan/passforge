// html elements
const btMinus = document.getElementById("minus");
const btPlus = document.getElementById("plus");
const form = document.querySelector("form");
const lbRange = document.getElementById("range");
const rgLength = document.getElementById("len");
const spInfo = document.getElementById("info");
const spOut = document.getElementById("out");
const tbIn = document.getElementById("in");
const tbIt = document.getElementById("iterations");

// Char arrays
const lowercaseArr = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r",
    "s", "t", "u", "v", "w", "x", "y", "z"];
const uppercaseArr = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R",
    "S", "T", "U", "W", "X", "Y", "Z"];
const numbersArr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const symbolsArr = ["!", "@", "#", "$", "~", "/", "(", ")", "=", "?", "[", "]", "+", "*", "{", "}", ";", ":",
    "_", "-", ".", ",", ">", "<"];

export {
    btMinus,
    btPlus,
    form,
    lbRange,
    lowercaseArr,
    numbersArr,
    rgLength,
    spInfo,
    spOut,
    symbolsArr,
    tbIn,
    tbIt,
    uppercaseArr,
};