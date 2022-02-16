const feedDogBtn = document.querySelector('.dog button');
const feedCatBtn = document.querySelector('.cat button');
const dogHealthBar = document.querySelector('.dog .healthBar');
const catHealthBar = document.querySelector('.cat .healthBar');
const dogPic = document.querySelector('.dog img');
const catPic = document.querySelector('.cat img');

class Pet {
    constructor(name, age, health, isDead = false) {
        this.name = name;
        this.age = age;
        this.health = health;
        this.isDead = isDead
    }
    eat() {
        this.health += 1;
    }
}

class Cat extends Pet {
    constructor(name, age, health, livesLeft = 9) {
        super(name, age, health);
        this.livesLeft = livesLeft;
    }
    meow() {
        return `${this.name} says purr`;
    }
}

class Dog extends Pet {
    bark() {
        return `${this.name} says woof!`;
    }
}

const dog = new Dog('dog', 8, 6);
const cat = new Cat('cat', 3, 6);

feedDogBtn.addEventListener('click', () => {
    dog.eat();
    if (dog.health > 10) {
        dogPic.src = 'https://img.search.brave.com/e0p94swHtqWfV9Q1ieiPlWo8jrfcX1WKcwi8J7YjZcw/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly9kb2dz/b2ZzZi5jb20vd3At/Y29udGVudC91cGxv/YWRzLzIwMTgvMDUv/SU1HXzYwOTYuanBn';
        feedDogBtn.disabled = true;
        dog.isDead = true;
    } else {
        const newBar = document.createElement('div');
        newBar.classList.add('bar');
        dogHealthBar.appendChild(newBar);
    }
})

feedCatBtn.addEventListener('click', () => {
    cat.eat();
    if (cat.health > 10) {
        catPic.src = 'https://img.search.brave.com/qgmTB9xT9Kb7LxwL3UN5Kp_oq0IDvU3X96Q9eGASR40/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly9saWZl/YXNhaHVtYW4uY29t/L2ZpbGVzLzIwMjAv/MDMvTWFpbi1Db29u/LTItc2NhbGVkLmpw/Zw';
        feedCatBtn.disabled = true;
        cat.isDead = true
    } else {
        const newBar = document.createElement('div');
        newBar.classList.add('bar');
        catHealthBar.appendChild(newBar);
    }
})

setInterval(() => {
    const dogBars = document.querySelectorAll('.dog .healthBar .bar');
    if (!dog.isDead) {
        if (dogBars.length != 0) {
            dog.health -= 1;
            dogHealthBar.removeChild(dogBars[0]);
        } else {
            dogPic.src = 'https://img.search.brave.com/e0p94swHtqWfV9Q1ieiPlWo8jrfcX1WKcwi8J7YjZcw/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly9kb2dz/b2ZzZi5jb20vd3At/Y29udGVudC91cGxv/YWRzLzIwMTgvMDUv/SU1HXzYwOTYuanBn';
            feedDogBtn.disabled = true;
            dog.isDead = true;
        }
    }

    const catBars = document.querySelectorAll('.cat .healthBar .bar');
    if (!cat.isDead) {
        if (catBars.length != 0) {
            cat.health -= 1;
            catHealthBar.removeChild(catBars[0]);
        } else {
            catPic.src = 'https://img.search.brave.com/qgmTB9xT9Kb7LxwL3UN5Kp_oq0IDvU3X96Q9eGASR40/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly9saWZl/YXNhaHVtYW4uY29t/L2ZpbGVzLzIwMjAv/MDMvTWFpbi1Db29u/LTItc2NhbGVkLmpw/Zw';
            feedCatBtn.disabled = true;
            cat.isDead = true;
        }
    }
}, 2000)