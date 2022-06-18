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
var _matt_1 = __importDefault(require("./_matt"));
var _decorators_1 = require("./_decorators");
var Det = /** @class */ (function () {
    function Det() {
    }
    Det.prototype.of2x2 = function (matt) {
        //this.validate(matt,2);
        var diag1 = matt.diag;
        var diag2 = matt.secDiag;
        var result1 = diag1.reduce(function (acc, crr) { return acc * crr; }, 1);
        var result2 = diag2.reduce(function (acc, crr) { return acc * crr; }, 1);
        return result1 - result2;
    };
    Det.prototype.of3x3 = function (matt) {
        matt = matt.copy();
        var diags = [];
        var secDiags = [];
        for (var i = 0; i < 3; i++) {
            diags.push(matt.diag.reduce(function (acc, crr) { return acc * crr; }, 1));
            secDiags.push(matt.secDiag.reduce(function (acc, crr) { return acc * crr; }, 1));
            matt.rotateCols(-1);
        }
        ;
        var n1 = diags.reduce(function (acc, crr) { return acc + crr; }, 1);
        var n2 = secDiags.reduce(function (acc, crr) { return acc + crr; }, 1);
        return n1 - n2;
    };
    Det.prototype.laPlace = function (matt) {
        if (matt.rows < 4) {
            throw new Error("o Uso ideal do teorema de La Place é para matrizes grandes, use métodos mais simples para matrizes menores!");
        }
        var firstCol = matt.getCol(0);
        var coeficients = [];
        var results = [];
        for (var i in firstCol) {
            var n = parseInt(i);
            var mattCopy = matt.copy();
            mattCopy.removeCol(0);
            mattCopy.removeRow(n);
            var modifier = Math.pow(-1, (n + 1) + 1);
            var result = void 0;
            if (mattCopy.rows === 3) {
                result = this.of3x3(mattCopy);
            }
            else {
                result = this.laPlace(mattCopy);
            }
            coeficients.push(modifier * result);
        }
        for (var i in firstCol) {
            var item1 = firstCol[parseInt(i)];
            var item2 = coeficients[parseInt(i)];
            results.push(item1 * item2);
        }
        return results.reduce(function (acc, crr) { return acc + crr; });
    };
    Det.prototype.chioRule = function (matt) {
        this.validate(matt);
        var firstCol = matt.getCol(0);
        var firstRow = matt.getRow(0);
        var mattCopy = matt.copy();
        var recursive = false;
        var MCM = mattCopy.matt;
        var newMatt = [];
        firstCol.shift();
        firstRow.shift();
        mattCopy.removeCol(0);
        mattCopy.removeRow(0);
        for (var i in MCM) {
            var n1 = parseInt(i);
            if (n1 === 0) {
                continue;
            }
            else {
                n1--;
            }
            var marginX = firstCol[n1];
            newMatt.push([]);
            for (var j in MCM[n1]) {
                var n2 = parseInt(j);
                if (n2 === 0) {
                    continue;
                }
                else {
                    n2--;
                }
                var marginY = firstRow[n2];
                var item = MCM[i][j];
                newMatt[n1].push(item - (marginX * marginY));
            }
        }
        var resultMatt = new _matt_1.default(newMatt, true);
        if (resultMatt.rows > 3 && resultMatt.rows != matt.rows) {
            recursive = true;
        }
        var result = Infinity;
        if (recursive) {
            result = this.chioRule(resultMatt);
        }
        else if (resultMatt.rows === 3) {
            result = this.of3x3(resultMatt);
        }
        return result;
    };
    Det.prototype.gaussElimination = function (matt) {
        var mainDiag = matt.diag;
        var mattCopy = matt.copy();
        var MCM = mattCopy.matt;
        var newMatt = [];
        for (var i = 0; i < mattCopy.rows - 1; i++) {
            var keyObj = mattCopy.getElement(i, i);
            var pivot = keyObj.value;
            var pivotRow = keyObj.row;
            var pivotCol = keyObj.col;
            if (i === 0) {
                newMatt.push(mattCopy.getRow(i));
            }
            if (pivot === 0) { }
            for (var j = 0; i <= j; i++) {
                pivotCol.shift();
                pivotCol.unshift("GaussElim");
            }
            console.log(pivotCol);
            for (var j in pivotCol) {
                var n = parseInt(j);
                if (pivotCol[j] != "GaussElim" && pivotCol[j] != 0) {
                    var row = mattCopy.getRow(n);
                    var modifier = (pivotCol[j] / pivot);
                    for (var _i = 0, pivotRow_1 = pivotRow; _i < pivotRow_1.length; _i++) {
                        var k = pivotRow_1[_i];
                        k *= pivotCol[j];
                    }
                    for (var k in row) {
                        row[k] -= pivotRow[k];
                    }
                    newMatt.push(row);
                }
            }
        }
        var resultMatt = new _matt_1.default(newMatt, true);
        resultMatt.print();
        return 1;
    };
    __decorate([
        (0, _decorators_1.validateMatt)(2)
    ], Det.prototype, "of2x2", null);
    __decorate([
        (0, _decorators_1.validateMatt)(3)
    ], Det.prototype, "of3x3", null);
    __decorate([
        (0, _decorators_1.validateMatt)()
    ], Det.prototype, "laPlace", null);
    __decorate([
        (0, _decorators_1.validateMatt)()
    ], Det.prototype, "chioRule", null);
    __decorate([
        (0, _decorators_1.validateMatt)()
    ], Det.prototype, "gaussElimination", null);
    return Det;
}());
exports.default = Det;
