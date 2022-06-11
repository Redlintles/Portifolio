import {_Matt,mapCallback,matt} from "./_meta";

class Matt implements _Matt {
  matt: matt
  private isMutable: boolean

  private isMatt(matt: matt) {
    let mainLength = matt[0].length;
    for(let i of matt){
      if(i.length != mainLength) {
        throw new Error("matt não é uma matriz!")
      }
    }
    this.matt = matt
  }
  private throwChangableError() {
    if(!(this.isMutable)) {
      throw new Error("A Matriz é Imutável")
    }
  }
  
  private validate(n: number,dimension: "col" | "row") {
    let message: string = dimension === "col" ? "Essa coluna não existe!" : "Essa linha não existe";
    let scope: number = dimension === "col" ? this.cols : this.rows;
    
    if(n === scope) {
      n--;
    } 
    else if(n < 0 || n > scope) {
      throw new Error(message);
    }
    return n;
  }
  
  constructor 
    (
      matt: matt,
      isMutable: boolean = false
    )
    {
      this.isMatt(matt);
      this.isMutable = isMutable;
    };
  get cols():number{
    return this.matt[0].length;
  };
  get rows():number{
    return this.matt.length;
  };
  get diag(): any[] {
    if(!(this.isSquare)) {
      throw new Error("A Matriz não é quadrada!");
    }
    let iter: number = 0;
    let dg: any[] = [];
    for(let i of this.matt) {
      dg.push(i[iter]);
      iter++;
    }
    return dg
  };
  get secDiag(): any[] {
    if(!(this.isSquare)){
      throw new Error("A Matriz não é quadrada!")
    }
    let dg: any[] = [];
    let iter: number = this.cols-1
    for(let i of this.matt){
      dg.push(i[iter]);
      iter--;
    }
    return dg
  };
  get isSquare():boolean{
    return (this.rows===this.cols)
  };
  get isSet():boolean{
    let mainType = typeof this.matt[0][0];
    for(let i of this.matt){
      for(let j of i){
        if(typeof j != mainType){
          return false
        }
      }
    }
    return true
  };
  getRow(n: number): any[] {
    
    n = this.validate(n,"row");
    return this.matt[n];
  };
  getCol(n: number): any[] {
    let col: Array<any> = [];
    
    n = this.validate(n,"col");
    
    for(let i of this.matt){
      col.push(i[n]);
    }
    
    return col;
  };
  addCol(arr: any[]): void {
    if(!(this.isMutable)) {
      throw new Error("Esta Matriz é Imutável")
    }
    if (arr.length === this.rows) {
      for(let i in arr) {
        this.matt[i].push(arr[i]);
      }
    }
  }
  addRow(arr: any[]): void {
    this.throwChangableError()
    if(arr.length === this.cols) {
      this.matt.push(arr)
    }
  }
  removeCol(n: number): void {
    n = this.validate(n,"col");
    let newMatt: matt = [];
    for(let i in this.matt) {
      newMatt.push([]);
      
      for(let j in this.matt[i]) {
        
        if(parseInt(j) === n) {
          continue;
        } else {
          newMatt[i].push(this.matt[i][j]);
        }
      }
    }
    this.matt = newMatt;
  }
  removeRow(n: number): void {
    n = this.validate(n,"row");
    let newMatt: matt = [];
    for(let i in this.matt){
      if(parseInt(i) === n) {
        continue;
      } else {
        newMatt.push(this.matt[i]);
      }
    }
    this.matt = newMatt;
    
  }
  
  mapRows(callbackFn: mapCallback):matt{
    let newMatt:matt = [];
    
    for(let i in this.matt) {
      newMatt.push(callbackFn(
        this.getRow(parseInt(i)),parseInt(i)));
    }
    
    return newMatt
    
  }
  mapCols(callbackFn: mapCallback): matt {
    let newMatt: matt = [];
    for(let i in this.matt[0]) {
      newMatt.push(callbackFn(this.getCol(parseInt(i)),parseInt(i)));
    }
    return newMatt
  }
  rotateRows(n: number):void {
    if(!(this.isMutable)) {
      throw new Error("Esta Matriz é Imutável")
    }
    if(n > 0) {
      for(let i=0; i < n; i++) {
        this.matt.unshift(this.matt.pop())
      }
    }
    else if (n < 0) {
      for(let i=0; i > n; i--) {
        this.matt.push(this.matt.shift())
      }
    }
  }
  rotateCols(n: number): void {
    if(!(this.isMutable)) {
      throw new Error("Esta Matriz é Imutável")
    }
    
    if(n > 0) {
      for(let i of this.matt) {
        for(let j = 0; j<n; j++) {
          i.unshift(i.pop())
        }
      }
    } else if(n < 0) {
      for(let i of this.matt) {
        for(let j=0; j>n; j--) {
          i.push(i.shift())
        }
      }
    }
  }
  printMatt():void {
    console.log("\n")
    console.log("\n A Matriz é:")
    for(let i of this.matt) {
      console.log(i)
    }
    console.log("\n");
  }
  copyMatt() {
    let newMatt: matt = [];
    for(let i in this.matt) {
      newMatt.push([]);
      for(let j of this.matt[parseInt(i)]){
        newMatt[parseInt(i)].push(j)
      }
    }
    return new Matt(newMatt,this.isMutable)
  }
}
export default Matt

