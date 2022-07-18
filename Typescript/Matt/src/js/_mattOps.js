import Matt from "./_matt.js";
import { validateMattOps, validateMult } from "./_validations.js";
function createMatt(gen) {
    const newMatt = [];
    const alpha = [];
    for (let i = 0; i < 26; i++) {
        alpha.push(String.fromCharCode(97 + i));
        alpha.push(String.fromCharCode(65 + i));
    }
    for (let i of gen.law) {
        if ((i === "i" || i === "j") || (i === "I" || i === "J")) {
            continue;
        }
        else if (alpha.indexOf(i) === -1) {
            continue;
        }
        else {
            throw new Error("As únicas letras que a expressão da lei de formação podem ter são I e J!");
        }
    }
    const copy = (str) => {
        let copy = "";
        for (let k of gen.law) {
            copy += k;
        }
        return copy;
    };
    for (let i = 1; i <= gen.rows; i++) {
        newMatt.push([]);
        for (let j = 1; j <= gen.cols; j++) {
            let tpLaw = copy(gen.law);
            tpLaw = tpLaw.split("^").join("**");
            tpLaw = tpLaw.split(".").join("*");
            tpLaw = tpLaw.split("i").join(i.toString());
            tpLaw = tpLaw.split("j").join(j.toString());
            newMatt[i - 1].push(parseInt(eval(tpLaw)));
        }
    }
    const resultMatt = new Matt(newMatt, true);
    return resultMatt;
}
;
function sum(matt1, matt2) {
    validateMattOps(Array.from(arguments));
    const newMatt = [];
    for (let i = 0; i < matt1.rows; i++) {
        newMatt.push([]);
        const row1 = matt1.matt[i];
        const row2 = matt2.matt[i];
        for (let j = 0; j < row1.length; j++) {
            const operationRow = newMatt[i];
            const sum = row1[j] + row2[j];
            operationRow.push(sum);
        }
    }
    const resultMatt = new Matt(newMatt, true);
    return resultMatt;
}
;
function sub(matt1, matt2) {
    validateMattOps(Array.from(arguments));
    const newMatt = [];
    for (let i = 0; i < matt1.rows; i++) {
        newMatt.push([]);
        const row1 = matt1.matt[i];
        const row2 = matt2.matt[i];
        for (let j = 0; j < row1.length; j++) {
            const operationRow = newMatt[i];
            const sub = row1[j] - row2[j];
            operationRow.push(sub);
        }
    }
    const resultMatt = new Matt(newMatt, true);
    return resultMatt;
}
function realMult(matt, n) {
    validateMattOps(Array.from(arguments));
    const newMatt = [];
    for (let i of matt.matt) {
        let newRow = i.map((element) => {
            return element * n;
        });
        newMatt.push(newRow);
    }
    const resultMatt = new Matt(newMatt, true);
    return resultMatt;
}
function invert(matt) {
    validateMattOps(Array.from(arguments));
    const newMatt = [];
    for (let i = 0; i < matt.rows; i++) {
        newMatt.push([]);
        for (let j = 0; j < matt.matt[i].length; j++) {
            const operationRow = newMatt[i];
            const n = matt.matt[i][j];
            operationRow.push(n * -1);
        }
    }
    const resultMatt = new Matt(newMatt, true);
    return resultMatt;
}
function amplify(matt1, matt2) {
    if (matt1.rows !== matt2.rows) {
        throw new Error("As matrizes precisam ter o mesmo número de linhas!");
    }
    const mattCopy = matt1.copy();
    for (let i = 0; i < matt2.cols; i++) {
        let col = matt2.getCol(i);
        mattCopy.addCol(col);
    }
    return mattCopy;
}
function pow(matt, exp) {
    validateMattOps(Array.from(arguments));
    const arr = Array.from({ length: exp - 1 }, (v, k) => { return matt.copy(); });
    const resultMatt = arr.reduce((acc, crr) => {
        return mult(acc, crr);
    }, arr[0]);
    return resultMatt;
}
function mult(matt1, matt2) {
    validateMult(Array.from(arguments));
    const newMatt = [];
    for (let i = 0; i < matt1.rows; i++) {
        const targetRow = matt1.getRow(i);
        newMatt.push([]);
        for (let j = 0; j < matt2.cols; j++) {
            const row = [];
            const targetCol = matt2.getCol(j);
            for (let k in targetRow) {
                row.push(targetRow[k] * targetCol[k]);
            }
            const result = row.reduce((acc, crr) => { return acc + crr; });
            newMatt[i].push(result);
        }
    }
    const resultMatt = new Matt(newMatt, true);
    return resultMatt;
}
;
function div(matt1, matt2) {
    const inverted = invert(matt2);
    return mult(matt1, inverted);
}
export { sum, sub, realMult, invert, amplify, pow, mult, div, createMatt, };
