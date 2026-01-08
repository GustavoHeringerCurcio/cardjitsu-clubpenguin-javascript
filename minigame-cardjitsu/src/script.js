const cards = document.querySelectorAll(".cards");
const enemyvalue = document.querySelector("#enemy-value");
const results = document.querySelector("#results");
const resultText = document.querySelector("#result-text");
const boxPoint = document.querySelector("#box-points");
let card1 = document.querySelector("#card1")
const card2 = document.querySelector("#card2")
const card3 = document.querySelector("#card3")
const card4 = document.querySelector("#card4")
const card5 = document.querySelector("#card5")
centerSlot = document.querySelector("#center-slot")
centerSlot2 = document.querySelector("#center-slot2")
cardBack = document.querySelector(".card-back")

const params = new URLSearchParams(window.location.search);
const difficulty = params.get("difficulty") || "normal";

let minCardValue, maxCardValue;

switch(difficulty) {
    case "easy":
        minCardValue = 1;
        maxCardValue = 6;
        break;
    case "normal":
        minCardValue = 3;
        maxCardValue = 10;
        break;
    case "hard":
        minCardValue = 7;
        maxCardValue = 10;
        break
}

const classes = [
    "fire",
    "water",
    "snow",
];
//define a class aleatoriamente do card do player (fire, water, snow)
cards.forEach(card => {
    const randomClass = classes[Math.floor(Math.random() * classes.length)];
    card.classList.add(randomClass);
});

//define a classe aleatoriamente do card do Oponnent. 
let randomClass = classes[Math.floor(Math.random() * classes.length)];
enemyvalue.classList.add(randomClass);


//define o valor númerico do card.
let playerCards = [];
let enemyPower = Math.floor(Math.random() * (maxCardValue - minCardValue + 1) + minCardValue);
enemyvalue.innerHTML = enemyPower;
console.log(`enemy value = ${enemyPower}`)



function generateCards() {

    cards.forEach((card, index) => {
        let value = Math.floor(Math.random() * 8 + 3);

        playerCards[index] = value;
        console.log(value)
        card.textContent = value;
    })

}

//botão de ok para resetar o minigame, quando ganha ou perde!
function okButton() {
    results.style.display = "none"
    window.location.href = "../index.html"
}

let atualPoints = 0;
let enemyAtualPoints = 0;
let LIMIT = 3;
let canPlay = true;


cards.forEach((card, index) => {
    card.addEventListener("click", (event) => {
    console.log("Carta clicada:", event.target.id, "Index:", index);

    //travar a funcão ao chegar em três
    if (!canPlay) return; //ignorar o clique.
    canPlay = false; //clicou

    //verifica se já esta no limite
    if(atualPoints === 3 || enemyAtualPoints === 3) {
        return;
    }
    
        // limpa clone anterior
        centerSlot.innerHTML = "";

        // cria clone visual
        const clone = card.cloneNode(true);
        clone.classList.add("clone-card");
        centerSlot.appendChild(clone);
        
        
        
        setTimeout(() => {
            clone.classList.add("show");
            enemyvalue.classList.add("show")
        }, 10);

        //deixar o card hidden (somente o card1)
        event.target.style.visibility = "hidden"

        //define se ganhou, perdeu ou empatou
        resolveBattle(card, enemyvalue, index);


        //TIME OUT
        setTimeout(() => {
        
        //gera um novo atributo após clicar.
        card.classList.remove ("fire", "water", "snow");
        randomClass = classes[Math.floor(Math.random() * classes.length)];
        card.classList.add(randomClass);

        //gera um novo número após clicar.
        playerCards[0] = Math.floor(Math.random() * 8 + 1);
        console.log(playerCards)
        event.target.textContent = playerCards[0]

        //chama um novo número do card para o oponente.
        enemyPower = Math.floor(Math.random() * (maxCardValue - minCardValue + 1) + minCardValue);
        enemyvalue.innerHTML = enemyPower

        //removendo o atributo antigo e setando novo atributo.
        enemyvalue.classList.remove("fire", "water", "snow");
        randomClass = classes[Math.floor(Math.random() * classes.length)];
        enemyvalue.classList.add(randomClass);

        
        event.target.style.visibility = "visible"
        event.target.classList.remove("show")
        clone.classList.remove("show")
        centerSlot.style.transform = "scale(1.0)"

        enemyvalue.classList.remove("show")
        setTimeout(() => {
            
             // remove do DOM de verdade
            canPlay = true;
        }, 500);
    }, 1700);

        
        
        //verificar se ganhou
        if(atualPoints === LIMIT) {
            setTimeout(() => {
                results.style.display = 'flex'
                resultText.textContent = "You Win!"
                return;
            }, 500);
        }
        
            if(enemyAtualPoints === LIMIT) {
                setTimeout(() => {
                results.style.display = 'flex'
                resultText.textContent = "You Lose!"
                return;
            }, 500);
        }
    })    
})

const elementIcons = {
    fire: "./src/images/cards/fire-icon.png",
    water: "./src/images/cards/water-icon.png",
    snow: "./src/images/cards/snow-icon.png"
}

const playerPoints = document.querySelector("#player-points")
const enemyPoints = document.querySelector("#enemy-points")

function setPoints(element){
    const icon = elementIcons[element];
    playerPoints.innerHTML += `<div class="points"><img src=${icon}></div>`
    atualPoints++;
    
}
function setEnemyPoints(){
    enemyPoints.innerHTML += `<div class=" enemy-points-style" ><img src="./src/images/cards/enemy-icon.png"></div>`
    enemyAtualPoints++;
}


cards.forEach(card => {
    card.addEventListener("click", () => {

        // remove seleção de todas
        cards.forEach(c => c.classList.remove("selected"));

        // adiciona na clicada
        card.classList.add("selected");

    });
});

//depois criar uma function if tie

//getElement
function getElement(card) {
    const elements = ['fire', 'water', 'snow'];
    return elements.find(el => card.classList.contains(el));
}

//parameters to find the element.


 //if card1 clicado
//define who wins the game!
function resolveBattle(player, enemy, index) {
    
    const playerElement = getElement(player);
    const enemyElement = getElement(enemy);

    if(playerElement === enemyElement){
        CalculateTie(index);
        return;
    } 

    else if(playerElement === "fire" && enemyElement === "snow" || 
            playerElement === "water" && enemyElement ==="fire" ||
            playerElement === "snow" && enemyElement === "water"){
        setPoints(playerElement)
        winStyle()
        
    } else {
        loseStyle()
        setEnemyPoints()
    }

    //calcular se o card1 empatou
    function CalculateTie(cardIndex) {

    //perfect TIE
    if(enemyPower === playerCards[cardIndex]) {
        console.log("perfect tie")
    } 
    //win the tie
    else if(enemyPower < playerCards[cardIndex]) {
        setPoints(playerElement)
        winStyle()
    } 
    //lose the tie
    else {
        loseStyle()
        setEnemyPoints();
    }
    return;
        
    }

}


function winStyle() {
    console.log('you win!')
    centerSlot.style.transform = "scale(1.2)"
    centerSlot.style.filter = "drop-shadow(5px 5px 7px rgba(36, 255, 11, 1))"
}
function loseStyle() {
    console.log("you lose")
        centerSlot.style.transform = "scale(0.8)"
        centerSlot.style.filter = "drop-shadow(5px 5px 7px rgba(255, 11, 11, 1))"
}
generateCards()
console.log(playerCards);
