import {elm,_Modal,BuildObj} from "./_meta";


class Modal implements _Modal {
  father: elm
  buildObj: BuildObj
  
  constructor(buildObj:BuildObj) {
    this.father = document.querySelector(".modal-container");
    this.buildObj = buildObj;
    if(this.father) {
      this.builder();
    }
  }
  builder() {
    if(!(this.father)) {return}
    this.father.innerHTML = 
      '<div class="modal">'+
      '<div class="modal-content">'+
      '<div class="modal-header">'+
      `<h6 class="modal-title">${this.buildObj.title}</h6>`+
      '<button class="modal-close-btn">'+
      '<i class="fas fa-xmark"></i>'+
      '</button>'+
      '</div>'+
      '<div class="modal-body">'+
      `${this.buildObj.innerCode}`+
      '</div>'+
      '<div class="modal-footer">'+
      '<button class="modal-btn">Cancelar</button>'+
      '<button class="modal-btn">Concluído</button>'+
      '</div>'.repeat(3);
      this.addEvents()
  }   
  addEvents() {
    const closeBtn: elm = document.querySelector("button.modal-close-btn");
    const father = this.father
    
    if(closeBtn && father) {
      closeBtn.addEventListener("click",()=>{
        
        father.innerHTML = "";
      })
    }
  }
}

export default Modal
