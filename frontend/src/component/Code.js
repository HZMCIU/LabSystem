import React, { Component } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { Button } from 'antd';
import axios from 'axios';
import 'codemirror/keymap/sublime';
import 'codemirror/theme/monokai.css';
class Code extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code: ''
        }
        this.updateCode = this.updateCode.bind(this);
        this.gather = this.gather.bind(this);
    }
    updateCode(newCode) {
        this.setState({ code: newCode.getValue() });
    }
    gather() {
        console.log(this.state.code);
        axios.post('http://localhost:8888/experiment/compile_code', {
            code: this.state.code,
            author: 'hzmciu'
        })
    }
    render() {
        return (
            <div style={{height:'50vh'}}>
                <CodeMirror
                    value=""
                    options={{
                        theme: 'monokai',
                        keyMap: 'sublime',
                        mode: 'octave',
                    }}
                    onChange={this.updateCode}
                />
            </div>
        )
    }
}
export default Code;