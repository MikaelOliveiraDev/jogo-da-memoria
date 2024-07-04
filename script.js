const EMOJIS = ["🍏", "🍎", "🍐", "🍊", "🍋", "🍌", "🍉", "🍇", "🍓", "🫐", "🍒", "🍑", "🥭", "🍍", "🥥", "🥝", "🍆", "🥑", "🥒", "🌶️", "🫑", "🌽", "🥕", "🫒"];
const NUMBER_USED_0F_EMOJIS = 10
const GAME = {
    previousCard: null,
    combo: 0,
    score: 0,
}

if (NUMBER_USED_0F_EMOJIS > EMOJIS.length) {
    throw Error("NUMBER_USED_0F_EMOJIS must be less than EMOJI.length")
}


putLevelsOnList()
initGame()



function initGame() {
    let cards = []

    EMOJIS.forEach((emoji, index) => {
        if(index > NUMBER_USED_0F_EMOJIS) return

        // Create a pair of cards
        for(let i = 0; i < 2; i++) {
            let card = createCard(emoji)
            
            cards.push(card) 
        }
    })

    shuffleArray(cards)
    
    cards.forEach(card => document.querySelector("#cards").appendChild(card))

    startAnimation()
}
function shuffleArray(array) {
    for(let index0 = array.length - 1; index0 > 0; index0--) {
        let index1 = Math.floor(Math.random() * (index0 + 1))
        item0 = array[index0]
        item1 = array[index1]
        array[index0] = item1
        array[index1] = item0
        //[array[i], array[j]] = [array[j], array[i]]
    }

    return array
}
function createCard(emoji) {
    let cardWrapper = document.createElement("div")
    let card = document.createElement("div")
    let front = document.createElement("div")
    cardWrapper.appendChild(card)
    card.appendChild(front)
    cardWrapper.classList.add("card-wrapper")
    card.classList.add("card")
    front.classList.add("front")

    front.innerText = emoji

    card.addEventListener("click", clickCard)

    return cardWrapper
}

function flipBack(card) {
    card.classList.remove("flip-to-front")
    card.classList.add("flip-to-back")
}
function flipFront(card) {
    card.classList.remove("flip-to-backck")
    card.classList.add("flip-to-front")
}

function clickCard(ev) {
    let card = ev.currentTarget
    
    // Skip already matched cards
    if (card.classList.contains("highlight")) return

    // Manually flipback
    if(card == GAME.previousCard) {
        GAME.previousCard = null
        flipBack(card)
        return 
    }
    
    flipFront(card)

    // If this is the first click one
    if(!GAME.previousCard) {
        return GAME.previousCard = card
    }

    let score = document.querySelector("#score")
    let combo = document.querySelector("#combo")
    
    // If matched
    if(card.innerText == GAME.previousCard.innerText) {
        card.classList.add("highlight")
        GAME.previousCard.classList.add("highlight")
        
        GAME.previousCard = null

        GAME.combo += 1
        GAME.score += 2 * GAME.combo

    }else {
        GAME.combo = 0
        
        setTimeout(() => {
            flipBack(card)
            flipBack(GAME.previousCard)
            
            GAME.previousCard = null
        }, 500)
    }
    score.innerText = GAME.score 
    combo.innerText = GAME.combo
}

function startAnimation() {
    let cards = document.querySelectorAll("#cards .card")
    
    for (let card of cards) {

        setTimeout(function() {
            card.classList.add("flip-to-back")
        }, 500)
    }
}

function restartGame(ev) {
    document.querySelector("#cards").innerHTML = ""
    initGame()
}

function putLevelsOnList() {
    let list = document.querySelector("section .levels")
    let htmlContent = ""

    for (let emoji of EMOJIS) {
        htmlContent += `<li class="level locked">${emoji}</li>`
    }
    
    list.innerHTML = htmlContent
}
