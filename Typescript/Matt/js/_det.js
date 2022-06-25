"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _matt_1 = __importDefault(require("./_matt"));
const _decorators_1 = require("./_decorators");
class Det {
    static of2x2(matt) {
        //this.validate(matt,2);
        let diag1 = matt.diag;
        let diag2 = matt.secDiag;
        let result1 = diag1.reduce((acc, crr) => acc * crr, 1);
        let result2 = diag2.reduce((acc, crr) => acc * crr, 1);
        return result1 - result2;
    }
    static of3x3(matt) {
        matt = matt.copy();
        let diags = [];
        let secDiags = [];
        for (let i = 0; i < 3; i++) {
            diags.push(matt.diag.reduce((acc, crr) => { return acc * crr; }, 1));
            secDiags.push(matt.secDiag.reduce((acc, crr) => { return acc * crr; }, 1));
            matt.rotateCols(-1);
        }
        ;
        let n1 = diags.reduce((acc, crr) => { return acc + crr; }, 1);
        let n2 = secDiags.reduce((acc, crr) => { return acc + crr; }, 1);
        return n1 - n2;
    }
    static laPlace(matt) {
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
                result = this.of3x3(mattCopy);
            }
            else {
                result = this.laPlace(mattCopy);
            }
            coeficients.push(modifier * result);
        }
        for (let i in firstCol) {
            let item1 = firstCol[parseInt(i)];
            let item2 = coeficients[parseInt(i)];
            results.push(item1 * item2);
        }
        return results.reduce((acc, crr) => { return acc + crr; });
    }
    static chioRule(matt) {
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
        const resultMatt = new _matt_1.default(newMatt, true);
        if (resultMatt.rows > 3 && resultMatt.rows != matt.rows) {
            recursive = true;
        }
        let result = Infinity;
        if (recursive) {
            result = this.chioRule(resultMatt);
        }
        else if (resultMatt.rows === 3) {
            result = this.of3x3(resultMatt);
        }
        return result;
    }
    static gaussElimination(matt) {
        let mainDiag = matt.diag;
        let mattCopy = matt.copy();
        let MCM = mattCopy.matt;
        let newMatt = [];
        for (let i = 0; i < mattCopy.rows - 1; i++) {
            let keyObj = mattCopy.getElement(i, i);
            let pivot = keyObj.value;
            let pivotRow = keyObj.row;
            let pivotCol = keyObj.col;
            if (i === 0) {
                newMatt.push(mattCopy.getRow(i));
            }
            if (pivot === 0) { }
            for (let j = 0; i <= j; i++) {
                pivotCol.shift();
                pivotCol.unshift("GaussElim");
            }
            console.log(pivotCol);
            for (let j in pivotCol) {
                let n = parseInt(j);
                if (pivotCol[j] != "GaussElim" && pivotCol[j] != 0) {
                    let row = mattCopy.getRow(n);
                    let modifier = (pivotCol[j] / pivot);
                    for (let k of pivotRow) {
                        k *= pivotCol[j];
                    }
                    for (let k in row) {
                        row[k] -= pivotRow[k];
                    }
                    newMatt.push(row);
                }
            }
        }
        let resultMatt = new _matt_1.default(newMatt, true);
        resultMatt.print();
        return 1;
    }
}
__decorate([
    (0, _decorators_1.validateMattDet)(2)
], Det, "of2x2", null);
__decorate([
    (0, _decorators_1.validateMattDet)(3)
], Det, "of3x3", null);
__decorate([
    (0, _decorators_1.validateMattDet)()
], Det, "laPlace", null);
__decorate([
    (0, _decorators_1.validateMattDet)()
], Det, "chioRule", null);
__decorate([
    (0, _decorators_1.validateMattDet)()
], Det, "gaussElimination", null);
exports.default = Det;
