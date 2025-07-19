console.log('Welcome to Tic Tac Toe')
let bgm=new Audio("bgm.mp3")
let click=new Audio("reset.mp3")
let again=new Audio("try again.mp3")
let turn ="X";

let gameover=false;

// Function to change the turn...
const changeTurn=()=>{
    return turn === "X"?"O": "X"
}


// Function to check the win...

const checkwin = () => {
    let text = document.querySelectorAll(".x");
    let chances = [
        [0,1,2,0,-10,0],
        [3,4,5,0,0,0],
        [6,7,8,0,10,0],
        [0,3,6,-10,0,90],
        [1,4,7,0,0,90],
        [2,5,8,10,0,90],
        [0,4,8,0,0,45],
        [2,4,6,0,0,135]
    ];
    chances.forEach(e => {
        if (
            text[e[0]].innerText === text[e[1]].innerText &&
            text[e[1]].innerText === text[e[2]].innerText &&
            text[e[0]].innerText !== ""
        ) {
            document.getElementsByClassName("info")[0].innerText = text[e[0]].innerText + " WON...";
            let line = document.querySelector(".line");
            line.style.display = "block";
            line.style.width="30vw";
            line.style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`;
            gameover=true;
            document.querySelector('.imagebox').getElementsByTagName('img')[0].style.width="190px";
            bgm.pause()
            bgm.currentTime=0;
            again.play()
        }
    });
};

window.addEventListener('click', () => {
    bgm.play();
}, { once: true });


//Game logic
let boxes = document.getElementsByClassName("xbox");
Array.from(boxes).forEach(element => {
    element.addEventListener('click', () => {
        let t=element.querySelector('.x');
        if (t.innerText === '') {
            t.innerText = turn;
            turn = changeTurn();
            click.play();
            checkwin();
            if (!gameover)
            {
                document.getElementsByClassName("info")[0].innerText = "Turn of " + turn;
            }
        }
    });
});


// To reset our board 
reset.addEventListener('click',()=>{
    let t=document.querySelectorAll('.x');
    Array.from(t).forEach(element=>{
        element.innerText="";
    });
    turn="X"
    document.getElementsByClassName("info")[0].innerText = "Turn of " + turn;
    document.querySelector('.imagebox').getElementsByTagName('img')[0].style.width="0px";
    let line = document.querySelector(".line");
    line.style.width="0vw";
    again.pause();
    again.currentTime = 0;
    bgm.loop=true;
    bgm.play()
})