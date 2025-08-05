import dayjs, { Dayjs } from 'dayjs'
import { isEmpty, getVal } from '@zero-org/utils'
import { DefaultType, TimeType } from '../const'

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
    timeText: '',
    showDate: false,
    showTime: false
  },
  lifetimes: {
    attached() {
      this.updateDateAndTime()

      const info = this.properties.info
      this.setData({
        showDate: ['DateTime', 'Date'].includes(info.timeType),
        showTime: ['DateTime', 'Time'].includes(info.timeType)
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
  observers: {
    info: function() {
      const dateText = this.getDateText()
      this.setData({
        dateText: dateText
      })

      const timeText = this.getTimeText()
      this.setData({
        timeText: timeText
      })
    }
  },
  methods: {
    getDateText() {
      const info = this.properties.info
      if (isEmpty(info.currentDate)) {
        return '请选择日期'
      } else {
        return info.currentDate.join('-')
      }
    },
    getTimeText() {
      const info = this.properties.info
      if (isEmpty(info.currentTime)) {
        return '请选择时间'
      } else {
        return info.currentTime.join(':')
      }
    },
    updateDateAndTime() {
      const info = this.properties.info
      if (info.defaultType === DefaultType.None) {
        this.triggerEvent('updateCardData', {
          id: info.id,
          currentDate: [],
          currentTime: []
        }, {
          bubbles: true,
          composed: true
        })
      } else if (info.defaultType === DefaultType.VarValue) {
        let cardVarInfo: any = this.properties.varInfo
        const timeVar: any[] = info.timeVar
        const key = timeVar[timeVar.length - 1]
        if (!isEmpty(getVal(cardVarInfo, key, ''))) {
          const time = this.getTimeTextForValValue(cardVarInfo[key])
          if (time.isValid()) {
            const json = this.getDateAndTime(time)
            this.triggerEvent('updateCardData', {
              id: info.id,
              currentDate: json.currentDate,
              currentTime: json.currentTime
            }, {
              bubbles: true,
              composed: true
            })
          } else {
            this.triggerEvent('updateCardData', {
              id: info.id,
              currentDate: [],
              currentTime: []
            }, {
              bubbles: true,
              composed: true
            })
          }
        } else {
          this.triggerEvent('updateCardData', {
            id: info.id,
            currentDate: [],
            currentTime: []
          }, {
            bubbles: true,
            composed: true
          })
        }
      } else if (info.defaultType === DefaultType.RealTime) {
        const time = dayjs()
        const json = this.getDateAndTime(time)
        this.triggerEvent('updateCardData', {
          id: info.id,
          currentDate: json.currentDate,
          currentTime: json.currentTime
        }, {
          bubbles: true,
          composed: true
        })
      } else if (info.defaultType === DefaultType.Custom) {
        // 不用赋值
      }
    },
    getDateAndTime(dateTime: Dayjs) {
      const info = this.properties.info
      const year = dateTime.year();   
      const month = String(dateTime.month() + 1).padStart(2, '0')
      const day = String(dateTime.date()).padStart(2, '0')
      const hour = String(dateTime.hour()).padStart(2, '0')
      const minute = String(dateTime.minute()).padStart(2, '0')

      let currentDate: any = []
      let currentTime: any = []
      if (info.timeType === TimeType.DateTime) {
        currentDate = [year, month, day]
        currentTime = [hour, minute]
      } else if (info.timeType === TimeType.Date) {
        currentDate = [year, month, day]
        currentTime = []
      } else if (info.timeType === TimeType.Time) {
        currentDate = []
        currentTime = [hour, minute]
      } else {
        currentDate = []
        currentTime = []
      }


      return {
        currentDate,
        currentTime
      }
    },
    getTimeTextForValValue(text: string) {
      text = text.replace(/[^0-9\-\/\:\s年月日时分]/g, '')
      // 对'2015年02月3日14时14分'格式进行转换
      text = text.replace('年', '-').replace('月', '-').replace('日', ' ').replace('时', ':').replace('分', '')
      text = text.trim()
      return dayjs(text)
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
    }
  }
})