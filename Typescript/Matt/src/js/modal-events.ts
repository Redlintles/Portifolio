import Modal from "./Modal"
import {elm} from "./_meta"

const addBtn: elm = document.querySelector(".result__plus-btn");

if(addBtn) {
  addBtn.addEventListener("click", function(){
    console.log("clicou")
const modal = new Modal({
  title: "ababda",
  innerCode: "aa"
});
  })
}