import { useState, useReducer, useEffect } from "react";
import EstimateTable from "./EstimateTable";
import { v4 as uuidv4 } from 'uuid'
import { Button, TextField, MenuItem, Select, InputLabel, FormControl } from '@mui/material'


export default function Estimator(props) {
    const [costTypes, setCostTypes] = useState(['','Materials', 'Labor'])
    const [estimate, estimate_dispatch] = useReducer(updateEstimate, {line_items: []})
    const [cost, setCost] = useState({description: '', type: '', price: ''})
    const [totals, setTotals] = useState({})

    useEffect(() => {
        setTotals(calculateTotalCosts())
    }, [estimate.line_items])

    function sumArr(arr) {
        let sum = 0;
        arr.forEach(item => {
            sum += item
        });
        return sum
    }

    function calculateTotalCosts(){
        let matCosts = []
        let labCosts = []
        estimate.line_items.forEach(item => {
            if (item.type == 'Materials'){
                matCosts.push(item.price)
            }
            if (item.type == 'Labor') {
                labCosts.push(item.price)
            }
        })
        return {
            materials: sumArr(matCosts),
            labor: sumArr(labCosts),
            total: sumArr(labCosts) + sumArr(matCosts)
        }
    }

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

    function saveEstimate(){
        props.setShowEstimator()
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
        Labor: {totals.labor} --
        Materials: {totals.materials} --
        Total: {totals.total}
        <div>
            <Button onClick={() => saveEstimate()} disabled={!estimate.line_items.length > 0}>Save</Button>
        </div>
        </div>
    )
}