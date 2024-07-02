import * as React from 'react';
import {Wall} from './Wall';
import {Cell} from './Cell';
import {Finish} from './Finish';
import {Start} from './Start';


export function MazeBuilder(): React.ReactElement{

    const testMap = [
        ['w', 's', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w'],
        ['w', '', '', '', 'w', '', '', '', '', 'w'],
        ['w', 'w', 'w', '', 'w', '', 'w', 'w', '', 'w'],
        ['w', 'f', 'w', '', '', '', 'w', '', '', 'w'],
        ['w', '', 'w', 'w', 'w', 'w', 'w', 'w', '', 'w'],
        ['w', '', '', '', 'w', '', '', 'w', '', 'w'],
        ['w', 'w', 'w', '', 'w', '', 'w', 'w', '', 'w'],
        ['w', '', '', '', '', '', '', '', '', 'w'],
        ['w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w']
    ];

    return (
        <div>
            {constructMaze(testMap)}
        </div>
    );
}

function constructMaze(map: Array<Array<string>>): React.ReactElement {
    let maze = map.map((row: Array<string>, rowIndex: number) => {
        return (
            <div key={rowIndex} style={{ display: 'flex' }}>
                {row.map((cell: string, cellIndex: number) => {
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

