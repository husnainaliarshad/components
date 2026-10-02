import './App.css';
import SquigglySlider from "./components/SquigglySlider.jsx"
import {useState} from 'react';
function App() {

    const [height, setHeight] = useState(250);
    const [width, setWidth] = useState(500);
    const [period, setPeriod] = useState(10);
    const [lineWeight, setLineWeight] = useState(5);
    const [dotSize, setDotSize] = useState(5);
  return (
    <>
     <input type = "range" min = {1} max = {500} onInput = {(event)=> {setHeight(event.target.value);}}/>
        <input type = "range" min = {1} max = {500} onInput = {(event)=> {setWidth(event.target.value);}}/>
        <input type = "range" min = {1} max = {50}  onInput = {(event)=> {setPeriod(event.target.value);}}/>
        <input type = "range" min = {1} max = {10}  onInput = {(event)=> {setLineWeight(event.target.value);}}/>
        <input type = "range" min = {1} max = {10}  onInput = {(event)=> {setDotSize(event.target.value);}}/>
                <br></br>
        <SquigglySlider height ={height} width = {width} period = {period} lineWeight = {lineWeight} dotSize = {dotSize} />

      
    </>
  )
}

export default App
