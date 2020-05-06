import React, { Component } from 'react';
import { Form, Input, DatePicker, Button ,notification } from 'antd';
import locale from 'antd/es/date-picker/locale/zh_CN';
import { withRouter } from 'react-router-dom';
import MathJax from 'react-mathjax';
import CodeMirror from '@uiw/react-codemirror';
import 'codemirror/keymap/sublime';
import 'codemirror/theme/monokai.css';
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
import axios from '../../axios/index';
const { RangePicker } = DatePicker;
const { TextArea } = Input;
class AddExperiment extends Component {

    formRef = React.createRef();
    constructor(props) {
        super(props);
        this.state = {
            graph_data: null,
            matlab_code: '',
            experiment_start: '',
            experiment_end: ''
        }
        this.processLatex = this.processLatex.bind(this);
        this.updateCode = this.updateCode.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateExpDate = this.updateExpDate.bind(this);
        this.generateGraph=this.generateGraph.bind(this);
    }

    handleSubmit() {
        let experiment_name = this.formRef.current.getFieldValue('experiment_name');
        let latex_code = this.formRef.current.getFieldValue('latex_code');
        // let experiment_start=this.formRef.current.getFieldValue('data_range')[0];
        // let experiment_end=this.formRef.current.getFieldValue('data_range')[1];
        // console.log(experiment_name + "\n" + latex_code + "\n" + this.state.experiment_start + "\n" + this.state.experiment_end + this.state.matlab_code);
        axios
            .post("/experiment-service/experiment/addExperiment",{
                    experiment_name:experiment_name,
                    experiment_latex:latex_code,
                    experiment_matlab:this.state.matlab_code,
                    experiment_creator:'余清达',
                    experiment_start:this.state.experiment_start,
                    experiment_end:this.state.experiment_end
            })
            .then(res=>{
                notification.info({
                    message:'上传成功'
                })
            })
    }

    processLatex() {
        this.setState({ latex_code: this.formRef.current.getFieldValue('latex_code') });
    }

    updateCode(newCode) {
        this.setState({ matlab_code: newCode.getValue() });
    }

    updateExpDate(dates, dateStrings) {
        this.setState({ experiment_start: dateStrings[0], experiment_end: dateStrings[1] })
    }

    generateGraph(){
        notification.info({
            message:'代码已提交后台运行'
        })
        axios
            .post("/switcher-service/switcher/run_code",{
                matlab_code:this.state.matlab_code
            })
            .then(res=>{
                this.setState({graph_data:res.data})
                notification.info({
                    message:'图像生成成功',
                    placement:'topRight'
                })
            })
            .catch(err=>{
                console.log(err);
                notification.info({
                    message:'图像生成失败',
                    placement:'topRight'
                })
            })
    }

    render() {
        const formItemLayout = {
            labelCol: {
                xs: { span: 6 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 6 },
                sm: { span: 16 },
            },
        }
        return (
            <div>
                <Form onFinish={this.handleSubmit} ref={this.formRef} name="add_exp" {...formItemLayout}>
                    <Form.Item label="实验名称" name="experiment_name" rules={[{ required: true, message: '请输入实验名称' }]}>
                        <Input placeholder="实验名称" />
                    </Form.Item>
                    <Form.Item name="date_range" label="选择日期">
                        <RangePicker showTime format="YYYY-MM-DD" rules={[{ type: 'array', required: true, message: '请输入日期' }]}
                            locale={locale} onChange={this.updateExpDate} />
                    </Form.Item>
                    <Form.Item label="被控对象传递函数">
                        <Form.Item name='latex_code'>
                            <TextArea rows={3} placeholder="请输入传递函数的LaTex代码" />
                        </Form.Item>
                        <Button type="primary" onClick={this.processLatex}>公式生成</Button>
                        <MathJax.Provider>
                            <MathJax.Node formula={this.state.latex_code} />
                        </MathJax.Provider>
                    </Form.Item>
                    <Form.Item label="被控对象Matlab代码">
                        <div style={{ height: '50vh' }}>
                            <CodeMirror
                                value="%在这里输入Matlab代码"
                                options={{
                                    theme: 'monokai',
                                    keyMap: 'sublime',
                                    mode: 'octave',
                                    lineNumbers: true
                                }}
                                onChange={this.updateCode}
                            />
                        </div>
                        <Button type="primary" onClick={this.generateGraph}>测试模型</Button>
                    </Form.Item>
                    <Form.Item label="图像">
                        <Chart width={600} height={400} data={this.state.graph_data} forceFit>
                            <Axis name="x" />
                            <Axis name="y" />
                            <Tooltip crosshairs={{ type: 'y' }} />
                            <Geom type="line" position="x*y" size={2} />
                        </Chart>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            确认部署
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}
const AddForm = withRouter((AddExperiment));
export default AddForm;