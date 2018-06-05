import React from 'react';
import { Button } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { receiveData } from '../actions/connection';

class App extends React.Component {
    constructor(){
        super();
    }
    getPrimary(){
        const { connectToRedis } = this.props;
        connectToRedis(null, 'auth');
        alert('hello primary.');
    }
    render() {
        return (
            <div>
                <span>Hello World!</span>
                <hr />
                <Button type="primary" onClick={this.getPrimary.bind(this)}>Primary</Button>
                <Button>Default</Button>
                <Button type="dashed">Dashed</Button>
                <Button type="danger">Danger</Button>
            </div>
        )
    }
}
const mapStateToPorps = state => {
    const { auth } = state.auth;
    return { auth };
};
const mapDispatchToProps = dispatch => ({
    connectToRedis: bindActionCreators(receiveData, dispatch)
});
export default connect(mapStateToPorps, mapDispatchToProps)(App);