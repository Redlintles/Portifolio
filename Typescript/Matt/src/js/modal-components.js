function dataField(title, fieldID, type = "number") {
    let div = document.createElement("div");
    let label = document.createElement("label");
    let field = document.createElement("input");
    div.classList.add("modal-field");
    label.classList.add("modal-field__label");
    label.innerText = title;
    field.classList.add("modal-field__input");
    field.setAttribute("type", type);
    label.setAttribute("for", fieldID);
    field.setAttribute("id", fieldID);
    div.appendChild(label);
    div.appendChild(field);
    return div;
}
export function rawMattCode() {
    let code = "" +
        '<h6>Digite sua Matriz Abaixo:</h6>' +
        '<div id="matt-fields-container">' +
        '</div>';
    let division = document.createElement("div");
    division.appendChild(dataField("Linhas:", "rows-field"));
    division.appendChild(dataField("Colunas:", "cols-field"));
    division.innerHTML += code;
    return division;
}
export function rawGenLawCode() {
    let division = document.createElement("div");
    division.appendChild(dataField("Linhas:", "rows-field"));
    division.appendChild(dataField("Colunas:", "cols-field"));
    division.appendChild(dataField("Lei de formação:", "genlaw-field", "text"));
    return division;
}
export function chooseCode() {
    let div = document.createElement("div");
    div.classList.add("choose-container");
    let btn1 = document.createElement("button");
    btn1.classList.add("modal-btn", "btn-active");
    btn1.innerText = "Matriz Bruta";
    btn1.setAttribute("id", "raw-btn");
    let btn2 = document.createElement("button");
    btn2.classList.add("modal-btn");
    btn2.innerText = "Lei de formação";
    btn2.setAttribute("id", "genlaw-btn");
    div.appendChild(btn1);
    div.appendChild(btn2);
    return div;
}
