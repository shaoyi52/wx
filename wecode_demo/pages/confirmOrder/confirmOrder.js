// pages/confirmOrder/confirmOrder.js
var payType=[{
  icon:"../../image/wx_icon.png",
  payStyle:"微信支付"
},{
  icon:"../../image/send_icon.png",
  payStyle:"货到付款"
  }];

Page({
  data:{
    array: ['尽快送达', '15：30', '16：00', '16：30', '17：00'],
    index:0,    
    actionSheetHidden: true,
    actionSheetItems: payType,
    payId:0,
    },
    
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
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
  actionSheetTap: function(e) {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },
  actionSheetChange: function(e) {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },
  listenerPickerSelected: function(e) {
      //改变index值，通过setData()方法重绘界面
      this.setData({
        index: e.detail.value
      });     
  }, 
  bind:function(e){   
    console.log(e); 
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden,
      payId:e.currentTarget.dataset.payType
    })
   
    

  },
  selectAddresTap:function(){
     wx.navigateTo({
      url: '../../pages/addressManage/addressManage'
    })
  },
  submitOrder:function(){ 
    wx.switchTab({
      url: '../../pages/orders/orders'
    })

   
  },

})

