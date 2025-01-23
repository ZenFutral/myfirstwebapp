// Starts game in the 'paused' state
let gameState = 'pause';

// Grabs elements from our HTML
let paddle_1 = document.querySelector('.paddle_1');
let paddle_2 = document.querySelector('.paddle_2');
let paddles  = document.querySelector('.paddle');

let score_1 = document.querySelector('.player_1_score');
let score_2 = document.querySelector('.player_2_score');

let message = document.querySelector('.message');
let board   = document.querySelector('.board');

let initial_ball = document.querySelector('.ball');
let ball         = document.querySelector('.ball');

let ui_h_speed = document.querySelector('.h_speed')
let ui_v_speed = document.querySelector('.v_speed')
let ui_ball_dir = document.querySelector('.ball_dir')

// Get coords of our elements
let paddle_1_coord = paddle_1.getBoundingClientRect();
let paddle_2_coord = paddle_2.getBoundingClientRect();
let paddle_common  = paddles.getBoundingClientRect();

let initial_ball_coord = ball.getBoundingClientRect();
let ball_coord         = initial_ball_coord;    // Seperates current vs init ball location

let board_coord = board.getBoundingClientRect();

// Sets initial ball vector
let h_speed = Math.floor(Math.random() * 4) + 3; // Rate of movement
let h_dir   = Math.floor(Math.random() * 2); // '0' = Left, '1' = Right
let v_speed = Math.floor(Math.random() * 4) + 3; // Rate of movement
let v_dir   = Math.floor(Math.random() * 2); // '0' = Up, '1' = Down

document.addEventListener('keydown', (event) => {
    if (event.key == 'Enter') {
        // Toggle 'gameState'
        gameState = gameState == 'pause' ? 'play' : 'pause';

        if (gameState == 'play') {
            message.innerHTML = 'Game Started';
            
            requestAnimationFrame(() => {
                moveBall(h_speed, v_speed, h_dir, v_dir);
            });
        } else {
            [h_speed, v_speed] = setupRound()

        }
    }

    // If game isn't running, ignore input
    if (gameState != 'play') {
        return;
    }

    if (event.key == 'w') {
        paddle_1.style.top = Math.max(
            board_coord.top,
            paddle_1_coord.top - window.innerHeight * 0.06
            ) + 'px';
        
        paddle_1_coord = paddle_1.getBoundingClientRect();  // Updates paddle coords variable to newly calculated position
    }
    if (event.key == 's') {
    paddle_1.style.top =
        Math.min(
        board_coord.bottom - paddle_common.height,
        paddle_1_coord.top + window.innerHeight * 0.06
        ) + 'px';
    paddle_1_coord = paddle_1.getBoundingClientRect();
    }

    if (event.key == 'ArrowUp') {
    paddle_2.style.top =
        Math.max(
        board_coord.top,
        paddle_2_coord.top - window.innerHeight * 0.1
        ) + 'px';
    paddle_2_coord = paddle_2.getBoundingClientRect();
    }
    if (event.key == 'ArrowDown') {
    paddle_2.style.top =
        Math.min(
        board_coord.bottom - paddle_common.height,
        paddle_2_coord.top + window.innerHeight * 0.1
        ) + 'px';
    paddle_2_coord = paddle_2.getBoundingClientRect();
        
    }
});

function setupRound() {
    gameState = 'pause';

    h_speed = 0;
    v_speed = 0;

    ball_coord = initial_ball_coord;
    ball.style = initial_ball.style;
    message.innerHTML = 'Press Enter to Play Pong';

    return [h_speed, v_speed]
}

function displayDir(h_dir, v_dir) {
    let dir_msg = ""

    if (h_dir) {
        dir_msg = dir_msg + "→"
    } else {
        dir_msg = dir_msg + "←"
    }

    if(v_dir) {
        dir_msg = dir_msg + "↓"
    } else {
        dir_msg = dir_msg + "↑"
    }

    ui_ball_dir.innerHTML = dir_msg;

}

function moveBall(h_speed, v_speed, h_dir, v_dir) {
    ui_h_speed.innerHTML = h_speed;
    ui_v_speed.innerHTML = v_speed;
    displayDir(h_dir, v_dir);
    

    // If the ball is at or above the ceiling, go down
    if (ball_coord.top <= board_coord.top) {
        v_dir = 1;
    }

    // If the ball is at or below the floor, go up
    if (ball_coord.bottom >= board_coord.bottom) {
        v_dir = 0;
    }

    if (
        ball_coord.left <= paddle_1_coord.right &&
        ball_coord.top >= paddle_1_coord.top &&
        ball_coord.bottom <= paddle_1_coord.bottom
    ) {
        h_dir = 1;
        h_speed = Math.floor(Math.random() * 4) + 3;
        v_speed = Math.floor(Math.random() * 4) + 3;
    }

    if (
        ball_coord.right >= paddle_2_coord.left &&
        ball_coord.top >= paddle_2_coord.top &&
        ball_coord.bottom <= paddle_2_coord.bottom
    ) {
        h_dir = 0;
        h_speed = Math.floor(Math.random() * 4) + 3;
        v_speed = Math.floor(Math.random() * 4) + 3;
    }

    if (
        ball_coord.left <= board_coord.left ||
        ball_coord.right >= board_coord.right
    ) {
        if (ball_coord.left <= board_coord.left) {
            score_2.innerHTML = +score_2.innerHTML + 1;
        } else {
            score_1.innerHTML = +score_1.innerHTML + 1;
        }

        h_speed, v_speed = setupRound();
        return;
    }

    ball.style.top = ball_coord.top + v_speed * (v_dir == 0 ? -1 : 1) + 'px';
    ball.style.left = ball_coord.left + h_speed * (h_dir == 0 ? -1 : 1) + 'px';
    ball_coord = ball.getBoundingClientRect();
    requestAnimationFrame(() => {
        moveBall(h_speed, v_speed, h_dir, v_dir);
    });
}
