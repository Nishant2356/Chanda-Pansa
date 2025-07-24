let container = document.querySelector(".container");
let body = document.querySelector("body");
let boxes = document.querySelectorAll(".boxes");
let gotiyan = document.querySelectorAll(".goti");
let daain = 0;
let newdiv = document.createElement("div");
let dice = document.createElement("div");
let btn = document.createElement("button");
let turnBox = document.createElement("div");
let turnBox1 = document.createElement("div");
let specialbutton = document.createElement("button")
let turn = ["yellow", "green", "red", "blue"];
// let turn = ["green", "blue"];
let currentTurn = 0;
let peoplecount = 4;
let dicerolled = false;
let touchtime = 0;
let next = document.querySelector(".next");
let selectElement = document.getElementById("id");

const moveSound = new Audio("442887__180118__chest-pieces-[AudioTrimmer.com].wav");
const dicesound = new Audio("zapsplat_leisure_board_game_dice_throw_roll_on_playing_board_002_37258.mp3");
const maar = new Audio("dark_harmonics_distorted_guitar_sfx_18_dgsfx_18.mp3");
const win = new Audio("720331__saltbearer__well-done.wav");
let entrypoints = {
    "blue": "b1",
    "yellow": "b7",
    "green": "b5",
    "red": "b3"
};
let tod = {
    "blue": false,
    "yellow": false,
    "green": false,
    "red": false
};
let modvalue = {
    "a": 16,
    "b": 8
}
let endpoints = {
    "b8": "blue",
    "b6": "yellow",
    "b4": "green",
    "b2": "red"
}

btn.setAttribute("class", "btn");
dice.setAttribute("class", "dice");
specialbutton.setAttribute("class", "specialbutton");
turnBox.setAttribute("class", "turnBox")
turnBox.innerText = ``;
turnBox1.innerText = turn[currentTurn];
specialbutton.innerText = "S"

body.append(dice);
body.append(specialbutton);
dice.append(btn);
body.append(turnBox)
turnBox.append(turnBox1)

addeffects();

for (const box of boxes) {
    box.disabled = true;
}

function gotidisable() {
    for (const goti of gotiyan) {
        if(goti.classList.contains(turn[currentTurn])) {
            goti.disabled = false;
        }
        else {
            goti.disabled = true;
        }
    }
}

gotidisable();

function enableBox() {
    for (const box of boxes) {
        box.disabled = !box.disabled;
    }
}

function disableBox() {
    for (const box of boxes) {
        box.disabled = true;
        if (box.classList.contains("start")) {
            box.style.backgroundColor = "pink";
        } else {
            box.style.backgroundColor = "#EEF1DA"; // Reset board color
        }
        box.removeEventListener("click", boxClickHandler);
    }
}

function addeffects() {
    let turngotis = document.querySelectorAll(`.${turn[currentTurn]}`);
    
    for (const goti of turngotis) {
        goti.classList.add("special")
    }
}

function removeeffects() {
    let turngotis = document.querySelectorAll(".special");

    for (const goti of turngotis) {
    goti.classList.remove("special")
}
}

btn.addEventListener("click", () => {
    if(dicerolled) return;
    daain = Math.floor(Math.random() * 5) + 1;
    if (daain == 5) daain = 8;
    newdiv.innerText = `${daain}`;
    dice.prepend(newdiv);
    btn.innerText = "";
    for (let i = 0; i < daain; i++) {
        let points = document.createElement("div");
        points.setAttribute("class", "dicepoints");
        btn.append(points);
    }
    dicerolled = true;
    dicesound.play();
});

function aligncurrent(box) {
    let children = box.children.length;
    let childs = box.children;
    if(children>9) {
        for (let child of childs) {
            if(!child.classList.contains("align")) child.classList.add("align");
            if(!child.classList.contains("align2")) child.classList.add("align2");
        }
    }
    else if(children>4)  {
        for (let child of childs) {
            if(!child.classList.contains("align")) child.classList.add("align");
            if(child.classList.contains("align2")) child.classList.remove("align2");
    }
}
else {
    for (let child of childs) {
        if(child.classList.contains("align")) child.classList.remove("align");
        if(child.classList.contains("align2")) child.classList.remove("align2");
    }
} 
}

