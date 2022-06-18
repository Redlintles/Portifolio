"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Matt = /** @class */ (function () {
    function Matt(matt, isMutable) {
        if (isMutable === void 0) { isMutable = false; }
        this.matt = this.isMatt(matt);
        this.isMutable = isMutable;
    }
    Matt.prototype.isMatt = function (matt) {
        var mainLength = matt[0].length;
        for (var _i = 0, matt_1 = matt; _i < matt_1.length; _i++) {
            var i = matt_1[_i];
            if (i.length != mainLength) {
                throw new Error("matt não é uma matriz!");
            }
        }
        return matt;
    };
    Matt.prototype.throwChangableError = function () {
        if (!(this.isMutable)) {
            throw new Error("A Matriz é Imutável");
        }
    };
    Matt.prototype.validate = function (n, dimension) {
        var message = dimension === "col" ? "Essa coluna não existe!" : "Essa linha não existe";
        var scope = dimension === "col" ? this.cols : this.rows;
        if (n === scope) {
            n--;
        }
        else if (n < 0 || n > scope) {
            throw new Error(message);
        }
        return n;
    };
    ;
    Object.defineProperty(Matt.prototype, "cols", {
        get: function () {
            return this.matt[0].length;
        },
        enumerable: false,
        configurable: true
    });
    ;
    Object.defineProperty(Matt.prototype, "rows", {
        get: function () {
            return this.matt.length;
        },
        enumerable: false,
        configurable: true
    });
    ;
    Object.defineProperty(Matt.prototype, "diag", {
        get: function () {
            if (!(this.isSquare)) {
                throw new Error("A Matriz não é quadrada!");
            }
            var iter = 0;
            var dg = [];
            for (var _i = 0, _a = this.matt; _i < _a.length; _i++) {
                var i = _a[_i];
                dg.push(i[iter]);
                iter++;
            }
            return dg;
        },
        enumerable: false,
        configurable: true
    });
    ;
    Object.defineProperty(Matt.prototype, "secDiag", {
        get: function () {
            if (!(this.isSquare)) {
                throw new Error("A Matriz não é quadrada!");
            }
            var dg = [];
            var iter = this.cols - 1;
            for (var _i = 0, _a = this.matt; _i < _a.length; _i++) {
                var i = _a[_i];
                dg.push(i[iter]);
                iter--;
            }
            return dg;
        },
        enumerable: false,
        configurable: true
    });
    ;
    Object.defineProperty(Matt.prototype, "isSquare", {
        get: function () {
            return (this.rows === this.cols);
        },
        enumerable: false,
        configurable: true
    });
    ;
    Object.defineProperty(Matt.prototype, "isSet", {
        get: function () {
            var mainType = typeof this.matt[0][0];
            for (var _i = 0, _a = this.matt; _i < _a.length; _i++) {
                var i = _a[_i];
                for (var _b = 0, i_1 = i; _b < i_1.length; _b++) {
                    var j = i_1[_b];
                    if (typeof j != mainType) {
                        return false;
                    }
                }
            }
            return true;
        },
        enumerable: false,
        configurable: true
    });
    ;
    Object.defineProperty(Matt.prototype, "mattType", {
        get: function () {
            if (this.isSet) {
                return typeof this.matt[0][0];
            }
            else {
                return "any";
            }
        },
        enumerable: false,
        configurable: true
    });
    Matt.prototype.firstOccOf = function (el) {
        for (var _i = 0, _a = this.matt; _i < _a.length; _i++) {
            var i = _a[_i];
            for (var _b = 0, i_2 = i; _b < i_2.length; _b++) {
                var j = i_2[_b];
                if (j === el) {
                    return [i, j];
                }
            }
        }
        return -1;
    };
    Matt.prototype.getRow = function (n) {
        n = this.validate(n, "row");
        var row = [];
        for (var _i = 0, _a = this.matt[n]; _i < _a.length; _i++) {
            var i = _a[_i];
            row.push(i);
        }
        return row;
    };
    ;
    Matt.prototype.getCol = function (n) {
        var col = [];
        n = this.validate(n, "col");
        for (var _i = 0, _a = this.matt; _i < _a.length; _i++) {
            var i = _a[_i];
            col.push(i[n]);
        }
        return col;
    };
    ;
    Matt.prototype.addCol = function (arr) {
        if (!(this.isMutable)) {
            throw new Error("Esta Matriz é Imutável");
        }
        if (arr.length === this.rows) {
            for (var i in arr) {
                this.matt[i].push(arr[i]);
            }
        }
    };
    Matt.prototype.addRow = function (arr) {
        this.throwChangableError();
        if (arr.length === this.cols) {
            this.matt.push(arr);
        }
    };
    Matt.prototype.removeCol = function (n) {
        n = this.validate(n, "col");
        var newMatt = [];
        for (var i in this.matt) {
            newMatt.push([]);
            for (var j in this.matt[i]) {
                if (parseInt(j) === n) {
                    continue;
                }
                else {
                    newMatt[i].push(this.matt[i][j]);
                }
            }
        }
        this.matt = newMatt;
    };
    Matt.prototype.removeRow = function (n) {
        n = this.validate(n, "row");
        var newMatt = [];
        for (var i in this.matt) {
            if (parseInt(i) === n) {
                continue;
            }
            else {
                newMatt.push(this.matt[i]);
            }
        }
        this.matt = newMatt;
    };
    Matt.prototype.mapRows = function (callbackFn) {
        var newMatt = [];
        for (var i in this.matt) {
            newMatt.push(callbackFn(this.getRow(parseInt(i)), parseInt(i)));
        }
        return newMatt;
    };
    Matt.prototype.mapCols = function (callbackFn) {
        var newMatt = [];
        for (var i in this.matt[0]) {
            newMatt.push(callbackFn(this.getCol(parseInt(i)), parseInt(i)));
        }
        return newMatt;
    };
    Matt.prototype.rotateRows = function (n) {
        if (!(this.isMutable)) {
            throw new Error("Esta Matriz é Imutável");
        }
        if (n > 0) {
            for (var i = 0; i < n; i++) {
                var val = this.matt.pop();
                if (val) {
                    this.matt.unshift(val);
                }
            }
        }
        else if (n < 0) {
            for (var i = 0; i > n; i--) {
                var val = this.matt.shift();
                if (val) {
                    this.matt.push(val);
                }
            }
        }
    };
    Matt.prototype.rotateCols = function (n) {
        if (!(this.isMutable)) {
            throw new Error("Esta Matriz é Imutável");
        }
        if (n > 0) {
            for (var _i = 0, _a = this.matt; _i < _a.length; _i++) {
                var i = _a[_i];
                for (var j = 0; j < n; j++) {
                    var val = i.pop();
                    i.unshift(val);
                }
            }
        }
        else if (n < 0) {
            for (var _b = 0, _c = this.matt; _b < _c.length; _b++) {
                var i = _c[_b];
                for (var j = 0; j > n; j--) {
                    i.push(i.shift());
                }
            }
        }
    };
    Matt.prototype.print = function () {
        console.log("\n");
        console.log("A Matriz é:");
        for (var _i = 0, _a = this.matt; _i < _a.length; _i++) {
            var i = _a[_i];
            if (this.isSet && this.mattType === "number") {
                var template = "[ ";
                for (var _b = 0, i_3 = i; _b < i_3.length; _b++) {
                    var j = i_3[_b];
                    if (j >= 0) {
                        template += "+".concat(j, " ");
                    }
                    else {
                        template += "".concat(j, " ");
                    }
                }
                template += "]";
                console.log(template);
            }
            else {
                console.log(i);
            }
        }
        console.log("\n");
    };
    Matt.prototype.copy = function () {
        var newMatt = [];
        for (var i in this.matt) {
            newMatt.push([]);
            for (var _i = 0, _a = this.matt[parseInt(i)]; _i < _a.length; _i++) {
                var j = _a[_i];
                newMatt[parseInt(i)].push(j);
            }
        }
        return new Matt(newMatt, this.isMutable);
    };
    Matt.prototype.switchRows = function (row, n) {
        var toMove = this.getRow(row);
        var newPosition = row + n;
        if (newPosition < 0) {
            newPosition = 0;
        }
        else if (newPosition >= this.rows) {
            newPosition = this.rows - 1;
        }
        var target = this.getRow(newPosition);
        var newMatt = [];
        for (var _i = 0, _a = this.matt; _i < _a.length; _i++) {
            var i = _a[_i];
            if (i === target) {
                newMatt.push(toMove);
            }
            else if (i === toMove) {
                newMatt.push(target);
            }
            else {
                newMatt.push(i);
            }
        }
        this.matt = newMatt;
    };
    Matt.prototype.getElement = function (row, col) {
        row = this.validate(row, "row");
        col = this.validate(col, "col");
        var obj = {
            row: this.getRow(row),
            col: this.getCol(col),
            value: this.matt[row][col],
            type: typeof this.matt[row][col]
        };
        return obj;
    };
    return Matt;
}());
exports.default = Matt;
