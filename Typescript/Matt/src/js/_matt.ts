import {_Matt,mapCallback,matt,Element,genLaw} from "./_meta";

class Matt implements _Matt {
  matt: matt
  readonly isMutable: boolean

  isMatt(matt: matt) {
    let mainLength: number = matt[0].length;
    for(let i of matt){
      if(i.length != mainLength) {
        return false
      }
    }
    return true
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
      if(this.isMatt(matt)) {
        this.matt = matt;
      } else {
        this.matt = [];
        throw new Error("Matt não é uma matriz!")
      }
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
  get mattType() {
    if(this.isSet) {
      return typeof this.matt[0][0]
    } else {
      return "any"
    }
  }
  firstOccOf(el: any):any{
    for(let i of this.matt) {
      for(let j of i){
        if(j === el) {
          return [i,j]
        }
      }
    }
    return -1
  }
  getRow(n: number): any[] {
    
    n = this.validate(n,"row");
    let row: any[] = []
    for(let i of this.matt[n]) {
      row.push(i);
    }
    return row;
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
    this.throwChangableError()
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
    this.throwChangableError()
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
    this.throwChangableError()
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
    this.throwChangableError()
    if(n > 0) {
      for(let i=0; i < n; i++) {
        let val = this.matt.pop();
        if(val) {
          this.matt.unshift(val)
        }
      }
    }
    else if (n < 0) {
      for(let i=0; i > n; i--) {
        let val = this.matt.shift();
        if(val) {
          this.matt.push(val)
        }
      }
    }
  }
  rotateCols(n: number): void {
    this.throwChangableError()
    
    if(n > 0) {
      for(let i of this.matt) {
        for(let j = 0; j<n; j++) {
          let val: any = i.pop()
          i.unshift(val)
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
  print():void {
    console.log("\n")
    console.log("A Matriz é:")
    for(let i of this.matt) {
      if(this.isSet && this.mattType === "number") {
        let template = "[ ";
        for(let j of i) {
          if(j >= 0) {
            template += `+${j} `;
          } else {
            template += `${j} `;
          }
        }
        template+= "]";
        console.log(template);
      } else {
        console.log(i)
      }
    }
    console.log("\n");
  }
  copy() {
    let newMatt: matt = [];
    for(let i in this.matt) {
      newMatt.push([]);
      for(let j of this.matt[parseInt(i)]){
        newMatt[parseInt(i)].push(j)
      }
    }
    return new Matt(newMatt,this.isMutable)
  }
  switchRows(row: number, n:number):void {
    this.throwChangableError()
    let toMove = this.getRow(row);
    let newPosition = row+n;
    if(newPosition < 0) {
      newPosition = 0;
    } else if (newPosition >= this.rows) {
      newPosition = this.rows-1;
    }
    let target = this.getRow(newPosition);
    
    let newMatt: matt = [];
    
    for(let i of this.matt) {
      if(i === target) {
        newMatt.push(toMove)
      } else if(i === toMove) {
        newMatt.push(target)
      } else {
        newMatt.push(i)
      }
    }
    this.matt = newMatt;
  }
  getElement(row: number,col: number):Element {
    row = this.validate(row,"row");
    col = this.validate(col,"col");
    let obj: Element = {
      row: this.getRow(row),
      col: this.getCol(col),
      value: this.matt[row][col],
      type: typeof this.matt[row][col]
    }
    return obj
  }
}
export default Matt

