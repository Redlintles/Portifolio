import {_Matt,_Det} from "./_meta";
import Matt from "./_matt";

class Det implements _Det {
  private validate(matt: _Matt,n: number) {
    if(!(matt.isSquare)){
      throw new Error("Apenas Matrizes Quadradas possuem determinantes!")
    } else if(!(n === matt.rows)) {
      throw new Error(`A Matriz Passada não é ${n}x${n}!`)
    } else if(!(matt.isSet &&  typeof matt.matt[0][0] === "number")) {
      throw new Error("A matriz dve conter apenas números entre seus itens!")
    }
  }
  of2x2(matt: _Matt):number {
    this.validate(matt,2);
    let diag1: number[] = matt.diag;
    let diag2: number[] = matt.secDiag;
    
    let result1:number = diag1.reduce((acc,crr) => acc*crr,1);
    let result2:number = diag2.reduce((acc,crr) => acc*crr,1);
    return result1-result2;
  }
  of3x3(matt: _Matt):number {
    matt = new Matt(matt.matt,true);
    this.validate(matt,3);
    let diags: number[] = [];
    let secDiags: number[] = [];
    for(let i=0; i<3;i++){
      diags.push(matt.diag.reduce((acc,crr)=>{return acc*crr},1));
      secDiags.push(matt.secDiag.reduce((acc,crr)=>{return acc*crr},1));
      matt.rotateCols(-1)
    };
    let n1:number = diags.reduce((acc,crr)=>{return acc+crr},1);
    let n2:number = secDiags.reduce((acc,crr)=>{return acc+crr},1);
    return n1-n2
  }
  of4x4(matt: _Matt):number {
    this.validate(matt,4)
    let firstCol: number[] = matt.getCol(0);
    let coeficients: number[] = []
    for(let i in firstCol) {
      let n = parseInt(i)
      let mattCopy = matt.copyMatt();
      mattCopy.removeCol(0);
      mattCopy.removeRow(n);
      
      let modifier = Math.pow(-1,(n+1)+1);
      coeficients.push(modifier*this.of3x3(mattCopy));
    }
    let results: number[] = []
    for(let i in firstCol) {
      let n = parseInt(i);
      results.push(firstCol[n]*coeficients[n])
    }
    return results.reduce((acc,crr)=>{return acc+crr},0)
  }
}

export default Det