/* ALGORITMO GENETICO */

function generate_genome(long) {
    let genome = [];
    for (var i = 0; i < long; i++) {
        genome.push(Math.round(Math.random()))
    }
    return genome;
}

function generate_population(size, genome_length) {
    let pop = [];
    for (var i = 0; i < size; i++) {
        pop.push(generate_genome(genome_length))
    }
    return pop;
}

function fitness(genome) {
    weight = 0;
    value = 0;
    for (const [i, thing] of window.Things.entries()) {
        if (genome[i] === 1) {
            weight += thing.weight;
            value += thing.importance;
        }
        if (weight > window.Weight_limit) {
            return 0;
        }
    }
    return value;
}

function select_pair(population) {
    let totalWeight = 0,
        pop_k = [],
        pos = Infinity,
        weights = [];
    for (const genome of population.entries()) {
        weights.push(fitness(genome));
    }
    for (k = 0; k < 2; k++) {
        totalWeight = 0;
        for (const [i, peso] of weights.entries()) {
            if (i !== pos) {
                totalWeight -= weights[i];
            }
        }
        let random = Math.floor(Math.random() * totalWeight);
        for (var i = 0; i < population.length; i++) {
            if (i !== pos) {
                random -= weights[i];
                if (random < 0) {
                    pop_k.push(population[i]);
                    pos = i;
                    break;
                }
            }
        }
    }
    return pop_k;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}


function single_point_crossover(genome1, genome2) {
    const n = genome1.length - 1;
    const randint = getRandomInt(1, n);
    let cross1 = genome1.slice(0, randint).concat(genome2.slice(randint, n + 1));
    let cross2 = genome2.slice(0, randint).concat(genome1.slice(randint, n + 1));
    return {
        cross1,
        cross2
    };
}

function mutation(genoma, num = 1, probability = 0.5) {
    for (var i = 0; i < num; i++) {
        index = getRandomInt(0, genoma.length - 1);
        if (probability < Math.random()) {
            genoma[index] = Math.abs(genoma[index] - 1);
        }
    }
    return genoma;
}

function genome2Things(genome) {
    let result = [];
    for (const [i, thing] of window.Things.entries()) {
        if (genome[i] === 1) {
            result.push(thing.name);
        }
    }
    return result;
}

function sortPop(population) {
    population.sort(function(a, b) {
        let fita = fitness(a);
        let fitb = fitness(b);
        if (fita > fitb) return -1;
        if (fita < fitb) return 1;
        return 0;
    });
    return population;
}

function run_evolution(fitness_limit = 740, generation_limit = 100) {
    population = generate_population(10, window.Things.length);
    for (var i = 0; i < generation_limit; i++) {
        population = sortPop(population);
        if (fitness(population[0]) >= fitness_limit) {
            break;
        }
        let next_generation = population.slice(0, 2);
        for (var j = 0; j < parseInt(population.length / 2) - 1; j++) {
            parents = select_pair(population);
            let offspring = single_point_crossover(parents[0], parents[1]);
            let offspring_a = offspring.cross1,
                offspring_b = offspring.cross2;
            offspring_a = mutation(offspring_a);
            offspring_b = mutation(offspring_b);
            next_generation.concat([offspring_a, offspring_b]);
        }
        population = next_generation;
    }
    population = sortPop(population);
    return population[0];
}

function productosInput(name) {
    let weight = parseInt(prompt("¿Peso del " + name + "? en g"));
    let importance = parseInt(prompt("Del 1 al 5 ¿qué tan importante es el " + name + "?"));
    return {
        weight,
        importance
    };
}

//let Weight_limit = 1000 * parseFloat(prompt("Ingresa el peso máximo de tu equipaje de mano en kg"));

//let termo = productosInput("termo");
// new Thing('Termo', termo.weight, termo.importance)