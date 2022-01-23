window.Names = ['Termo', 'Laptop', 'Audífonos', 'Tablet', 'Taza', 'Zapatillas',
    'Libro', 'Gafas', 'Medicina', 'Camiseta', 'Jeans', 'Cosmetiquera', 'Gorro',
    'Lunch', 'Chaqueta', 'Ropa Interior'
];
window.Imgs = ['../img/1.jpg', '../img/2.jpg', '../img/3.jpg', '../img/4.jpg', '../img/5.jpg',
    '../img/6.jpg', '../img/7.jpg', '../img/8.jpg', '../img/9.jpg', '../img/10.jpg',
    '../img/11.jpg', '../img/12.jpg', '../img/13.jpg', '../img/14.jpg', '../img/15.jpg',
    '../img/16.jpg'
]

let boton = document.getElementsByClassName("Boton")[0];
boton.addEventListener('click', Calcular);

function Calcular() {
    let cants = document.getElementsByClassName("Cantidad"),
        pesos = document.getElementsByClassName("Peso"),
        importances = document.getElementsByClassName("rating");
    window.Weight_limit = document.getElementsByClassName("LimitWeight")[0].valueAsNumber * 1000;
    EraseWarning();
    let valor = validarFormulario(cants, window.Weight_limit);
    if (valor) {
        window.Things = buildThings(cants, pesos, importances);
        window.long = window.Things.length;
        let result = run_evolution();
        let thingspacked = genome2Things(result);
        window.Resultado = Things2Pack(thingspacked, pesos, importances);
        //console.table(window.Resultado);
        localStorage.setItem("Resultado", JSON.stringify(window.Resultado));
        window.open("../results.html", "_self");
    }
}

function Things2Pack(thingspacked, pesos, importances) {
    let CosasEmpacadas = [],
        cant = 0;
    for (var i = 0; i < window.Names.length; i++) {
        let Name = window.Names[i],
            Img = window.Imgs[i];
        cant = 0;
        for (var j = 0; j < thingspacked.length; j++) {

            if (thingspacked[j] == Name && cant == 0) {
                cant = 1;
                CosasEmpacadas.push(new Thing(Name, pesos[i].valueAsNumber, importances[i].valueAsNumber, 1, Img))
            } else if (thingspacked[j] == Name && cant > 0) {
                cant += 1;
                CosasEmpacadas[parseInt(CosasEmpacadas.length - 1)].cantidad = cant;
            } else {
                continue;
            }
        }
    }
    return CosasEmpacadas;
}

function buildThings(cants, pesos, importances) {
    let Things = [];

    for (var i = 0; i < cants.length; i++) {
        for (var j = 0; j < parseInt(cants[i].valueAsNumber); j++) {
            Things.push(new Thing(window.Names[i], pesos[i].valueAsNumber, importances[i].valueAsNumber));
        }
    }
    return Things;
}

class Thing {
    constructor(nombre, peso, importance, cantidad = 1, img = "") {
        this.name = nombre; //.toUpperCase();
        this.weight = peso;
        this.importance = importance;
        this.cantidad = cantidad;
        this.img = img;
    }

}