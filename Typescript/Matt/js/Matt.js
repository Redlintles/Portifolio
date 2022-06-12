"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _matt_1 = require("./_matt");
var _det_1 = require("./_det");
var matt1 = new _matt_1.default([
    [7, 6, 2, 3, 2, 4],
    [4, 6, 8, 1, 8, 9],
    [9, 1, 5, -6, -3, 5],
    [8, -4, 2, 7, -3, 8],
    [2, 5, 6, 4, 8, 1],
    [5, 6, 7, -9, 3, 2]
], true);
var detCalculator = new _det_1.default();
matt1.printMatt();
console.log(detCalculator.laPlace(matt1));
/*
matt1.rotateCols(1);
matt1.printMatt()
matt1.rotateCols(-2);
matt1.printMatt()
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
