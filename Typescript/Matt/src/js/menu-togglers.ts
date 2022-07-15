import {elm} from "./_meta"

function navListToggler() {
  const burgerMenu: elm = document.querySelector("nav button.burger-menu");
  const navList: elm = document.querySelector("nav ul.nav-list");
  if(burgerMenu && navList) {
    burgerMenu.addEventListener("focus", function(){
      navList.classList.add("nav-list--visible");
    });
    burgerMenu.addEventListener(
      "blur",function(){
        navList.classList.remove("nav-list--visible");
      });
  }
}
function testWrapperToggler(id: string) {
  const parent: elm = document.querySelector(id)
  const closeBtn: elm = document.querySelector(
    `${id} .return-btn`);
  const mainBtnWrapper: elm = document.querySelector("#main-btn-wrapper")
  if(closeBtn && mainBtnWrapper && parent) {
    closeBtn.addEventListener("click",function(){
      parent.style.display = "none"
      mainBtnWrapper.style.display = "flex"
      console.log(parent.classList);
      console.log(mainBtnWrapper.classList)
      
    })
  }
}
function loadSection(id: string,target: string){
  const btn: elm = document.querySelector(
    `#main-btn-wrapper ${id}`);
  const mainBtnWrapper: elm = document.querySelector("#main-btn-wrapper")
  const targetEl: elm = document.querySelector(
    `.main-menu ${target}`);
  if(btn && mainBtnWrapper && targetEl) {
    btn.addEventListener("click",function(){
        mainBtnWrapper.style.display = "none";
        targetEl.style.display = "flex";
      });
  }
}

loadSection("#det-loader","#det-btn-wrapper");
loadSection("#ops-loader","#ops-btn-wrapper");
navListToggler()
testWrapperToggler("#ops-btn-wrapper")
testWrapperToggler("#det-btn-wrapper")



