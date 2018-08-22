
var app = getApp();
let Provisional = {
  pageCount: 1,//商品列表页码
  pageTotal: 1//最大页
}
// 引入SDK核心类
var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
// 实例化API核心类
var map = new QQMapWX({
  key: 'T7FBZ-CGMRU-DK5V4-4GHLF-3MT5O-CTFWD' // 必填
});
//微信api获取 【latitude(纬度), longitude(经度)】
function getPosition(callBck, reCallBack) {
  wx.getLocation({
    type: 'wgs84',
    success: function (res) {
      //  console.log("获取的原始经纬度", res);
      var latitude = res.latitude
      var longitude = res.longitude
      var speed = res.speed
      var accuracy = res.accuracy
      var locationPosi = latitude + "," + longitude;
      callBck(latitude, longitude, reCallBack);
    }
  })
};
//腾讯地图 latitude(纬度), longitude(经度)反转; 搜索附近大厦
function reverseGeocoder(latitude, longitude, reCallBack) {
  map.reverseGeocoder({
    location: {
      latitude: latitude,
      longitude: longitude
    },
    coord_type: 1,
    poi_options: "policy=2",
    get_poi: 1,
    success: function (res) {
      // console.log("经纬度搜索结果", res.result);
      reCallBack(res);
    },
    fail: function (res) {
      // console.log(res);
    },
    complete: function (res) {
      //console.log(res);
    }
  });
}

let getDatas = {
  /**banner 图片 */
  bannerData: function (_this) {
    _this.setData({
      imgUrls: [
        { "img": '../../image/wx_banner1.jpg', "id": "001" },
        { "img": '../../image/wx_banner2.jpg', "id": "002" },
        { "img": '../../image/wx_banner3.jpg', "id": "003" }
      ],
    })
  },
  /**商家数据 */
  getShopData: function (_this) {
    let shopList=[{
        appraise:"5",
        deliveryTime:"5",
        distance:"135",
        main:"ksjsjd",
        oddNumber:"5",
        shopHead:"../../image/wx_store.png",
        shopId:"839c4966-156b-41e6-813d-a77001201ae7",
        shopName:"nsnsn"}];

        _this.setData({
            isShow: false,
            result: shopList,
            showLoadMore: false,//加载中
            showComplete: true,//隐藏加载完成   
            noData:false,   
        })


        /*var datas = {
          coordinate: _this.setCoordinate.coordinate,
          pageSize: 10,
          pageCount: Provisional.pageCount
        };
        console.log('请求参数:', datas);
        var options = {
          path: 'Api/GetShopList',
          success: function (res) {
            if (res.data.result.length > 0){
              console.log('成功返回数据:', res.data.result);
              var result = travMap(res.data.result);
              Provisional.pageTotal = Number(res.data.pageTotal)//设置最大页
              let shopList = [];
              let showLoadMore = false;
              let showComplete = false;
              //如果页码大于1则合并以前的
              if (Provisional.pageCount > 1) {
                shopList = _this.data.result.concat(result);
              } else {
                shopList = result;
              }
              if (Provisional.pageTotal == 1 || Provisional.pageCount == Provisional.pageTotal) {
                showLoadMore = false;
              } else {
                showLoadMore = true
              }
              if (Provisional.pageCount == Provisional.pageTotal && Provisional.pageTotal != 1) {
                showComplete = true;
              } else {
                showComplete = false;
              }
              _this.setData({
                isShow: false,
                result: shopList,
                showLoadMore: showLoadMore,//加载中
                showComplete: showComplete,//隐藏加载完成   
                noData:false,   
              })
              // console.log(_this.data.showLoadMore);
              // console.log(_this.data.showComplete);
            }else{
              console.log('成功返回没有数据:', res.data.result);
              _this.setData({
                showLoadMore:false,
                isShow: false,  
                noData:true,
                result: [],
                showComplete:false
              })
            } 
          }
        }
        app.post(datas, options)*/
  },
  getCurrenAdrress: function (_this) {
    getPosition(reverseGeocoder, function (rlt) {
      console.log(rlt);
      _this.setData({
        searchData: null,
        address: rlt.result.formatted_addresses.recommend
      })
    })
  }
};

