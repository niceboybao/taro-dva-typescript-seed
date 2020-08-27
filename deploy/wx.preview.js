const { projectName, version, desc, projectCi } = require('./wx.index');
const ci = require('miniprogram-ci');

console.log('------开始预览------');

(async () => {
  try {
    const previewResult = await ci.preview({
      project: projectCi,
      desc,
      setting: {
        es6: true
      },
      qrcodeFormat: 'image',
      qrcodeOutputDest: process.cwd() + '/deploy/preview_destination.jpg'
      // pagePath: 'pages/index/index', // 预览页面
      // searchQuery: 'a=1&b=2',  // 预览参数 [注意!]这里的`&`字符在命令行中应写成转义字符`\&`
    });
    console.log('------预览成功------');
    console.log(previewResult);
  } catch (error) {
    console.log('------预览失败------');
    console.error(error);
  } finally {
    console.log('------预览完成------');
  }
})();
