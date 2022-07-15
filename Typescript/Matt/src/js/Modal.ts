import {elm,elm2,_Modal,BuildObj,intervalArr} from "./_meta";

function modalHeader(title: string){
  let div: elm = document.createElement("div");
  div.classList.add("modal-header");
  let header: elm = document.createElement("h6");
  header.classList.add("modal-title")
  header.innerText = title
  let button:elm = document.createElement("button");
  button.classList.add("modal-close-btn");
  let icon: elm = document.createElement("i");
  icon.classList.add("fas","fa-xmark");
  button.appendChild(icon);
  div.appendChild(header);
  div.appendChild(button);
  return div
}
function modalBody(content: Array<Node>) {
  let div: elm = document.createElement("div");
  div.classList.add("modal-body");
  for(let i of content) {
    if(i) {
      div.appendChild(i);
    }
  }
  return div
}
function modalFooter() {
  let div: elm = document.createElement("div");
  div.classList.add("modal-footer")
  let btn1: elm = document.createElement("button");
  let btn2: elm = document.createElement("button");
  btn1.classList.add("modal-btn");
  btn1.innerText = "Cancelar";
  btn1.setAttribute("id","cancel-btn");
  btn2.classList.add("modal-btn");
  btn2.innerText = "Concluído";
  btn2.setAttribute("id","success-btn");
  div.appendChild(btn1);
  div.appendChild(btn2);
  return div;
}

export default class Modal implements _Modal {
  father: elm
  buildObj: BuildObj
  timeouts: intervalArr
  constructor(buildObj:BuildObj) {
    this.father = document.querySelector(".modal-container");
    this.buildObj = buildObj;
    this.timeouts = [];
    if(this.father) {
      this.builder();
    }
  }
  builder() {
    if(!(this.father)) {return}
    let modal: elm = document.createElement("div");
    modal.classList.add("modal")
    let content: elm = document.createElement("div");
    content.classList.add("modal-content");
    content.appendChild(modalHeader(this.buildObj.title));
    content.appendChild(modalBody(this.buildObj.innerCode))
    content.appendChild(modalFooter());
    modal.appendChild(content);
    this.father.appendChild(modal);
    this.addEvents();
    for(let i of this.buildObj.callBefore) {
        i();
    }
    for(let i of this.buildObj.callWhile) {
        this.timeouts.push(setInterval(i,this.buildObj.intervalWhile));
        
    };
  }   
  addEvents() {
    const buildObj = this.buildObj;
    const closeBtn: elm = document.querySelector("button.modal-close-btn");
    const cancelBtn: elm = document.querySelector("#cancel-btn");
    const successBtn: elm= document.querySelector("#success-btn")
    const father = this.father;
    const stopWhileFns = () => {
      for(let i of this.timeouts) {
        clearTimeout(i);
      }
    }
    
    if(closeBtn && father && cancelBtn && successBtn) {
      closeBtn.addEventListener("click",()=>{
        father.innerHTML = "";
        stopWhileFns();
      });
      cancelBtn.addEventListener("click",()=>{
        father.innerHTML = "";
        stopWhileFns();
      });
      successBtn.addEventListener("click",function() {
        for(let i of buildObj.callAfterSuccess) {
          i()
        }
        father.innerHTML = "";
        stopWhileFns();
      })
      
      
    }
  }
}
