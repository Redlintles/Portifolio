"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _matt_1 = __importDefault(require("./_matt"));
const _det_1 = __importDefault(require("./_det"));
const _mattOps_1 = __importDefault(require("./_mattOps"));
const matt1 = new _matt_1.default([
    [7, 2],
    [6, 5],
], true);
const matt2 = new _matt_1.default([
    [1, -4, 0],
    [0, 1, 3],
    [3, 2, 1],
], true);
const matt3 = new _matt_1.default([
    [1, -4, 0, 0, 7],
    [7, -26, 3, 0, 6],
    [3, 2, 7, -1, 5],
    [2, 2, 1, 13, 7],
    [8, 6, 9, 5, 2]
], true);
const matt4 = new _matt_1.default([
    [1, -4, 0, 0],
    [0, 1, 3, 0],
    [3, 2, 1, -1],
    [0, 2, 1, 13],
    [-7, 4, 2, 2]
], true);
const matt5 = new _matt_1.default([
    [1, 1, 1, 1],
    [2, 3, 4, 5],
    [4, 9, 16, 25],
    [8, 27, 64, 125],
], true);
const matt6 = new _matt_1.default([
    [1, 2, 4, 8],
    [1, 3, 9, 27],
    [1, 4, 16, 64],
    [1, 5, 25, 125],
], true);
const matt7 = new _matt_1.default([
    [1, 1, 1, 1],
    [1, 2, 3, 4],
    [1, 4, 9, 16],
    [1, 8, 27, 64],
], true);
const matt9 = new _matt_1.default([
    [6, -4],
    [6, 7],
    [3, 2]
], true);
const matt10 = new _matt_1.default([
    [6, -4, 8],
    [6, 7, 4]
], true);
let matt12 = _mattOps_1.default.createMatt({
    rows: 5,
    cols: 5,
    law: "(i*j)+i^2"
});
//matt12.print()
/*
matt9.print();
matt10.print();
let matt13: _Matt = MattOps.div(matt9,matt10);
matt13.print()
*/
let det1 = _det_1.default.laPlace(matt7);
let det2 = _det_1.default.chioRule(matt7);
let det3 = _det_1.default.detTriangle(matt7);
let det4 = _det_1.default.vander(matt7);
matt7.print();
console.log(det1, det2, det3, det4);
