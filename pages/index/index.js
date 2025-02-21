// index.js
Page({
  data: {
    inputText: '',
    imageUrl: '',
    isLoading: false
  },

  handleInput(e) {
    this.setData({
      inputText: e.detail.value
    })
  },

  handleSubmit() {
    if (!this.data.inputText) {
      wx.showToast({
        title: '请输入文字',
        icon: 'none'
      })
      return
    }

    this.setData({ isLoading: true })

    wx.request({
      url: 'https://api.coze.cn/v1/workflow/run',
      method: 'POST',
      header: {
        'Authorization': 'Bearer pat_H0LS16FT0KxTigWpasc8yc5qYhlDkndRaZJvJLwqVI7sWVsRuUDcYeMslsazdei0', 
        'Content-Type': 'application/json',
        'Accept': '*/*',
        'Host': 'api.coze.cn',
        'Connection': 'keep-alive'
      },
      data: {
        workflow_id: '7473492791899193384', // 请替换为你的实际 workflow_id
        parameters: {
          input: this.data.inputText
        }
      },
      success: (res) => {
        if (res.data.code === 0) {
          try {
            const responseData = JSON.parse(res.data.data);
            console.log(res)
            console.log("提交测试1")
            // 假设返回的 output 中包含图片 URL
            if (responseData.output) {
              this.setData({
                imageUrl: responseData.output
              })
            } else {
              wx.showToast({
                title: '生成图片失败',
                icon: 'none'
              })
            }
          } catch (e) {
            wx.showToast({
              title: '返回数据格式错误',
              icon: 'none'
            })
          }
        } else {
          wx.showToast({
            title: res.data.msg || '请求失败',
            icon: 'none'
          })
        }
      },
      fail: (err) => {
        wx.showToast({
          title: '网络请求失败',
          icon: 'none'
        })
      },
      complete: () => {
        this.setData({ isLoading: false })
      }
    })
  }
})
