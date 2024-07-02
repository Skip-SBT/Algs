import * as React from 'react';
import { useState, useEffect, useMemo } from 'react';
import { Wall } from './Wall';
import { Cell } from './Cell';
import { Finish } from './Finish';
import { Start } from './Start';
import { Player } from './Player';
import { PlayerController } from '../PlayerController';
import './Maze.css';

type Position = {
    row: number;
    col: number;
};

export function MazeController(): React.ReactElement {
    let testMap: string[][] = useMemo(() => [
        ['w', 's', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w'],
        ['w', '', '', '', 'w', '', '', '', '', '', '', '', 'w'],
        ['w', 'w', 'w', '', 'w', '', 'w', 'w', 'w', 'w', '', '', 'w'],
        ['w', '', 'w', '', '', '', 'w', '', '', 'w', '', 'w', 'w'],
        ['w', '', 'w', 'w', 'w', 'w', 'w', '', 'w', 'w', '', '', 'w'],
        ['w', '', '', '', 'w', '', '', '', '', 'w', 'w', '', 'w'],
        ['w', 'w', 'w', '', 'w', '', 'w', 'w', '', '', '', '', 'w'],
        ['w', '', 'w', '', '', '', '', '', 'w', 'w', 'w', '', 'w'],
        ['w', '', '', '', 'w', 'w', 'w', 'w', 'w', '', 'w', '', 'w'],
        ['w', 'w', 'w', '', '', '', '', '', '', '', '', 'w', 'w'],
        ['w', '', 'w', 'w', '', 'w', 'w', 'w', 'w', 'w', 'w', 'f', 'w'],
        ['w', '', '', '', '', '', '', '', '', '', '', '', 'w'],
        ['w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w']
    ], []);

    let initialPosition: Position = useMemo(() => (findStartPosition(testMap)), [testMap]);
    let [playerPosition, setPlayerPosition] = useState<Position>(initialPosition);
    let playerController = useMemo(() => new PlayerController(testMap, initialPosition), [testMap, initialPosition]);
    let [hasWon, setHasWon] = useState<boolean>(false);

    // Timer state
    const [timer, setTimer] = useState<number>(0);
    const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isTimerRunning) {
            interval = setInterval(() => {
                setTimer(prevTimer => prevTimer + 0.1);
            }, 100);
        }

        return () => {
            if (interval) {clearInterval(interval);}
        };
    }, [isTimerRunning]);

    useEffect(() => {
        let handleKeyDown = (event: KeyboardEvent) => {
            if (!isTimerRunning) {
                setIsTimerRunning(true);
            }

            let newPosition = playerController.handleKeyDown(event);
            setPlayerPosition(newPosition);

            if (playerController.hasWon()) {
                setHasWon(true);
                setIsTimerRunning(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isTimerRunning, playerController]);

    const resetGameHandler = () => {
        resetGame(setPlayerPosition, initialPosition, playerController, setHasWon);
        setTimer(0);
        setIsTimerRunning(false);
    };

    return (
        <>
            <div className='timer'>{timer.toFixed(1)} Seconds</div>
            {!hasWon && (
                <button className='resetButton-fixed' onClick={resetGameHandler}>Reset</button>
            )}
            <div className='mazeContainer'>
                {constructMaze(testMap, playerPosition)}
            </div>
            {hasWon && (
                <>
                    <div className='winMessage'>
                        <div>Congratulations! You have won!</div>
                        <br />
                        <div>Time needed for completion: {timer.toFixed(1)} Seconds</div>
                        <br />
                        <button className='resetButton' onClick={resetGameHandler}>Reset</button>
                    </div>
                </>
            )}
        </>
    );
}
function constructMaze(map: string[][], playerPosition: Position): React.ReactElement {
    const maze = map.map((row, rowIndex) => {
        return (
            <div key={rowIndex} style={{ display: 'flex' }}>
                {row.map((cell, cellIndex) => {
                    if (playerPosition.row === rowIndex && playerPosition.col === cellIndex) {
                        return <Player key={`${rowIndex}-${cellIndex}`} />;
                    }
                    switch (cell) {
                    case 'w':
                        return <Wall key={`${rowIndex}-${cellIndex}`} />;
                    case 's':
                        return <Start key={`${rowIndex}-${cellIndex}`} />;
                    case 'f':
                        return <Finish key={`${rowIndex}-${cellIndex}`} />;
                    default:
                        return <Cell key={`${rowIndex}-${cellIndex}`} />;
                    }
                })}
            </div>
        );
    });

    return <div>{maze}</div>;
}

function resetGame(setPlayerPosition: (arg0: Position) => void, initialPosition: Position, playerController: PlayerController, setHasWon: (state: boolean) => void): void {
    setPlayerPosition(initialPosition);
    playerController.resetGame(initialPosition);
    setHasWon(false);
}

function findStartPosition(map: string[][]): Position {
    for (let row = 0; row < map.length; row++) {
        for (let col = 0; col < map[row].length; col++) {
            if (map[row][col] === 's') {
                return { row, col };
            }
        }
    }
    throw new Error('No start position found');
}
