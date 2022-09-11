const element = document.getElementById("container");

for (let i = 0; i < 9 * 9; i++) {
element.innerHTML += `
        <div id="${i}" class="Row1Col1"></div>
`
}

const numbers = document.getElementById("numbers");

for (let i = 1; i <= 9; i++) {
    numbers.innerHTML += `
        <div id="number_${i}" class="numberstyle">
            ${i}
        </div>
    `
}
