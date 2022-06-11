"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _matt_1 = require("./_matt");
var Det = /** @class */ (function () {
    function Det() {
    }
    Det.prototype.validate = function (matt, n) {
        if (!(matt.isSquare)) {
            throw new Error("Apenas Matrizes Quadradas possuem determinantes!");
        }
        else if (!(n === matt.rows)) {
            throw new Error("A Matriz Passada n\u00E3o \u00E9 ".concat(n, "x").concat(n, "!"));
        }
        else if (!(matt.isSet && typeof matt.matt[0][0] === "number")) {
            throw new Error("A matriz dve conter apenas números entre seus itens!");
        }
    };
    Det.prototype.of2x2 = function (matt) {
        this.validate(matt, 2);
        var diag1 = matt.diag;
        var diag2 = matt.secDiag;
        var result1 = diag1.reduce(function (acc, crr) { return acc * crr; }, 1);
        var result2 = diag2.reduce(function (acc, crr) { return acc * crr; }, 1);
        return result1 - result2;
    };
    Det.prototype.of3x3 = function (matt) {
        matt = new _matt_1.default(matt.matt, true);
        this.validate(matt, 3);
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
    Det.prototype.of4x4 = function (matt) {
        this.validate(matt, 4);
        var firstCol = matt.getCol(0);
        var coeficients = [];
        for (var i in firstCol) {
            var n = parseInt(i);
            var mattCopy = matt.copyMatt();
            mattCopy.removeCol(0);
            mattCopy.removeRow(n);
            var modifier = Math.pow(-1, (n + 1) + 1);
            coeficients.push(modifier * this.of3x3(mattCopy));
        }
        var results = [];
        for (var i in firstCol) {
            var n = parseInt(i);
            results.push(firstCol[n] * coeficients[n]);
        }
        return results.reduce(function (acc, crr) { return acc + crr; }, 0);
    };
    return Det;
}());
exports.default = Det;
