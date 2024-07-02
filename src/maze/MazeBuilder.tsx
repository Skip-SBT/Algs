import * as React from 'react';
import {Wall} from './Wall';
import {Cell} from './Cell';


export function MazeBuilder(): React.ReactElement{

    const testMap = [
        ['w', '', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w'],
        ['w', '', '', '', 'w', '', '', '', '', 'w'],
        ['w', 'w', 'w', '', 'w', '', 'w', 'w', '', 'w'],
        ['w', '', 'w', '', '', '', 'w', '', '', 'w'],
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
                    if (cell === 'w') {
                        return <Wall key={`${rowIndex}-${cellIndex}`} />;
                    } else {
                        return <Cell key={`${rowIndex}-${cellIndex}`} />;
                    }
                })}
            </div>
        );
    });

    return <div>{maze}</div>;
}

