"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const const_1 = require("../const");
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
        style: ''
    },
    lifetimes: {
        attached() {
            const info = this.properties.info;
            this.setData({
                text: info.text
            });
            const bgColor = info.bgColorType === const_1.ColorType.Pure ? info.bgColor : info.bgGradientColor;
            const border = info.borderType === 'default' ? `1px solid #3D5CF4` : `${info.borderWidth}px solid ${info.borderColor}`;
            this.setData({
                style: `background: ${bgColor};
                border-radius: ${info.borderRadius}px;
                color: ${info.color};
                font-size: ${info.fontSize}px;
                letter-spacing: ${info.letterSpacing}px;
                font-weight: ${info.fontWeight};
                font-style: ${info.fontStyle};
                text-decoration: ${info.textDecoration};
                justify-content: ${info.textAlign};
                border: ${border};
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
        isEmpty(obj) {
            if (!obj) {
                return true;
            }
            if (Array.isArray(obj) && obj.length === 0) {
                return true;
            }
            return false;
        },
        onTap() {
            const info = this.properties.info;
            const { linkCheck } = info;
            if (!this.isEmpty(linkCheck)) {
                // 判断联动项是否有必须值
                const flag = this.allChecked(linkCheck, this.properties.cardData);
                if (!flag) {
                    this.triggerEvent('btnUnchecked', {
                        id: info.id,
                        type: info.type
                    }, {
                        bubbles: true,
                        composed: true
                    });
                    return;
                }
                else {
                    this.updateVarInfo(linkCheck, this.properties.cardData);
                    this.triggerEvent('btnChecked', {
                        id: info.id,
                        type: info.type
                    }, {
                        bubbles: true,
                        composed: true
                    });
                }
            }
            // 触发交互事件
            this.linkClick();
        },
        allChecked(linkCheckIds, dataList) {
            const linkList = dataList.filter((item) => linkCheckIds.includes(item.id));
            for (let i = 0, j = linkList.length; i < j; i++) {
                const item = linkList[i];
                if (item.type === const_1.ComponentType.Input) {
                    if (this.isEmpty(item.text)) {
                        return false;
                    }
                }
                else if (item.type === const_1.ComponentType.TimePicker) {
                    if (item.timeType === const_1.TimeType.DateTime) {
                        if (this.isEmpty(item.currentDate) || this.isEmpty(item.currentTime)) {
                            return false;
                        }
                    }
                    else if (item.timeType === const_1.TimeType.Date) {
                        if (this.isEmpty(item.currentDate)) {
                            return false;
                        }
                    }
                    else if (item.timeType === const_1.TimeType.Time) {
                        if (this.isEmpty(item.currentTime)) {
                            return false;
                        }
                    }
                }
                else if (item.type === const_1.ComponentType.CheckBox) {
                    if (!this.singleChecked(item)) {
                        return;
                    }
                }
            }
            return true;
        },
        singleChecked(checkBox) {
            if (checkBox) {
                const optionList = checkBox.optionList;
                const noCheck = optionList.every(obj => !obj.checked);
                if (noCheck) {
                    return false;
                }
            }
            return true;
        },
        updateVarInfo(linkCheckIds, dataList) {
            const linkList = dataList.filter((item) => linkCheckIds.includes(item.id));
            for (let i = 0, j = linkList.length; i < j; i++) {
                const item = linkList[i];
                if (item.type === const_1.ComponentType.Input) {
                    const bindedVar = item.bindedVar;
                    if (!this.isEmpty(bindedVar)) {
                        this.triggerEvent('updateVarInfo', {
                            type: const_1.ComponentType.Input,
                            bindedVar,
                            bindedVarCode: item.bindedVarCode,
                            text: item.text
                        }, {
                            bubbles: true,
                            composed: true
                        });
                    }
                }
                else if (item.type === const_1.ComponentType.TimePicker) {
                    const bindedVar = item.bindedVar;
                    if (!this.isEmpty(bindedVar)) {
                        this.triggerEvent('updateVarInfo', {
                            type: const_1.ComponentType.TimePicker,
                            bindedVar,
                            bindedVarCode: item.bindedVarCode,
                            text: this.formatTime(item.timeType, item.currentDate, item.currentTime)
                        }, {
                            bubbles: true,
                            composed: true
                        });
                    }
                }
            }
        },
        formatTime(timeType, currentDate, currentTime) {
            if (timeType === const_1.TimeType.DateTime) {
                return `${currentDate.join('-')} ${currentTime.join(':')}`;
            }
            else if (timeType === const_1.TimeType.Date) {
                return `${currentDate.join('-')}`;
            }
            else if (timeType === const_1.TimeType.Time) {
                return `${currentTime.join(':')}`;
            }
            else {
                return '';
            }
        },
        linkClick() {
            const info = this.properties.info;
            const { linkMode, intentionName, standardWord, linkNodes } = info;
            if (['InsideApp', 'OutsideApp'].includes(linkMode)) {
                let linkUrl = info.linkUrl;
                if (!this.isEmpty(linkNodes)) {
                    linkUrl = linkNodes.map((obj) => {
                        return this.getUrl(obj.children);
                    }).join('');
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
                });
            }
            else if (linkMode === 'Intention') {
                this.triggerEvent('btnClick', {
                    id: info.id,
                    type: info.type,
                    linkMode,
                    intentionName,
                    btnText: info.text
                }, {
                    bubbles: true,
                    composed: true
                });
            }
            else if (linkMode === 'Entity') {
                this.triggerEvent('btnClick', {
                    id: info.id,
                    type: info.type,
                    linkMode,
                    standardWord,
                    btnText: info.text
                }, {
                    bubbles: true,
                    composed: true
                });
            }
        },
        getUrl(children) {
            return children.map((item) => {
                if (item.type === 'mention') {
                    const info = item.info;
                    const varInfo = this.properties.varInfo;
                    return varInfo[info[info.length - 1]];
                }
                else if (!item.type) {
                    return item.text.trim();
                }
            }).join('');
        }
    }
});
