import React, { Component } from "react";

import './PathFindingVisualizer.css';
import { Dijkstras } from "./searchalgos/DijkstraShortestPath";
import GridCell from "./GridCell";

const ROWCOUNT = 10;
const COLCOUNT = 10;

export default class PathFindingVisualizer extends Component
{
    constructor()
    {
        super();
        this.state={grid: [], isMouseDown: false}
    }

    componentDidMount()
    {
        const grid = InitGrid()
        this.setState({grid});
    }

    OnMouseDownHandler(row, col)
    {
        const currGrid = this.state.grid;
        const currCell = currGrid[row][col];
        currCell.isWallCell = !currCell.isWallCell;

        this.setState({grid: currGrid, isMouseDown: true});
    }

    OnMouseEnterHandler(row, col)
    {
        let isMouseDown = this.state.isMouseDown;
        if(!isMouseDown)
            return;
        
        let currGrid = this.state.grid;
        let currCell = currGrid[row][col];
        currCell.isWallCell = !currCell.isWallCell;
        this.setState({grid: currGrid});
    }

    OnMouseUpHandler()
    {
        console.log("mouse up");
        this.setState({isMouseDown: false});
    }

    RunDijkstra()
    {
        const {grid} = this.state;
        const cellsVisited = Dijkstras(grid);
        const pathCells = [];

        let finalCell = cellsVisited[cellsVisited.length-1];
        while(finalCell !== null)
        {
            pathCells.push(finalCell);
            finalCell = finalCell.prevCell;
        }

        for(let i = 0; i < cellsVisited.length; ++i)
        {
            if(i === cellsVisited.length-1 && pathCells[0].isFinishCell)
            {
                setTimeout(() =>{
                    this.UpdateFinalPath(pathCells);
                }, 10*i);
            }

            setTimeout(() =>{
                const cell = cellsVisited[i];
                document.getElementById(`${cell.row}_${cell.column}`).className = 'gridcell-visited';
            }, 10*i);
        }
    }

    UpdateFinalPath(path)
    {
        for(let i = 0; i < path.length; ++i)
        {
            setTimeout(() =>{
                const cell = path[i];
                document.getElementById(`${cell.row}_${cell.column}`).className = 'gridcell-final';
            }, 50*i);
        }  
    };

    render()
    {
        const {grid} = this.state;
        
        return(
        <>
            <button onClick={() => this.RunDijkstra()}>Start</button>
            <div className="grid">
                {
                    grid.map((row, ndx) =>
                    {
                        return(
                            row.map((cell, cellNdx) =>
                            {
                                return(
                                    <GridCell
                                        column={cell.column}
                                        row={cell.row}
                                        isStartCell={cell.isStartCell}
                                        isWallCell={cell.isWallCell}
                                        isFinishCell={cell.isFinishCell}
                                        mouseDownEvent={ (row, column)=>{this.OnMouseDownHandler(row, column)} }
                                        mouseEnterEvent={(row, column)=>{this.OnMouseEnterHandler(row, column)}}
                                        mouseUpEvent={()=>this.OnMouseUpHandler()}
                                    >
                                    </GridCell>
                                )
                            })
                        )
                    })
                }
            </div>
        </>
        )
    }
}

const InitGrid = function()
{
    const grid = [];
    for(let i = 0; i < ROWCOUNT; ++i)
    {
        const currRow = [];
        for(let j = 0; j < COLCOUNT; ++j)
        {
            const cell = ConstructGridCell(i,j);

            // Temp start/end cells
            if(i===0 && j===0)
            {
                cell.isStartCell = true;
                cell.distance = 0;
            }
            else if(i === 7 && j === 7)
                cell.isFinishCell = true;

            currRow.push(cell);
        }

        grid.push(currRow);
    }

    return grid;
}

const ConstructGridCell = function(row, column)
{    
    return{
        column,
        row,
        distance: Infinity,
        isVisited: false,
        prevCell: null,
        isWallCell: false,
        isStartCell: false,
        isFinishCell: false,
    }
}
