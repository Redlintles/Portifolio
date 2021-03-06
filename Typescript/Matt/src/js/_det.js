import Matt from "./_matt";
import { validateMattDet } from "./_validations";
function of2x2(matt) {
    validateMattDet(Array.from(arguments), 2);
    let diag1 = matt.diag;
    let diag2 = matt.secDiag;
    let result1 = diag1.reduce((acc, crr) => acc * crr, 1);
    let result2 = diag2.reduce((acc, crr) => acc * crr, 1);
    return result1 - result2;
}
function of3x3(matt) {
    validateMattDet(Array.from(arguments), 3);
    matt = matt.copy();
    let diags = [];
    let secDiags = [];
    for (let i = 0; i < 3; i++) {
        diags.push(matt.diag.reduce((acc, crr) => {
            return acc * crr;
        }, 1));
        secDiags.push(matt.secDiag.reduce((acc, crr) => {
            return acc * crr;
        }, 1));
        matt.rotateCols(-1);
    }
    ;
    let n1 = diags.reduce((acc, crr) => {
        return acc + crr;
    }, 1);
    let n2 = secDiags.reduce((acc, crr) => {
        return acc + crr;
    }, 1);
    return n1 - n2;
}
function laPlace(matt) {
    validateMattDet(Array.from(arguments));
    if (matt.rows < 4) {
        throw new Error("o Uso ideal do teorema de La Place é para matrizes grandes, use métodos mais simples para matrizes menores!");
    }
    let firstCol = matt.getCol(0);
    let coeficients = [];
    let results = [];
    for (let i in firstCol) {
        let n = parseInt(i);
        let mattCopy = matt.copy();
        mattCopy.removeCol(0);
        mattCopy.removeRow(n);
        let modifier = Math.pow(-1, (n + 1) + 1);
        let result;
        if (mattCopy.rows === 3) {
            result = of3x3(mattCopy);
        }
        else {
            result = laPlace(mattCopy);
        }
        coeficients.push(modifier * result);
    }
    for (let i in firstCol) {
        let item1 = firstCol[parseInt(i)];
        let item2 = coeficients[parseInt(i)];
        results.push(item1 * item2);
    }
    return results.reduce((acc, crr) => {
        return acc + crr;
    });
}
function chioRule(matt) {
    validateMattDet(Array.from(arguments));
    if (matt.matt[0][0] != 1) {
        throw new Error("A regra de Chio não pode ser aplicada em matrizes cujo termo A¹¹ seja diferente de 1");
    }
    const firstCol = matt.getCol(0);
    const firstRow = matt.getRow(0);
    const mattCopy = matt.copy();
    let recursive = false;
    const MCM = mattCopy.matt;
    const newMatt = [];
    firstCol.shift();
    firstRow.shift();
    mattCopy.removeCol(0);
    mattCopy.removeRow(0);
    for (let i in MCM) {
        let n1 = parseInt(i);
        if (n1 === 0) {
            continue;
        }
        else {
            n1--;
        }
        const marginX = firstCol[n1];
        newMatt.push([]);
        for (let j in MCM[n1]) {
            let n2 = parseInt(j);
            if (n2 === 0) {
                continue;
            }
            else {
                n2--;
            }
            const marginY = firstRow[n2];
            const item = MCM[i][j];
            newMatt[n1].push(item - (marginX * marginY));
        }
    }
    const resultMatt = new Matt(newMatt, true);
    if (resultMatt.rows > 3 && resultMatt.rows != matt.rows) {
        recursive = true;
    }
    let result = Infinity;
    if (recursive) {
        try {
            result = chioRule(resultMatt);
        }
        catch (_a) {
            result = laPlace(resultMatt);
        }
    }
    else if (resultMatt.rows === 3) {
        result = of3x3(resultMatt);
    }
    return result;
}
function detTriangle(matt) {
    validateMattDet(Array.from(arguments));
    matt = matt.copy();
    let p = 1;
    for (let k = 0; k < matt.rows - 1; k++) {
        let max = Math.abs(matt.matt[k][k]);
        let maxIndex = k;
        for (let i = k + 1; i < matt.rows; i++) {
            if (max < Math.abs(matt.matt[i][k])) {
                max = Math.abs(matt.matt[i][k]);
                maxIndex = i;
            }
        }
        if (maxIndex !== k) {
            let temp;
            p = p * (-1);
            for (let j = 0; j < matt.rows; j++) {
                temp = matt.matt[k][j];
                matt.matt[k][j] = matt.matt[maxIndex][j];
                matt.matt[maxIndex][j] = temp;
            }
        }
        if (matt.matt[k][k] === 0) {
            return 0;
        }
        else {
            for (let m = k + 1; m < matt.rows; m++) {
                let F = (-1) * matt.matt[m][k] / matt.matt[k][k];
                matt.matt[m][k] = 0;
                for (let l = k + 1; l < matt.rows; l++) {
                    matt.matt[m][l] = matt.matt[m][l] + F * matt.matt[k][l];
                }
            }
        }
    }
    let det = matt.diag.reduce((acc, crr) => {
        return acc * crr;
    }, 1);
    return Math.round(p * det);
}
function vander(matt) {
    validateMattDet(Array.from(arguments));
    const row1 = matt.getRow(0);
    const col1 = matt.getCol(0);
    const msg = "A matriz passada não se trata de uma matriz de vandermonde";
    let base;
    let test;
    if (row1.reduce((acc, crr) => {
        return acc + crr;
    }) === row1.length) {
        base = matt.getRow(1);
        test = matt.getCol(0);
    }
    else if (col1.reduce((acc, crr) => {
        return acc + crr;
    }) === col1.length) {
        base = matt.getCol(1);
        test = matt.getRow(0);
    }
    else {
        throw new Error(msg);
    }
    let first = base[0];
    for (let i in test) {
        let n = parseInt(i);
        if (Math.pow(first, n) != test[n]) {
            console.log(Math.pow(first, n), test[n]);
            throw new Error(msg);
        }
    }
    let resultArr = [];
    for (let i in base) {
        let n = base[i];
        for (let j of base.slice(parseInt(i) + 1)) {
            resultArr.push(j - n);
        }
    }
    let result = resultArr.reduce((acc, crr) => {
        return acc * crr;
    }, 1);
    return result;
}
export { of2x2, of3x3, laPlace, chioRule, detTriangle, vander };
