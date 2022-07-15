import Modal from "./Modal";
import { rawMattCode, rawGenLawCode, chooseCode } from "./modal-components";
let old;
const positiveIcon = '<i class="fas fa-plus"></i>';
const negativeIcon = '<i class="fas fa-minus"></i>';
function rawField() {
    return "" +
        '<div class="raw-field">' +
        '<button class="field-signal">' +
        positiveIcon +
        '</button>' +
        '<input type="number" class="field-number">' +
        '</div>';
}
function signalEventApplier() {
    const signalBtnList = document.querySelectorAll(".field-signal");
    if (signalBtnList) {
        signalBtnList.forEach(function (i) {
            i.addEventListener("click", function () {
                let ch = i.innerHTML;
                if (ch === positiveIcon && ch) {
                    i.innerHTML = negativeIcon;
                }
                else if (ch) {
                    i.innerHTML = positiveIcon;
                }
            });
        });
    }
}
function chooseCodeEvents() {
    const chooseContainer = document.querySelector(".choose-container");
    const modalBody = document.querySelector(".modal-body");
    const rawBtn = document.querySelector("#raw-btn");
    const lawBtn = document.querySelector("#genlaw-btn");
    if (chooseContainer && rawBtn && lawBtn && modalBody) {
        const childRemover = () => {
            const allChildren = document.querySelectorAll(".modal-body > *");
            if (allChildren) {
                for (let i of allChildren) {
                    if (i.classList.contains("choose-container")) {
                        continue;
                    }
                    i.remove();
                }
            }
        };
        rawBtn.addEventListener("click", function () {
            childRemover();
            if (lawBtn.classList.contains("btn-active")) {
                lawBtn.classList.remove("btn-active");
                this.classList.add("btn-active");
            }
            modalBody.appendChild(rawMattCode());
        });
        lawBtn.addEventListener("click", function () {
            childRemover();
            if (rawBtn.classList.contains("btn-active")) {
                rawBtn.classList.remove("btn-active");
                this.classList.add("btn-active");
            }
            modalBody.appendChild(rawGenLawCode());
        });
    }
}
function updateFields() {
    const rows = document.querySelector("#rows-field");
    const cols = document.querySelector("#cols-field");
    const mattFieldsContainer = document.querySelector("#matt-fields-container");
    let result = "";
    if (rows && cols && mattFieldsContainer) {
        let double = [parseInt(rows.value), parseInt(cols.value)];
        if (old && old[0] === double[0] && old[1] === double[1]) {
            return;
        }
        for (let i = 0; i < double[0]; i++) {
            result += '<div class="matt-row">';
            for (let j = 0; j < double[1]; j++) {
                result += rawField();
            }
            result += "</div>";
        }
        mattFieldsContainer.innerHTML = result;
        old = double;
        signalEventApplier();
    }
}
function lawMattParser() { }
function rawMattParser() { }
/*
function rawMattParser():void {
  const rawBtn: elm = document.querySelector("#raw-btn");
  const mattContainer = document.querySelector("#matt-fields-container");
  if(rawBtn && mattContainer && rawBtn.classList.contains("btn-active")) {
    let newMatt: matt<number> = [];
    let iter: number = 0;
    const rows = mattContainer.querySelectorAll(".matt-row");
    if(rows) {
      rows.forEach(function(i){
        const fields = i.querySelectorAll(".raw-field");
        newMatt.push([]);
        
        if(fields) {
        for(let j of fields) {
        const signal: elm = j.querySelector(".field-signal");
        const input: inputElm = j.querySelector(".field-number");
        if(signal && input) {
          let val = parseInt(input.value);
          if(signal.innerHTML === positiveIcon) {
            newMatt[iter].push(val);
          } else {
          newMatt[iter].push(val*(-1));
        }
        }
      }
    }
        iter++;
      });
    }
    
  }
}
function lawMattParser():void {
  const lawBtn: elm = document.querySelector("#genlaw-btn");
  const rowsField: inputElm = document.querySelector("#rows-field");
  const colsField: inputElm = document.querySelector("#cols-field");
  const genLawField: inputElm = document.querySelector("#genlaw-field");
  if(lawBtn) {
    console.log(lawBtn);
    console.log(lawBtn.classList.contains("btn-active"));
  }
  if(colsField) {console.log(colsField)};
  if(rowsField) {console.log(rowsField)};
  if(genLawField) {console.log(genLawField)};
  if(lawBtn && lawBtn.classList.contains("btn-active") && rowsField && colsField && genLawField) {
    const g1: genLawObj = {
      rows: parseInt(rowsField.value),
      cols: parseInt(colsField.value),
      law: genLawField.value
    };
    console.log(g1)
  }
}
*/
function newMattModal() {
    const addBtn = document.querySelector(".result__plus-btn");
    if (addBtn) {
        addBtn.addEventListener("click", function () {
            const modal = new Modal({
                title: "Criar uma Nova Matriz",
                innerCode: [chooseCode(), rawMattCode()],
                callBefore: [chooseCodeEvents],
                callWhile: [updateFields],
                callAfterSuccess: [],
                intervalWhile: 2000
            });
        });
    }
    ;
}
document.addEventListener("DOMContentLoaded", newMattModal);
