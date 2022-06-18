import Matt from "./_matt";

export function validateMatt(n: number = 0) {
  return function
    (
      target: Object,
      key: string | Symbol,
      descriptor: PropertyDescriptor
    ) {
      const childFunction = descriptor.value
      
      descriptor.value = function(...args: any[]) {
        for(let i of args) {
          if(i instanceof Matt) {
            let tests: boolean[] = 
            [
              i.isSquare,
              n?n === i.rows && n === i.cols: true,
              i.isSet,
              typeof i.matt[0][0] === "number"
            ]
            if(tests.indexOf(false) !== -1) {
              throw new Error(
                `Uma das Matrizes Passadas não cumpre um ou mais dos requisitos listados abaixo: \n A sua matriz é quadrada?: ${tests[0]? "Sim": "Não"}
                A sua matriz é do tamanho desejado?: ${tests[1]? "Sim": "Não"}
                A sua Matriz possuí apenas números entre seus itens?: ${tests[2] && tests[3]? "Sim": "Não"}`
                
                )
            }
          }
        }
        return childFunction.apply(this,args)
      }
    }
}