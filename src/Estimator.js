import { useState, useReducer } from "react";
import EstimateTable from "./EstimateTable";
import { v4 as uuidv4 } from 'uuid'
import { Button, TextField, MenuItem, Select, InputLabel, FormControl } from '@mui/material'


export default function Estimator(props) {
    const [costTypes, setCostTypes] = useState(['','Materials', 'Labor'])
    const [estimate, estimate_dispatch] = useReducer(updateEstimate, {line_items: []})
    const [cost, setCost] = useState({description: '', type: '', price: ''})

    function updateEstimate(state, action) {
        switch (action.type) {
            case 'addCost':
                return {
                    ...state, 
                    line_items: [...state.line_items, action.payload]
                }
            case 'removeCost':
                return {
                    ...state,
                    line_items: [...state.line_items.filter(item => item.id !== action.payload.id)]
                }
        }
    }
    function addCost(cost){
        cost.id = uuidv4();
        estimate_dispatch({type: 'addCost', payload: cost});
        setCost({description: '', type: '', price: ''})
    }

    function removeCost(cost){
        estimate_dispatch({type: 'removeCost', payload: cost});
    }

    function handleChange(e){
        if (e.target.name == 'price'){
            setCost(cost => ({...cost, [e.target.name]: parseFloat(parseFloat(e.target.value).toFixed(2))}))
        }
        else {setCost(cost => ({...cost, [e.target.name]: e.target.value}))}
    }

    return (
        <div>
        <h3>Estimator</h3>
        <FormControl fullWidth margin="normal">
            <InputLabel id="type-label">Type</InputLabel>
            <Select label="Type" value={cost.type} name="type" required onChange={handleChange}>
                {costTypes.map((lineItem) => (
                        <MenuItem key={lineItem} value={lineItem}>{lineItem}</MenuItem>
                ))}
            </Select>
            <TextField required label='Description' name="description" value={cost.description} onChange={handleChange}/>  
            <TextField inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} required label='Price' name="price" value={cost.price} onChange={handleChange}/>
        </FormControl>
        <Button onClick={() => addCost(cost)} disabled={Object.values(cost).some(x => x === null || x === '' || x === 0)}>Add Cost</Button>
        <EstimateTable estimate={estimate} removeCost={removeCost}/>
        
        </div>
    )
}