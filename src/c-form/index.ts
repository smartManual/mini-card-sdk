import { isEmpty, getVal, parseJson } from '@zero-org/utils'
import { ColorType } from '../const'

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
    style: '',
    dataList: []
  },
  lifetimes: {
    attached() {
      const info = this.properties.info

      //
      const cardVarInfo = this.properties.varInfo
      const dataVar: any[] = info.dataVar
      const key = dataVar[dataVar.length - 1]
      const val = cardVarInfo[key]
      let array = parseJson(val, [])
      if (!Array.isArray(array)) {
        array = []
      }

      const dataList = array.map((obj: any, index: number) => {
        const list = this.getDataList(info.optionList, obj)
        return {
          list,
          wrapStyle: this.getWrapStyle(index)
        }
      })

      this.setData({
        dataList
      })

      const bgColor = info.bgColorType === ColorType.Pure ? info.bgColor : info.bgGradientColor
      const border = `${info.borderWidth}px solid ${info.borderColor}`
      this.setData({
        style: `
          background: ${bgColor};
          border: ${border};
          border-radius: ${info.borderRadius}px;
          color: ${info.color};
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
    onTap(e: any) {
      const info = this.properties.info
      // 获取传递的 item 对象
      const index = e.currentTarget.dataset.index
      const optionItem = info.optionList[index]

      const {
        linkMode, intentionName, standardWord, linkNodes
      } = optionItem
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
    },
    getWrapStyle(index: number) {
      const info = this.properties.info
      const border = `${info.itemBorderWidth}px solid ${info.itemBorderColor}`
      const padding = `${info.itemPaddingTop}px ${info.itemPaddingRight}px ${info.itemPaddingBottom}px ${info.itemPaddingLeft}px`
      if (index === 0) {
        return `border: ${border};padding: ${padding}`
      } else {
        return `border-right: ${border};border-bottom: ${border};border-left: ${border};padding: ${padding}`
      }
    },
    getDataList(optionList: any[], obj: any) {
      return optionList.map((item: any, index: number) => {
        if (item.type === 'text') {
          return {
            type: item.type,
            width: `${item.width}%`,
            label: item.label,
            content: this.transformContent(item.content, obj)
          }
        } else if (item.type === 'button') {
          return {
            type: item.type,
            width: `${item.width}%`,
            text: item.text,
            btnStyle: this.getBtnStyle(item)
          }
        }
      })
    },
    transformContent(content: string, item: any) {
      content = content.replace(/#([a-z0-9_]+)#/g, (match: string, p1: string) => {
        const val = getVal(item, p1, '')
        if (!isEmpty(val)) {
          return val
        } else {
          return match
        }
      })
      return content
    },
    getBtnStyle(obj: any) {
      const bgColor = obj.bgColorType === ColorType.Pure ? obj.bgColor : obj.bgGradientColor
      const border = obj.borderType === 'default' ? `1px solid #3D5CF4` : `${obj.borderWidth}px solid ${obj.borderColor}`

      return `
        height: ${obj.height}px;
        background: ${bgColor};
        border-radius: ${obj.borderRadius}px;
        color: ${obj.color};
        font-size: ${obj.fontSize}px;
        letter-spacing: ${obj.letterSpacing}px;
        font-family: ${obj.fontFamily};
        font-weight: ${obj.fontWeight};
        font-style: ${obj.fontStyle};
        text-decoration: ${obj.textDecoration};
        justify-content: ${obj.textAlign};
        border: ${border};
        margin-top: ${this.properties.info.buttonMarginTop}px
      `
    }
  }
})
