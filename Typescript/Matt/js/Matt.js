"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var _matt_1 = __importDefault(require("./_matt"));
var _det_1 = __importDefault(require("./_det"));
var matt1 = new _matt_1.default([
    [1, "2"],
    [0, 1],
], true);
var matt2 = new _matt_1.default([
    [1, -4, 0],
    [0, 1, 3],
    [3, 2, 1],
], true);
var matt3 = new _matt_1.default([
    [1, -4, 0, 0],
    [0, 1, 3, 0],
    [3, 2, 1, -1],
    [0, 2, 1, 13]
], true);
var matt4 = new _matt_1.default([
    [1, -4, 0, 0, 5],
    [0, 1, 3, 0, 3],
    [3, 2, 1, -1, 2],
    [0, 2, 1, 13, 1],
    [-7, 4, 2, 2, 8]
], true);
var detCalculator = new _det_1.default();
//matt4.print()
matt1.print();
console.log(detCalculator.of2x2(matt1));
matt2.print();
console.log(detCalculator.of3x3(matt2));
matt3.print();
console.log(detCalculator.laPlace(matt3));
//console.log(detCalculator.laPlace(matt4));
//console.log(detCalculator.chioRule(matt4));
//console.log(detCalculator.gaussElimination(matt4))
/*
matt1.rotateCols(1);
matt1.print()
matt1.rotateCols(-2);
matt1.print()
*/
//console.log(Det.of3x3(matt1));
//console.log(matt1.isSquare);
//console.log(matt1.matt);
//console.log(matt1.isSet)
//console.log(matt1.rows);
//console.log(matt1.cols);
//console.log(matt1.getCol(2));
//console.log(matt1.getRow(2));
//matt1.addCol([4,7,10]);
//console.log(matt1.matt);
//matt1.addRow([7,6,8]);
//console.log(matt1.matt);
//matt1.removeCol(1);
//matt1.removeRow(1);
//console.log(matt1.matt);
//console.log(matt1.diag);
//console.log(matt1.secDiag);
/*
let matt2 = matt1.mapRows(
  (scope: any[],unity: number) => {
  let newMatt = []
  for(let i of scope) {
    newMatt.push(i*unity)
  }
  return newMatt
});
let matt3 = matt1.mapCols(
  (scope: any[],unity: number) => {
  let newMatt = []
  for(let i of scope) {
    newMatt.push(i+unity)
  }
  return newMatt
});



console.log(matt2);
console.log(matt3);
*/ 
