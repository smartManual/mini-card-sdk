"use strict";
Component({
    properties: {
        border: {
            type: String,
            value: 'all'
        },
        info: {
            type: Object,
            value: {}
        }
    },
    data: {
        borderClass: '',
        style: '',
        dataList: []
    },
    observers: {
        'border': function (val) {
            this.setData({ borderClass: `border-${val}` });
        }
    },
    lifetimes: {
        attached() {
            const info = this.properties.info;
            const tableData = info.tableData.map((item) => {
                const list = Object.keys(item)
                    // 只取 column 开头的 key
                    .filter(key => key.startsWith('column'))
                    // 按 column1, column2... 排序
                    .sort((a, b) => parseInt(a.replace('column', '')) - parseInt(b.replace('colum', '')))
                    .map(key => {
                    const obj = item[key];
                    obj.style = this.styleJsonToCssString(obj.style);
                    return obj;
                });
                return list;
            });
            this.setData({
                style: `left: ${info.x}%;
               top: ${info.y}px;
               width: ${info.width}%;
               height: ${info.height}px;
               z-index: ${info.zIndex};
              `,
                dataList: tableData
            });
            // this.setData({
            //   dataList: tableData
            // })
        }
    },
    methods: {
        styleJsonToCssString(styleJson) {
            if (!styleJson || typeof styleJson !== 'object') {
                return '';
            }
            let cssString = '';
            for (const key in styleJson) {
                if (styleJson.hasOwnProperty(key)) {
                    // 将驼峰式属性名转换为短横线分隔形式（例如：backgroundColor -> background-color）
                    const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
                    const cssValue = styleJson[key];
                    cssString += `${cssKey}:${cssValue};`;
                }
            }
            return cssString;
        },
        onTap() {
            const info = this.properties.info;
            const { linkMode, linkUrl, intentionName, standardWord } = info;
            if (['InsideApp', 'OutsideApp'].includes(linkMode)) {
                this.triggerEvent('tableClick', {
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
                this.triggerEvent('tableClick', {
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
                this.triggerEvent('tableClick', {
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
