import * as React from 'react';
import {useState, useEffect, useMemo} from 'react';
import { Wall } from './Wall';
import { Cell } from './Cell';
import { Finish } from './Finish';
import { Start } from './Start';
import { Player } from './Player';
import { PlayerController } from '../PlayerController';

type Position = {
    row: number;
    col: number;
};

export function MazeController(): React.ReactElement {
    let initialPosition: Position = useMemo(() => ({ row: 0, col: 1 }), []);
    let testMap: string[][] = useMemo(() => [
        ['w', 's', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w'],
        ['w', '', '', '', 'w', '', '', '', '', 'w'],
        ['w', 'w', 'w', '', 'w', '', 'w', 'w', '', 'w'],
        ['w', 'f', 'w', '', '', '', 'w', '', '', 'w'],
        ['w', '', 'w', 'w', 'w', 'w', 'w', 'w', '', 'w'],
        ['w', '', '', '', 'w', '', '', 'w', '', 'w'],
        ['w', 'w', 'w', '', 'w', '', 'w', 'w', '', 'w'],
        ['w', '', '', '', '', '', '', '', '', 'w'],
        ['w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w']
    ], []);

    let [playerPosition, setPlayerPosition] = useState<Position>(initialPosition);


    useEffect(() => {
        let playerController = new PlayerController(testMap, initialPosition);
        let handleKeyDown = (event: KeyboardEvent) => {
            let newPosition = playerController.handleKeyDown(event);
            setPlayerPosition(newPosition);
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [initialPosition, testMap]);

    return (
        <div>
            {constructMaze(testMap, playerPosition)}
        </div>
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
