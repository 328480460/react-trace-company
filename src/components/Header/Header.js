import React, { Component } from 'react';
import { Link,withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './header.less'

class Header extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="wx-choose-header">
                <header className="wx-header">
                    <Link to="/"><i className="headerbar iconfont icon-left-back" ></i></Link>
                    <p className="headername">追溯企业列表</p>
                    <i className="headerbar " ></i>
                </header>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        update: state.update,
        area: state.area,
        type: state.type
    }
}

export default withRouter(connect(mapStateToProps)(Header));