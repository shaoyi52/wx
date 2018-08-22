// pages/addressAdd/addressAdd.js
var app = getApp();
Page({
  data:{   
    sexs: [
      {name: '男', value: 1},
      {name: '女', value: 0},      
    ],   
    addressData:{
      name:'',
      sex:1,
      tel:'',
      street:'',
      detail:'',
      position:""
    }, 
    addressId:"",  
    
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    //console.log('页面跳转参数', options);
    let _this=this;
    this.removeAddressData();
    if (options.id){
      //获取存Storage的地址信息
      wx.getStorage({
        key: options.id,
        success: function (res) {
          console.log(res)
          let addressData = {
            name: res.data.name,
            sex: res.data.sex,
            tel: res.data.telphone,
            street: res.data.address,
            detail: res.data.addressDetail,
            position: res.data.longitudeLatitude,
          };          
          _this.setData({
            addressData: addressData,
            addressId: options.id,
          })
        },
        fail: function (res) {
          //console.log(res.data)

        }
      })
      
    }else{

    }
   
    
  },
  onReady:function(){
    // let that = this;
    // wx.getStorage({
    //   key: 'addressData',
    //   success: function (res) {
    //     console.log(res.data)
    //     that.setData({
    //       address: res.data.address,
    //       position: res.data.position
    //     })
    //   }
    // })
    // // 页面渲染完成
    // var CurrentPages = getCurrentPages();
    // console.log(CurrentPages);
  },
  onShow:function(){
    // 页面显示
     let that=this;
    wx.getStorage({
      key: 'addressData',
      success: function(res) {
          console.log(res.data)
          that.data.addressData['street'] = res.data.address;
          that.data.addressData['position'] = res.data.position.lng + ',' + res.data.position.lat;
             that.setData({
               addressData: that.data.addressData,              
              })
      } 
    })
    // 页面渲染完成
    var CurrentPages=getCurrentPages();
    console.log(CurrentPages);
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  addresInputTap:function(){
    console.log("跳转地图");
     wx.navigateTo({
      url: '../../pages/mapSearch/mapSearch'
    })
  },
  sexChange:function(e){
    this.data.addressData['sex'] =parseInt(e.detail.value);
    console.log(e, e.detail.value);
  },

  //编辑&&添加收货地址
  confirmAddressTap:function(e){
    //console.log(e);   
    let formData=e.detail.value;
    let _this =this;
    // console.log("addressData", that.data.addressData);

    //错误提示信息
    if ((formData.contactName).replace(/(^\s*)|(\s*$)/g, "")==""){      
      _this.tips('收货人不能为空!');
      return false;
    } else if (!(/^1[34578]\d{9}$/.test(formData.contactTel))){
      _this.tips('手机号有误!');
      return false;
    } else if ((formData.street).replace(/(^\s*)|(\s*$)/g, "") == "") {
      _this.tips('地址不能为空!');
      return false;
    } else if ((formData.addressDetail).replace(/(^\s*)|(\s*$)/g, "") == "") {
      _this.tips('详细地址不能为空!');
      return false;
    }

    let parame={
      name: formData.contactName,
      sex: formData.sex,
      telPhone: formData.contactTel,
      address: formData.street,
      addressDetail: formData.addressDetail,
      longitudelLatitude: _this.data.addressData.position
    }
    
    console.log('参数:', parame);
    if (this.data.addressId){
      //编辑
      parame['addressId'] = this.data.addressId;     
      let options = {
        path: 'Api/EditReceiptAddress',
        success: function (res) {

          wx.removeStorage({//清除编辑地址的内存
            key: _this.data.addressId,
            success: function (res) { },
            fail: function (res) { }
          })
          app.globalData.dataUp=true;//修改数据更新标识
          console.log("编辑成功",res);        
          _this.removeAddressData(function () {
            wx.redirectTo({
              url: '../../pages/addressManage/addressManage'
            })
          });
        }
      }
      app.post(parame, options)
    }else{
     //添加
     let options = {
       path: 'Api/AddReceiptAddress',
       success: function (res) {
         console.log("添加成功",res.data.result);
         app.globalData.dataUp = true;//修改数据更新标识
         var result = res.data.result;
         _this.removeAddressData(function () {
           wx.redirectTo({
             url: '../../pages/addressManage/addressManage'
           })
         });
       }
     }
     app.post(parame, options)
   }
  
  

  },
  tips:function(msg){
    wx.showModal({
      title: '提示',      
      content: msg,
      showCancel:false,      
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  

  //清除坐标存储
  removeAddressData:function(cb){
    wx.removeStorage({
      key: 'addressData',
      success: function (res) {
        typeof cb=='function' && cb();       
      },
      fail:function(res){
        typeof cb == 'function' && cb();
      }
    })
  }


})