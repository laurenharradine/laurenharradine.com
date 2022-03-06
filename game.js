const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('options-btn')

let state = {}

function startGame(){
    state = {}
    showTextNode(1)
}

function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    text.innerHTML = textNode.text

    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }

    textNode.options.forEach(option => {
        if (showOption (option)) {
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('btn')
            button.addEventListener('click', () => selectOption(option))
            optionButtonsElement.appendChild(button)
        }
    })
}

function showOption(option) {
    return option.requiredState == null || option.requiredState(state)
   // return true;
}

function selectOption(option) {
    const nextTextNodeId = option.nextText
    if (nextTextNodeId <= 0) {
        return startGame()
    }
    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId)
}

const textNodes = [
    {
        id: 1,
        text: "You wake up in a small cage on a bed of old ragged blankets.  It is very dark, but you can make out a bowl of water and a bowl of food next to your bed. You can hear snuffles and squeaks echoing through the room. The air is pungent with the scent of other animals.",
        options: [
            {
                text: "Take the goo",
                setState: {goo: true },
                nextText: 2,
            },
            {
                text: "Leave the goo",
                nextText: 2,

            }
        ]
    },
    {
        id: 2,
        text: "You notice another cat in a cage of its own across the room. It has a sword! Whaaat!",
        options: [
            {
                text: "Meow loudly",
                nextText: 4,
            },
            {
                text: "Trade the good for the sword",
                requiredState: (currentState) => currentState.goo,
                setState: {goo: false, sword: true},
                nextText: 3,
            },
        ],
    },
    {
        id: 3,
    },
    {
        id: 4,
        text: "You become so worn out from meowing that you fall asleep, and don't notice when a dragon comes up and kills you!!!",
        options: [
            {
                text: 'Restart',
                nextText: -1,
            }
        ]
    }

]

startGame()