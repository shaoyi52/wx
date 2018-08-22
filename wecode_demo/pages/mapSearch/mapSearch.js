// pages/mapSearch/mapSearch.js
// 引入SDK核心类
var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
var qqmapsdk;
// 实例化API核心类
var map = new QQMapWX({
    key: 'T7FBZ-CGMRU-DK5V4-4GHLF-3MT5O-CTFWD' // 必填
});

//微信api获取 【latitude(纬度), longitude(经度)】
function getPosition(callBck,reCallBack){
  wx.getLocation({
      type: 'wgs84',
      success: function(res) {
        console.log("获取的原始经纬度",res);
        
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
        var locationPosi=latitude+","+longitude;
        
         callBck(latitude,longitude,reCallBack);
        }
        
      })
}
//腾讯地图 latitude(纬度), longitude(经度)反转; 搜索附近大厦
function reverseGeocoder(latitude,longitude,reCallBack){
  map.reverseGeocoder({
          location: {
            latitude: latitude,
            longitude: longitude
          },
          coord_type:1 ,
          poi_options:"policy=2",
          get_poi:1, 
            success: function(res) {
                console.log("经纬度搜索结果",res.result);                
                reCallBack(res);               
            },
            fail: function(res) {
                console.log(res);
            },
            complete: function(res) {
               //console.log(res);
            }
        });
}

function searchPlace(keyWord,_this,callback){
  map.getSuggestion({
    keyword: keyWord,
    region: _this.data.city,
    region_fix:1,
    policy:1,
    success: function(res) {
        //console.log(res);
        callback(res);
    },
    fail: function(res) {
        console.log(res);
    },
    complete: function(res) {
        console.log(res);
    }
  });
}
Page({
  data:{
    searchData:null,//搜索出的地址
    nearAdressData:null,//附近的地址列
    sendAddressData:null,//收货地址
    currentAddress:"",//当前地址
    allBackInfo:"",//所有地址
    city:"",//当前城市
    addressRlt:"",
    flag:''
  },
  onLoad:function(options){
    let _this = this; 
    _this.setData({
      flag:options.flag
    })
    // 页面初始化 options为页面跳转所带来的参数
    getPosition(reverseGeocoder,function(rlt){
      console.log("onLoadeRLT",rlt);
       _this.setData({
                nearAdressData: rlt.result.pois,
                allBackInfo:rlt.result,
                currentAddress: rlt.result.formatted_addresses.recommend,
                city: rlt.result.ad_info.city
              })
    })
    // 实例化API核心类
     qqmapsdk = new QQMapWX({
            key: 'T7FBZ-CGMRU-DK5V4-4GHLF-3MT5O-CTFWD'
        });
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },

  searchAddress:function(e){
    //输入框改变搜索地址
    let _this=this; 
    let val=e.detail.value;
    if(e){
      searchPlace(val,_this,function(res){
        console.log(res.data);
       _this.setData({
         nearAdressData: null,
         searchData:res.data
        }) 
      
    })
    }
  },
 
  getCurrenAdrress:function(){
    //定位当前地址  
    let _this=this;
    getPosition(reverseGeocoder,function(rlt){
      console.log("onLoadeRLT",rlt);
       _this.setData({
         searchData:null,
         currentAddress: rlt.result.formatted_addresses.recommend,
         nearAdressData: rlt.result.pois
       })
    })
   
  },

  addressTap:function(e){
    //点击地址带参跳转
    console.log(e);
    let data=e.currentTarget.dataset.item;
    //address=data.address+data.title;
    //position=data.location;
    let addressData={
      address:data.address+data.title,
      position:data.location,
      title:data.title
    }
    wx.setStorage({
      key:"addressData",
      data:addressData
    })
      wx.navigateBack()
  },
  /**选择当前位置 */
  selectAddress: function (e) {
    let data = e.currentTarget.dataset.allBackInfo;
    console.log(e.currentTarget.dataset.allbackinfo)
    console.log(data)
    let addressData = {
      address: e.currentTarget.dataset.allbackinfo.address + e.currentTarget.dataset.allbackinfo.formatted_addresses.recommend,
      position: e.currentTarget.dataset.allbackinfo.location,
      title: e.currentTarget.dataset.allbackinfo.formatted_addresses.recommend
    }
    wx.setStorage({
      key: "addressData",
      data: addressData
    })
    wx.navigateBack()
  },

  /**选择当前位置 */

  /****未使用的******/
  bSearch:function(){
    BMap.regeocoding({
            location:"39.915,116.404",
            fail: function(res){
              console.log(res);
            },
            success: function(res){
              console.log(res);
            },
        });

    BMap.search({ 
            "query": '酒店', 
            fail: function(res){

            }, 
            success: function(res){

            }, 
            // 此处需要在相应路径放置图片文件 
            iconPath: '../../img/marker_red.png', 
            // 此处需要在相应路径放置图片文件 
            iconTapPath: '../../img/marker_red.png' 
        }); 
  },
  qSearch: function(){
      qqmapsdk.reverseGeocoder({
          location: {
            latitude: 22.55905,
            longitude: 113.93438
          },
          coord_type:1 ,
          poi_options:"policy=2",
          get_poi:1, 
            success: function(res) {
                console.log("结果",res.result);
                let rlt =JSON.stringify(res)+"原经纬度：latitude"+latitude+"longitude:"+longitude;
                _this.setData({
                  nearAdressData: res.result.pois
                })
            },
            fail: function(res) {
                console.log(res);
            },
            complete: function(res) {
                console.log(res);
            }
        });
  },
  getLocation:function(){
    wx.getLocation({
      type: 'wgs84',
      success: function(res) {
        console.log(res);
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
      }
    })
  },
  openLocation:function(){
     wx.chooseLocation({
          success: function(res){
            // success
            console.log(JSON.stringify(res))
            console.log(res)
            return;
            
          },
          fail: function() {
            // fail
          },
          complete: function() {
            // complete
          }
        })
  }
  /****\未使用的******/

})