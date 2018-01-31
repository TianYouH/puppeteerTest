const puppeteer = require('puppeteer');
const { timeout } = require('./tools');

var ifram = null;

(async () => {
  // 初始化浏览器
  const browser = await puppeteer.launch({ 
    executablePath: "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
    devtools: true
  });
  // 新建页面
  const page = await browser.newPage();
  // 打开页面到
  await page.goto('http://42.236.61.216:85');

  // 找到元素并输入
  await page.type('[name=username]','admin', { delay: 20 })
  await page.type('[id=password_old]','<密码。。。>', { delay: 20 })
  // 执行浏览器作用域事件
  await page.evaluate(function () {
    this.sub();
  })
  // 等到导航结束
  await page.waitForNavigation({ waitUntil: "networkidle2" });
  // 前往下面域名
  await page.goto('http://42.236.61.216:85/cms/web/gateway/gateway.action?menuId=14')
  // 遍历当前框架及其子框架，找到需要框架并返回
  dumpFrameTree(page.mainFrame(), '', 'http://42.236.61.216:85/cms/web/module/resource/deviceInfo/page-deviceInfoAction-onDeviceInfoBo.action');
  console.log('测试', ifram)
  // 点击其他框架按钮
  const hr = await ifram.$('#device-discover-btn')
  hr.click()
  console.log(hr)

})();

function dumpFrameTree(frame, indent, tag) {
  console.log(indent + frame.url());
  let url = frame.url();
    if (url == tag) {
        ifram = frame;
      return 
    }
  for (let child of frame.childFrames()){
    dumpFrameTree(child, indent + '  ', tag);
  }
}

// 谷歌64