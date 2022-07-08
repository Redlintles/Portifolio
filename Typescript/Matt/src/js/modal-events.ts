import Modal from "./Modal.js";
import {elm,inputElm} from "./_meta.js";
let old: [number,number];
const positiveIcon: string = '<i class="fas fa-plus"></i>';
const negativeIcon: string = '<i class="fas fa-minus"></i>';
function rawField():string {
  return ""+
  '<div class="raw-field">'+
  '<button class="field-signal">'+
  positiveIcon+
  '</button>'+
  '<input type="number" class="field-number">'+
  '</div>'
}
function signalEventApplier() {
  const signalBtnList = document.querySelectorAll(".field-signal");
  if(signalBtnList) {
    signalBtnList.forEach(function(i){
      i.addEventListener("click",function(){
        let ch = i.innerHTML;
        if(ch === positiveIcon && ch) {
          i.innerHTML = negativeIcon;
        } else if(ch) {
          i.innerHTML = positiveIcon;
        }
      })
    })
  }
}

function updateFields() {
  console.log("bay")
  const rows: inputElm = document.querySelector("#rows-field");
  const cols: inputElm = document.querySelector("#cols-field");
  const mattFieldsContainer: elm = document.querySelector("#matt-fields-container");
  let result: string = ""
  if(rows && cols && mattFieldsContainer) {
    let double: [number,number] = [parseInt(rows.value),parseInt(cols.value)]
    if(old && old[0]===double[0] && old[1]===double[1]) {
      return
    }
    for(let i=0; i< double[0];i++) {
      result+= '<div class="matt-row">'
      for(let j=0; j<double[1]; j++) {
        result+= rawField();
      }
      result+="</div>"
    }
    mattFieldsContainer.innerHTML = result
    old = double;
    signalEventApplier()
  }
}

function newMattEvent() {
  const addBtn: elm = document.querySelector(".result__plus-btn");
  
  if(addBtn) {
    addBtn.addEventListener("click", function(){
    console.log("clicou")
    const modal = new Modal({
      title: "Criar uma Nova Matriz",
      innerCode: "" +
      '<div class="choose-container">'+
      '<button id="genlaw-btn" class="modal-btn">Lei de formação</button>'+
      '<button id="raw-btn" class="modal-btn">Matriz Bruta</button>'+
      '</div>'+
      '<div class="rc-input-container">'+
      '<label for="rows-field" class="rc-label">Linhas:</label>'+
      '<input type="number" class="modal-input" id="rows-field">'+
      '</div>'+
      '<div class="rc-input-container">'+
      '<label for="cols-field" class="rc-label">Colunas:</label>'+
      '<input type="number" class="modal-input" id="cols-field">'+
      '</div>'+
      '<h6>Digite sua Matriz Abaixo: </h6>'+
      '<div id="matt-fields-container">'+
      '</div>',
      callWhile: [updateFields],
      callBeforeClose: [],
      intervalWhile: 2000
    });
    });
  };
}

newMattEvent()

