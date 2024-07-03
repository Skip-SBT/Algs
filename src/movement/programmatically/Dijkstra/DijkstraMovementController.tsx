
export class DijkstraMovementController {
    private maze: CellNode[][];

    constructor(maze: CellNode[][]){
        this.maze = maze;
    }

    private getNeighbors(x: number, y: number): [number, number][] {
        const neighbors: [number, number][] = [];
        const directions: [number, number][] = [
            [0, 1], [1, 0], [0, -1], [-1, 0]
        ];

        directions.forEach(([dx, dy]) => {
            const nx = x + dx, ny = y + dy;
            if (nx >= 0 && ny >= 0 && nx < this.maze.length && ny < this.maze[0].length && this.maze[nx][ny] !== 'W') {
                neighbors.push([nx, ny]);
            }
        });

        return neighbors;
    }

    /**
     * @method dijkstra
     * @description This method implements Dijkstra's algorithm to find the shortest path in a maze from the start point to the finish point.
     * The maze is represented as a 2D array, where 's' represents the start point, 'f' represents the finish point, 'w' represents a wall, and '' represents an open cell.
     * The method returns the shortest path as an array of [x, y] coordinates, or null if no path is found.
     * @returns {([number, number] | null)[]} The shortest path from the start to the finish point, or null if no path is found.
     */
    public dijkstra(): [number, number][] | null {
        let rows = this.maze.length;
        let cols = this.maze[0].length;
        let distances: number[][] = Array.from({ length: rows }, () => Array(cols).fill(Infinity));
        let previous: ([number, number] | null)[][] = Array.from({ length: rows }, () => Array(cols).fill(null));
        let pq: [number, number, number][] = [];

        let startX = -1, startY = -1, finishX = -1, finishY = -1;
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                if (this.maze[i][j] === 'S') {
                    startX = i;
                    startY = j;
                } else if (this.maze[i][j] === 'F') {
                    finishX = i;
                    finishY = j;
                }
            }
        }

        if (startX === -1 || startY === -1 || finishX === -1 || finishY === -1) {
            return null; // No start or finish point
        }

        distances[startX][startY] = 0;
        pq.push([startX, startY, 0]);

        while (pq.length > 0) {
            pq.sort((a, b) => a[2] - b[2]);
            let [x, y, dist] = pq.shift()!;

            if (x === finishX && y === finishY) {break;}

            this.getNeighbors(x, y).forEach(([nx, ny]) => {
                const newDist = dist + 1;
                if (newDist < distances[nx][ny]) {
                    distances[nx][ny] = newDist;
                    previous[nx][ny] = [x, y];
                    pq.push([nx, ny, newDist]);
                }
            });
        }

        let path: [number, number][] = [];
        let current: [number, number] | null = [finishX, finishY];
        while (current) {
            path.unshift(current);
            current = previous[current[0]][current[1]];
        }

        return path.length > 1 ? path : null;
    }
}
