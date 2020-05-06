import React, { Component } from 'react';
import Pict from '../../asset/assignment.png'
import { withRouter, useRouteMatch, Link, useHistory, Switch, Route } from 'react-router-dom';
import { Button } from 'antd';
import AlgoDevelop from './AlgoDevelop';
import 'codemirror/keymap/sublime';
import 'codemirror/theme/monokai.css';
import axios from '../../axios/index';
class Experiments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            experiments: [],
            algo_dev: -1//实验的ID,没有的时候默认为-1
        }
        this.setExperimentId = this.setExperimentId.bind(this);
    }

    //查看实验详情时，在子组件中设定要查看实验的ID
    setExperimentId(id) {
        this.setState({ algo_dev: id });
    }
    componentDidMount() {
        axios
            .get('/experiment-service/experiment/getAll')
            .then(res => {
                this.setState({ experiments: res.data });
            })
    }
    render() {
        let { match, location, history } = this.props;
        let algo_dev = this.state.algo_dev;

        if (algo_dev == -1) {
            return (
                <div>
                    {
                        this.state.experiments.map((val) => {
                            // console.log(val);
                            return <ExperimentRow key={val.experiment_id} experiment={val} setExperimentId={this.setExperimentId} />
                        })
                    }
                </div>
            );
        } else {
            return (
                <div>
                    <AlgoDevelop id={this.state.algo_dev} setExperimentId={this.setExperimentId} experiment={this.state.experiments.filter(experiment=>experiment.experiment_id===this.state.algo_dev)} />
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
        <div className="interaction-row" onClick={() => { props.setExperimentId(experiment.experiment_id); }}>
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