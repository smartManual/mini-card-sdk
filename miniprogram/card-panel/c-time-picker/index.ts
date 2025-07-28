Component({
  properties: {
    info: {
      type: Object,
      value: {}
    }
  },
  data: {
    style: '',
    wrapStyle: '',
    dateText: '',
    timeText: ''
  },
  lifetimes: {
    attached() {
      const info = this.properties.info

      if (!this.isEmpty(info.currentDate)) {
        this.setData({
          dateText: info.currentDate.join('-')
        })
      }

      if (!this.isEmpty(info.currentTime)) {
        this.setData({
          timeText: info.currentTime.join(':')
        })
      }

      this.setData({
        currentDate: info.currentDate,
        currentTime: info.currentTime
      })

      const border = info.borderType === 'default' ? `1px solid #d9d9d9` : `${info.borderWidth}px solid ${info.borderColor}`
      const textAlign = info.textAlign === 'left' ? 'flex-start' : (info.textAlign === 'right' ? 'flex-end' : 'center')
      this.setData({
        style: `
          left: ${info.x}%;
          top: ${info.y}px;
          width: ${info.width}%;
          height: ${info.height}px;
          zIndex: ${info.zIndex};
        `,
        wrapStyle: `
          font-size: ${info.fontSize}px;
          color: ${info.color};
          font-weight: ${info.fontWeight};
          font-style: ${info.fontStyle};
          text-decoration: ${info.textDecoration};
          justify-content: ${textAlign};
          border-radius: ${info.borderRadius}px;
          border: ${border};
        `
      })
    }
  },
  methods: {
    datePickerChange(e: any) {
      const value = e.detail.value
      this.setData({
        dateText: value
      })
      this.triggerEvent('updateCardData', {
        id: this.properties.info.id,
        currentDate: value.split('-')
      }, {
        bubbles: true,
        composed: true
      })
    },
    timePickerChange(e: any) {
      const value = e.detail.value
      this.setData({
        timeText: value
      })

      this.triggerEvent('updateCardData', {
        id: this.properties.info.id,
        currentTime: value.split(':')
      }, {
        bubbles: true,
        composed: true
      })
    },
    isEmpty(obj: any) {
      if (!obj) {
        return true
      }

      if (Array.isArray(obj) && obj.length === 0) {
        return true
      }

      return false
    }
  }
})