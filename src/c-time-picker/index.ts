Component({
  properties: {
    info: {
      type: Object,
      value: {}
    },
    varInfo: {
      type: Object,
      value: {}
    },
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

      const dateText = this.getDateText()
      this.setData({
        dateText
      })

      const timeText = this.getTimeText()
      this.setData({
        timeText
      })

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
    getDateText() {
      const info = this.properties.info
      const defaultType = info.defaultType
      if (defaultType === 'None') {
        return ''
      } else if (defaultType === 'VarValue') {
        let json: any = this.properties.varInfo
        const timeVar: any[] = info.timeVar
        const key = timeVar[timeVar.length - 1]
        if (this.isEmpty(json[key])) {
          return ''
        } else {
          return this.getDateTextForValValue(json[key])
        }
      } else if (defaultType === 'RealTime') {
        const date = new Date();
        if (!isNaN(date.getTime())) {
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, '0');
          const day = String(date.getDate()).padStart(2, '0');
          return `${year}-${month}-${day}`;
        }
      } else if (defaultType === 'Custom') {
        if (!this.isEmpty(info.currentDate)) {
          return info.currentDate.join('-')
        }
      } else {
        return ''
      }
    },
    getTimeText() {
      const info = this.properties.info
      const defaultType = info.defaultType
      if (defaultType === 'None') {
        return ''
      } else if (defaultType === 'VarValue') {
        let json: any = this.properties.varInfo
        const timeVar: any[] = info.timeVar
        const key = timeVar[timeVar.length - 1]
        if (this.isEmpty(json[key])) {
          return ''
        } else {
          return this.getTimeTextForValValue(json[key])
        }

      } else if (defaultType === 'RealTime') {
        const date = new Date();
        if (!isNaN(date.getTime())) {
          const hour = String(date.getHours()).padStart(2, '0');
          const minute = String(date.getMinutes()).padStart(2, '0');
          return `${hour}:${minute}`;
        }
      } else if (defaultType === 'Custom') {
        if (!this.isEmpty(info.currentTime)) {
          return info.currentTime.join(':')
        }
      } else {
        return ''
      }
    },
    getDateTextForValValue(inputStr: string) {
      // 尝试匹配 "2015年02月3日14时14分" 格式
      const match1 = inputStr.match(/^(\d{4})年(\d{1,2})月(\d{1,2})日(\d{1,2})时(\d{1,2})分$/);
      if (match1) {
        const [, year, month, day, hour, minute] = match1;
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
      }

      // 尝试匹配 "2015/2/3 11:34" 格式
      const match2 = inputStr.match(/^(\d{4})\/(\d{1,2})\/(\d{1,2})\s+(\d{1,2}):(\d{1,2})$/);
      if (match2) {
        const [, year, month, day, hour, minute] = match2;
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
      }

      // 尝试其他可能的日期格式（如 Date 对象可解析的格式）
      const date = new Date(inputStr);
      if (!isNaN(date.getTime())) {
        // 如果是有效的 Date 对象，格式化为 yyyy-mm-dd hh:mm
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      }

      // 如果都不匹配，返回 null
      return '';
    },
    getTimeTextForValValue(inputStr: string) {
      // 尝试匹配 "2015年02月3日14时14分" 格式
      const match1 = inputStr.match(/^(\d{4})年(\d{1,2})月(\d{1,2})日(\d{1,2})时(\d{1,2})分$/);
      if (match1) {
        const [, year, month, day, hour, minute] = match1;
        return `${hour.padStart(2, '0')}:${minute.padStart(2, '0')}`;
      }

      // 尝试匹配 "2015/2/3 11:34" 格式
      const match2 = inputStr.match(/^(\d{4})\/(\d{1,2})\/(\d{1,2})\s+(\d{1,2}):(\d{1,2})$/);
      if (match2) {
        const [, year, month, day, hour, minute] = match2;
        return `${hour.padStart(2, '0')}:${minute.padStart(2, '0')}`;
      }

      // 尝试其他可能的日期格式（如 Date 对象可解析的格式）
      const date = new Date(inputStr);
      if (!isNaN(date.getTime())) {
        // 如果是有效的 Date 对象，格式化为 yyyy-mm-dd hh:mm
        const hour = String(date.getHours()).padStart(2, '0');
        const minute = String(date.getMinutes()).padStart(2, '0');
        return `${hour}:${minute}`;
      }

      // 如果都不匹配，返回 null
      return '';
    },
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