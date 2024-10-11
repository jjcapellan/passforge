const tbIn = document.getElementById("in");
const tbIt = document.getElementById("iterations");
const spOut = document.getElementById("out");
const spInfo = document.getElementById("info");
const form = document.querySelector("form");
const btMinus = document.getElementById("minus");
const btPlus = document.getElementById("plus");
const lbRange = document.getElementById("range");
const rgLength = document.getElementById("len");

form.addEventListener("submit", submitHandler, false);
tbIt.addEventListener("input", printTime);
btMinus.addEventListener("click", minusHandler, false);
btPlus.addEventListener("click", plusHandler, false);
rgLength.addEventListener("change", rgLengthHandler, false);

const lowercaseArr = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r",
    "s", "t", "u", "v", "w", "x", "y", "z"];
const uppercaseArr = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R",
    "S", "T", "U", "W", "X", "Y", "Z"];
const numbersArr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const symbolsArr = ["!", "@", "#", "$", "~", "/", "(", ")", "=", "?", "[", "]", "+", "*", "{", "}", ";", ":",
    "_", "-", ".", ",", ">", "<"];

let iterationTime = 0;
let clicked = false;

printTime();


async function submitHandler(evt) {
    evt.preventDefault();
    if (clicked) return;
    clicked = true;

    // Reset password span
    spOut.innerText = "";
    spOut.style.color = "grey";
    spInfo.innerText = "Progress:";

    // Get form data
    const data = new FormData(form);
    let str = data.get("in");
    let iterations = data.get("iterations");
    const inclUpper = data.get("ABC");
    const inclLower = data.get("abc");
    const inclNum = data.get("123");
    const inclSym = data.get("sym");
    const passLength = data.get("len");

    // Generate password (pass)
    let byteArray = await getByteArray(str, iterations);
    let pass = "";

    // Build chars array
    const chars = [];
    if (inclUpper) chars.push(...uppercaseArr);
    if (inclLower) chars.push(...lowercaseArr);
    if (inclNum) chars.push(...numbersArr);
    if (inclSym) chars.push(...symbolsArr);

    byteArray.map(v => {
        const num = v.valueOf();
        const maxUtf8Value = 255;
        const idx = Math.round((num * (chars.length - 1)) / maxUtf8Value);
        pass += chars[idx];
    });

    pass = pass.substring(0, passLength);

    // Render password
    spOut.innerText = pass;
    spOut.style.color = "black";
    spInfo.innerText = "New password:";

    clicked = false;
}


async function getByteArray(str, iterations, isTest) {
    let byteArray;
    let progress = 0;

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


async function getIterationTime() {
    const iterations = 3000;
    const str = "performance";

    const t0 = performance.now();
    await getByteArray(str, iterations, true);
    const t1 = performance.now();

    const dt = t1 - t0;
    const itTime = dt / iterations;

    return itTime;
}


async function printTime() {
    if (iterationTime == 0) {
        const t1 = await getIterationTime();
        const t2 = await getIterationTime();
        const t3 = await getIterationTime();
        iterationTime = Math.min(t1, t2, t3);
    }
    const estTime = iterationTime * tbIt.value;

    const msg = "Estimated time: ";
    spInfo.innerText = estTime > 60000 ?
        `${msg}${Math.round((estTime / 1000) / 60)}min` :
        estTime > 1000 ?
            `${msg}${Math.round(estTime / 1000)}s` :
            `${msg}${Math.round(estTime)}ms`;
}

function minusHandler(evt) {
    evt.preventDefault();
    rgLength.value--;
    lbRange.innerText = `Length(${rgLength.value})`;
}

function plusHandler(evt) {
    evt.preventDefault();
    rgLength.value++;
    lbRange.innerText = `Length(${rgLength.value})`;
}

function rgLengthHandler(evt) {
    lbRange.innerText = `Length(${rgLength.value})`;
}

function mixArr(arr) {
    const mixed = [];
    for (let i = 0; i < arr.length - 1; i += 2) {
        mixed.push(arr[i + 1], arr[i]);
    }
    mixed.push(arr[arr.length - 1]);
    return mixed;
}