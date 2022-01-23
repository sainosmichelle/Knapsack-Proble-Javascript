class Input {
    constructor() {
        this.cantidades = document.getElementsByClassName("Cantidad");
        this.pesos = document.getElementsByClassName("Peso");
        this.importances = document.getElementsByClassName("rating");
    }

    inicializarCantidad(arreglo) {
        let i = 0;
        for (const element of this.cantidades) {
            element.value = arreglo[i];
            i++;
        }
    }

    inicializarPeso(arreglo) {
        let i = 0;
        for (const element of this.pesos) {
            element.value = arreglo[i];
            i++;
        }
    }

    inicializarImportancia(arreglo) {
        let i = 0;
        for (const element of this.importances) {
            element.style = `--value:${arreglo[i]}`
            element.value = arreglo[i];
            i++;
        }
    }
}

let entradasIniciales = [0, 1, 1, 1, 0, 1, 2, 1, 1, 2, 2, 0, 0, 1, 1, 3],
    pesosIniciales = [300, 4000, 300, 2500, 500, 650, 1500, 300, 200, 400, 700, 750, 100, 300, 700, 50],
    importanciasIniciales = [1.5, 5, 4, 5, 1, 2.5, 1, 2.5, 5, 2, 2, 3, 1, 2, 3, 2];
const inputs = new Input();
inputs.inicializarCantidad(entradasIniciales);
inputs.inicializarPeso(pesosIniciales);
inputs.inicializarImportancia(importanciasIniciales);

document.getElementsByClassName("LimitWeight")[0].value = 10;