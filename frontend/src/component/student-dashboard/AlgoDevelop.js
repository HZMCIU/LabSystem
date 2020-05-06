import React, { Component } from 'react';
import { Button, notification } from 'antd';
import MathJax from 'react-mathjax';
import CodeMirror from '@uiw/react-codemirror';
import 'codemirror/keymap/sublime';
import 'codemirror/theme/monokai.css';
import {
    Chart,
    Geom,
    Axis,
    Tooltip
} from "bizcharts";
import axios from '../../axios/index';

class AlgoDevelop extends Component {

    constructor(props) {
        super(props);
        this.state = {
            code: '',
            graph_data: []
        }
        this.updateCode = this.updateCode.bind(this);
        this.runCode=this.runCode.bind(this);
    }

    updateCode(newCode) {
        this.setState({ code: newCode.getValue() });
    }

    runCode(){
        notification.info({
            message:'代码已经提交后台运行',
            placement:'topRight'
        })
        axios
            .post('/switcher-service/switcher/run_code',{
                matlab_code:this.state.code
            })
            .then(res=>{
                notification.info({
                    message:'图像生成成功'
                })
                this.setState({graph_data:res.data});
            })
    }

    render() {
        let experiment = this.props.experiment[0];
        console.log(experiment);
        return (
            <div>
                <div style={{ flex: 'center' }}>
                    <Button onClick={() => this.props.setExperimentId(-1)}>返回</Button>
                    <span style={{ fontSize: '30px', textAlign: 'center' }}>{experiment.experiment_name}</span>
                </div>
                <div>
                    <MathJax.Provider>
                        <MathJax.Node formula={experiment.experiment_latex} />
                    </MathJax.Provider>
                    <div style={{ height: '50vh' }}>
                        <CodeMirror
                            value={experiment.experiment_matlab}
                            options={{
                                theme: 'monokai',
                                keyMap: 'sublime',
                                mode: 'octave',
                                lineNumbers: true
                            }}
                            onChange={this.updateCode}
                        />
                    </div>
                    <div>
                        <Chart width={600} height={400} data={this.state.graph_data} forceFit>
                            <Axis name="x" />
                            <Axis name="y" />
                            <Tooltip crosshairs={{ type: 'y' }} />
                            <Geom type="line" position="x*y" size={2} />
                        </Chart>
                    </div>
                    <Button type="primary" onClick={this.runCode}>运行</Button>
                </div>
            </div>
        )
    }
}
export default AlgoDevelop;