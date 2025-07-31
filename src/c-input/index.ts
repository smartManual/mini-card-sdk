import { isEmpty } from '@zero-org/utils'

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
    inputStyle: ''
  },
  lifetimes: {
    attached() {
      const info = this.properties.info

      const text = info.textNodes.map((obj: any) => {
        return this.getUrl(obj.children)
      }).join('')

      this.triggerEvent('updateCardData', {
        id: info.id,
        text
      }, {
        bubbles: true,
        composed: true
      })

      const border = info.borderType === 'default' ? `1px solid #d9d9d9` : `${info.borderWidth}px solid ${info.borderColor}`
      this.setData({
        style: `
          left: ${info.x}%;
          top: ${info.y}px;
          width: ${info.width}%;
          height: ${info.height}px;
          zIndex: ${info.zIndex};
        `,
        inputStyle: `
          font-size: ${info.fontSize}px;
          color: ${info.color};
          font-weight: ${info.fontWeight};
          font-style: ${info.fontStyle};
          text-decoration: ${info.textDecoration};
          text-align: ${info.textAlign};
          border-radius: ${info.borderRadius}px;
          border: ${border};
        `
      })
    }
  },
  methods: {
    getUrl(children: any[]) {
      return children.map((item: any) => {
        if (item.type === 'mention') {
          const info: any = item.info
          const json: any = this.properties.varInfo
          const key = info[info.length - 1]
          if (isEmpty(json[key])) {
            return `@${item.value}`
          } else {
            return json[key]
          }
        } else if (!item.type) {
          return item.text.trim()
        }
      }).join('')
    },
    onInput(e: any) {
      this.triggerEvent('updateCardData', {
        id: this.properties.info.id,
        text: e.detail.value
      }, {
        bubbles: true,
        composed: true
      })
    }
  }
})