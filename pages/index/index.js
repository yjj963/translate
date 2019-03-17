//index.js
import {translate} from '../../utils/api.js'
//获取应用实例
const app = getApp()    
Page({
  data: {
    hideClearIcon:true,
    curLang:{},
    query:'',
    result:[],
    hornActive:false,
    starActive:false,
    copyActive:false
  },
  //事件处理函数
  onLoad: function (e) {
    if(e.query){
      this.setData({ 'query': e.query, hideClearIcon:false})
      this.setData({ curLang: app.globalData.curLang })
      this.onConfirm()
    }
  },
  onInput: function (e) {
    this.setData({ 'query': e.detail.value })
    if (this.data.query.length > 0) {
      this.setData({ 'hideClearIcon': false })
    } else {
      this.setData({ 'hideClearIcon': true })
    }
  },
  onTapclose:function(){
    this.setData({ 'query': '',hideClearIcon:true,'result':[] })
  },
  onShow: function () {
    if (this.data.curLang.lang !== app.globalData.curLang.lang) {
      this.setData({ curLang: app.globalData.curLang })
      this.onConfirm()
    }
  },
  onConfirm: function () {
    if (!this.data.query) return
    translate(this.data.query, { from: 'auto', to: this.data.curLang.lang }).then(res => {
      this.setData({ copyActive: false })
      this.setData({ 'result': res.trans_result })
      let history = wx.getStorageSync('history') || []
      history.unshift({ query: this.data.query, result: res.trans_result[0].dst, curLang: this.data.curLang })
      history.length = history.length > 10 ? 10 : history.length
      wx.setStorageSync('history', history)
    })
  },
  onTapRead:function(){
    const innerAudioContext = wx.createInnerAudioContext()
    let text = encodeURI(this.data.result[0].dst)    
    console.log(text)
    innerAudioContext.autoplay=true
    innerAudioContext.src = `https://tsn.baidu.com/text2audio?tex=${text}&tok=24.e4b65633c202b35fa774641cd2b8a71b.2592000.1555381472.282335-15773870&cuid='abcdxxx'&ctp=1&lan=zh`
    innerAudioContext.onError((res)=>{
      console.log(res)
    })
    innerAudioContext.onPlay(()=>{
      console.log('播放开始')
      this.setData({ hornActive: true })
    })
    innerAudioContext.onEnded(() => {
      console.log('播放结束')
      this.setData({ hornActive: false })
    })
  },
  onstar:function(e){
    this.setData({ starActive: !this.data.starActive })
    let dataobj=e.currentTarget.dataset
    let star = wx.getStorageSync('star') || []
    if (this.data.starActive){
      wx.showToast({
        title: '收藏成功',
      })
      star.unshift({ query: dataobj.query, result: dataobj.result, curLang: this.data.curLang  })
      star.length = star.length > 10 ? 10 : star.length
      wx.setStorageSync('star', star)
    }else{
      wx.showToast({
        title: '取消收藏',
      })
      star.shift()
      wx.setStorageSync('star', star)
    }
  },
  oncopy:function(){
    this.setData({ copyActive: true })
    wx.setClipboardData({
      data: String(this.data.result),
      success: res => {
        wx.showToast({
          title: '复制成功',
        })
      }
    })
  }
})
