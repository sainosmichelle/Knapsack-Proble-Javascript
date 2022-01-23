let Resultado = JSON.parse(localStorage.getItem("Resultado"));
ShowResults();

function ShowResults() {
    for (let Element of Resultado) {
        let div_product = document.createElement("div");
        div_product.className = "producto";

        let img = document.createElement("img");
        img.src = `${Element.img}`;
        img.className = "producto__imagen";
        img.alt = `${Element.name}`;


        let divname = document.createElement("div");
        divname.className = "producto__informacion";
        let pName = document.createElement("p");
        pName.className = "producto__nombre";
        if (Element.cantidad === 1) {
            pName.innerHTML = `${Element.cantidad} unidad de<br> ${Element.name}`;
        } else {
            pName.innerHTML = `${Element.cantidad} unidades de<br> ${Element.name}`;
        }
        divname.appendChild(pName);

        div_product.appendChild(img);
        div_product.appendChild(divname);
        document.getElementById("Resultados").appendChild(div_product);
        /*let item_lista = document.createElement("li");
        item_lista.className = "list-group-item";
        item_lista.innerHTML = descrip;
        lista.appendChild(item_lista);*/
    }
}