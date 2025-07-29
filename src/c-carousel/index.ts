Component({
  properties: {
    info: {
      type: Object,
      value: {}
    }
  },
  data: {
    style: ''
  },
  lifetimes: {
    attached() {
      const info = this.properties.info
      this.setData({
        style: `border-radius: ${info.borderRadius}px;
              left: ${info.x}%;
              top: ${info.y}px;
              width: ${info.width}%;
              height: ${info.height}px;
              z-index: ${info.zIndex};
              `
      })
    }
  },
  methods: {
    onTap(e: any) {
      // 获取传递的 item 对象
      const item = e.currentTarget.dataset.item
      if (item.linkMode) {
        this.linkClick(item)
      } else {
        const info = this.properties.info
        const {
          linkMode, linkUrl, intentionName, standardWord
        } = info
        if (['InsideApp', 'OutsideApp'].includes(linkMode)) {
          this.triggerEvent('carouselClick', {
            id: info.id,
            type: info.type,
            linkMode,
            linkUrl
          }, {
            bubbles: true,
            composed: true
          })
        } else if (linkMode === 'Intention') {
          this.triggerEvent('carouselClick', {
            id: info.id,
            type: info.type,
            linkMode,
            intentionName
          }, {
            bubbles: true,
            composed: true
          })
        } else if (linkMode === 'Entity') {
          this.triggerEvent('carouselClick', {
            id: info.id,
            type: info.type,
            linkMode,
            standardWord
          }, {
            bubbles: true,
            composed: true
          })
        }
      }
    },
    linkClick(item: any) {
      const info = this.properties.info
      const {
        linkMode, linkUrl, intentionName, standardWord
      } = item
      if (['InsideApp', 'OutsideApp'].includes(linkMode)) {
        this.triggerEvent('carouselClick', {
          id: info.id,
          type: info.type,
          linkMode,
          linkUrl
        }, {
          bubbles: true,
          composed: true
        })
      } else if (linkMode === 'Intention') {
        this.triggerEvent('carouselClick', {
          id: info.id,
          type: info.type,
          linkMode,
          intentionName
        }, {
          bubbles: true,
          composed: true
        })
      } else if (linkMode === 'Entity') {
        this.triggerEvent('carouselClick', {
          id: info.id,
          type: info.type,
          linkMode,
          standardWord
        }, {
          bubbles: true,
          composed: true
        })
      }
    }
  }
})
