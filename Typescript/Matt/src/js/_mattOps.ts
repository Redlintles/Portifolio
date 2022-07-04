import {_Matt,matt,genLaw} from "./_meta";
import {isNumberMatt,validateMattOps,validateMult} from "./_decorators";
import Matt from "./_matt";


class MattOps {
  @validateMattOps()
  static sum(matt1: _Matt,matt2: _Matt):_Matt  {
    const newMatt: matt<number> = [];
    for(let i=0; i<matt1.rows;i++) {
      newMatt.push([])
      const row1:number[] = matt1.matt[i];
      const row2:number[] = matt2.matt[i];
      
      for(let j=0;j<row1.length;j++) {
        const operationRow = newMatt[i];
        const sum: number = row1[j]+row2[j];
        operationRow.push(sum);
      }
    }
    const resultMatt: _Matt = new Matt(newMatt,true);
    return resultMatt;
  }
  @validateMattOps()
  static sub(matt1: _Matt,matt2: _Matt):_Matt  {
    const newMatt: matt<number> = [];
    for(let i=0; i<matt1.rows;i++) {
      newMatt.push([])
      const row1:number[] = matt1.matt[i];
      const row2:number[] = matt2.matt[i];
      
      for(let j=0;j<row1.length;j++) {
        const operationRow = newMatt[i];
        const sub: number = row1[j]-row2[j];
        operationRow.push(sub);
      }
    }
    const resultMatt = new Matt(newMatt,true)
    
    return resultMatt;
  }
  @validateMult()
  static mult(matt1: _Matt,matt2: _Matt):_Matt  {
    const newMatt: matt<number> = [];
    for(let i=0;i<matt1.rows;i++) {
      const targetRow: number[] = matt1.getRow(i);
      newMatt.push([]);
      for(let j=0; j< matt2.cols; j ++) {
        const row: number[] = [];
        const targetCol: number[] = matt2.getCol(j);
        for(let k in targetRow) {
          row.push(targetRow[k]*targetCol[k])
        }
        const result: number = row.reduce((acc,crr)=>{return acc+crr})
        newMatt[i].push(result)
      }
    }
    const resultMatt = new Matt(newMatt,true)
    
    return resultMatt;
  }
  @validateMult()
  static div(matt1: _Matt,matt2: _Matt): _Matt {
    const inverted: _Matt = this.invert(matt2);
    
    return this.mult(matt1,inverted);
  }
  static pow(matt: _Matt,exp: number): _Matt {
    const arr: Array<_Matt> = Array.from({length: exp-1}, (v,k)=>{return matt.copy()})
    
    const resultMatt: _Matt = arr.reduce((acc,crr)=>{
      return this.mult(acc,crr)
    },arr[0]);
    
    return resultMatt;
  }  
  @validateMattOps()
  static invert(matt: _Matt): _Matt {
    const newMatt: matt<number> = [];
    
    for(let i = 0; i < matt.rows; i++) {
      newMatt.push([]);
      for(let j=0; j < matt.matt[i].length; j++) {
        const operationRow = newMatt[i];
        const n: number = matt.matt[i][j];
        operationRow.push(n*-1);
      }
    }
    const resultMatt = new Matt(newMatt,true)
    
    return resultMatt;
    
  }
  static createMatt(gen: genLaw): _Matt {
    const newMatt: matt<number> = [];
    const alpha: string[] = []
    
    for(let i=0; i<26; i++) {
      alpha.push(String.fromCharCode(97+i))
      alpha.push(String.fromCharCode(65+i))
      
    }
    for(let i of gen.law) {
      if((i === "i" || i === "j") || (i === "I" || i=== "J")) 
      {
        continue
      } else if(alpha.indexOf(i)===-1){
        continue
      } else {
        throw new Error("As únicas letras que a expressão da lei de formação podem ter são I e J!")
      }
    }
    const copy = (str: string)=>{
      let copy: string = "";
      for(let k of gen.law) {
        copy+=k
      }
      return copy
      
    }
    for(let i = 1 ; i <= gen.rows ; i++) {
      newMatt.push([]);
      for(let j = 1 ; j <= gen.cols ; j++) {
        let tpLaw: string = copy(gen.law)
        
        tpLaw = tpLaw.split("^").join("**");
        tpLaw = tpLaw.split(".").join("*");
        
        tpLaw = tpLaw.split("i").join(i.toString());
        
        tpLaw = tpLaw.split ("j").join(j.toString());
        newMatt[i-1].push(parseInt(eval(tpLaw)))
      }
    }
    
    const resultMatt: _Matt = new Matt(newMatt,true)
    return resultMatt;
  }
  @validateMattOps()
  static realMult(matt: _Matt, n: number):_Matt{
    const newMatt: matt<number> = [];
    
    for(let i of matt.matt) {
      let newRow = i.map((element)=>{
        return element*n;
      })
      newMatt.push(newRow);
    }
    
    const resultMatt: _Matt = new Matt(newMatt,true)
    return resultMatt;
  }
  static amplify(matt1:_Matt,matt2:_Matt):_Matt{
    if(matt1.rows !== matt2.rows) {
      throw new Error("As matrizes precisam ter o mesmo número de linhas!")
    }
    const mattCopy = matt1.copy()
    for(let i = 0; i < matt2.cols; i++) {
      let col: any[] = matt2.getCol(i)
      mattCopy.addCol(col)
    }
    return mattCopy;
    
  }
}
export default MattOps