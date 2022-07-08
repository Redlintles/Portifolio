import Matt from "./_matt";
export function isNumberMatt(matt) {
    if (matt.isSet && matt.getElement(0, 0).type === "number") {
        return true;
    }
    else {
        return false;
    }
}
export function validateMattDet(n = 0) {
    return function (target, key, descriptor) {
        const childFunction = descriptor.value;
        descriptor.value = function (...args) {
            for (let i of args) {
                if (i instanceof Matt) {
                    let tests = [
                        i.isSquare,
                        n ? n === i.rows && n === i.cols : true,
                        isNumberMatt(i)
                    ];
                    if (tests.indexOf(false) !== -1) {
                        throw new Error(`Uma das Matrizes Passadas não cumpre um ou mais dos requisitos listados abaixo: \n A sua matriz é quadrada?: ${tests[0] ? "Sim" : "Não"}
                A sua matriz é do tamanho desejado?: ${tests[1] ? "Sim" : "Não"}
                A sua Matriz possuí apenas números entre seus itens?: ${tests[2] && tests[3] ? "Sim" : "Não"}`);
                    }
                }
            }
            return childFunction.apply(this, args);
        };
    };
}
export function validateMattOps() {
    return function (target, propertyKey, descriptor) {
        const childFunction = descriptor.value;
        descriptor.value = function (...args) {
            let list = [];
            for (let i of args) {
                if (i instanceof Matt) {
                    if (!(isNumberMatt(i))) {
                        throw new Error("Apenas Matrizes Numéricas são aceitas");
                    }
                    list.push(i);
                }
            }
            let mainOrder = [list[0].rows, list[0].cols];
            for (let i of list) {
                let xy = [i.rows, i.cols];
                if (!(xy[0] === mainOrder[0]) || !(xy[1] === mainOrder[1])) {
                    throw new Error("As matrizes devem ter as mesmas dimensões!");
                }
            }
            return childFunction.apply(this, args);
        };
    };
}
export function validateMult() {
    return function (target, propertyKey, descriptor) {
        const childFunction = descriptor.value;
        descriptor.value = function (...args) {
            for (let i of args) {
                if (!(isNumberMatt(i))) {
                    throw new Error("A Matriz deve conter apenas números entre seus itens!");
                }
            }
            if (args[0].cols != args[1].rows) {
                throw new Error("A multiplicação de matrizes só pode ser realizada caso o número de colunas da primeira matriz seja igual ao número de linhas da segunda!");
            }
            return childFunction.apply(this, args);
        };
    };
}
