export type matt<T = any> = Array<T[]>;
export type mapCallback = (scope: any[],index: number) => any[];

interface _Element {
  col: any[];
  row: any[];
  value: any;
  type: string;
}

export type Element = Readonly<_Element>
export interface genLaw {
  law: string
  rows: number
  cols: number
}

export interface _Matt {
  matt: matt
  isMutable: boolean
  isMatt(matt: matt): boolean
  getCol(n: number): any[]
  getRow(n: number): any[]
  addCol(arr: any[]): void;
  addRow(arr: any[]): void;
  removeCol(n: number): void;
  removeRow(n: number): void;
  mapRows(callbackFn: mapCallback): matt;
  mapCols(callbackFn: mapCallback): matt;
  rotateRows(n: number): void;
  rotateCols(n: number): void;
  print(): void;
  copy(): _Matt;
  switchRows(row: number, n: number): void
  firstOccOf(el: any): any;
  getElement(row: number, col: number): Element;
  get cols(): number
  get rows(): number
  get isSquare(): boolean
  get isSet(): boolean
  get diag(): any[]
  get secDiag(): any[]
  get mattType(): string

  
}

interface _Det {
  of2x2(matt: _Matt): number
  of3x3(matt: _Matt): number
  laPlace(matt: _Matt): number
  chioRule(matt: _Matt): number
  gaussElimination(matt: _Matt): number
}

interface _MattOps {
  sum(matt1: _Matt, matt2: _Matt): _Matt
  sub(matt1: _Matt, matt2: _Matt): _Matt
  mult(matt1: _Matt, matt2: _Matt): _Matt
  invert(matt: _Matt): _Matt
  createMatt(law: genLaw): _Matt
  div(matt1: _Matt,matt2: _Matt): _Matt
  pow(matt: _Matt,exp: number): _Matt
}

