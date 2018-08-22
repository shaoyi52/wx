// pages/search/search.js
var util = require("../../utils/util.js");
let getDatas = {
  /**商家数据 */
  getShopData: function (_this) {
    _this.setData({
      result: util.GetShopData()
    })
  }
};




Page({

  /**
   * 页面的初始数据
   */
  data: {
    ifSearch: true,
    ifDatas: false,
    isHide: true,
    searchValue: "",
    searchName: "",
    historyDatas: [{ "name": "大米" }, { "name": "海鲜" }, { "name": "东北大米" }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    getDatas.getShopData(_this);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },
  /**搜索 */
  searchFn: function (e) {
    var _this = this;
    console.log(e.target.dataset.searchname.name);
    var name = e.target.dataset.searchname.name;
    if (name == "东北大米") {
      _this.setData({
        searchValue: name,
        ifSearch: false,
        ifDatas: true
      });
    } else {
      _this.setData({
        searchValue: name,
        ifSearch: false,
        ifDatas: false
      });
    }


  },
  /**当键盘输入时触发 */
  bindInput: function (e) {
    console.log(e.detail.value)
    if (e.detail.value != "") {
      this.setData({
        ifSearch: false,
        ifDatas: false,
        searchValue: e.detail.value
      });
    } else {
      this.setData({
        ifSearch: true,
        ifDatas: false,
        searchValue: ''
      });
    }
  },
  /**移除历史搜索 */
  removeHistory: function (e) {
    this.setData({
      isHide: false
    });
  }
})