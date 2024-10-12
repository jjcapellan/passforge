import {
    btMinus,
    btPlus,
    form,
    genPass,
    getByteArray,
    lbRange,
    rgLength,
    spInfo,
    spOut,
    tbIt,
} from "./index.js";

let clicked = false;
let iterationTime = 0;

export function init() {
    setHandlers();
    iterationsHandler();
}

function setHandlers() {
    form.addEventListener("submit", submitHandler, false);
    tbIt.addEventListener("input", iterationsHandler);
    btMinus.addEventListener("click", minusHandler, false);
    btPlus.addEventListener("click", plusHandler, false);
    rgLength.addEventListener("change", rgLengthHandler, false);
}

async function submitHandler(evt) {
    evt.preventDefault();

    if (clicked) return;
    clicked = true;

    // Get form data
    const data = new FormData(form);
    let str = data.get("in");
    let iterations = data.get("iterations");
    const inclUpper = data.get("ABC");
    const inclLower = data.get("abc");
    const inclNum = data.get("123");
    const inclSym = data.get("sym");
    const passLength = data.get("len");

    // If not included options checked
    if (String(inclLower + inclNum + inclSym + inclUpper).length == 1) {
        spOut.innerText = "Select some include option";
        clicked = false;
        return;
    }

    // Reset password span
    spOut.innerText = "";
    spOut.style.color = "grey";
    spInfo.innerText = "Progress:";

    // Generate password
    const pass = await genPass(str, iterations, passLength, inclUpper, inclLower, inclNum, inclSym);

    // Render password
    spOut.innerText = pass;
    spOut.style.color = "black";
    spInfo.innerText = "New password:";

    clicked = false;
}

async function iterationsHandler() {
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