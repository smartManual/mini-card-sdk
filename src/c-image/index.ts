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
        style:
          `background: url(${info.imageUrl}) center center no-repeat;
          border-radius: ${info.borderRadius}px;
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
      const {
        linkMode, linkUrl, intentionName, standardWord
      } = info
      if (['InsideApp', 'OutsideApp'].includes(linkMode)) {
        this.triggerEvent('imageClick', {
          id: info.id,
          type: info.type,
          linkMode,
          linkUrl
        }, {
          bubbles: true,
          composed: true
        })
      } else if (linkMode === 'Intention') {
        this.triggerEvent('imageClick', {
          id: info.id,
          type: info.type,
          linkMode,
          intentionName
        }, {
          bubbles: true,
          composed: true
        })
      } else if (linkMode === 'Entity') {
        this.triggerEvent('imageClick', {
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
