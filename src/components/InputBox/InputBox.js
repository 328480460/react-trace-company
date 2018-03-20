import React, { Component } from "react";
import { connect } from "react-redux";
import "./inputBox.less";

class InputBox extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      value: ''
    }
  }

  componentDidMount() {
    if (!this.props.location) {
      return;
    }
    let { pathname } = this.props.location;
    if (/search/.test(pathname)) {
      this.refs.myInput.focus();
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    let path = {pathname: '/', query: this.state.value}
    this.props.history.push(path);
  }

  handleChange(e) {
    this.setState({
      value: e.target.value
    })
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="input-wrapper">
          {this.props.history 
            ? <i className="iconfont icon-search" onClick= {this.handleSubmit}/>
            : <i className="iconfont icon-search"/>
          }
          <input
            type="search"
            className="input-box"
            placeholder="请输入关键字"
            ref="myInput"
            onChange={this.handleChange}
          />
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    changeKeyword: value => {
      dispatch({type: 'changeKeyword', text: value})
    }
  }
}

const ReduxInputBox = connect(mapStateToProps, mapDispatchToProps)(InputBox);

export default ReduxInputBox;
