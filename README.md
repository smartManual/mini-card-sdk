# @zero-org/mini-card-sdk

微信小程序卡片模块SDK，提供丰富的卡片组件库，支持动态渲染和灵活布局。

## 简介

`card-panel` 是一个**智能卡片面板容器组件**，能够根据配置数据动态渲染各种类型的子组件，包括文本、图片、按钮、表格、输入框等多种UI元素。该组件采用绝对定位布局，支持自适应高度和高度限制功能。

## 安装

```bash
npm install @zero-org/mini-card-sdk
```

## 快速开始

### 1. 在页面的 json 配置文件中引入组件

```json
{
  "usingComponents": {
    "card-panel": "@zero-org/mini-card-sdk/card-panel/index"
  }
}
```

### 2. 在 wxml 中使用组件

```xml
<card-panel 
  cardData="{{cardData}}" 
  varInfo="{{varInfo}}"
  limitCardHeight="{{true}}"
  maxHeight="{{400}}"
  baseUrl="{{baseUrl}}"
/>
```

### 3. 在 js 中配置数据

```javascript
Page({
  data: {
    cardData: [
      {
        type: 'Text',
        x: 10,
        y: 10,
        width: 200,
        height: 30,
        content: '这是一个文本组件'
      },
      {
        type: 'Button',
        x: 10,
        y: 50,
        width: 100,
        height: 40,
        text: '点击按钮'
      }
    ],
    varInfo: {
      // 变量信息对象
    },
    baseUrl: 'https://your-domain.com'
  }
})
```

## 组件属性

| 属性名 | 类型 | 默认值 | 必填 | 说明 |
|--------|------|--------|------|------|
| cardData | Array | [] | 是 | 卡片数据数组，包含所有子组件的配置信息 |
| varInfo | Object | {} | 否 | 变量信息对象，用于动态数据绑定 |
| limitCardHeight | Boolean | false | 否 | 是否限制卡片面板高度 |
| maxHeight | Number | 300 | 否 | 最大高度限制（单位：px），仅在 limitCardHeight 为 true 时生效 |
| baseUrl | String | '' | 否 | 基础URL，用于图片和视频等资源的完整路径拼接 |

## 支持的子组件类型

card-panel 支持以下类型的子组件：

### 1. 文本组件 (Text)
### 2. 富文本组件 (RichText)
### 3. 按钮组件 (Button)
### 4. 图片组件 (Image)
### 5. 形状组件 (Shap)
### 6. 轮播图组件 (Carousel)
### 7. 表格组件 (Table)
### 8. 勾选组件 (CheckBox)
### 9. 输入框组件 (Input)
### 10. 时间选择器 (TimePicker)
### 11. 视频组件 (Video)



## 支持的事件

card-panel 组件通过事件冒泡机制，将子组件的各种交互事件向上传递给父组件。以下是支持的所有事件类型：

### 1. 文本组件相关事件

#### textClick
**触发时机**：用户点击文本组件时触发
**事件参数**：根据不同的 linkMode，参数结构会有所不同：

**InsideApp 模式**：
```javascript
{
  id: "365aa053-45ff-4c28-a273-5b4eb0f4b23c",
  linkMode: "InsideApp",
  linkUrl: "https://www.baidu.com",
  type: "Text"
}
```

**OutsideApp 模式**：
```javascript
{
  id: "365aa053-45ff-4c28-a273-5b4eb0f4b23c",
  linkMode: "OutsideApp",
  linkUrl: "https://www.baidu.com",
  type: "Text"
}
```

**Intention 模式**：
```javascript
{
  id: "365aa053-45ff-4c28-a273-5b4eb0f4b23c",
  intentionName: "跳转",
  linkMode: "Intention",
  type: "Text"
}
```

**Entity 模式**：
```javascript
{
  id: "365aa053-45ff-4c28-a273-5b4eb0f4b23c",
  linkMode: "Entity",
  standardWord: ["slot", "1940649007788199936"],
  type: "Text"
}
```

#### richTextClick
**触发时机**：用户点击富文本组件时触发
**事件参数**：参数结构与 textClick 相同，type 为 "RichText"

### 2. 图片和媒体组件相关事件

#### imageClick
**触发时机**：用户点击图片组件时触发
**事件参数**：参数结构与 textClick 相同，type 为 "Image"

#### carouselClick
**触发时机**：用户点击轮播图组件时触发
**事件参数**：参数结构与 textClick 相同，type 为 "Carousel"

### 3. 形状和表格组件相关事件

#### shapClick
**触发时机**：用户点击形状组件时触发
**事件参数**：参数结构与 textClick 相同，type 为 "Shap"

#### tableClick
**触发时机**：用户点击表格组件时触发
**事件参数**：参数结构与 textClick 相同，type 为 "Table"

### 4. 按钮相关事件

