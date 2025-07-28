import { ColorType } from '../const'

Component({
  properties: {
    info: {
      type: Object,
      value: {}
    }
  },
  data: {
    shap: '',
    text: '',
    containerStyle: '',
    style: ''
  },
  lifetimes: {
    attached() {
      const info = this.properties.info
      this.setData({
        shap: info.shape === 'circle' ? 'circle-wrap' : ''
      })
      this.setData({
        text: info.text
      })
      // 背景色
      const bgColor = info.bgColorType === ColorType.Pure ? info.bgColor : info.bgGradientColor
      // 边框
      const border = info.borderType === 'default' ? `${info.borderWidth}px solid ${info.borderColor}` : `${info.borderWidth}px solid ${info.borderColor}`
      // 边框圆角
      const borderRadius = info.shape === 'circle' ? '50%' : `${info.borderRadius}px`;
      this.setData({
        containerStyle:`
          border-radius: ${borderRadius};
          background: ${bgColor};
          border: ${border};
          left: ${info.x}%;
          top: ${info.y}px;
          width: ${info.width}%;
          height: ${info.height}px;
          zIndex: ${info.zIndex};
        `
      })

      this.setData({
        style: `
          color: ${info.color}; 
          font-size: ${info.fontSize}px;
          font-weight: ${info.fontWeight};
          font-style: ${info.fontStyle};
          text-decoration: ${info.textDecoration};
          text-align: ${info.textAlign};
          text-align-last: ${info.textAlign};
          align-content: ${info.alignContent};
          letter-spacing: ${info.letterSpacing}px;
          line-height: ${info.lineHeight}px;
        `
      })
    }
  },
  methods: {
    onTap() {
      const info = this.properties.info
      const { linkMode, linkUrl, intentionName, standardWord } = info
      if (['InsideApp', 'OutsideApp'].includes(linkMode)) {
        this.triggerEvent('shapClick', {
          id: info.id,
          type: info.type,
          linkMode,
          linkUrl
        }, {
          bubbles: true,
          composed: true
        })
      } else if (linkMode === 'Intention') {
        this.triggerEvent('shapClick', {
          id: info.id,
          type: info.type,
          linkMode,
          intentionName
        }, {
          bubbles: true,
          composed: true
        })
      } else if (linkMode === 'Entity') {
        this.triggerEvent('shapClick', {
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