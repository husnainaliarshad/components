
import { useState } from 'react';

function getCoords(x, height, period, yOffset) {
    let y = yOffset + (height/3) * Math.sin(x / period);
    return [x,y];
}
function getPoints(start, end, y, height, period, sample_length) {
    let points = [];
    for (let i = start; i < end; i += sample_length+0) {
        points.push(getCoords(i, height, period, y));
    }
    return points;
}
    console.log("getmapped")
function getMappedString(points, height) {
    let str = ["M"];
    for (let i = 0; i < points.length; i++) {
        if (!(i+1)%3) str.push("L");
        str.push(points[i][0].toString());
        str.push(points[i][1].toString());
    }
    return str.join(" ");
}

export default function SquigglySlider({height, width, period, lineWeight, dotSize, sample_length}) {
    sample_length = Number(sample_length);
    let off = height / 2;
    let points = getPoints(0, width, off, height, period, sample_length);
    let squiggle = getMappedString(points, off);
    let [slider, setSlider] = useState(getCoords(0, height, period, off+dotSize/2));
    let [draggable, setDraggable] = useState(false);
    return (<>
        <svg height={height} width={width} viewBox = {`0 0 {width} {height}`}
                    onPointerDown = {(event)=>{setDraggable(true);}}
                    onPointerUp = {(event)=>{setDraggable(false)}}
                    onMouseMove = {(event)=>{
                        if (draggable) setSlider(getCoords(event.clientX, height, period, off));}
                    }>
            <path
                d={squiggle}
                fill="none"
                stroke="black"
                strokeWidth={lineWeight}
                vectorEffect="non-scaling-stroke"
                 shapeRendering="crispEdges"
            />
            

            {/* {points.map((point, index)=>(
                <circle cx = {point[0]} cy = {point[1]} r={6} key={index}></circle>
            ))} */}
            <circle cx={slider[0]} cy={slider[1]} r={dotSize} fill="black" />
        </svg>
    </>);
}