#### btnClick
**触发时机**：用户点击按钮组件时触发
**事件参数**：根据不同的 linkMode，参数结构会有所不同：

**InsideApp 模式**：
```javascript
{
  id: "365aa053-45ff-4c28-a273-5b4eb0f4b23c",
  linkMode: "InsideApp",
  linkUrl: "https://www.baidu.com",
  type: "Button",
  btnText: "按钮文字"
}
```

**OutsideApp 模式**：
```javascript
{
  id: "365aa053-45ff-4c28-a273-5b4eb0f4b23c",
  linkMode: "OutsideApp",
  linkUrl: "https://www.baidu.com",
  type: "Button",
  btnText: "按钮文字"
}
```

**Intention 模式**：
```javascript
{
  id: "365aa053-45ff-4c28-a273-5b4eb0f4b23c",
  intentionName: "跳转",
  linkMode: "Intention",
  type: "Button",
  btnText: "按钮文字"
}
```

**Entity 模式**：
```javascript
{
  id: "365aa053-45ff-4c28-a273-5b4eb0f4b23c",
  linkMode: "Entity",
  standardWord: ["slot", "1940649007788199936"],
  type: "Button",
  btnText: "按钮文字"
}
```

#### btnChecked
**触发时机**：按钮联动检查通过时触发
**事件参数**：
```javascript
{
  id: 'button-id',    // 按钮组件ID
  type: 'Button'      // 组件类型
}
```

#### btnUnchecked
**触发时机**：按钮联动检查未通过时触发
**事件参数**：
```javascript
{
  id: 'button-id',    // 按钮组件ID
  type: 'Button'      // 组件类型
}
```

#### checkboxClick
**触发时机**：点击勾选组件标签时触发
**事件参数**：根据不同的 linkMode，参数结构会有所不同：

**InsideApp 模式**：
```javascript
{
  id: "365aa053-45ff-4c28-a273-5b4eb0f4b23c",
  linkMode: "InsideApp",
  linkUrl: "https://www.baidu.com",
  type: "CheckBox"
}
```

**OutsideApp 模式**：
```javascript
{
  id: "365aa053-45ff-4c28-a273-5b4eb0f4b23c",
  linkMode: "OutsideApp",
  linkUrl: "https://www.baidu.com",
  type: "CheckBox"
}
```

**Intention 模式**：
```javascript
{
  id: "365aa053-45ff-4c28-a273-5b4eb0f4b23c",
  intentionName: "跳转",
  linkMode: "Intention",
  type: "CheckBox"
}
```

**Entity 模式**：
```javascript
{
  id: "365aa053-45ff-4c28-a273-5b4eb0f4b23c",
  linkMode: "Entity",
  standardWord: ["slot", "1940649007788199936"],
  type: "CheckBox"
}
```

### 5. 卡片数据更新事件

#### updateCardData
**触发时机**：输入框组件或时间组件绑定了变量，对应的按钮组件点击时触发
**card-panel组件对应的updateCardData函数实现**：

```javascript
methods: {
    updateCardData(e: any) {
        const detail = e.detail
        const index = this.data.cardData.findIndex((obj: any) => obj.id === detail.id)
        if (index !== -1) {
            const json = Object.assign({}, this.data.cardData[index], detail)
            this.setData({
                [`cardData[${index}]`]: json
            })
        }
    }
}
```

### 6. 变量更新事件

#### updateVarInfo
**触发时机**：按钮联动检查通过后，更新绑定变量时触发
**事件参数**：

```javascript
[
  {
    // 变量code
    "variableCode": "phone_number",
    // 变量值
    "value": "15256745678"
    // global:全局变量,slot:槽变量
    "variableType": "slot"  
  }
]
```
**注意：小程序中收到该事件后要主动调用websocket接口发送更新变量的相关命令**



## 事件监听示例

```xml
<!-- pages/demo/demo.wxml -->
<card-panel
  cardData="{{cardData}}"
  varInfo="{{varInfo}}"
  baseUrl="{{baseUrl}}"
  bind:textClick="onTextClick"
  bind:richTextClick="onRichTextClick"
  bind:shapClick="onShapClick"
  bind:btnClick="onBtnClick"
  bind:imageClick="onImageClick"
  bind:carouselClick="onCarouselClick"
  bind:tableClick="onTableClick"
  bind:checkboxClick="onCheckboxClick"
  bind:updateCardData="onUpdateCardData"
  bind:btnUnchecked="onBtnUnchecked"
  bind:btnChecked="onBtnChecked"
  bind:updateVarInfo="onUpdateVarInfo"
/>
```


