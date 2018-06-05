import React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchAuthData, receiveAuthData } from '../actions';
import '../style/login.less';

const FormItem = Form.Item;

class Login extends React.Component {
    componentWillMount() {
        const { receiveAuthData } = this.props;
        receiveAuthData(null, 'auth');
    }
    componentWillReceiveProps(nextProps) {
        const { auth: nextAuth = {} } = nextProps;
        console.info(nextAuth);
        const { history } = this.props;
        if (nextAuth.data && nextAuth.data.user.no) {   // 判断是否登陆
            localStorage.setItem('user', JSON.stringify(nextAuth.data.user));
            history.push('/');
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                const { fetchAuthData } = this.props;
                fetchAuthData({funcName: 'login', params: {no:values.userName, password: values.password}, stateName: 'auth'});
            }
        });
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="login">
                <div className="login-form" >
                    <div className="login-logo">
                        <span>React Admin</span>
                    </div>
                    <Form onSubmit={this.handleSubmit} style={{maxWidth: '300px'}}>
                        <FormItem>
                            {getFieldDecorator('userName', {
                                rules: [{ required: true, message: '请输入用户名!' }],
                            })(
                                <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="管理员输入admin, 游客输入guest" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: '请输入密码!' }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="管理员输入admin, 游客输入guest" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(
                                <Checkbox>记住我</Checkbox>
                            )}
                            <a className="login-form-forgot" href="" style={{float: 'right'}}>忘记密码</a>
                            <Button type="primary" htmlType="submit" className="login-form-button" style={{width: '100%'}}>
                                登录
                            </Button>
                            <p style={{display: 'flex', justifyContent: 'space-between'}}>
                                <a href="">或 现在就去注册!</a>
                            </p>
                        </FormItem>
                    </Form>
                </div>
            </div>

        );
    }
}

const mapStateToPorps = state => {
    const { auth } = state.auth;
    return { auth };
};
const mapDispatchToProps = dispatch => ({
    fetchAuthData: bindActionCreators(fetchAuthData, dispatch),
    receiveAuthData: bindActionCreators(receiveAuthData, dispatch)
});


export default connect(mapStateToPorps, mapDispatchToProps)(Form.create()(Login));