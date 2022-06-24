import Matt from "./_matt";
import {_Matt,_Det} from "./_meta";
import Det from "./_det";
import MattOps from "./_mattOps"

const matt1: _Matt = new Matt(
  
  [
    [7,2],
    [6,5],
  ],
    true
  
);
const matt2: _Matt = new Matt(
  
  [
    [1,-4,0],
    [0,1,3],
    [3,2,1],
  ],
    true
  
);
const matt3: _Matt = new Matt(
  
  [
    [1,-4,0,0],
    [0,1,3,0],
    [3,2,1,-1],
    [0,2,1,13]
  ],
    true
  
);
const matt4: _Matt = new Matt(
  
  [
    [1,-4,0,0],
    [0,1,3,0],
    [3,2,1,-1],
    [0,2,1,13],
    [-7,4,2,2]
  ],
    true
  
);
const matt5: _Matt = new Matt(
  
  [
    [6,-4,8,2],
    [6,7,4,2],
    [3,2,1,-7],
    [0,2,1,14],
    [-7,4,2,2]
  ],
    true
  
);
const matt9: _Matt = new Matt(
  
  [
    [6,-4],
    [6,7],
    [3,2]
  ],
    true
  
);
const matt10: _Matt = new Matt(
  
  [
    [6,-4,8],
    [6,7,4]
  ],
    true
  
);

let detCalculator: _Det = new Det();
//matt4.print()
/*
matt1.print();
console.log(detCalculator.of2x2(matt1));
matt2.print();
console.log(detCalculator.of3x3(matt2));
matt3.print();
console.log(detCalculator.laPlace(matt3));
*/
let operations = new MattOps();
/*
matt4.print();

matt5.print();
let matt6: _Matt = operations.sum(matt4,matt5);

matt6.print()

let matt7: _Matt = operations.sub(matt4,matt5);

matt7.print()
let matt8: _Matt = operations.invert(matt7);
matt8.print()
*/
/*
matt9.print()
matt10.print()
let matt11: _Matt = operations.mult(matt9,matt10)


matt11.print()
*/
let matt12: _Matt = operations.createMatt({
  rows: 5,
  cols: 5,
  law: "(i*j)+i^2"
})

//matt12.print()
/*
matt9.print();
matt10.print();
let matt13: _Matt = operations.div(matt9,matt10);
matt13.print()
*/
matt1.print()
let matt14: _Matt = operations.pow(matt1,2);

matt14.print()

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