import logo from './logo.svg';
import './App.css';
import Estimator from './Estimator';
import { useState } from 'react'
import { Button } from '@mui/material'

function App() {
  const [showEstimater, setShowEstimator] = useState(false)

  function handleClick() {
    setShowEstimator(!showEstimater)
  }
  return (
    <div className="App">
      {!showEstimater && <Button onClick={() => handleClick()}>
        Create Estimate
      </Button>}
      {showEstimater && <Estimator setShowEstimator={handleClick}/>}
    </div>
  );
}

export default App;
