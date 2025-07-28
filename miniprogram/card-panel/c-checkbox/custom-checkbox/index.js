"use strict";
Component({
    properties: {
        // 是否选中
        checked: {
            type: Boolean,
            value: false
        },
        // 标签文本
        label: {
            type: String,
            value: ''
        },
        checkedColor: {
            type: String,
            value: '#3D5CF4'
        },
        uncheckedColor: {
            type: String,
            value: '#fff'
        },
        checkedTextColor: {
            type: String,
            value: 'rgba(0, 0, 0, 0.88)'
        },
        uncheckedTextColor: {
            type: String,
            value: 'rgba(0, 0, 0, 0.88)'
        },
        size: {
            type: Number,
            value: 14
        }
    },
    data: {
        checkedClass: '',
        style: '',
        iconStyle: '',
        textStyle: ''
    },
    lifetimes: {
        attached() {
            const { checked, checkedColor, uncheckedColor, checkedTextColor, uncheckedTextColor, size } = this.properties;
            const backgroundColor = checked ? checkedColor : uncheckedColor;
            const borderColor = checked ? checkedColor : '#dcdfe6';
            const top = `${(size - 16) / 4 + 5}px`;
            const width = `${size - 2}px`;
            const height = `${size - 2}px`;
            this.setData({
                checkedClass: checked ? 'custom-checkbox-checked' : '',
                style: `font-size:${size}px;`,
                iconStyle: `background-color: ${backgroundColor};
                   border-color: ${borderColor};
                   top: ${top};
                   width: ${width};
                   height: ${height};
                  `,
                textStyle: `color: ${checked ? checkedTextColor : uncheckedTextColor};`
            });
        }
    },
    observers: {
        'checked': function (newVal) {
            const { checkedColor, uncheckedColor, checkedTextColor, uncheckedTextColor, size } = this.properties;
            const backgroundColor = newVal ? checkedColor : uncheckedColor;
            const borderColor = newVal ? checkedColor : '#dcdfe6';
            const top = `${(size - 16) / 4 + 5}px`;
            const width = `${size - 2}px`;
            const height = `${size - 2}px`;
            this.setData({
                checkedClass: newVal ? 'custom-checkbox-checked' : '',
                iconStyle: `background-color: ${backgroundColor};
                   border-color: ${borderColor};
                   top: ${top};
                   width: ${width};
                   height: ${height};
                  `,
                textStyle: `color: ${newVal ? checkedTextColor : uncheckedTextColor};`
            });
        }
    },
    methods: {
        handleTap() {
            this.triggerEvent('change', { checked: !this.properties.checked });
        },
        onLabelTap() {
            this.triggerEvent('labelClick');
        }
    }
});
