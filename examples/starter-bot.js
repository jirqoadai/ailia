/**
 * Wechaty - WeChat Bot SDK for Personal Account, Powered by TypeScript, Docker, and 💖
 *  - https://github.com/chatie/wechaty
 */
const { Wechaty, Friendship } = require('wechaty')

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

async function onMessage (message) {
  const contact = message.from()
  const content = message.text()
  const room = message.room()
  console.log(JSON.stringify(contact));
  console.log(JSON.stringify(message));
  if (room) {
    console.log(`Room: ${room.topic()} Contact: ${contact.name()} Content: ${content}`)
  } else if (contact.name() === '霖'){
    if (/你好/.test(content)) {
      message.say('请选择你需要的服务：\n”进群“——进入会员群；\n"会员"——支付39元进入会员群，享受会员服务；\n');
    } else if (/限免/.test(content)) {
      const urlLink = new UrlLink ({
        description : 'WeChat Bot SDK for Individual Account, Powered by TypeScript, Docker, and Love',
        thumbnailUrl: 'https://avatars0.githubusercontent.com/u/25162437?s=200&v=4',
        title       : 'Welcome to Wechaty',
        url         : 'https://github.com/chatie/wechaty',
      })
      await message.say(urlLink)
    } else if (/检查/.test(content)) {
      const contactList = await bot.Contact.findAll();
      contactList.forEach((list) => {
        console.log(list.name())
        if (list.friend()) {
          console.log('<<<<<<<<<');
        }
      })
    }
  } else {
    if (message.self()) {
      return
    }
    console.log(`Contact: ${contact.name()} Content: ${content}`)
    if (/合作/.test(content)) {
      let keyroom = await bot.Room.find({ topic: '限免速递 合作预备群' })
      if (await keyroom.has(contact)) {
        setTimeout(() => {
          message.say('我已经添加你到我们的合作预备群了哦，回到聊天列表仔细找找呢。')
        }, 1000 * 10 * (Math.random() * 0.3 + 0.1))
      } else {
        await keyroom.add(contact)
        await keyroom.say('欢迎新朋友！',contact)
      }
    } else if (/会员/.test(content)) {
      message.say('当前会员价格39元，转账39元后进入会员售后服务群。如果想了解会员的权限，可以输入“售前”获取应用列表。');
      let keyroom = await bot.Room.find({ topic: '限免速递 会员售前群' })
      if (await keyroom.has(contact)) {
        setTimeout(() => {
          message.say('我已经添加你到我们的会员售前群了哦，回到聊天列表仔细找找呢。')
        }, 1000 * 10 * (Math.random() * 0.3 + 0.1))
      } else {
        await keyroom.add(contact)
        await keyroom.say('欢迎新朋友！',contact)
      }
    } else if (/外包/.test(content)) {
      let keyroom = await bot.Room.find({ topic: '限免速递 外包预备群' })
      if (await keyroom.has(contact)) {
        setTimeout(() => {
          message.say('我已经添加你到我们的外包交流群了哦，回到聊天列表仔细找找呢。')
        }, 1000 * 10 * (Math.random() * 0.3 + 0.1))
      } else {
        await keyroom.add(contact)
        await keyroom.say('欢迎新朋友！',contact)
      }
    } else if (/创投/.test(content)) {
      let keyroom = await bot.Room.find({ topic: '限免速递 创投预备群' })
      if (await keyroom.has(contact)) {
        setTimeout(() => {
          message.say('我已经添加你到我们的创投预备群了哦，回到聊天列表仔细找找呢。')
        }, 1000 * 10 * (Math.random() * 0.3 + 0.1))
      } else {
        await keyroom.add(contact)
        await keyroom.say('欢迎新朋友！',contact)
      }
    } else if (/UI/.test(content)) {
      let keyroom = await bot.Room.find({ topic: '限免速递 UI预备群' })
      if (await keyroom.has(contact)) {
        setTimeout(() => {
          message.say('我已经添加你到我们的会员售前群了哦，回到聊天列表仔细找找呢。')
        }, 1000 * 10 * (Math.random() * 0.3 + 0.1))
      } else {
        await keyroom.add(contact)
        await keyroom.say('欢迎新朋友！',contact)
      }
    } else if (/技术/.test(content)) {
      let keyroom = await bot.Room.find({ topic: '限免速递 技术预备群' })
      if (await keyroom.has(contact)) {
        setTimeout(() => {
          message.say('我已经添加你到我们的技术交流群了哦，回到聊天列表仔细找找呢。')
        }, 1000 * 10 * (Math.random() * 0.3 + 0.1))
      } else {
        await keyroom.add(contact)
        await keyroom.say('欢迎新朋友！',contact)
      }
    } else if (/福利/.test(content)) {
      let keyroom = await bot.Room.find({ topic: '限免速递 粉丝福利群' })
      if (await keyroom.has(contact)) {
        setTimeout(() => {
          message.say('我已经添加你到我们的粉丝福利群了哦，回到聊天列表仔细找找呢。')
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
