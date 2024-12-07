const name = 'Max';
let age = 29;
const hasHobbies = true;

age = 30;

const summariseUser = (userName, userAge, userHasHobby) => {
    return 'Name is ' + userName + ', age is ' + userAge + ' and the user has hobbies ' + userHasHobby;
}


// const add = (a, b) => a + b;
// const addOne = a => a + 1;
const addRandom = () => 1 + 2;
console.log(addRandom());


console.log(summariseUser(name, age, hasHobbies));



const person = { 
    name: 'Max',
    age: 29,
    greet() {
        console.log('Hi, I am ' + this.name);
    }
};

const printName = ({ name }) => {
    console.log(name);
};

printName(person);

const { name, age } = person;


const copiedPerson = { ...person };
console.log(copiedPerson);

console.log(person);
person.greet();


const hobbies = ['Sports', 'Cooking'];

const [hobby1, hobby2] = hobbies;

// for (let hobby of hobbies) {
//     console.log(hobby);
// }
// console.log(hobbies.map(hobby => 'Hobby: ' + hobby));
// console.log(hobbies);


hobbies.push('Programming');

// const copiedArray = hobbies.slice();
const copiedArray = [...hobbies];


var strName = 'Max';
console.log(strName);

var strSecondName = strName;
console.log(strSecondName);

strName = 'Chris';
console.log(strSecondName);

var objPerson = {
    age: 28,
    name: 'Max',
    hobbies: ['Sports', 'Cooking']
};

console.log(objPerson);

var objSecondPerson = objPerson;
console.log(objSecondPerson);

objPerson.name = 'Chris';
console.log(objSecondPerson);


const toArray = (...args) => {
    return args;
};

// const fetchData = callback => {
//     setTimeout(() => {
//         callback('Done!');
//     }, 1500);
// };

// setTimeout(() => {
//     console.log('Timer is done!');
//     fetchData(text => {
//         console.log(text);
//     });
// }, 2000);


// console.log('Hello!');
// console.log('Hi!');

const fetchData = () => {
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Done!');
        }, 1500);
    });
    return promise;
};

setTimeout(() => {
    console.log('Timer is done!');
    fetchData().then(text => {
        console.log(text);
        return fetchData();
    }).then(text2 => {
        console.log(text2);
    });
}, 2000);


console.log('Hello!');
console.log('Hi!');