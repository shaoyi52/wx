//index.js
//获取应用实例
var app = getApp()
//
let getDate = {
  //获取左侧菜单数据
  leftMenu: function (that) {
    that.setData({
      menunav: {
        menutab: 1,
        menuitem: [
          {
            "text": "蔬菜"
          },
          {
            "text": "水产"
          },
          {
            "text": "粮油"
          },
          {
            "text": "调味料"
          },
          {
            "text": "海鲜"
          },
          {
            "text": "熟食"
          },
          {
            "text": "肉类"
          },
          {
            "text": "蔬菜"
          },
          {
            "text": "水产"
          },
          {
            "text": "粮油"
          },
          {
            "text": "调味料"
          },
          {
            "text": "海鲜"
          },
          {
            "text": "熟食"
          },
          {
            "text": "肉类"
          },
          {
            "text": "蔬菜"
          },
          {
            "text": "水产"
          },
          {
            "text": "粮油"
          },
          {
            "text": "调味料"
          },
          {
            "text": "海鲜"
          },
          {
            "text": "熟食"
          },
          {
            "text": "肉类"
          },
          {
            "text": "蔬菜"
          },
          {
            "text": "水产"
          },
          {
            "text": "粮油"
          },
          {
            "text": "调味料"
          },
          {
            "text": "海鲜"
          },
          {
            "text": "熟食"
          },
          {
            "text": "肉类"
          }
        ]
      },
    })
  },
  //设置滚动条高度
  setScrollHeight: function (that) {
    wx.getSystemInfo({
      success: function (res) {
        console.log(res.model)
        console.log(res.pixelRatio)
        console.log(res.windowWidth)
        console.log(res.windowHeight)
        console.log(res.language)
        console.log(res.version)
        console.log(res.platform)
        let usedHieght = res.windowHeight - 398 * res.windowWidth / 750;
        that.setData({
          setHeight: usedHieght
        });
      }
    })
  },
  //获取店铺基本信息
  getShopInfo: function (that) {
    that.setData({
      shopInfo: {
        shopName: '小米姑娘',//店铺名称
        shopHead: '../../image/item.jpg',//店铺头像
        modeOfDistribution: '商家配送',//配送方式
        minimumPirce: '20',//最低起送价
        freight: '2',//配送费
        main: '粮食、面粉、调味料、蛋类、油料、干活等。',//主要营销
        distance: '1.66km',//配送距离
        DeliveryTime: '55分钟',//送达平均时间
        appraise: '3.5',//评论等级
        appraisePerson: '95'//评论人数
      }
    })
  },
  //获取商品信息
  getCommodity: function (that) {
    that.setData({
      commodity: [
        {
          commodityId: '12112',//商品ID
          commoditName: '马坝油粘（优等）',//商品名称
          introduce: '米粒细长，晶莹洁白简介：米粒细长，晶莹洁白',//商品介绍
          unit: '斤',//商品单位
          commodityImg: '../../image/item.jpg',//商品图片
          commodityPrice: '13.5',//商品价格
        },
        {
          commodityId: '554415',//商品ID
          commoditName: '马坝油粘3（优等）',//商品名称
          introduce: '米粒细长，晶莹洁白简介：米粒细长，晶莹洁白',//商品介绍
          unit: '斤',//商品单位
          commodityImg: '../../image/item.jpg',//商品图片
          commodityPrice: '23.5',//商品价格
        }
      ]
    })
  }
}
Page({
  data: {
    actionSheetHidden: true,
    IDS: [],//购物车商品ID
    cartList: {},//购物车列表
    sumMoney: 0,//总价
    cartNum: 0,//购物车数量
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  actionSheetTap: function (e) {
    if (this.data.IDS.length == 0) {
      return;
    }
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },
  actionSheetChange: function (e) {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },
  balanceTap:function(e){
    //结算
    wx.navigateTo({     
      url: '../../pages/confirmOrder/confirmOrder'
 
    })
  },
  onLoad: function (options) {
    console.log(options.id)//首页跳转shopId
    getDate.setScrollHeight(this); //设置滚动条高度  
    getDate.leftMenu(this); //左侧菜单
    getDate.getShopInfo(this); //店铺信息
    getDate.getCommodity(this);//获取商品信息   

  },
  //设置左侧菜单
  setMenu: function (e) {
    const edata = e.currentTarget.dataset;
    this.setData({
      'menunav.menutab': Number(edata.tabindex)
    })
  },
  //商品数量添加
  addCommodity: function (e) {
    const index = e.currentTarget.dataset.index;
    console.log(index);
    let commodityNum = this.data.commodity[index].commodityNum;
    this.data.commodity[index].commodityNum = commodityNum > 0 ? commodityNum : 0;
    this.data.commodity[index].commodityNum++;
    this.data.sumMoney += parseFloat(this.data.commodity[index].commodityPrice);
    this.data.cartNum++;
    var id = this.data.commodity[index].commodityId;
    if (this.data.IDS.includes(id)) {
    } else {
      this.data.IDS = [id].concat(this.data.IDS);
    }
    this.data.cartList[id] = this.data.commodity[index];
    this.setData({
      IDS: this.data.IDS,
      cartList: this.data.cartList,
      commodity: this.data.commodity,
      sumMoney: this.data.sumMoney,
      cartNum: this.data.cartNum
    });
  },
  //商品数量减少
  decCommodity: function (e) {
    const index = e.currentTarget.dataset.index;
    var that = this;
    if (this.data.commodity[index].commodityNum <= 1) {
      wx.showModal({
        title: '提示',
        content: '您确定从购物车删除该项吗？',
        success: function (res) {
          if (res.confirm) {
            var id = that.data.commodity[index].commodityId;
            that.data.commodity[index].commodityNum--;
            delete that.data.cartList[id];
            that.data.IDS = that.data.IDS.filter(function (val) { return val != id });
            that.data.sumMoney -= parseFloat(that.data.commodity[index].commodityPrice);
            that.data.cartNum--;
            that.setData({
              IDS: that.data.IDS,
              cartList: that.data.cartList,
              commodity: that.data.commodity,
              sumMoney: that.data.sumMoney,
              cartNum: that.data.cartNum
            });
          } else if (res.cancel) {
            //取消事件
          }
        }
      })
    } else {
      var id = this.data.commodity[index].commodityId;
      this.data.commodity[index].commodityNum--;
      this.data.cartList[id] = this.data.commodity[index];
      this.data.sumMoney -= parseFloat(this.data.commodity[index].commodityPrice);
      this.data.cartNum--;
      this.setData({
        IDS: this.data.IDS,
        cartList: this.data.cartList,
        commodity: this.data.commodity,
        sumMoney: this.data.sumMoney,
        cartNum: this.data.cartNum
      });
    }
  },
  //购物车数量增加
  cartAdd: function (e) {
    const index = e.currentTarget.dataset.index;
    let id = this.data.IDS[index];
    this.data.cartList[id].commodityNum++;
    this.data.sumMoney += parseFloat(this.data.cartList[id].commodityPrice);
    this.data.cartNum++;
    for (let [idx, item] of this.data.commodity.entries()) {
      console.log(item);
      if (item.commodityId == id) {
        console.log(idx)
        this.data.commodity[idx].commodityNum = this.data.cartList[id].commodityNum;
      }
    }
    this.setData({
      cartList: this.data.cartList,
      sumMoney: this.data.sumMoney,
      cartNum: this.data.cartNum,
      commodity: this.data.commodity
    });
  },
  //购物车数量减少
  cartDec: function (e) {
    const index = e.currentTarget.dataset.index;
  }
})
