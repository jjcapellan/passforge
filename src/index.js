const tbIn = document.getElementById("in");
const tbIt = document.getElementById("iterations");
const spOut = document.getElementById("out");
const spInfo = document.getElementById("info");
const btForge = document.getElementById("forge");

btForge.addEventListener("click", btForgeHandler);
tbIt.addEventListener("input", printTime);

const chars = genChars();

let iterationTime = 0;
let clicked = false;

printTime();


async function btForgeHandler(evt) {
    evt.preventDefault();
    if (clicked) return;
    clicked = true;

    // Reset password span
    spOut.innerText = "";
    spOut.style.color = "grey";
    spInfo.innerText = "Progress:";


    // Generate password (pass)
    let str = tbIn.value;
    let iterations = tbIt.value;
    let byteArray = await getByteArray(str, iterations);
    let pass = "";
    byteArray.map(v => {
        const num = v.valueOf();
        const maxUtf8Value = 255;
        const idx = Math.round((num * (chars.length - 1)) / maxUtf8Value);
        pass += chars[idx];
    });

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


function genChars() {
    let arr = [];
    for (let i = 33; i < 126; i++) {
        arr.push(String.fromCharCode(i));
    }
    // arr.length == 93
    return arr;
}