function travMap(datas) {
 // console.log(datas)
  if (datas != ""){
    return datas.map(function (data) {
      return {
        shopName: data.shopName,
        shopHead: data.shopHead ? app.globalData.urlInfo + data.shopHead : '../../image/wx_store.png',
        shopId: data.shopId,
        main: data.main,
        distance: data.distance,
        deliveryTime: data.deliveryTime,
        appraise: parseFloat(data.appraise).toFixed(1),
        oddNumber: data.oddNumber,
      }
    })
  }
}

Page({
  data: {
    swiperParam:{
      indicatorDots: true,
      autoplay: true,
      interval: 5000,
      duration: 1000     
    }, 

    currentTab: '001',
    address: '',
    showLoadMore: false,//是否显示更加加载中
    showComplete: false,//是否显示加载完成
    isShow:true, //加载数据
    noData:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(app.globalData.Coordinate);
    wx.removeStorage({
      key: 'addressData',
      success: function (res) {
        //console.log(res)
      }
    })
    var _this = this;
    getDatas.getCurrenAdrress(_this);
    getDatas.getShopData(_this);    
    getDatas.bannerData(_this);
  },
  /**获取微信坐标 */
  _getCoordinate:function(_this){
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        _this.setCoordinate.coordinate = res.longitude + "," + res.latitude;
        // _this.setCoordinate.coordinate = '113.94627,22.561628';
        getDatas.getShopData(_this);
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // var _this = this;
    // getDatas.getCurrenAdrress(_this);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let _this = this;
    wx.getStorage({
      key: 'addressData',
      success: function (res) {
         // var locationPosi = '113.94627,22.561628';
        /**重新请求数据 */
        let locationPosi = null;
        locationPosi = res.data.position.lng + ',' + res.data.position.lat;
        if (locationPosi == null){
          _this._getCoordinate(_this);
         console.log('默认坐标')
        }else{
          _this.setCoordinate.coordinate = locationPosi;
          console.log('新坐标:', _this.setCoordinate.coordinate)
          getDatas.getShopData(_this);
        }     
        _this.setData({
          address: res.data.title,
        })
      }
    })
    console.log('返回')
   
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    let _this = this;
  },



  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let _this = this;
    if (Provisional.pageCount >= Provisional.pageTotal) {

    } else {
      console.log('触发底部')
      Provisional.pageCount++;
      getDatas.getShopData(_this);
    }

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  //上拉加载更多
  // bindDownLoad: function () {
  

  // },
  /**生鲜类事件 */
  cateClick: function (e) {
    var that = this;
    that.setData({ currentTab: e.target.dataset.currenttab });
    // console.log(e.target.dataset.currenttab);
  },
  /**扫码 */
  scanCode: function () {
    wx.scanCode({
      success: (res) => {
        console.log(res)
      }
    })
  },
  /**收货地址 */
  shippingAdd: function (e) {
    var flag = '0';
    wx.navigateTo({
      url: "../mapSearch/mapSearch?flag=" + flag
    })
  },
  /**搜索 */
  search: function (e) {
    let _this = this;
    wx.setStorage({
      key: "coordinate",
      data: _this.setCoordinate.coordinate
    })
    wx.navigateTo({
      url: "../search/search"
    })
  },
  /**跳转商家详情 */
  toBusinessDetails: function (e) {
    let id = e.currentTarget.dataset.id;
    let distance = e.currentTarget.dataset.distance;
    wx.navigateTo({
      url: "../product/product?shopId=" + id + '&distance=' + distance
    })
  },
  /**存储坐标 */
  setCoordinate:function(){
    coordinate:null
  }
})
