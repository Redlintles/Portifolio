"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateMatt = void 0;
var _matt_1 = __importDefault(require("./_matt"));
function validateMatt(n) {
    if (n === void 0) { n = 0; }
    return function (target, key, descriptor) {
        var childFunction = descriptor.value;
        descriptor.value = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            for (var _a = 0, args_1 = args; _a < args_1.length; _a++) {
                var i = args_1[_a];
                if (i instanceof _matt_1.default) {
                    var tests = [
                        i.isSquare,
                        n ? n === i.rows && n === i.cols : true,
                        i.isSet,
                        typeof i.matt[0][0] === "number"
                    ];
                    if (tests.indexOf(false) !== -1) {
                        throw new Error("Uma das Matrizes Passadas n\u00E3o cumpre um ou mais dos requisitos listados abaixo: \n A sua matriz \u00E9 quadrada?: ".concat(tests[0] ? "Sim" : "Não", "\n                A sua matriz \u00E9 do tamanho desejado?: ").concat(tests[1] ? "Sim" : "Não", "\n                A sua Matriz possu\u00ED apenas n\u00FAmeros entre seus itens?: ").concat(tests[2] && tests[3] ? "Sim" : "Não"));
                    }
                }
            }
            return childFunction.apply(this, args);
        };
    };
}
exports.validateMatt = validateMatt;
