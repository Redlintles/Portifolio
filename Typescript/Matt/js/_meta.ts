export type matt<T = any> = Array<T[]>;
export type mapCallback = (scope: any[],unity: number) => any[];

export interface _Matt {
  matt: matt
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
  printMatt(): void;
  copyMatt(): _Matt;
  get cols(): number
  get rows(): number
  get isSquare(): boolean
  get isSet(): boolean
  get diag(): any[]
  get secDiag(): any[]
  get mattType(): string
}

export interface _Det {
  of2x2(matt: _Matt): number
  of3x3(matt: _Matt): number
  laPlace(matt: _Matt): number
}




