const axios=require('axios')
const instance=axios.create();
instance
    .get('http://www.baidu.com')
    .then(resp=>{
        console.log(resp.data)
    })
instance
    .get('https://ant-design.gitee.io/components/form-cn/')
    .then(resp=>{
        console.log(resp.data)
    })