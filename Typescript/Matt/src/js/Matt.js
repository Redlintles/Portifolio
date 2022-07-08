import Matt from "./_matt";
import Det from "./_det";
import MattOps from "./_mattOps";
const matt1 = new Matt([
    [7, 2],
    [6, 5],
], true);
const matt2 = new Matt([
    [1, -4, 0],
    [0, 1, 3],
    [3, 2, 1],
], true);
const matt3 = new Matt([
    [1, -4, 0, 0, 7],
    [7, -26, 3, 0, 6],
    [3, 2, 7, -1, 5],
    [2, 2, 1, 13, 7],
    [8, 6, 9, 5, 2]
], true);
const matt4 = new Matt([
    [1, -4, 0, 0],
    [0, 1, 3, 0],
    [3, 2, 1, -1],
    [0, 2, 1, 13],
    [-7, 4, 2, 2]
], true);
const matt5 = new Matt([
    [1, 1, 1, 1],
    [2, 3, 4, 5],
    [4, 9, 16, 25],
    [8, 27, 64, 125],
], true);
const matt6 = new Matt([
    [1, 2, 4, 8],
    [1, 3, 9, 27],
    [1, 4, 16, 64],
    [1, 5, 25, 125],
], true);
const matt7 = new Matt([
    [1, 1, 1, 1],
    [1, 2, 3, 4],
    [1, 4, 9, 16],
    [1, 8, 27, 64],
], true);
const matt9 = new Matt([
    [6, -4],
    [6, 7],
    [3, 2]
], true);
const matt10 = new Matt([
    [6, -4, 8],
    [6, 7, 4]
], true);
let matt12 = MattOps.createMatt({
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
let det1 = Det.laPlace(matt7);
let det2 = Det.chioRule(matt7);
let det3 = Det.detTriangle(matt7);
let det4 = Det.vander(matt7);
matt7.print();
console.log(det1, det2, det3, det4);
