/**
 * Wechaty - WeChat Bot SDK for Personal Account, Powered by TypeScript, Docker, and 💖
 *  - https://github.com/chatie/wechaty
 */
const { Wechaty, Friendship, UrlLink } = require('wechaty')

function onScan (qrcode, status) {
  require('qrcode-terminal').generate(qrcode, { small: true })  // show qrcode on console

  const qrcodeImageUrl = [
    'https://api.qrserver.com/v1/create-qr-code/?data=',
    encodeURIComponent(qrcode),
  ].join('')

  console.log(qrcodeImageUrl)
}

function onLogin (user) {
  console.log(`${user} login`)
}

function onLogout(user) {
  console.log(`${user} logout`)
}
async function onFriendShip (friendship) {
  let logMsg
  const fileHelper = bot.Contact.load('filehelper')

  try {
    logMsg = 'received `friend` event from ' + friendship.contact().name()
    await fileHelper.say(logMsg)
    console.log(logMsg)

    switch (friendship.type()) {
      /**
       *
       * 1. New Friend Request
       *
       * when request is set, we can get verify message from `request.hello`,
       * and accept this request by `request.accept()`
       */
      case Friendship.Type.Receive:
        if (friendship.hello() !== '') {
          logMsg = 'accepted automatically because verify messsage is "ding"'
          console.log('before accept')
          await friendship.accept()
          console.log('after accept')

        } else {
          logMsg = 'not auto accepted, because verify message is: ' + friendship.hello()
        }
        break

        /**
         *
         * 2. Friend Ship Confirmed
         *
         */
      case Friendship.Type.Confirm:
        logMsg = 'friend ship confirmed with ' + friendship.contact().name()
        break
    }
  } catch (e) {
    logMsg = e.message
  }
}
function waitingJob(callback, time) {
  setTimeout(callback , time)
}
function randomTime() {
  return 1000 * (Math.random() * 10 + 3);
}
async function onMessage (message) {
  const contact = message.from()
  const content = message.text()
  const room = message.room()
  if (room) {
    console.log(`Room: ${room.topic()} Contact: ${contact.name()} Content: ${content}`)
  } else {
    console.log(`Contact: ${contact.name()} Content: ${content}`)
    if (message.self()) {
      return
    } else if (/你好/.test(content)) {
      waitingJob(() => message.say('hi '+ contact.name() +',请问有什么需要帮助的吗，或者告诉我你是哪个公众号的粉丝呢？'), randomTime())
    } else if (/限免/.test(content)) {
      waitingJob(() => message.say('hi '+ contact.name() +',请告诉我需要的服务：\n\"账号\"——有偿使用共享账号服务\n\"合作\"——推广软广硬广等商务合作\n\"外包\"——如果你有互联网外包项目（网站、App、小程序、公众号、聊天机器人）需要我的帮助\n\"创投\"——如果你正在创业，或者你在找正在创业的人，欢迎来这里勾搭\n\"福利\"——感谢你一直以来对我们的支持，这里我不时会发放福利给大家，一点心意不成敬意\n\"\"'), randomTime())
    } else if (/合作/.test(content)) {
      waitingJob(() => message.say('公众号数据情况可以通过西瓜数据网站进行了解，正所谓只有双赢的合作才是可持续发展的，我们提供优质的价格，希望你提供优质的服务，而非为广告而广告。目前广告价格500——2000，展示24小时，视广告质量而定（越优质越便宜～），请在这里提供广告素材，我们会及时进行审核～'), randomTime())
    } else if (/账号/.test(content)) {
      waitingJob(() => message.say('在这里转账9元给我，进入会员售后服务群，我会在24小时内联系你，为你提供账号服务。如果想了解更多信息，可以输入“列表”获取账号可下载的应用列表。'), randomTime())
      let keyroom = await bot.Room.find({ topic: '限免速递 会员售前群' })
      if (await keyroom.has(contact)) {
        setTimeout(() => {
          message.say('我已经添加你到我们的相关微信群了哦，如果你已付费，我会在24小时内联系你')
        }, 1000 * 10 * (Math.random() * 0.3 + 0.1))
      } else {
        await keyroom.add(contact)
        await keyroom.say('欢迎新朋友！',contact)
      }
    } else if (/外包/.test(content)) {
      let keyroom = await bot.Room.find({ topic: '限免速递 外包预备群' })
      if (await keyroom.has(contact)) {
        setTimeout(() => {
          message.say('我已经添加你到我们的相关交流群了哦，回到聊天列表仔细找找呢。')
        }, 1000 * 10 * (Math.random() * 0.3 + 0.1))
      } else {
        await keyroom.add(contact)
        await keyroom.say('欢迎新朋友，麻烦你提供一下项目需求文档给我们进行一个价格评估，如需咨询，可付费100元咨询我们的项目经理@哲别！',contact)
      }
    } else if (/创投/.test(content)) {
      let keyroom = await bot.Room.find({ topic: '限免速递 创投预备群' })
      if (await keyroom.has(contact)) {
        setTimeout(() => {
          message.say('我已经添加你到我们的相关微信群了哦，回到聊天列表仔细找找呢。')
        }, 1000 * 10 * (Math.random() * 0.3 + 0.1))
      } else {
        await keyroom.add(contact)
        await keyroom.say('欢迎新朋友！',contact)
      }
    } else if (/UI/.test(content)) {
      let keyroom = await bot.Room.find({ topic: 'UI设计交流精英' })
      if (await keyroom.has(contact)) {
        setTimeout(() => {
          message.say('我已经添加你到我们的相关微信群了哦，回到聊天列表仔细找找呢。')
        }, 1000 * 10 * (Math.random() * 0.3 + 0.1))
      } else {
        await keyroom.add(contact)
        await keyroom.say('欢迎新朋友！',contact)
      }
    } else if (/福利/.test(content)) {
      let keyroom = await bot.Room.find({ topic: '限免速递 粉丝福利群' })
      if (await keyroom.has(contact)) {
        setTimeout(() => {
          message.say('我已经添加你到我们的相关微信群了哦，回到聊天列表仔细找找呢。')
        }, 1000 * 10 * (Math.random() * 0.3 + 0.1))
      } else {
        await keyroom.add(contact)
        await keyroom.say('欢迎新朋友！',contact)
      }
    } else {
      // message.say('雨林正忙，等他再次打开手机时我会提醒他及时回复您；如果你有急事，也可以转账9.9元唤起他的手机铃声。————来自三星青春版手机忙碌模式');
    } 
  }
}

const bot = new Wechaty({profile: 'wechatyName'})

bot.on('friendship',  onFriendShip)
bot.on('scan',    onScan)
bot.on('login',   onLogin)
bot.on('logout',  onLogout)
bot.on('message', onMessage)

bot.start()
.then(() => console.log('Starter Bot Started.'))
.catch(e => console.error(e))
