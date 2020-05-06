import React,{Component} from 'react';
import axios from 'axios';
import Pict from './asset/assignment.png'

class Test extends Component{
    constructor(props){
        super(props);
        this.state={
            experiments:[]
        }
    }

    componentDidMount(){
        axios
            .get('http://localhost:8080/experiment/getAll')
            .then(res=>{
                this.setState({experiments:res.data})
                // console.log(this.state.experiments);
            })
    }
    render(){
        
        return (
            <div>
                {
                    this.state.experiments.map((val)=>{
                        console.log(val);
                    return <ExperimentRow key={val.experiment_id} experiment={val} />})
                }
            </div>
        )
    }
}

function ExperimentRow(props){
    let experiment=props.experiment;
    console.log(experiment);
    
    return (
        <div className="interaction-row">
            <img src={require('./asset/assignment.png')}/>
            <div style={{display:'inline-block',verticalAlign:'middle'}}>
                <div style={{width:'822px',whiteSpace:"nowrap",overflow:"hidden",textOverflow:'ellipsis'}}>
                    <span className={["interaction-status",endOrNot(experiment)].join(' ')}>
                        {endOrNot(experiment)=='processing'?'进行中':'已结束'}
                    </span>
                    <span className="interaction-name" style={{fontSize:'18px'}}>{experiment==null?'':experiment.experiment_name}</span>
                    <div className="clear20"></div>
                    <div style={{width:'822px'}}>
                        <span>教师:{experiment==null?'':experiment.experiment_creator}</span>
                        <span style={{margin:'0 5px'}}>|</span>
                        <span>开始时间:{experiment==null?'':experiment.experiment_start}</span>
                        <span style={{margin:'0 5px'}}>|</span>
                        <span>截至时间:{experiment==null?'':experiment.experiment_end}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

function endOrNot(experiment){
    if(experiment==null){
        return 'not-started';
    }
    let now=new Date().getTime();
    let date=Date.parse(experiment.experiment_end);
    console.log(now);
    console.log(date);
    if(now<date){
        return 'processing';
    }else {
        return 'end';
    }
}
export default Test;