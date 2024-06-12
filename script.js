const EMOJIS = ["🍏","🍎","🍐","🍊","🍋","🍌","🍉","🍇","🍓","🍒","🍑","🍍","🥭","🥥"];
const NUMBER_USED_0F_EMOJIS = 10

if (NUMBER_USED_0F_EMOJIS > EMOJIS.length) {
    throw Error("NUMBER_USED_0F_EMOJIS must be less than EMOJI.length")
}

let previousCard

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
    
    cards.forEach(card => document.querySelector("#game-board").appendChild(card))
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
    let card = document.createElement("div")
    let cardContent = document.createElement("div")
    let front = document.createElement("div")
    card.appendChild(cardContent)
    cardContent.appendChild(front)
    card.classList.add("card")
    cardContent.classList.add("card-content")
    front.classList.add("front")

    front.innerText = emoji

    card.addEventListener("click", clickCard)

    return card
}

function clickCard(ev) {
    let card = ev.currentTarget

    if(card == previousCard) {
        previousCard = null
        card.classList.remove("flip")
        card.classList.add("flip-back")
        return 
    }
    
    card.classList.remove("flip-back")
    card.classList.add("flip")
    
    if(!previousCard) {
        return previousCard = card
    }

    if(card.innerText == previousCard.innerText) {
        card.classList.add("highlight")
        previousCard.classList.add("highlight")
        
        previousCard = null
    }else {
        setTimeout(() => {
            card.classList.remove("flip")
            card.classList.add("flip-back")
            previousCard.classList.remove("flip")
            previousCard.classList.add("flip-back")

            previousCard = null
        }, 500)
    }
}


initGame()