const readline = require('readline');

// Simple Snake Game using ASCII Art rendering

class SnakeGame {
  constructor(width = 40, height = 20) {
    this.width = width;
    this.height = height;
    this.reset();
  }

  reset() {
    // Initialize snake in the middle
    this.snake = [
      { x: Math.floor(this.width / 2), y: Math.floor(this.height / 2) },
      { x: Math.floor(this.width / 2) - 1, y: Math.floor(this.height / 2) },
      { x: Math.floor(this.width / 2) - 2, y: Math.floor(this.height / 2) }
    ];
    
    this.direction = { x: 1, y: 0 };
    this.nextDirection = { x: 1, y: 0 };
    this.food = this.generateFood();
    this.score = 0;
    this.gameOver = false;
  }

  generateFood() {
    let food;
    do {
      food = {
        x: Math.floor(Math.random() * this.width),
        y: Math.floor(Math.random() * this.height)
      };
    } while (this.snake.some(segment => segment.x === food.x && segment.y === food.y));
    return food;
  }

  update() {
    if (this.gameOver) return;

    this.direction = this.nextDirection;

    // Calculate new head position
    const head = this.snake[0];
    const newHead = {
      x: (head.x + this.direction.x + this.width) % this.width,
      y: (head.y + this.direction.y + this.height) % this.height
    };

    // Check collision with self
    if (this.snake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
      this.gameOver = true;
      return;
    }

    this.snake.unshift(newHead);

    // Check if food eaten
    if (newHead.x === this.food.x && newHead.y === this.food.y) {
      this.score += 10;
      this.food = this.generateFood();
    } else {
      this.snake.pop();
    }
  }

  setDirection(x, y) {
    // Prevent 180-degree turn
    if (this.direction.x + x === 0 && this.direction.y + y === 0) return;
    this.nextDirection = { x, y };
  }

  render() {
    const canvas = Array(this.height)
      .fill(null)
      .map(() => Array(this.width).fill(' '));

    // Draw snake
    this.snake.forEach((segment, index) => {
      canvas[segment.y][segment.x] = index === 0 ? '@' : '#';
    });

    // Draw food
    canvas[this.food.y][this.food.x] = '*';

    // Convert to string
    const frame = canvas.map(row => row.join('')).join('\n');
    return frame;
  }

  getStatus() {
    const status = `Score: ${this.score} | Snake Length: ${this.snake.length}`;
    return status;
  }
}

async function main() {
  const game = new SnakeGame(40, 15);

  // Setup terminal input
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  process.stdin.setRawMode(true);
  process.stdin.on('data', (key) => {
    switch (key[0]) {
      case 119: // 'w'
        game.setDirection(0, -1);
        break;
      case 115: // 's'
        game.setDirection(0, 1);
        break;
      case 97: // 'a'
        game.setDirection(-1, 0);
        break;
      case 100: // 'd'
        game.setDirection(1, 0);
        break;
      case 113: // 'q'
        process.exit(0);
        break;
    }
  });

  console.clear();
  console.log('🎮 SNAKE GAME - ASCII ART EDITION 🎮\n');
  console.log('Controls: W (up), S (down), A (left), D (right), Q (quit)\n');

  // Game loop
  const gameLoop = setInterval(() => {
    if (game.gameOver) {
      clearInterval(gameLoop);
      console.clear();
      console.log('╔════════════════════════╗');
      console.log('║    GAME OVER! 💀       ║');
      console.log('║                        ║');
      console.log(`║  Final Score: ${game.score.toString().padEnd(12)}║`);
      console.log(`║  Snake Length: ${game.snake.length.toString().padEnd(11)}║`);
      console.log('╚════════════════════════╝');
      process.exit(0);
      return;
    }

    game.update();
    console.clear();
    
    // Render with ASCII Art styling
    console.log('╔' + '═'.repeat(40) + '╗');
    const gameFrame = game.render();
    gameFrame.split('\n').forEach(line => {
      console.log('║ ' + line + ' ║');
    });
    console.log('╚' + '═'.repeat(40) + '╝');
    
    console.log('\n' + game.getStatus());
  }, 150);
}

main();
