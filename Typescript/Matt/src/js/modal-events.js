"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Modal_1 = __importDefault(require("./Modal"));
const addBtn = document.querySelector(".result__plus-btn");
if (addBtn) {
    addBtn.addEventListener("click", function () {
        console.log("clicou");
        const modal = new Modal_1.default({
            title: "ababda",
            innerCode: "aa"
        });
    });
}
