import React, { Component } from 'react';
import {  Button } from 'antd';
import {HomeOutlined} from '@ant-design/icons'
class ExperimentDetail extends Component {

    constructor(props) {
        super(props);
    }
    render() {

        return (
            <div>
                <Button onClick={() => this.props.setExperimentId(-1)}>
                    {/* <HomeOutlined/> */}
                    返回
                </Button>
                <div>
                    $${this.props.experiment.experiment_latex}$$
                </div>
            </div>
        )
    }
}
export default ExperimentDetail;