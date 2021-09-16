'use strict';
import TileField from "./components/tileField.js";
import Game from "./game.js";


const fieldWidth = 10;
const fieldHeight = 10; //количество тайлов

const clickHandler = (el) => {
    const id = parseInt(el.target.id)
    if (id !== currentNumber) {
        console.log("Wrong!", id, currentNumber)
    } else {
        console.log("OK", id, currentNumber)
        hideTimeOutFrame(false)
        step++
        setTimeout(()=>{
            currentNumber = addThing(cellArray, tileSize)
            cellArray[currentNumber].free = false
        }, 200)


    }
}



//Сторона тайла в пикселях
const countTileSize = (num, winSize) => {
    const minSize = 20;
    const size = Math.round(winSize*0.95/num);
    if (num<0 || num>20 || winSize<0 || size<minSize) return minSize;
    return size;
}

//Расчет стороны тайла с учетом размера экрана
const getTileSize = (fieldWidth, fieldHeight) => {
    const winWidth = window.screen.availWidth*0.9;
    const winHeight = window.screen.availHeight*0.9;
    return (winWidth / fieldWidth < winHeight / fieldHeight) ?
        countTileSize(fieldWidth, winWidth) :
        countTileSize(fieldHeight, winHeight)
}

//отрисовка поля + индексирование полей для дальнейшей отрисовки пончиков
const drawField = (tileSize) => {
    let strTile = ""
    let strEmpty = ""
    const tileEl = TileField.tile(tileSize, '../images/grass_ivan.jpg', "tile", true);
    const emptyEl = TileField.tile(tileSize, '../images/null.png', "empty", true);
    for (let i=0; i<fieldHeight; i++) {
        for (let j=0; j<fieldWidth; j++) {
            emptyEl.id = `null_${i*fieldWidth+j}`;
            strEmpty += emptyEl.outerHTML;
            strTile += tileEl.outerHTML;
        }
        strTile += "<br />";
        strEmpty += "<br />";
    }
    const field = document.getElementById("playingFieldBack");
    field.innerHTML += strTile;
    const emptyField = document.getElementById("playingField");
    emptyField.innerHTML += strEmpty;
}

//отрисовка сразу всего массива, нужна при изменении размера
const drawThings = (tileSize, cellArray) => {

    for (let i =0; i<cellArray.length; i++) {
        if (!cellArray[i].free) drawNewThing(i, tileSize);
    }
}

//нарисовать один пончик в указанном поле
const drawNewThing = (cellId, tileSize) => {
    const thingTile = TileField.tile(tileSize, '../images/donut.png', "thing", true)
    thingTile.id = `${cellId}`
    thingTile.onclick = clickHandler

    const newTile = document.getElementById(`null_${cellId}`)
    newTile.replaceWith(thingTile);
    return true
}

//выбрать пустую клетку
const getNewTile = (cellArray) => {
    const maxIterNum = 10000
    let counter = 0
    let cellInd = Math.floor(Math.random() * cellArray.length);
    while (!cellArray[cellInd].free && counter<maxIterNum) {
        cellInd = Math.floor(Math.random() * cellArray.length);
        counter++
    }
    return counter < maxIterNum ? cellInd : -1
}

//!!!!!!!!!!
//выбрать пустую клетку
const getNewTileGroup = (cellArray) => {
    const maxIterNum = 10000
    let counter = 0
    let cellInd = Math.floor(Math.random() * cellArray.length);
    while (!cellArray[cellInd].free && counter<maxIterNum) {
        cellInd = Math.floor(Math.random() * cellArray.length);
        counter++
    }
    return counter < maxIterNum ? cellInd : -1
}


//выбрать клетку в заданном массиве и нарисовать в ней пончик
const addThing = (cellArray, tileSize) => {
    // const newTileInd = getNewTileGroup(cellArray)
    const newTileInd = getNewTile(cellArray)
    if (newTileInd === -1) return -1

    if (drawNewThing(newTileInd, tileSize)) return newTileInd
    else return -1
}

const createTimeOutFrame = () => {
    const frame = document.getElementById("timeoutFrame");

    //здесь мы будем получать нормальный компонент с счетчиком и кнопочкой
    const pic = document.createElement('img');
    pic.src = './images/fon0.png'
    pic.className = "frame"
    pic.id = "timeoutFrameId"
    pic.onclick = function (el) {
        console.log("FRAME CLICK!!!!!")
        hideTimeOutFrame()
    }
    frame.appendChild(pic);
}

const hideTimeOutFrame = (hiddenFlag=true) => {
    const frame = document.getElementById("timeoutFrame");
    frame.hidden = hiddenFlag
}


//-----------------------------------

//--------------------------------
const tileSize = getTileSize(fieldWidth, fieldHeight)
drawField(tileSize)

const cellArray = []
for (let i = 0; i<fieldHeight*fieldWidth; i++) {
    cellArray.push({
        num: i,
        free: true,
    });
}
createTimeOutFrame()
hideTimeOutFrame()

let currentNumber = addThing(cellArray, tileSize)
cellArray[currentNumber].free = false
let step = 1
//------------------


//-----------------------------------------------------------------
//-----------------------------------------------------------------


//---------






//------------------------------------


// window.addEventListener('click', function() {
//
//     const tileSize = getTileSize(fieldWidth, fieldHeight)
//
//     const res = addThing(cellArray, tileSize)
//     if (res >= 0) cellArray[res].free = false
//     console.log("click ", res)
// }, true);











//--------------------------------------------------------------------------
//перерисовка поля при изменении размера окна
window.addEventListener('resize', function() {
    console.log("resize listener")
    let el = document.getElementById("playingField");
    el.innerHTML = "";
    el = document.getElementById("playingFieldBack");
    el.innerHTML = "";
    const tileSize = getTileSize(fieldWidth, fieldHeight)
    drawField(tileSize)
    drawThings(tileSize, cellArray);
}, true);




