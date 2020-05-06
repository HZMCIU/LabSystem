import React from "react";
import {
    G2,
    Chart,
    Geom,
    Axis,
    Tooltip,
    Coord,
    Label,
    Legend,
    View,
    Guide,
    Shape,
    Facet,
    Util
} from "bizcharts";
import {
    Input,
    Button,
    Row,
    Col
} from 'antd';
import axios from '../../axios/index';
class Pict extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            param: '',
        }
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleOnClick = this.handleOnClick.bind(this);
    }
    componentDidMount() {

    }
    handleOnClick() {
        console.log(this.state.param);
        axios
            .get('/experiment-service/experiment/live_data')
            .then(res=>{
                this.setState({data:res.data})
            })
    }
    handleOnChange(e) {
        this.setState({ param: e.target.value });
    }
    render() {
        return (
            <div>
                <Chart width={600} height={400} data={this.state.data} forceFit>
                    <Axis name="x" />
                    <Axis name="y" />
                    <Tooltip crosshairs={{ type: 'y' }} />
                    <Geom type="line" position="x*y" size={2} />
                </Chart>
                <Row>
                    <Col span={12}>
                        <Input value={this.state.param} onChange={this.handleOnChange} />
                    </Col>
                    <Col span={12}>
                        <Button onClick={this.handleOnClick} type="primary">确认</Button>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Pict;