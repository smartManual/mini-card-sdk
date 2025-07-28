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
        style: `
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
    onCheckboxChange(e: any) {
      const item = e.currentTarget.dataset.option
      const optionList = this.properties.info.optionList
      const index = optionList.findIndex((obj: any) => obj.id === item.id)
      if (index !== -1) {
        optionList[index].checked = e.detail.checked
      }

      this.triggerEvent('updateCardData', {
        id: this.properties.info.id,
        optionList
      }, {
        bubbles: true,
        composed: true
      })
    },
    onRadioChange(e: any) {
      const item = e.currentTarget.dataset.option
      const optionList = this.properties.info.optionList

      optionList.forEach((obj: any) => {
        if (obj.id === item.id) {
          obj.checked = e.detail.checked
        } else {
          obj.checked = false
        }
      })

      this.triggerEvent('updateCardData', {
        id: this.properties.info.id,
        optionList
      }, {
        bubbles: true,
        composed: true
      })
    },
    onLabelClick(e: any) {
      const item = e.currentTarget.dataset.option
      if (item.linkMode) {
        this.linkClick(item)
      } else {
        const info = this.properties.info
        const { linkMode, linkUrl, intentionName, standardWord } = info
        if (['InsideApp', 'OutsideApp'].includes(linkMode)) {
          this.triggerEvent('checkboxClick', {
            id: info.id,
            type: info.type,
            linkMode,
            linkUrl
          }, {
            bubbles: true,
            composed: true
          })
        } else if (linkMode === 'Intention') {
          this.triggerEvent('checkboxClick', {
            id: info.id,
            type: info.type,
            linkMode,
            intentionName
          }, {
            bubbles: true,
            composed: true
          })
        } else if (linkMode === 'Entity') {
          this.triggerEvent('checkboxClick', {
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
      const { linkMode, linkUrl, intentionName, standardWord } = item
      if (['InsideApp', 'OutsideApp'].includes(linkMode)) {
        this.triggerEvent('checkboxClick', {
          id: info.id,
          type: info.type,
          linkMode,
          linkUrl
        }, {
          bubbles: true,
          composed: true
        })
      } else if (linkMode === 'Intention') {
        this.triggerEvent('checkboxClick', {
          id: info.id,
          type: info.type,
          linkMode,
          intentionName
        }, {
          bubbles: true,
          composed: true
        })
      } else if (linkMode === 'Entity') {
        this.triggerEvent('checkboxClick', {
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