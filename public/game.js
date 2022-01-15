import { update as updateSnake, draw as drawSnake, SNAKE_SPEED, getSnakeHead, snakeIntersection, newSegments, snakeLength } from './snake.js'
import { update as updateFood, draw as drawFood } from './food.js'
import { outsideGrid } from './grid.js'

let lastRenderTime = 0
let gameOver = false
const gameBoard = document.getElementById('game-board')
let gameDisplay = document.getElementsByClassName('start-button')

$('.start-button').click(function() {
    gameDisplay[0].style.display = 'none'
    window.requestAnimationFrame(main)
    if (gameOver === false) {
        main()
    }
})

function main(currentTime) {
    if (gameOver) {
        if(confirm(`You lost. You're snake was ${snakeLength + 1} long! Press ok to restart.`)) {
            window.location.reload()
            gameDisplay[0].style.display = 'inline'
            update()
        }
        return
    }

    window.requestAnimationFrame(main)
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
    if (secondsSinceLastRender < 1 / SNAKE_SPEED) return


    lastRenderTime = currentTime

    update()
    draw() 
}

function update() {
    updateSnake()
    updateFood()
    checkDeath()
}

function draw() {
    gameBoard.innerHTML = ''
    drawSnake(gameBoard)
    drawFood(gameBoard)
}

function checkDeath() {
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection()
}