type Position = {
    row: number;
    col: number;
};

export class PlayerController {
    private readonly map: string[][];
    private position: Position;

    constructor(map: string[][], initialPosition: Position) {
        this.map = map;
        this.position = initialPosition;
    }

    public getPosition(): Position {
        return this.position;
    }

    public handleKeyDown(event: KeyboardEvent): Position {
        let newRow = this.position.row;
        let newCol = this.position.col;

        switch (event.key) {
        case 'ArrowUp':
            newRow = Math.max(0, this.position.row - 1);
            break;
        case 'ArrowDown':
            newRow = Math.min(this.map.length - 1, this.position.row + 1);
            break;
        case 'ArrowLeft':
            newCol = Math.max(0, this.position.col - 1);
            break;
        case 'ArrowRight':
            newCol = Math.min(this.map[0].length - 1, this.position.col + 1);
            break;
        default:
            break;
        }

        if (this.map[newRow][newCol] !== 'w') {
            this.position = { row: newRow, col: newCol };
        }

        return this.position;
    }

    public resetGame(initialPosition: Position): void {
        this.position = initialPosition;
    }

    public hasWon(): boolean {
        return this.map[this.position.row][this.position.col] === 'f';
    }
}
