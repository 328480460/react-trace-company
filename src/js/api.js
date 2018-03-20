import axios from "axios";
// const basePath = 'http://b197362h08.imwork.net/trace/';
const basePath = 'http://www.bjfxr.com/analyse/';


// 定位当前位置接口，返回附近的市场
export let getDisSupplier = function( lon,lat,page = 1, node_name, type, area_id) {
  let url = basePath + "tracingchain/nodeDistance"
  let data = { x_coordinate: lat, y_coordinate: lon, node_name: node_name, page: page, type: type, area_id: area_id};
  
  return new Promise((resolve, reject) => {
    axios
      .get(url, { params: data })
      .then(res => {
        resolve(res);
      })
      .catch(res => {
        reject("error");
      });
  });
};

// 微信配置接口
var urld = window.location.href.split('#')[0];
var encodeUrl = encodeURIComponent(urld);
export let wechatWeb = function(param) {
  let url = basePath + "wx.do?method=getWxConf&url=" + urld;
  return new Promise((resolve, reject) => {
    axios.get(url).then(res => {
        resolve(res.data);
      }).catch(res => {
        reject("error");
      });
  });
};


// 查找超市列表接口
export let searchSupplier = function(reqdata) {
  reqdata = reqdata || "";
  let url = "http://www.bjfxr.com/analyse/tracingchain/nodebase";
  let dada = { node_name: reqdata };

  return new Promise((resolve, reject) => {
    axios
      .get(url, { params: dada })
      .then(res => {
        resolve(res);
      })
      .catch(res => {
        reject("error");
      });
  });
};


export let barCode = function(node_id, trace_code) {
  let params = {
    url:
      "http://www.bjfxr.com/analyse/tracingchain/barcode?node_id=" +
      node_id +
      "&trace_code=" +
      trace_code
  };
  return new Promise((resolve, reject) => {
    axios.get(params, function(res) {
      if (res[0].result) {
        resolve(res[0].data);
      } else {
        reject(res);
      }
    });
  });
};

export let qrCode = function(trace_code) {
  let params = {
    url:
      "http://www.bjfxr.com/analyse/tracingchain/qrcode?trace_code=" +
      trace_code
  };

  return new Promise((resolve, reject) => {
    axios.get(params, function(res) {
      if (res[0].result) {
        resolve(res[0].data);
      } else {
        reject(res);
      }
    });
  });
};
