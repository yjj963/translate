//logs.js
const app =getApp()

Page({
  data: {
    history: [{
      hideClearIcon:false,
      query:'',
      result:'',
      curLang:{}
    }]
  },
  onShow: function () {
    this.setData({
      history: (wx.getStorageSync('history') || [])
    })
  },
  onTapItem:function(e){
    wx.reLaunch({
      url: `/pages/index/index?query=${e.currentTarget.dataset.query}`,
    })
    app.globalData.curLang.chs = e.currentTarget.dataset.chs
    app.globalData.curLang.lang = e.currentTarget.dataset.lang
    app.globalData.curLang.index = e.currentTarget.dataset.index
  },
  onTapClear:function(){
    wx.setStorageSync('history', [])
    this.setData({ 'history': wx.getStorageSync('history') })
  },
  onTapClose:function(e){
    this.data.history.splice(e.currentTarget.dataset.index, 1)
    wx.setStorageSync('history', this.data.history)
    this.setData({ 'history': wx.getStorageSync('history')})
  }
})
