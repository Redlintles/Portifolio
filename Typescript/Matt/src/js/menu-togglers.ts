type element = HTMLElement | null
type collection = NodeListOf<Element> | null

function navListToggler() {
  const burgerMenu: element = document.querySelector("nav button.burger-menu");
  const navList: element = document.querySelector("nav ul.nav-list");
  if(burgerMenu && navList) {
    burgerMenu.addEventListener("click", function(){
      navList.classList.toggle("nav-list--visible")
    })
  }
}
function testWrapperToggler(id: string) {
  const parent: element = document.querySelector(id)
  const closeBtn: element = document.querySelector(
    `${id} .return-btn`);
  const mainBtnWrapper: element = document.querySelector("#main-btn-wrapper")
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
  const btn: element = document.querySelector(
    `#main-btn-wrapper ${id}`);
  const mainBtnWrapper = document.querySelector("#main-btn-wrapper")
  const targetEl: element = document.querySelector(
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



