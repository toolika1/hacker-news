import * as React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
} from 'recharts';
class CustomizedAxisTick extends React.Component {
  render () {
    const {x, y, stroke, payload} = this.props;
    
     return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(270)">{payload.value}</text>
      </g>
    );
  }
};
export default class Graph extends React.Component {
  constructor (props) {
    super(props)
   
  }
 
  render () {

    return (
            <div className="app" >
      <LineChart width={1200} height={250} data={this.props.data}
  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
  <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="objectID" interval={0}  tick={<CustomizedAxisTick/>}/>
  <YAxis />
  <Tooltip />
  <Legend align="left"/>
  <Line type="monotone" dataKey="points" stroke="orange" />
</LineChart>
             </div>
    )
  }
}
