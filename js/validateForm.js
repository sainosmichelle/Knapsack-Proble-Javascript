function EraseWarning() {
    try {
        let parrafo = document.getElementById("warningmessage").children;
        parrafo[0].parentNode.removeChild(parrafo[0]);
    } finally {
        return;
    }
}

function validarFormulario(cants, maxWeight) {
    let sumaCant = 0,
        valor = true;
    let warningbox = document.getElementById("warningmessage"),
        warningmessage = document.createElement('div');
    warningmessage.innerHTML = '<p>'
    for (var i = 0; i < cants.length; i++) {
        sumaCant += cants[i].valueAsNumber;
    }
    if (sumaCant === 0) {
        warningmessage.innerHTML += 'DEBES ELEGIR AL MENOS UN OBJETO!<br>';
        valor = false;
    }
    if (maxWeight === 0) {
        warningmessage.innerHTML += '<br>DEBES ESPECIFICAR UN PESO MÁXIMO DE LA MALETA!';
        valor = false;
    }
    warningmessage.innerHTML += '</p>'
    warningbox.appendChild(warningmessage);
    window.scrollTo(0, 0);
    return valor;
}