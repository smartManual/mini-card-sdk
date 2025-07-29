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
    baseUrl: {
      type: String,
      value: ''
    }
  },
  data: {
    style: ''
  },
  lifetimes: {
    attached() {
      const info = this.properties.info
      this.setData({
        style: `
          background-color: ${info.bgColor};
          border-radius: ${info.borderRadius}px;
          border: 1px solid ${info.borderColor};
          left: ${info.x}%;
          top: ${info.y}px;
          width: ${info.width}%;
          height: ${info.height}px;
          zIndex: ${info.zIndex};
        `
      })
    }
  },
  observers: {
    varInfo(varInfo: any) {
      const info = this.properties.info
      this.updateHtmlContent(varInfo, info.html)
    }
  },
  methods: {
    onTap() {
      const info = this.properties.info
      const {
        linkMode, linkUrl, intentionName, standardWord
      } = info
      if (['InsideApp', 'OutsideApp'].includes(linkMode)) {
        this.triggerEvent('richTextClick', {
          id: info.id,
          type: info.type,
          linkMode,
          linkUrl
        }, {
          bubbles: true,
          composed: true
        })
      } else if (linkMode === 'Intention') {
        this.triggerEvent('richTextClick', {
          id: info.id,
          type: info.type,
          linkMode,
          intentionName
        }, {
          bubbles: true,
          composed: true
        })
      } else if (linkMode === 'Entity') {
        this.triggerEvent('richTextClick', {
          id: info.id,
          type: info.type,
          linkMode,
          standardWord
        }, {
          bubbles: true,
          composed: true
        })
      }
    },
    updateHtmlContent(varInfo: any, htmlContent: string) {
      // 为style添加max-width
      htmlContent = this.addMaxWidthToStyle(htmlContent)
      // 为src添加前缀
      htmlContent = this.processSrc(htmlContent)

      // 进行变量替换
      for (const key in varInfo) {
        const regex = new RegExp(`<span\\s+data-w-e-type="var"[^>]*data-id="${key}"[^>]*>([^<]+)<\/span>`)
        htmlContent = htmlContent.replace(regex, varInfo[key])
      }

      console.error('htmlContent:', htmlContent)

      this.setData({
        htmlContent
      })
    },
    addMaxWidthToStyle(htmlContent: string) {
      const maxWidth = '100%'
      htmlContent = htmlContent.replace(/(<img\s+[^>]*?style=)(["'])([^"']*)\2|(<img\s+(?!style=)[^>]*>)/gi, function (match: any, p1: any, p2: any, p3: any, p4: any) {
        if (p1) {
          // 已有style属性
          if (p3.includes('max-width')) {
            // 替换现有的max-width
            return p1 + p2 + p3.replace(/max-width\s*:\s*[^;]+/i, `max-width:${maxWidth}`) + p2
          } else {
            // 添加max-width到现有样式
            return p1 + p2 + p3 + `max-width:${maxWidth}` + p2
          }
        } else {
          // 没有style属性
          return p4.replace('>', ` style="max-width:${maxWidth}">`)
        }
      })

      // htmlContent = htmlContent.replace(/(<video\s+[^>]*?style=)(["'])([^"']*)\2|(<video\s+(?!style=)[^>]*>)/gi, function(match: any, p1: any, p2: any, p3: any, p4: any) {
      //   if (p1) {
      //     // 已有style属性
      //     if (p3.includes('max-width')) {
      //       // 替换现有的max-width
      //       return p1 + p2 + p3.replace(/max-width\s*:\s*[^;]+/i, `max-width:${maxWidth}`) + p2;
      //     } else {
      //       // 添加max-width到现有样式
      //       return p1 + p2 + p3 + `max-width:${maxWidth}` + p2;
      //     }
      //   } else {
      //     // 没有style属性
      //     return p4.replace('>', ` style="border: 1px solid red;max-width:${maxWidth}">`);
      //   }
      // })

      return htmlContent
    },
    processSrc(htmlContent: string) {
      htmlContent = htmlContent.replace(/<img\s+src="(?!http)([^"]*)"/gi, `<img src="${this.properties.baseUrl}$1"`)

      // htmlContent = htmlContent.replace(/<source\s+src="(?!http)([^"]*)"/gi, `<source src="${this.properties.baseUrl}$1"`)
      return htmlContent
    }
  }
})
