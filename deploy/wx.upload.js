const { projectName, version, desc, projectCi, commit } = require('./wx.index');
const ci = require('miniprogram-ci');

console.log('------开始上传------');

(async () => {
  try {
    const getlogInfo = await commit();
    console.log(getlogInfo);
    const uploadResult = await ci.upload({
      project: projectCi,
      version,
      desc: `${desc} 开发分支：${getlogInfo.branch} 描述：${getlogInfo.message} 作者：${getlogInfo.author}`,
      robot: 3, // 本地部署机器人为 3,Jenkins部署机器人为 1
      setting: {
        minify: true
      }
    });
    console.log('------上传成功------');
    console.log(uploadResult);
  } catch (error) {
    console.log('------上传失败------');
    console.error(error);
  } finally {
    console.log('------上传完成------');
  }
})();
