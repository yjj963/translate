// pages/star/star.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    star:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    this.setData({
      star: (wx.getStorageSync('star') || [])
    })
  },
  onTapItem: function (e) {
    wx.reLaunch({
      url: `/pages/index/index?query=${e.currentTarget.dataset.query}`,
    })
    app.globalData.curLang.chs = e.currentTarget.dataset.chs
    app.globalData.curLang.lang = e.currentTarget.dataset.lang
    app.globalData.curLang.index = e.currentTarget.dataset.index
  },
  onTapClear: function () {
    wx.setStorageSync('star', [])
    this.setData({ 'star': wx.getStorageSync('history') })
  },
  onTapClose: function (e) {
    this.data.star.splice(e.currentTarget.dataset.index, 1)
    wx.setStorageSync('star', this.data.star)
    this.setData({ 'star': wx.getStorageSync('star') })
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

  }
})