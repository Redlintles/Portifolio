import Matt from "./_matt";
import {_Matt,_Det} from "./_meta";
import Det from "./_det";

const matt1: _Matt = new Matt(
  [[7,6,2,3],[4,6,8,1],[9,1,5,-6],[
    8,-4,2,7]],true
  
);

let detCalculator: _Det = new Det();

matt1.printMatt()
console.log(detCalculator.of4x4(matt1))
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