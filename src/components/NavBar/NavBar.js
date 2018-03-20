import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./navBar.less";

function CustomArea(props) {
  return (
    <ul className="area-wrapper">
      <li onClick={props.selectArea.bind(this, "全部")}>全部</li>
      <li onClick={props.selectArea.bind(this, "朝阳区")}>朝阳区</li>
      <li onClick={props.selectArea.bind(this, "东城区")}>东城区</li>
      <li onClick={props.selectArea.bind(this, "海淀区")}>海淀区</li>
      <li onClick={props.selectArea.bind(this, "西城区")}>西城区</li>
      <li onClick={props.selectArea.bind(this, "石景山区")}>石景山区</li>
      <li onClick={props.selectArea.bind(this, "丰台区")}>丰台区</li>
      <li onClick={props.selectArea.bind(this, "通州区")}>通州区</li>
      <li onClick={props.selectArea.bind(this, "大兴区")}>大兴区</li>
      <li onClick={props.selectArea.bind(this, "昌平区")}>昌平区</li>
      <li onClick={props.selectArea.bind(this, "房山区")}>房山区</li>
    </ul>
  );
}

function CustomType(props) {
  return (
    <ul className="area-wrapper">
      <li onClick={props.selectType.bind(this, "全部")}>全部</li>
      <li onClick={props.selectType.bind(this, "屠宰企业")}>屠宰企业</li>
      <li onClick={props.selectType.bind(this, "批发市场")}>批发市场</li>
      <li onClick={props.selectType.bind(this, "零售市场")}>零售市场</li>
      <li onClick={props.selectType.bind(this, "连锁超市")}>连锁超市</li>
      <li onClick={props.selectType.bind(this, "团体消费")}>团体消费</li>
    </ul>
  );
}

CustomArea.propTypes = {
  selectArea: PropTypes.func.isRequired
};

CustomType.propTypes = {
  selectType: PropTypes.func.isRequired
};

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.selectArea = this.selectArea.bind(this);
    this.selectType = this.selectType.bind(this);
    this.openArea = this.openArea.bind(this);
    this.openType = this.openType.bind(this);
    this.state = {
      areaName: "地区",
      customType: "企业类型",
      showArea: false,
      showType: false
    };
  }

  mapAreaToId(type) {
    let typeId = "";
    switch (type) {
      case "全部":
        typeId = "";
        break
      case "朝阳区":
        typeId = "110105";
        break
      case "东城区":
        typeId = "110101";
        break
      case "海淀区":
        typeId = "110108";
        break
      case "西城区":
        typeId = "110102";
        break
      case "石景山区":
        typeId = "110107";
        break
      case "通州区":
        typeId = "110112";
        break
      case "大兴区":
        typeId = "110115";
        break
      case "昌平区":
        typeId = "110114";
        break
      case "房山区":
        typeId = "110111";
        break
      case "丰台区":
        typeId = "110106";

    }
    return typeId;
  }

  mapTypeToId(area) {
    let areaId = "";
    switch (area) {
      case "全部":
        areaId = "";
        break
      case "屠宰企业":
        areaId = "0001";
        break
      case "批发市场":
        areaId = "0002";
        break
      case "零售市场":
        areaId = "0003";
        break
      case "连锁超市":
        areaId = "0004";
        break
      case "团体消费":
        areaId = "0007";
    }
    return areaId;
  }

  openArea() {
    this.setState({
      showArea: this.state.showArea ? false : true,
      showType: false
    });
  }
  
  openType() {
    this.setState({
      showArea: false,
      showType: this.state.showType ? false : true
    });
  }

  selectArea(value) {
    if (value === this.state.areaName) {
      this.setState({
        showArea: false,
        showType: false
      });
      return;
    }
    this.setState({
      areaName: value,
      showArea: false,
      showType: false
    });
    if (this.state.customType == "企业类型") {
      this.setState(() => ({
        customType: '全部'
      }), () => {
        this.props.getDisSupplier({
          update: true,
          area: this.mapAreaToId(value),
          type: this.mapTypeToId(this.state.customType)
        });
      })
    }

    this.props.getDisSupplier({
      update: true,
      area: this.mapAreaToId(value),
      type: this.mapTypeToId(this.state.customType)
    });
  }

  selectType(value) {
    if (value === this.state.customType) {
      this.setState({
        showArea: false,
        showType: false
      });
      return;
    }
    this.setState({
      customType: value,
      showArea: false,
      showType: false
    });
    if (this.state.areaName == "地区") {
      this.setState(() => ({areaName: '全部'}), () => {
        this.props.getDisSupplier({
          update: true,
          area: this.mapAreaToId(this.state.areaName),
          type: this.mapTypeToId(value)
        });
      })
    }

    this.props.getDisSupplier({
      update: true,
      area: this.mapAreaToId(this.state.areaName),
      type: this.mapTypeToId(value)
    });
  }

  render() {
    if (this.state.showArea) {
      return (
        <nav className="nav">
          <p className="item" onClick={this.openArea}>
            {this.state.areaName}
          </p>
          <CustomArea selectArea={this.selectArea} />
          <p className="item" onClick={this.openType}>
            {this.state.customType}
          </p>
        </nav>
      );
    }
    if (this.state.showType) {
      return (
        <nav className="nav">
          <p className="item" onClick={this.openArea}>
            {this.state.areaName}
          </p>
          <p className="item" onClick={this.openType}>
            {this.state.customType}
          </p>
          <CustomType selectType={this.selectType} />
        </nav>
      );
    }
    return (
      <nav className="nav">
        <p className="item" onClick={this.openArea}>
          {this.state.areaName}
        </p>
        <p className="item" onClick={this.openType}>
          {this.state.customType}
        </p>
      </nav>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    update: state.update
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getDisSupplier: value => {
      dispatch({ type: "getDisSupplier", text: value });
    }
  };
};

const ReduxNavBar = connect(mapStateToProps, mapDispatchToProps)(NavBar);

export default ReduxNavBar;