function alignprevious(box) {
    let children = box.children.length;
    let childs = box.children;
    if(children<=4)  {
        for (let child of childs) {
        child.classList.remove("align");
        child.classList.remove("align2");
    } 
}
else if(children<=9) {
    for (let child of childs) {
        child.classList.remove("align2");
    } 
}
}

function turnupdater() {
    currentTurn = (currentTurn+1)%peoplecount;
    turnBox.innerText = `${turn[currentTurn]}`;
}

function dicedisable() {
    daain = 0;
    btn.innerText = "";
    newdiv.innerText = "";
    dicerolled = false;
}

next.addEventListener("click", () => {
  if(daain!=8 && daain!=4) {
    turnupdater();
    removeeffects();
    addeffects();
  }
    dicedisable();
})

function ResetSelectElement() {
    let selectElement = document.getElementById("id");
    selectElement.value = "value1";
}

function kick(childs, goticlr) {
    let prevgoti = [];
            for (const child of childs) {
                if (!child.classList.contains(goticlr)) {
                    prevgoti.push(child);
                }
            }

            if(prevgoti.length==0) return false;
            let isMaar = true;
            let deadclr = prevgoti[0].classList[1];
            for (const goti of prevgoti) {
                console.log(goti)
                if(goti.classList[1]!=deadclr) isMaar=false;
            }
            console.log(isMaar)
            if(isMaar) {
                let chita = document.querySelector(`.start${deadclr}`)
                for (const child of prevgoti) {
                    chita.append(child);
                }
                tod[goticlr] = true;
                flag = true;
                aligncurrent(chita);
                maar.play();
                return true;
            }
          return false;  
}

function boxClickHandler(event) {
    let box = event.currentTarget;
    let gotis = document.querySelectorAll(".selected-goti");
    let goti = gotis[0];
    let goticlr = goti.classList[1];
    let parentBoxOfGoti = goti.parentElement;
    if (parentBoxOfGoti === box) {
        // Same box clicked, just ignore
        return;
    }
    if (goti) { 
        for (const goti of gotis) {
            box.append(goti);
        }
        moveSound.play();
        let childs = event.currentTarget.children;
        let flag = false;
        if(box.classList.contains("end")) win.play();

        // maar1
        if(selectElement.options[selectElement.selectedIndex].text=="1" && childs.length == 2 && !box.classList.contains("start")) {
            if(kick(childs, goticlr)) flag = true;
        }

        // maar2
        if (selectElement.options[selectElement.selectedIndex].text=="2" && childs.length == 4 && !box.classList.contains("start")) {
            if(kick(childs, goticlr)) flag = true;
        }

        // maar3
        if (selectElement.options[selectElement.selectedIndex].text=="3" && childs.length == 6 && !box.classList.contains("start")) {
            if(kick(childs, goticlr)) flag = true;
        }

        // maar4
        if (selectElement.options[selectElement.selectedIndex].text=="4" && childs.length == 8 && !box.classList.contains("start")) {
            if(kick(childs, goticlr)) flag = true;
            // kick(childs, goticlr);
            // flag = true;
        }

        if(!flag && daain!=4 && daain!=8 && daain!=0) {
            turnupdater()
        }

        goti.classList.remove("selected-goti");
        // if(dicerolled && goticlr!=turn[currentTurn]) 
        aligncurrent(event.target);
        alignprevious(parentBoxOfGoti);
        disableBox();
        dicedisable();
        gotidisable();
        ResetSelectElement();
        removeeffects();
        addeffects();
        touchtime = 0;
    }
}

function newposition(gotis, move) {
    for (let i = 0; i < move; i++) {
        gotis[i].classList.add("selected-goti");
    }
    boxes.forEach((box) => {
        box.addEventListener("click", boxClickHandler, { once: true });
    });
}

specialbutton.addEventListener("click", enableBox);

// function movegoti1(goti) {
//     let parentBox = goti.parentElement;
//     let goticolor = goti.classList[1];
//         let parentclasses = parentBox.classList;
//         mod = parentclasses[1][0];
//         let gotiPosition = parentclasses[1];

