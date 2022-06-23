import {_Matt,_Det,matt} from "./_meta";
import Matt from "./_matt";
import {validateMattDet} from "./_decorators";
class Det implements _Det {
  @validateMattDet(2)
  of2x2(matt: _Matt):number {
    //this.validate(matt,2);
    let diag1: number[] = matt.diag;
    let diag2: number[] = matt.secDiag;
    
    let result1:number = diag1.reduce((acc,crr) => acc*crr,1);
    let result2:number = diag2.reduce((acc,crr) => acc*crr,1);
    return result1-result2;
  }
  @validateMattDet(3)
  of3x3(matt: _Matt):number {
    matt = matt.copy();
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
  @validateMattDet()
  laPlace(matt: _Matt):number {
    if(matt.rows < 4) {
      throw new Error("o Uso ideal do teorema de La Place é para matrizes grandes, use métodos mais simples para matrizes menores!")
    }
    let firstCol: number[] = matt.getCol(0);
    let coeficients: number[] = [];
    let results: number[] = [];
    for(let i in firstCol) {
      let n = parseInt(i);
      let mattCopy = matt.copy()
      mattCopy.removeCol(0);
      mattCopy.removeRow(n);
      let modifier = Math.pow(-1,(n+1)+1)
      let result: number;
      if(mattCopy.rows === 3) {
        result = this.of3x3(mattCopy)
      } else {
        result = this.laPlace(mattCopy);
      }
      coeficients.push(modifier*result)
    }
    for(let i in firstCol) {
      let item1 = firstCol[parseInt(i)];
      let item2 = coeficients[parseInt(i)];
      results.push(item1*item2)
    }
    return results.reduce((acc,crr)=>{return acc+crr})
  }  
  @validateMattDet()
  chioRule(matt: _Matt):number {
    const firstCol:number[] = matt.getCol(0);
    const firstRow:number[] = matt.getRow(0);
    const mattCopy: _Matt = matt.copy();
    let recursive:boolean = false;
    const MCM:matt<number> = mattCopy.matt;
    const newMatt:matt<number> = []
    
    firstCol.shift();
    firstRow.shift();
    
    mattCopy.removeCol(0);
    mattCopy.removeRow(0);
    for(let i in MCM) {
      let n1:number = parseInt(i);
      if(n1 === 0) {
        continue
      } else {
        n1--;
      }
      const marginX:number = firstCol[n1];
      newMatt.push([]);
      for(let j in MCM[n1]) {
        let n2:number = parseInt(j)
        if(n2 === 0) {
          continue; 
        } else {
          n2--;
        }
        const marginY:number = firstRow[n2];
        const item:number = MCM[i][j];
        newMatt[n1].push(item-(marginX*marginY));
      }
    }
    
    const resultMatt: _Matt = new Matt(newMatt,true);
    
    if(resultMatt.rows > 3 && resultMatt.rows != matt.rows) {
      recursive = true;
    }
    let result: number = Infinity;
    if(recursive) {
      result = this.chioRule(resultMatt);
    } else if(resultMatt.rows === 3){
      result = this.of3x3(resultMatt);
    }
    return result
  }
  @validateMattDet()
  gaussElimination(matt: _Matt):number {
    let mainDiag: number[] = matt.diag;
    let mattCopy: _Matt = matt.copy();
    let MCM: matt<number> = mattCopy.matt
    let newMatt:matt<number> = []
    for(let i=0; i< mattCopy.rows-1; i++) {
      let keyObj = mattCopy.getElement(i,i);
      
      let pivot: number = keyObj.value
      let pivotRow = keyObj.row;
      let pivotCol = keyObj.col;
      if(i === 0) {
        newMatt.push(mattCopy.getRow(i))
      }
      if(pivot === 0) {}
      for(let j=0; i<=j; i++) {
        pivotCol.shift()
        pivotCol.unshift("GaussElim")
      }
      console.log(pivotCol)
      for(let j in pivotCol) {
        let n = parseInt(j)
        if(pivotCol[j] != "GaussElim" && pivotCol[j] != 0) {
          let row = mattCopy.getRow(n)
          let modifier: number = (pivotCol[j]/pivot)
          for(let k of pivotRow) {
            k*=pivotCol[j];
          }
          for(let k in row) {
            row[k]-= pivotRow[k];
          }  
          newMatt.push(row)
        }
        
      }
    
      
    }
    
    let resultMatt: _Matt = new Matt(newMatt,true);
    resultMatt.print()
    
    return 1
  }
}
export default Det