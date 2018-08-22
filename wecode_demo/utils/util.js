function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**获取店铺数据 */
function GetShopData(_this,flag) {
  console.log(_this,flag);
  wx.login({
    success: function (res) {
      if (res.code) {
        console.log(res)
      }}
      })
  var result = [{
    shopName: "小米姑娘",//店名
    shopHead: "../../image/wx_store.png",//店铺头像
    shopId: "001-2",//店铺id
    main: "海鱼、大龙虾、多宝鱼、大闸蟹等海产品。",//主营
    distance: "5",//配送距离
    deliveryTime: '35',//送达平均时间
    appraise: "4.0",//评论等级
    oddNumber: "5999"//月销量
  }];
  return result
}

module.exports = {
  formatTime: formatTime,
  GetShopData:GetShopData
}
