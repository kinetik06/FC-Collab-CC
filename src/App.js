import logo from './logo.svg';
import './App.css';
import Estimator from './Estimator';
import { useState } from 'react'
import { Button } from '@mui/material'

function App() {
  const [showEstimator, setShowEstimator] = useState(false)

  function handleClick() {
    setShowEstimator(!showEstimator)
  }
  return (
    <div className="App">
      {!showEstimator && <Button onClick={() => handleClick()}>
        Create Estimate
      </Button>}
      {showEstimator && <Estimator setShowEstimator={handleClick}/>}
    </div>
  );
}

export default App;
