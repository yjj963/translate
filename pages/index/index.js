//index.js
import {translate} from '../../utils/api.js'
//获取应用实例
const app = getApp()

Page({
  data: {
    hideClearIcon:true,
    curLang:{},
    query:'',
    result:[]
  },
  //事件处理函数
  onLoad: function (e) {
    if(e.query){
      this.setData({ 'query': e.query})
    }
  },
  onblur:function(e){
    console.log(this.data.query)
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
    this.setData({ 'query': '',hideClearIcon:true })
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
      this.setData({ 'result': res.trans_result })
      let history = wx.getStorageSync('history') || []
      history.unshift({ query: this.data.query, result: res.trans_result[0].dst,curlang:this.data.curLang.chs })
      history.length = history.length > 10 ? 10 : history.length
      wx.setStorageSync('history', history)
    })
  }
})
