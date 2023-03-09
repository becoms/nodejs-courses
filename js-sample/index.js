console.log('init');

let cities = [ "Lyon", "Clermont Ferrand", { name: "AAA"}];

cities.push("Paris");


cities = [ ...cities, ["Paris", "DDD"]];
console.log("🚀 - cities:", cities)
