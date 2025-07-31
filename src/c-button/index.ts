import { isEmpty } from '@zero-org/utils'
import {ColorType, ComponentType, TimeType} from '../const'

Component({
  properties: {
    info: {
      type: Object,
      value: {}
    },
    cardData: {
      type: Array,
      value: []
    },
    varInfo: {
      type: Object,
      value: {}
    },
  },
  data: {
    text: '',
    style: ''
  },
  lifetimes: {
    attached() {
      const info = this.properties.info
      this.setData({
        text: info.text
      })

      const bgColor = info.bgColorType === ColorType.Pure ? info.bgColor : info.bgGradientColor
      const border = info.borderType === 'default' ? '1px solid #3D5CF4' : `${info.borderWidth}px solid ${info.borderColor}`
      this.setData({
        style: `
          background: ${bgColor};
          border-radius: ${info.borderRadius}px;
          color: ${info.color};
          font-size: ${info.fontSize}px;
          letter-spacing: ${info.letterSpacing}px;
          font-weight: ${info.fontWeight};
          font-style: ${info.fontStyle};
          text-decoration: ${info.textDecoration};
          justify-content: ${info.textAlign};
          border: ${border};
          left: ${info.x}%;
          top: ${info.y}px;
          width: ${info.width}%;
          height: ${info.height}px;
          zIndex: ${info.zIndex};
        `
      })
    }
  },
  methods: {
    onTap() {
      const info = this.properties.info
      const {linkCheck} = info
      if (!isEmpty(linkCheck)) {
        // 判断联动项是否有必须值
        const flag = this.allChecked(linkCheck, this.properties.cardData)
        if (!flag) {
          this.triggerEvent('btnUnchecked', {
            id: info.id,
            type: info.type
          }, {
            bubbles: true,
            composed: true
          })
          return
        } else {
          this.updateVarInfo(linkCheck, this.properties.cardData)
          this.triggerEvent('btnChecked', {
            id: info.id,
            type: info.type
          }, {
            bubbles: true,
            composed: true
          })
        }
      }

      // 触发交互事件
      this.linkClick()
    },
    allChecked(linkCheckIds: string[], dataList: any[]) {
      const linkList: any[] = dataList.filter((item: any) => linkCheckIds.includes(item.id))
      for (let i = 0, j = linkList.length; i < j; i++) {
        const item = linkList[i]
        if (item.type === ComponentType.Input) {
          if (isEmpty(item.text)) {
            return false
          }
        } else if (item.type === ComponentType.TimePicker) {
          if (item.timeType === TimeType.DateTime) {
            if (isEmpty(item.currentDate) || isEmpty(item.currentTime)) {
              return false
            }
          } else if (item.timeType === TimeType.Date) {
            if (isEmpty(item.currentDate)) {
              return false
            }
          } else if (item.timeType === TimeType.Time) {
            if (isEmpty(item.currentTime)) {
              return false
            }
          }
        } else if (item.type === ComponentType.CheckBox) {
          if (!this.singleChecked(item)) {
            return false
          }
        }
      }

      return true
    },
    singleChecked(checkBox: any) {
      if (checkBox) {
        const optionList: any[] = checkBox.optionList
        const noCheck = optionList.every(obj => !obj.checked)
        if (noCheck) {
          return false
        }
      }

      return true
    },
    updateVarInfo(linkCheckIds: string[], dataList: any[]) {
      const array: any = []
      const linkList: any[] = dataList.filter((item: any) => linkCheckIds.includes(item.id))
      for (let i = 0, j = linkList.length; i < j; i++) {
        const item = linkList[i]
        if (item.type === ComponentType.Input) {
          const bindedVar = item.bindedVar
          if (!isEmpty(bindedVar)) {
            const bindedVarCode = item.bindedVarCode
            const varCode = bindedVarCode[bindedVarCode.length - 1]
            array.push({
              // 变量code
              variableCode: varCode,
              //变量值
              value: item.text, 
              //global 全局 slot 槽值
              variableType: 'slot'
            })
          }
        } else if (item.type === ComponentType.TimePicker) {
          const bindedVar = item.bindedVar
          if (!isEmpty(bindedVar)) {
            const bindedVarCode = item.bindedVarCode
            const varCode = bindedVarCode[bindedVarCode.length - 1]
            array.push({
              // 变量code
              variableCode: varCode,
              //变量值
              value: this.formatTime(item.timeType, item.currentDate, item.currentTime), 
              //global 全局 slot 槽值
              variableType: 'slot'
            })
          }
        }
      }

      if (!isEmpty(array)) {
        this.triggerEvent('updateVarInfo', {
          type: ComponentType.TimePicker,
          variables: array
        }, {
          bubbles: true,
          composed: true
        })
      }
    },
    formatTime(timeType: TimeType, currentDate: any[], currentTime: any[]) {
      if (timeType === TimeType.DateTime) {
        return `${currentDate.join('-')} ${currentTime.join(':')}`
      } else if (timeType === TimeType.Date) {
        return `${currentDate.join('-')}`
      } else if (timeType === TimeType.Time) {
        return `${currentTime.join(':')}`
      } else {
        return ''
      }
    },
    linkClick() {
      const info = this.properties.info
      const {
        linkMode, intentionName, standardWord, linkNodes
      } = info
      if (['InsideApp', 'OutsideApp'].includes(linkMode)) {
        let linkUrl = info.linkUrl
        if (!isEmpty(linkNodes)) {
          linkUrl = linkNodes.map((obj: any) => this.getUrl(obj.children)).join('')
        }
        this.triggerEvent('btnClick', {
          id: info.id,
          type: info.type,
          linkMode,
          linkUrl,
          btnText: info.text
        }, {
          bubbles: true,
          composed: true
        })
      } else if (linkMode === 'Intention') {
        this.triggerEvent('btnClick', {
          id: info.id,
          type: info.type,
          linkMode,
          intentionName,
          btnText: info.text
        }, {
          bubbles: true,
          composed: true
        })
      } else if (linkMode === 'Entity') {
        this.triggerEvent('btnClick', {
          id: info.id,
          type: info.type,
          linkMode,
          standardWord,
          btnText: info.text
        }, {
          bubbles: true,
          composed: true
        })
      }
    },
    getUrl(children: any[]) {
      return children.map((item: any) => {
        if (item.type === 'mention') {
          const info: any = item.info
          const varInfo = this.properties.varInfo
          return varInfo[info[info.length - 1]]
        } else if (!item.type) {
          return item.text.trim()
        }
      }).join('')
    }
  }
})
