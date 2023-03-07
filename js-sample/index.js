console.log('init');

const test = () => {
    console.log("test function");
}

test();

console.log("-------------- RUN APP --------------");


let myArr = [6, 8, 2, 10];

console.log("initialArray", myArr);

const arr2 = [...myArr, 20];
console.log("arr2", arr2);

const myObj = {
	a: "valueA",
  b: "valueB"
}

console.log("myObj", myObj);

const myObj2 = {
	...myObj,
  c: "valueC"
}

console.log("myObj2", myObj2);


