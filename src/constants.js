// html elements
const btMinus = document.getElementById("minus");
const btPlus = document.getElementById("plus");
const form = document.querySelector("form");
const lbRange = document.getElementById("range");
const rgLength = document.getElementById("len");
const spInfo = document.getElementById("info");
const spOut = document.getElementById("out");
const spTime = document.getElementById("time");
const tbIn = document.getElementById("in");
const tbIt = document.getElementById("iterations");

// Char arrays
const lowercaseArr = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "m", "n", "o", "p", "q", "r",
    "s", "t", "u", "v", "w", "x", "y", "z"];
const uppercaseArr = ["A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R",
    "S", "T", "U", "W", "X", "Y", "Z"];
const numbersArr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const symbolsArr = ["!", "@", "#", "$", "~", "/", "(", ")", "=", "?", "[", "]", "+", "*", "{", "}", ";", ":",
    "_", "-", ".", ",", ">", "<"];

// Number of hashes per second for RTX4090 - MD5 algorithm
// https://www.hivesystems.com/blog/are-your-passwords-in-the-green-2023
const hashPerSecond = 164100000000;

// Time in seconds
const minuteDuration = 60;
const hourDuration = minuteDuration * 60;
const dayDuration = hourDuration * 24;
const yearDuration = dayDuration * 365;
const centuryDuration = yearDuration * 100;

export {
    btMinus,
    btPlus,
    centuryDuration,
    dayDuration,
    form,
    hashPerSecond,
    hourDuration,
    lbRange,
    lowercaseArr,
    minuteDuration,
    numbersArr,
    rgLength,
    spInfo,
    spOut,
    spTime,
    symbolsArr,
    tbIn,
    tbIt,
    uppercaseArr,
    yearDuration,
};