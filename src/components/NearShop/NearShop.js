import React, { Component } from "react";
import { connect } from "react-redux";
import Location from "../Location/Location.js";
import Loading from "../Loading/Loading";
import {
  getDisSupplier,
  searchSupplier,
  wechatWeb,
  barCode,
  qrCode
} from "../../js/api.js";
import { getBaiDuGeo } from "../../js/baiGeo.js";
import { store } from "../../redux/store.js";

import "./NearShop.less";

class NearShop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      diSuppliers: [],
      loading: true,
      confirm: false,
      loadingText: "正在定位中",
      upLoading: false,
      uploadingFinish: false,
      page: 1,
      lat: "39.95933",
      lon: "116.29845",
      nodeName: '',
      type: "",
      areaId: ""
    };
  }
  componentWillMount() {
    
    // wechatWeb().then((res) => {
    //     // console.log(res.data);
    //     var _this = this;
    //     var jsonData = JSON.parse(res.data);
    //     wx.config({
    //         debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    //         appId: jsonData.appId, // 必填，公众号的唯一标识
    //         timestamp: jsonData.timestamp, // 必填，生成签名的时间戳
    //         nonceStr: jsonData.nonceStr, // 必填，生成签名的随机串
    //         signature: jsonData.signature,// 必填，签名
    //         jsApiList: ['getLocation', 'scanQRCode'] // 必填，需要使用的JS接口列表
    //     });

    //     wx.ready(function() {
    //         wx.getLocation({
    //             type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
    //             success: function (res) {
    //                 var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
    //                 var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
    //                 var keyword = _this.props.location.query;
    //                 _this.setState(() => {
    //                     return {
    //                         lat: latitude,
    //                         lon: longitude,
    //                         nodeName: keyword
    //                     }
    //                 }, () => {
    //                     getDisSupplier(
    //                         _this.state.lat,
    //                         _this.state.lon,
    //                         _this.state.page,
    //                         _this.state.nodeName,
    //                         _this.state.type,
    //                         _this.state.areaId
    //                     ).then((res) => {
    //                         _this.setState({diSuppliers: res.data[0].data,loading: false})
    //                         _this.loadMore();
    //                     })
    //                 })
    //             }
    //         });
    //     })
    // })

    let keyword = this.props.location.query;
    this.setState(() => {
        return {
            lat: "39.95933",
            lon: "116.29845",
            nodeName: keyword
        }
    }, () => {
        getDisSupplier(
            this.state.lat,
            this.state.lon,
            this.state.page,
            this.state.nodeName,
            this.state.type,
            this.state.areaId
        ).then(res => {
          this.setState({ diSuppliers: res.data[0].data, loading: false });
          this.loadMore();
        });
    });
  }

  componentDidUpdate() {
    if (this.props.update) {
      console.log(this.props.area, this.props.type, "重新请求商家列表");
      this.setState(() => {
        return {
            uploadingFinish: false,
            type: this.props.type,
            areaId: this.props.area,
            page: 1,
            nodeName: this.props.value
        }
      },() => {
        let scrollWrapper = document.querySelector('#scrollWrapper').querySelector('.scroll-y');
        scrollWrapper.scrollTop = 0;
        getDisSupplier(
            this.state.lat,
            this.state.lon,
            this.state.page,
            this.state.nodeName,
            this.state.type,
            this.state.areaId
          ).then(res => {
            this.setState({ diSuppliers: res.data[0].data });
          });
      });

      this.props.getDisSupplier({ update: false });

    }
  }

  loadMore() {
    var _this = this;
    var header = document.querySelector(".wx-header");
    var nav = document.querySelector(".nav");
    var inputBox = document.querySelector(".input-wrapper");
    var topHeight =
      header.offsetHeight + nav.offsetHeight + inputBox.offsetHeight;
    var clienHeight = document.documentElement.clientHeight;
    setTimeout(() => {
      var scrollWrapper = document
        .querySelector("#scrollWrapper")
        .querySelector(".scroll-y");
      var lastEleLen = document
        .querySelector("#scrollWrapper")
        .querySelectorAll(".item-default").length;
      var lastEle = document
        .querySelector("#scrollWrapper")
        .querySelectorAll(".item-default")[lastEleLen - 1];
      var isLoading = false;
      scrollWrapper.addEventListener(
        "scroll",
        function() {
          // console.log(scrollWrapper.scrollTop + clienHeight, lastEle.offsetHeight + lastEle.offsetTop + topHeight)
          if (
            scrollWrapper.scrollTop + clienHeight + 20 >
            lastEle.offsetHeight + lastEle.offsetTop + topHeight
          ) {
            if (_this.state.uploadingFinish) {
              return;
            }
            if (!isLoading) {
              console.log("到底了", _this.state.page);
              _this.setState(() => {
                  page: ++_this.state.page
              }, () => {
                  getDisSupplier(
                    _this.state.lat,
                    _this.state.lon,
                    _this.state.page,
                    _this.state.nodeName,
                    _this.state.type,
                    _this.state.areaId
                  ).then(res => {
                    isLoading = false;
                    _this.setState({
                      diSuppliers: _this.state.diSuppliers.concat(res.data[0].data),
                      upLoading: false,
                    });
                    scrollWrapper = document
                      .querySelector("#scrollWrapper")
                      .querySelector(".scroll-y");
                    lastEleLen = document
                      .querySelector("#scrollWrapper")
                      .querySelectorAll(".item-default").length;
                    lastEle = document
                      .querySelector("#scrollWrapper")
                      .querySelectorAll(".item-default")[lastEleLen - 1];
                    if (res.data[0].data.length < 15) {
                      _this.setState({
                        uploadingFinish: true
                      });
                    }
                  });
              })
            }
            isLoading = true;
            _this.setState({ upLoading: true });
          }
        },
        false
      );
    }, 200);
  }

  render() {
    if (!this.state.loading) {
      return (
        <div
          className="choose-tab scrollWrapper"
          id="scrollWrapper"
          ref={scrollWrapper => {
            this.scrollWrapper = scrollWrapper;
          }}
        >
          <div className="scroll-y">
            {this.state.diSuppliers.length > 0 ? (
              <div>
                <Location location={this.state.diSuppliers[0].node_name} />
                <section className="panel-result">
                  <p className="title">追溯企业</p>
                  <ul className="wx-data-list">
                    {this.state.diSuppliers.map((supplier, index) => {
                      return (
                        <li className="item-default" key={index}>
                          <div className="wx-boxflex">
                            <p className="strong wx-flex-item shop-name">
                              {supplier.node_name}
                            </p>
                            <span>
                              {supplier.distance > 0.1
                                ? supplier.distance + "km"
                                : ">100m"}
                            </span>
                          </div>
                          <p className="mar-t10 shop-address">地址：{supplier.addr}</p>
                        </li>
                      );
                    })}
                  </ul>
                  {this.state.upLoading ? (
                    <div className="load-more">加载中</div>
                  ) : (
                    ""
                  )}
                  {this.state.uploadingFinish ? (
                    <div className="load-more">没有更多了</div>
                  ) : (
                    ""
                  )}
                </section>
              </div>
            ) : <div className='not-found'>没有查到相关数据</div>}
          </div>
        </div>
      );
    } else {
      return <Loading loadingText={this.state.loadingText} />;
    }
  }
}

const mapStateToProps = (state, ownProps) => ({
  update: state.update,
  area: state.area,
  type: state.type,
  value: state.keyword
});

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getDisSupplier: value => {
      dispatch({ type: "getDisSupplier", text: value });
    }
  };
};

const ReduxNearShop = connect(mapStateToProps, mapDispatchToProps)(NearShop);

export default ReduxNearShop;