```javascript
// pages/demo/demo.js
Page({
  data: {
    cardData: [
      {
        type: 'Text',
        x: 20,
        y: 20,
        width: 300,
        height: 40,
        content: '欢迎使用卡片面板'
      },
      {
        type: 'Image',
        x: 20,
        y: 80,
        width: 200,
        height: 120,
        src: '/images/demo.jpg'
      },
      {
        type: 'Button',
        x: 240,
        y: 120,
        width: 80,
        height: 40,
        text: '查看详情'
      },
      {
        type: 'Input',
        x: 20,
        y: 220,
        width: 300,
        height: 40,
        placeholder: '请输入您的意见'
      }
    ],
    varInfo: {
      userName: '张三',
      userAge: 25
    },
    baseUrl: 'https://cdn.example.com'
  }
})
```

```xml
<!-- pages/demo/demo.wxml -->
<view class="container">
  <card-panel 
    cardData="{{cardData}}" 
    varInfo="{{varInfo}}"
    limitCardHeight="{{true}}"
    maxHeight="{{500}}"
    baseUrl="{{baseUrl}}"
  />
</view>
```
## 高度自适应机制

card-panel 会**自动计算**所有子组件的最大高度，并设置面板的高度：

- **自适应模式**：`limitCardHeight: false`（默认），面板高度 = 最高子组件的 y + height + 2px

- **限高模式**：`limitCardHeight: true`，面板高度 = Math.min(计算高度, maxHeight)

  

## 最佳实践

### 1. 布局设计建议

- **合理规划坐标**：建议先在设计稿上标注好各组件的位置和尺寸
- **预留间距**：组件之间保持适当间距，避免视觉拥挤
- **响应式考虑**：使用百分比宽度时，注意不同屏幕尺寸的适配效果

### 2. 性能优化

- **控制组件数量**：单个面板建议不超过20个子组件
- **合理使用高度限制**：数据较多时启用`limitCardHeight`
- **图片优化**：使用适当尺寸的图片，避免过大文件影响加载速度

### 3. 数据管理

- **统一数据格式**：建议创建数据模板，确保格式一致性
- **变量命名规范**：varInfo中的变量名使用驼峰命名法
- **数据验证**：在设置cardData前进行必要的数据校验

### 4. 事件处理

- **避免频繁更新**：输入框等交互组件建议使用防抖处理
- **错误处理**：为事件监听函数添加try-catch保护
- **状态同步**：及时更新组件状态，保持数据一致性

## 常见问题

### Q: 组件显示不出来怎么办？
**A**: 检查以下几点：
1. 确认组件的x、y、width、height属性是否正确设置
2. 检查type属性是否为支持的组件类型
3. 确认面板高度是否足够显示组件

### Q: 图片无法显示？
**A**: 可能的原因：
1. 图片路径不正确，检查baseUrl和src的拼接
2. 图片资源不存在或无法访问
3. 小程序域名白名单未配置

### Q: 事件监听无效？
**A**: 检查以下方面：
1. 确认事件名称拼写正确（如bind:btnClick）
2. 检查事件处理函数是否正确定义
3. 确认组件是否支持该事件类型

### Q: 高度计算不准确？
**A**: 可能的解决方案：
1. 检查所有组件的y和height值是否正确
2. 考虑使用limitCardHeight限制最大高度
3. 确认没有组件超出预期范围

### Q: 变量绑定不生效？
**A**: 排查步骤：
1. 检查varInfo对象中是否包含对应变量
2. 确认组件配置中变量名称是否正确
3. 检查变量数据类型是否匹配

## 更新日志

### v1.0.5 (当前版本)
- 支持11种子组件类型
- 完善事件系统，支持多种交互事件
- 优化高度自适应算法
- 增强变量绑定功能

### 未来规划
- 支持更多组件类型
- 增加动画效果支持
- 提供可视化配置工具
- 优化性能和内存占用

## 技术支持

如果在使用过程中遇到问题，可以通过以下方式获取帮助：

1. **查看文档**：仔细阅读本使用说明
2. **检查示例**：参考完整示例代码
3. **调试工具**：使用微信开发者工具进行调试
4. **社区支持**：在相关技术社区提问

## 注意事项

1. **坐标系统**：使用绝对定位，坐标原点在左上角
2. **单位统一**：所有尺寸单位均为px
3. **层级关系**：后面的组件会覆盖前面的组件（如有重叠）
4. **性能优化**：大量组件时建议开启高度限制并设置合理的maxHeight
5. **数据格式**：确保cardData数组中每个对象都包含必要的type、x、y、width、height属性
6. **兼容性**：确保微信小程序基础库版本支持所使用的API
7. **安全性**：对用户输入的数据进行适当的验证和过滤

## 版本信息

**当前版本**：v1.0.5
**发布日期**：2025年
**兼容性**：微信小程序基础库 2.0.0+

## 许可证

MIT License

## 作者

**jjzuo**
专注于微信小程序组件开发

---

*本文档最后更新时间：2025年*





