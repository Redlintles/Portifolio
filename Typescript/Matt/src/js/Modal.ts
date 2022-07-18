import {elm,BuildObj,intervalArr,_Modal} from "./_meta";

function modalHeader(title: string):Node{
  const div = document.createElement("div");
  div.classList.add("modal-header");
  const header = document.createElement("h6");
  header.classList.add("modal-title")
  header.innerText = title
  const button = document.createElement("button");
  button.classList.add("modal-close-btn");
  let icon = document.createElement("i");
  icon.classList.add("fas","fa-xmark");
  button.appendChild(icon);
  div.append(header,button)
  return div
}
function modalBody(content: Array<Node>):Node{
  const div = document.createElement("div");
  div.classList.add("modal-body");
  div.append(...content);
  return div
}
function modalFooter():Node {
  const div = document.createElement("div");
  div.classList.add("modal-footer")
  const btn1 = document.createElement("button");
  const btn2 = document.createElement("button");
  btn1.classList.add("modal-btn","cancel-btn");
  btn1.innerText = "Cancelar";
  btn2.classList.add("modal-btn","success-btn");
  btn2.innerText = "Concluído";
  div.append(btn1,btn2)
  return div;
}
/*
export class Modal implements _Modal {
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
    let modal = document.createElement("div");
    modal.classList.add("modal")
    let content= document.createElement("div");
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
*/


export default class Modal implements  _Modal{
  modalID: string
  config: BuildObj
  timeouts: intervalArr
  modal: HTMLElement
  constructor(modalID: string, config:BuildObj){
    this.modalID = modalID
    this.config = config
    this.timeouts = []
    this.modal =  this.builder();
  }
  builder(): HTMLElement {
    const body = document.body;
    const modal = document.createElement("div");
    modal.setAttribute("id",this.modalID)
    modal.classList.add("modal");
    const mContent = document.createElement("div");
    mContent.classList.add("modal-content");
    mContent.append(
      modalHeader(this.config.title),
      modalBody(this.config.innerCode),
      modalFooter()
    );
    modal.append(mContent);
    body.append(modal);
    this.addEvents()
    this.addEvents()
    for(let i of this.config.callBefore){
      i()
    }
    for(let i of this.config.callWhile) {
      this.timeouts.push(setInterval(i,this.config.intervalWhile));
    }
    return modal
  }
  addEvents():void {
    const closer = document.querySelectorAll(".modal-close-btn");
    if(closer) {
      closer.forEach((i)=>{
        i.addEventListener("click",()=>{
          console.log(this.modal)
          if(this.modal) {
            fn()
            
            this.modal.remove()
          }
        });
      })
    }
    const fn = () => {
      for(let i of this.timeouts) {
        clearInterval(i)
      }
    }
    const cancel = document.querySelectorAll(".cancel-btn");
    if(cancel) {
      cancel.forEach((i)=>{
        i.addEventListener("click",() => {
            fn();
            this.modal.remove();
          }
        )}
      );
    };
    const success = document.querySelectorAll(".success-btn");
    if(success) {
      success.forEach((i)=>{
        i.addEventListener("click",()=>{
          fn()
          for(let i of this.config.callAfterSuccess) {
            i()
          }
          this.modal.remove();
        })
      });
    }
  }
}
