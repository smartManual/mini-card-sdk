"use strict";
Component({
    properties: {
        info: {
            type: Object,
            value: {}
        },
        baseUrl: {
            type: String,
            value: ''
        }
    },
    data: {
        style: '',
        videoUrl: ''
    },
    lifetimes: {
        attached() {
            const info = this.properties.info;
            let url = this.completeVideoUrl(info.videoUrl, this.properties.baseUrl);
            this.setData({
                videoUrl: url,
                style: `
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
        completeVideoUrl(videoUrl, domain) {
            if (!/^https?:\/\//i.test(videoUrl) && videoUrl.startsWith('/')) {
                return domain.replace(/\/+$/, '') + videoUrl;
            }
            return videoUrl;
        }
    }
});
