
import { useState } from 'react';

function getCoords(x, height, period, yOffset) {
    let y = yOffset + (height/2) * Math.sin(x / period);
    return [x,y];
}
function getPoints(start, end, y, height, period) {
    let points = [];
    for (let i = start; i < end; i += period * Math.PI / 2) {
        points.push(getCoords(i, height, period, y));
    }
    return points;
}
function getMappedString(points, height) {
    points = points.flat();
    points = points.map((point, index) => {
        let a = index + 1;
        if (!(a % 4)) {
            if (!(a % 8))
                return point - height;
            else return point + height;
        }
        else return point;
    });
    let str = ["M"];
    str.push(points[0].toString());
    str.push(points[1].toString());
    for (let i = 2; i < points.length; i++) {
        if (!((i - 2) % 4))
            str.push("Q");
        let c = points[(i)];
        str.push(c.toString());
    }
    str = str.join(" ");
    return str;
}

export default function SquigglySlider({height, width, period, lineWeight, dotSize}) {
    let off = height / 2;
    let points = getPoints(0, width, off, height, period);
    let squiggle = getMappedString(points, off);
    let [slider, setSlider] = useState(getCoords(0, height, period, off+dotSize/2));
    let [draggable, setDraggable] = useState(false);
    return (<>
        <svg height={height+dotSize*2} width={width} viewBox = {`0 0 {width} {height}`}
                    onPointerDown = {(event)=>{setDraggable(true);}}
                    onPointerUp = {(event)=>{setDraggable(false)}}
                    onMouseMove = {(event)=>{
                        if (draggable) setSlider(getCoords(event.clientX, height, period, off+dotSize/2));}
                    }>
            <path d={squiggle} style={{ fill: "none", stroke: "black" , strokeWidth: lineWeight}} />
            <circle cx={slider[0]} cy={slider[1]} r={dotSize} fill="black" />
        </svg>
    </>);
}




