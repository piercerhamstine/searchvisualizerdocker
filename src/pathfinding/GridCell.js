import React, { Component } from 'react'

import './GridCell.css'

export default class GridCell extends Component
{
    render(){
        const
        {
            column,
            row,
            isWallCell,
            isStartCell,
            isFinishCell,
            mouseDownEvent,
            mouseEnterEvent,
            mouseUpEvent,
        } = this.props;

        const cellTag = 
            isStartCell?'gridcell-start':
            isFinishCell?'gridcell-finish':
            isWallCell?'gridcell-wall':
            'gridcell';
        
        return(
            <div id={`${row}_${column}`} className={`${cellTag}`} onMouseDown={()=>mouseDownEvent(row, column)} onMouseEnter={()=>mouseEnterEvent(row, column)} onMouseUp={()=>mouseUpEvent()}>
            </div>
        );
    }
}