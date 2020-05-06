import React, { Component } from 'react';
import axios from '../../axios/index';
import Pict from '../../asset/assignment.png'
import { withRouter, useRouteMatch, Link, useHistory, Switch, Route } from 'react-router-dom';
import { Button } from 'antd';
import ExperimentDetail from './ExperimentDetail';

class Experiments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            experiments: [],
            showDetail: -1//实验的ID,没有的时候默认为-1
        }
        this.setExperimentId = this.setExperimentId.bind(this);
        this.deleteExperiment = this.deleteExperiment.bind(this);
    }

    //查看实验详情时，在子组件中设定要查看实验的ID
    setExperimentId(id) {
        this.setState({ showDetail: id });
    }
    componentDidMount() {
        axios
            .get('/experiment-service/experiment/getAll')
            .then(res => {
                this.setState({ experiments: res.data })
                // console.log(this.state.experiments);
            })
    }
    deleteExperiment = (experiment_id) => {
        console.log(experiment_id)
        axios
            .get('/experiment-service/experiment/delete', {
                params: {
                    experiment_id: experiment_id
                }
            })
        this.setState({experiments:this.state.experiments.filter(experiment=>{return experiment.experiment_id!=experiment_id})});
    }
    render() {
        let { match, location, history } = this.props;
        let showDetail = this.state.showDetail;

        if (showDetail == -1) {
            return (
                <div>
                    {
                        this.state.experiments.map((val) => {
                            // console.log(val);
                            return <ExperimentRow key={val.experiment_id} experiment={val} setExperimentId={this.setExperimentId}
                                deleteExperiment={this.deleteExperiment} />
                        })
                    }
                </div>
            );
        } else {
            return (
                <div>
                    <ExperimentDetail id={this.state.showDetail} setExperimentId={this.setExperimentId} experiment={this.state.experiments.filter(experiment_id=>experiment_id===this.state.showDetail)} />
                </div>
            )
        }
    }
}

function ExperimentRow(props) {
    let experiment = props.experiment;
    // console.log(experiment);
    let match = useRouteMatch();
    let history = useHistory();

    return (
        <div className="interaction-row">
            <img src={Pict} />
            <div style={{ display: 'inline-block', verticalAlign: 'middle' }}>
                <div style={{ width: '822px', whiteSpace: "nowrap", overflow: "hidden", textOverflow: 'ellipsis' }}>
                    <span className={["interaction-status", endOrNot(experiment)].join(' ')}>
                        {endOrNot(experiment) == 'processing' ? '进行中' : '已结束'}
                    </span>
                    <span className="interaction-name" style={{ fontSize: '18px' }}>{experiment == null ? '' : experiment.experiment_name}</span>
                    <div className="clear20"></div>
                    <div style={{ width: '822px' }}>
                        <span>教师:{experiment == null ? '' : experiment.experiment_creator}</span>
                        <span style={{ margin: '0 5px' }}>|</span>
                        <span>开始时间:{experiment == null ? '' : experiment.experiment_start}</span>
                        <span style={{ margin: '0 5px' }}>|</span>
                        <span>截至时间:{experiment == null ? '' : experiment.experiment_end}</span>
                    </div>
                </div>
            </div>
            <Button type="danger" style={{ margin: '5px 5px' }} onClick={()=>{props.deleteExperiment(experiment.experiment_id);}}>
                删除
            </Button>
            <Button type="primary" style={{ margin: '5px 5px' }} onClick={() => { props.setExperimentId(experiment.experiment_id); }}>
                查看详情
            </Button>
        </div>
    )
}

function endOrNot(experiment) {
    if (experiment == null) {
        return 'not-started';
    }
    let now = new Date().getTime();
    let date = Date.parse(experiment.experiment_end);
    if (now < date) {
        return 'processing';
    } else {
        return 'end';
    }
}
export default withRouter(Experiments);