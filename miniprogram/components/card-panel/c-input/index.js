"use strict";
Component({
    properties: {
        info: {
            type: Object,
            value: {}
        }
    },
    data: {
        text: '',
        style: '',
        inputStyle: ''
    },
    lifetimes: {
        attached() {
            const info = this.properties.info;
            this.setData({
                text: info.text
            });
            const border = info.borderType === 'default' ? `1px solid #d9d9d9` : `${info.borderWidth}px solid ${info.borderColor}`;
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
            });
        }
    },
    methods: {
        onInput(e) {
            this.triggerEvent('updateCardData', {
                id: this.properties.info.id,
                text: e.detail.value
            }, {
                bubbles: true,
                composed: true
            });
        }
    }
});
