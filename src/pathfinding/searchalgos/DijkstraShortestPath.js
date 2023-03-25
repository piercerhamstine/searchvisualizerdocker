
// Later Improvements:
// Use min-heap

export function Dijkstras(graph)
{
    const unvisited = [];
    const visited = [];
    
    for(let row of graph)
    {
        for(let cell of row)
        {
            unvisited.push(cell);
        }
    }

    while(unvisited.length !== 0)
    {
        // Sort the unvisited CELLS by their distance.
        unvisited.sort((lhs, rhs) => lhs.distance - rhs.distance);
        
        // Grab the closest cell as the current cell.
        const currCell = unvisited.shift();
        currCell.isVisited = true;

        if(currCell.distance >= Infinity)
            return visited;

        // Check if the cell is a wall.
        if(currCell.isWallCell)
            continue;
        
        visited.push(currCell);

        // Check if the cell is end.
        if(currCell.isFinishCell)
            break;

        // Get cells adjacent to current cell.
        const adjacents = GetAdjacents(graph, currCell);
        //console.log(adjacents);

        // Update adjacent cell distances and set previous cell.
        for(let i = 0; i < adjacents.length; ++i)
        {
            // Change this later
            if(adjacents[i].isVisited)
                continue;
            
            const newDist = currCell.distance + 1;
            if(newDist < adjacents[i].distance)
            {
                adjacents[i].distance = newDist;
                adjacents[i].prevCell = currCell;
            }
        }
    }

    return visited;
}

function GetAdjacents(graph, currCell)
{
    const adjacentCells = [];

    const rows = graph.length;
    const cols = graph[0].length;

    const x = currCell.column;
    const y = currCell.row;

    if(x > 0)
    {
        adjacentCells.push(graph[y][x-1]);
    };
    if(x < cols-1)
    {
        adjacentCells.push(graph[y][x+1]);
    };
    if(y > 0)
    {
        adjacentCells.push(graph[y-1][x]);
    }
    if(y < rows-1)
    {
        adjacentCells.push(graph[y+1][x]);
    };

    return adjacentCells;  
}