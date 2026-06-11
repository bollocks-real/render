# ASCII Art Game 🎮

A simple terminal-based Snake game rendered using ASCII art characters.

## Features

- **Real-time ASCII rendering** using the `ascii-art` library
- **Snake gameplay** - eat food to grow and score points
- **Terminal-based controls** - responsive keyboard input
- **Score tracking** - keep track of your progress
- **Game over detection** - collision detection with walls and self

## Installation

```bash
npm install
```

## Running the Game

```bash
npm start
```

Or with auto-reload during development:

```bash
npm run dev
```

## Controls

| Key | Action |
|-----|--------|
| **W** | Move Up |
| **S** | Move Down |
| **A** | Move Left |
| **D** | Move Right |
| **Q** | Quit Game |

## Game Rules

- Control the snake (@) to eat food (*)
- Avoid hitting the walls and yourself
- Each food item eaten increases your score by 10 points
- Game ends when you collide with yourself
- The game board wraps around edges (toroidal universe)

## Project Structure

```
render/
├── package.json      # Project dependencies
├── game.js          # Main game engine and logic
└── README.md        # This file
```

## Technologies

- **Node.js** - JavaScript runtime
- **ascii-art** - ASCII art rendering library
- **Terminal I/O** - Raw terminal input for responsive controls

## Future Enhancements

- [ ] Multiple difficulty levels
- [ ] Obstacle generation
- [ ] High score persistence
- [ ] Power-ups system
- [ ] Multiplayer mode
- [ ] Image-to-ASCII rendering using canvas

## License

MIT
