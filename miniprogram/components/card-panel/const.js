"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeType = exports.ComponentType = exports.ColorType = void 0;
exports.ColorType = {
    /**
     * 纯色
     */
    Pure: 'pure',
    /**
     * 渐变色
     */
    Gradient: 'gradient'
};
var ComponentType;
(function (ComponentType) {
    /**
     * 文本组件
     */
    ComponentType["Text"] = "Text";
    /**
     * 富文本组件
     */
    ComponentType["RichText"] = "RichText";
    /**
     * 形状组件
     */
    ComponentType["Shap"] = "Shap";
    /**
     * 按钮组件
     */
    ComponentType["Button"] = "Button";
    /**
     * 上传组件
     */
    ComponentType["Upload"] = "Upload";
    /**
     * 图片组件
     */
    ComponentType["Image"] = "Image";
    /**
     * 轮播组件
     */
    ComponentType["Carousel"] = "Carousel";
    /**
     * 表格组件
     */
    ComponentType["Table"] = "Table";
    /**
     * 勾选组件
     */
    ComponentType["CheckBox"] = "CheckBox";
    /**
     * 输入框组件
     */
    ComponentType["Input"] = "Input";
    /**
     * 时间选择组件
     */
    ComponentType["TimePicker"] = "TimePicker";
    /**
     * 视频组件
     */
    ComponentType["Video"] = "Video";
})(ComponentType || (exports.ComponentType = ComponentType = {}));
var TimeType;
(function (TimeType) {
    /**
     * 日期时间类型
     */
    TimeType["DateTime"] = "DateTime";
    /**
     * 日期类型
     */
    TimeType["Date"] = "Date";
    /**
     * 时间类型
     */
    TimeType["Time"] = "Time";
})(TimeType || (exports.TimeType = TimeType = {}));
