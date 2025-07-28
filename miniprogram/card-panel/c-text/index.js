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
        style: ''
    },
    lifetimes: {
        attached() {
            const info = this.properties.info;
            this.setData({
                text: info.text
            });
            this.setData({
                style: `color: ${info.color}; 
                font-size: ${info.fontSize}px;
                font-weight: ${info.fontWeight};
                font-style: ${info.fontStyle};
                text-decoration: ${info.textDecoration};
                text-align: ${info.textAlign};
                text-align-last: ${info.textAlign};
                left: ${info.x}%;
                top: ${info.y}px;
                width: ${info.width}%;
                height: ${info.height}px;
                zIndex: ${info.zIndex};
              `
            });
        }
    },
    methods: {
        onTap() {
            const info = this.properties.info;
            const { linkMode, linkUrl, intentionName, standardWord } = info;
            if (['InsideApp', 'OutsideApp'].includes(linkMode)) {
                this.triggerEvent('textClick', {
                    id: info.id,
                    type: info.type,
                    linkMode,
                    linkUrl
                }, {
                    bubbles: true,
                    composed: true
                });
            }
            else if (linkMode === 'Intention') {
                this.triggerEvent('textClick', {
                    id: info.id,
                    type: info.type,
                    linkMode,
                    intentionName
                }, {
                    bubbles: true,
                    composed: true
                });
            }
            else if (linkMode === 'Entity') {
                this.triggerEvent('textClick', {
                    id: info.id,
                    type: info.type,
                    linkMode,
                    standardWord
                }, {
                    bubbles: true,
                    composed: true
                });
            }
        }
    }
});
