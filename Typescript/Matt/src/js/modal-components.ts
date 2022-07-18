import {elm} from "./_meta";


export const positiveIcon: string = '<i class="fas fa-plus"></i>';
export const negativeIcon: string = '<i class="fas fa-minus"></i>';

function dataField(title: string, fieldID: string,type: string = "number",long: boolean = false): Node{
  const div: elm = document.createElement("div");
  const label: elm = document.createElement("label");
  const field: elm = document.createElement("input");
  div.classList.add("modal-field");
  if(long) {
    div.classList.add("modal-field--long")
  }
  label.classList.add("modal-field__label");
  label.innerText = title;
  field.classList.add("modal-field__input");
  field.setAttribute("type",type)
  label.setAttribute("for",fieldID);
  field.setAttribute("id",fieldID);
  div.append(label,field)
  return div
}

export function rawMattCode(): Node{
  let code: string = ""+
  '<h6>Digite sua Matriz Abaixo:</h6>'+
  '<div id="matt-fields-container">'+
      '</div>';
  let division = document.createElement("div");
  division.appendChild(dataField("Linhas:","rows-field"));
  division.appendChild(dataField("Colunas:","cols-field"));
  division.innerHTML += code;
  return division
}
export function rawGenLawCode(): Node{
  let division = document.createElement("div");
  division.appendChild(dataField("Linhas:","rows-field"));
  division.appendChild(dataField("Colunas:","cols-field"));
  division.appendChild(dataField("Lei:","genlaw-field","text",true));
  return division;
}
export function chooseCode(): Node {
  let div: elm = document.createElement("div");
  div.classList.add("choose-container");
  let btn1 = document.createElement("button");
  btn1.classList.add("modal-btn","btn-active");
  btn1.innerText = "Matriz Bruta";
  btn1.setAttribute("id","raw-btn");
  let btn2 = document.createElement("button");
  btn2.classList.add("modal-btn");
  btn2.innerText = "Lei de formação";
  btn2.setAttribute("id","genlaw-btn");
  div.append(btn1,btn2);
  return div
  
}

export function rawField():Node {
  const div = document.createElement("div");
  div.classList.add("raw-field");
  const button = document.createElement("button");
  button.classList.add("field-signal");
  button.innerHTML = positiveIcon;
  const input = document.createElement("input");
  input.setAttribute("type","number");
  input.classList.add("field-number");
  div.append(button,input);
  return div
}