let btns = document.querySelectorAll('.buttons div .num, .buttons div .operator');
let display = document.querySelector('.display');
let ac = document.querySelector('.ac');
let eq = document.querySelector('.equal');
let body = document.querySelector('body');

//---Animation background I was playing with
// setInterval(() => {
//     setTimeout(() => {
//         body.style.backgroundColor = 'red';
//         setTimeout(() => {
//             body.style.backgroundColor = 'blue';
//             setTimeout(() => {
//                 body.style.backgroundColor = 'green';
//             }, 3000);
//         }, 3000);
//     }, 3000);
// }, 9000);

for (let btn of btns) {
    btn.addEventListener('click', () => {
        display.textContent += btn.textContent;
    })
}

ac.addEventListener('click', () => {
    display.textContent = '';
})

eq.addEventListener('click', () => {
    let solution = '';
    try {
        solution = eval(display.textContent);
    } catch (e) {
        solution = 'Error';
    }
    display.textContent = solution;
});