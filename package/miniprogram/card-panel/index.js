"use strict";
Component({
    properties: {
        cardData: {
            type: Array,
            value: []
        },
        varInfo: {
            type: Object,
            value: {}
        },
        limitCardHeight: {
            type: Boolean,
            value: false
        },
        maxHeight: {
            type: Number,
            value: 300
        },
        baseUrl: {
            type: String,
            value: ''
        }
    },
    data: {
        style: ''
    },
    observers: {
        'cardData': function (cardData) {
            const maxHeight = this.getMaxHeight(cardData);
            if (this.properties.limitCardHeight) {
                this.setData({
                    style: `
            height: ${Math.min(maxHeight, this.properties.maxHeight)}px;
          `
                });
            }
            else {
                this.setData({
                    style: `
            height: ${maxHeight}px;
          `
                });
            }
        }
    },
    methods: {
        getMaxHeight(cardData) {
            let maxHeight = 0;
            for (let i = 0, j = cardData.length; i < j; i++) {
                const item = cardData[i];
                const height = Number(item.y) + Number(item.height);
                if (height > maxHeight) {
                    maxHeight = height;
                }
            }
            return maxHeight + 2;
        }
    }
});
