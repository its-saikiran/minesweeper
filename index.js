// // //  MINE SWEEPER GAME!!  // // //


// // // BODYTAG    
const BODY = document.getElementsByTagName('body');
BODY[0].style = 'display: flex; flex-direction: column; justify-content: center; align-items: center;'
// console.log(BODY)



// // // CREATING HEADING!!
const HEADING = document.createElement('h1');
HEADING.innerHTML = 'MINE SWEEPER'
BODY[0].append(HEADING)
// console.log(BODY)



// // // GAME STARTING FROM HERE!!
const FIRST_DIV = document.createElement('div')
const FORM = document.createElement('form')
// // // TAKING INPUT PLAYER NAME HERE!!
const h1 = document.createElement('h1')
h1.innerHTML = '<i>Player Name:</i>'
const INPUT = document.createElement('input')
INPUT.required = true;
INPUT.type = 'text';
INPUT.setAttribute('id','userInp')
INPUT.autofocus = true;
INPUT.style = 'font-size: 30px; border: none; margin-bottom: 1em; padding-left: 5px;'
// // // STARTING GAME WITH A START BUTTON HERE!!
const START_BUTTON = document.createElement('button')
START_BUTTON.innerHTML = 'start';
START_BUTTON.style = 'font-size: 7em; font-weight: bold; padding: 0px 40px; border: none;'
FORM.append(h1)
FORM.append(INPUT)
FORM.append(START_BUTTON)
FORM.setAttribute('onsubmit','gameStartButton()')
FORM.style = 'display: flex; flex-direction: column;'
FIRST_DIV.append(FORM)
FIRST_DIV.style = 'height: 80vh; width: 75vw; background-color: orange; display: flex; justify-content: center; align-items: center;'
BODY[0].append(FIRST_DIV)
// console.log(BODY)



const gameStartButton = (userName=null) => {

    const BODY = document.getElementsByTagName('body')
    if(!userName) {
        BODY[0].children[1].innerHTML = `<i>${document.getElementById('userInp').value}</i> is playing game!`;
    }

    // // // CREATING CONTAINER!!
    const SECTION = document.createElement('section');
    // // // CREATING BOXES!!
    const TOTAL_BOXES = 15 * 8;
    for(let id=1; id<=TOTAL_BOXES; id++) {
        const DIV = document.createElement('div');
        DIV.style = 'background-color: orange; border: solid; height: 60px; display: flex; align-items: center; justify-content: center; font-weight: bolder; font-size: 1.3em;'
        // DIV.innerHTML = `${id}`
        DIV.innerHTML = ''
        DIV.setAttribute('id',id);
        DIV.setAttribute('onclick',`clickedFun(${id})`);
        SECTION.append(DIV);
    };
    SECTION.style = 'display: grid; grid-template-columns: repeat(15,60px); border: 2px solid;'
    BODY[0].replaceChild(SECTION,BODY[0].children[2])
    // console.log(BODY[0])



    // // // PLACING BOMBS HERE!!
    const TOTAL_BOMBS = 40;
    for(let j=1; j<=TOTAL_BOMBS; j++) {
        let BOMB = Math.floor(Math.random()*117)
        BOMB_DIV = document.getElementById(`${BOMB}`);
        BOMB_DIV.textContent = 'BoM';
        BOMB_DIV.style = 'color: orange; background-color: orange; border: 3px solid black; display: flex; justify-content: center; align-items: center;'
    };
};
    


// // // CLICKED FUNCTION IS DEFINED HERE FOR CHECKING BOMBS!!
const clickedFun = (id) => {
    if(document.getElementById(id).textContent==='BoM') {
       
        document.getElementById(id).innerHTML = '<img src="./bomb.svg" alt="BoM" style="height: 30px; width: 30px;" />'
        document.getElementById(id).style = 'background-color: red; border: 3px solid black; display: flex; justify-content: center; align-items: center;'

        const BODY = document.getElementsByTagName('body')
        const GAMEOVER = document.createElement('div')
        const userName = BODY[0].children[1].innerHTML;
        setTimeout(() => {
            // // // GAME OVER HERE!!
            GAMEOVER.innerHTML = 'GAME OVER!'
            GAMEOVER.style = 'height: 80vh; width: 75vw; font-size: 9rem; font-weight: bolder; color: red; display: flex; justify-content: space-around; align-items: center;'
            BODY[0].replaceChild(GAMEOVER,BODY[0].children[2])
        }, 1000);
        

        setTimeout(() => {
            GAMEOVER.innerHTML=''
            
            // // // GAME AGAIN STARTING FROM HERE!!
            const playAgain = () => {
                gameStartButton(userName)
            }
            
            // // // GAME EXITS HERE!!
            const exitFun = () => {
                GAMEOVER.innerHTML = `${userName.slice(0,userName.length-16)} exits the game!`
                GAMEOVER.style = 'height: 80vh; width: 75vw; font-size: 7rem; font-weight: bolder; color: green; display: flex; justify-content: center; align-items: center;'
                setTimeout(() => {
                    location.reload();
                }, 2000);
            }
            
            const RESTART = document.createElement('button');
            RESTART.innerHTML = 'Play again';
            RESTART.addEventListener('click',playAgain);
            RESTART.style = 'font-size: 5rem; font-weight: bolder; border: none; padding: 0px 30px;'
            const EXIT = document.createElement('button');
            EXIT.innerHTML = 'Exit';
            EXIT.addEventListener('click',exitFun);
            EXIT.style = 'font-size: 5rem; font-weight: bolder; border: none; padding: 0px 30px;'
            GAMEOVER.append(RESTART)
            GAMEOVER.append(EXIT)
            GAMEOVER.style = 'background-color: orange; height: 80vh; width: 75vw; font-size: 9rem; font-weight: bolder; color: gray; display: flex; justify-content: space-around; align-items: center;'
        }, 3500);

    }else{
        // // // MAKING CALL HERE TO FIND NEIGHBOUR BOMBS!!
        countingNeighbourBombs(id);
    }
};

// // // COUNTING NEIGHBOUR BOMBS OF THAT DIVISION!!
const countingNeighbourBombs = (id) => {
    const CHECK_BOMB = !document.getElementById(id).textContent
    if(CHECK_BOMB) {
        let count = 0;

        if( 1<= id-16 && (id-1)%15 && (document.getElementById(id-16).textContent === 'BoM') ) {
            count += 1;
        }
        // console.log(1,count)

        if( 1<=id-15 && (document.getElementById(id-15).textContent === 'BoM') ) {
            count += 1;
        }
        // console.log(2,count)

        if( 1<=id-15 && id%15 && (document.getElementById(id-14).textContent === 'BoM') ) {
            count += 1;
        }
        // console.log(3,count)

        if( (id-1)%15 && (document.getElementById(id-1).textContent === 'BoM') ) {
            count += 1;
        }
        // console.log(4,count)

        if( id%15 && (document.getElementById(id+1).textContent === 'BoM') ) {
            count += 1;
        }
        // console.log(5,count)

        if( id+15<=120 && (id-1)%15  && (document.getElementById(id+14).textContent === 'BoM') ) {
            count += 1;
        }
        // console.log(6,count)

        if( id+15<=120  && (document.getElementById(id+15).textContent === 'BoM') ) {
            count += 1;
        }
        // console.log(7,count)

        if( id+15<=120 && id%15 && (document.getElementById(id+16).textContent === 'BoM') ) {
            count += 1;
        }
        // console.log(8,count)

        // console.log(count)

        document.getElementById(id).innerHTML = `${ count }`
    } 
};

















