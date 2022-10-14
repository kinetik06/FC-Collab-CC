import { DataGrid } from '@mui/x-data-grid'
import { Box } from '@mui/material'
import { useEffect, useState } from 'react'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'

export default function EstimateTable(props){

    function handleRemoveClick(cv){
        props.removeCost(cv.row)
    }

    const columns = [
        {field: 'type', headerName: 'Cost Type', width: 100},
        {field: 'description', headerName: 'Description', width: 200},
        {field: 'price', headerName: 'Price', width: 100},
        {field: 'remove', headerName: 'Remove', width: 75, renderCell: (cv) => (
            <RemoveCircleIcon color='error' onClick={() => handleRemoveClick(cv)}/>
        )}
    ]
    function sumArr(arr) {
        let sum = 0;
        arr.forEach(item => {
            sum += item
        });
        return sum
    }

    return (
        <div>
            <Box sx={{height: 300, width: '100%'}}>
                <DataGrid
                rows={props.estimate.line_items}
                columns={columns}
                />
            </Box>
        </div>
    )
}