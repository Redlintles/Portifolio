function modalHeader(title) {
    let div = document.createElement("div");
    div.classList.add("modal-header");
    let header = document.createElement("h6");
    header.classList.add("modal-title");
    header.innerText = title;
    let button = document.createElement("button");
    button.classList.add("modal-close-btn");
    let icon = document.createElement("i");
    icon.classList.add("fas", "fa-xmark");
    button.appendChild(icon);
    div.appendChild(header);
    div.appendChild(button);
    return div;
}
function modalBody(content) {
    let div = document.createElement("div");
    div.classList.add("modal-body");
    for (let i of content) {
        if (i) {
            div.appendChild(i);
        }
    }
    return div;
}
function modalFooter() {
    let div = document.createElement("div");
    div.classList.add("modal-footer");
    let btn1 = document.createElement("button");
    let btn2 = document.createElement("button");
    btn1.classList.add("modal-btn");
    btn1.innerText = "Cancelar";
    btn1.setAttribute("id", "cancel-btn");
    btn2.classList.add("modal-btn");
    btn2.innerText = "Concluído";
    btn2.setAttribute("id", "success-btn");
    div.appendChild(btn1);
    div.appendChild(btn2);
    return div;
}
export default class Modal {
    constructor(buildObj) {
        this.father = document.querySelector(".modal-container");
        this.buildObj = buildObj;
        this.timeouts = [];
        if (this.father) {
            this.builder();
        }
    }
    builder() {
        if (!(this.father)) {
            return;
        }
        let modal = document.createElement("div");
        modal.classList.add("modal");
        let content = document.createElement("div");
        content.classList.add("modal-content");
        content.appendChild(modalHeader(this.buildObj.title));
        content.appendChild(modalBody(this.buildObj.innerCode));
        content.appendChild(modalFooter());
        modal.appendChild(content);
        this.father.appendChild(modal);
        this.addEvents();
        for (let i of this.buildObj.callBefore) {
            i();
        }
        for (let i of this.buildObj.callWhile) {
            this.timeouts.push(setInterval(i, this.buildObj.intervalWhile));
        }
        ;
    }
    addEvents() {
        const buildObj = this.buildObj;
        const closeBtn = document.querySelector("button.modal-close-btn");
        const cancelBtn = document.querySelector("#cancel-btn");
        const successBtn = document.querySelector("#success-btn");
        const father = this.father;
        const stopWhileFns = () => {
            for (let i of this.timeouts) {
                clearTimeout(i);
            }
        };
        if (closeBtn && father && cancelBtn && successBtn) {
            closeBtn.addEventListener("click", () => {
                father.innerHTML = "";
                stopWhileFns();
            });
            cancelBtn.addEventListener("click", () => {
                father.innerHTML = "";
                stopWhileFns();
            });
            successBtn.addEventListener("click", function () {
                for (let i of buildObj.callAfterSuccess) {
                    i();
                }
                father.innerHTML = "";
                stopWhileFns();
            });
        }
    }
}