//         if (gotiPosition) {
//             let positionNumber = parseInt(gotiPosition.substring(1));

//             for (let i = 0; i <= daain; i++) {
//                 let position = positionNumber + i;
//                 if (position > modvalue[mod]) position = position % modvalue[mod];
//                 let legalBox = document.querySelector(`.${mod}${position}`);

//                 if (legalBox) {
//                     if(endpoints[legalBox.classList[1]]==goticolor) {
//                         if(i==daain-1) {
//                             document.querySelector(".end").style.backgroundColor = "white";
//                             document.querySelector(".end").disabled = false;
//                             break;
//                         }
//                     }
//                     if (i == daain) {
//                         legalBox.style.backgroundColor = "white";
//                         legalBox.disabled = false;
//                     }

//                     if (tod[goticolor] && legalBox.classList.contains(`entry${goticolor}`) && i < daain) {
//                         positionNumber = parseInt(entrypoints[goticolor].substring(1));
//                         mod = "b"
//                         for (let j = 0; j < daain - i; j++) {
//                             position = positionNumber + j;
//                             if (position > 8) position = position % 8;
//                             legalBox = document.querySelector(`.${mod}${position}`);

//                             if (legalBox && j == daain - i - 1) {
//                                 legalBox.style.backgroundColor = "white";
//                                 legalBox.disabled = false;
//                             }
//                         }
//                         break;
//                     }
//                 }
//             }
//             newposition([goti], 1);
//         }  
// }

selectElement.addEventListener("click", () => {
    disableBox();
})

function movegoti(goti, selectedText) {
    let parentBox = goti.parentElement;
    let goticolor = goti.classList[1];
        let parentclasses = parentBox.classList;
        mod = parentclasses[1][0];
        let gotiPosition = parentclasses[1];
        let children = parentBox.children;
        let count = 0;
        let rightgotis = [];

        for (const child of children) {
            if(child.classList.contains(goticolor)) {
                count++;
                rightgotis.push(child);
            }
        }
        
        if (gotiPosition && count>=selectedText && daain%selectedText==0) {
            let positionNumber = parseInt(gotiPosition.substring(1));
            daain = daain;
            let daam = daain/selectedText;
            for (let i = 0; i <= daam; i++) {
                let position = positionNumber + i;
                if (position > modvalue[mod]) position = position % modvalue[mod];
                let legalBox = document.querySelector(`.${mod}${position}`);

                if (legalBox) {
                    if(endpoints[legalBox.classList[1]]==goticolor) {
                        if(i==daam-1) {
                            document.querySelector(".end").style.backgroundColor = "white";
                            document.querySelector(".end").disabled = false;
                            break;
                        }
                    }
                    if (i == daam) {
                        legalBox.style.backgroundColor = "white";
                        legalBox.disabled = false;
                    }

                    if (tod[goticolor] && legalBox.classList.contains(`entry${goticolor}`) && i < daam) {
                        positionNumber = parseInt(entrypoints[goticolor].substring(1));
                        mod = "b"
                        for (let j = 0; j < daam - i; j++) {
                            position = positionNumber + j;
                            if (position > 8) position = position % 8;
                            legalBox = document.querySelector(`.${mod}${position}`);

                            if (legalBox && j == daam - i - 1) {
                                legalBox.style.backgroundColor = "white";
                                legalBox.disabled = false;
                            }
                        }
                        break;
                    }
                }
            }
            newposition(rightgotis, selectedText);
        }  
}

for (const goti of gotiyan) {
    goti.addEventListener("click", () => {
        let parentBox = goti.parentElement;
        let goticolor = goti.classList[1];
        parentBox.click();
        touchtime = 1;
        let prevgoti = document.querySelectorAll(".selected-goti");
        for (const goti of prevgoti) {
            goti.classList.remove("selected-goti");
        }
        disableBox();
        if (turn[currentTurn] == goticolor) {
            let selectElement = document.getElementById("id");
            const selectedText = selectElement.options[selectElement.selectedIndex].text;
            if(daain) movegoti(goti, parseInt(selectedText));
        }
    });
}