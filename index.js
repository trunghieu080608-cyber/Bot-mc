const mineflayer = require('mineflayer')

const options = {
  host: 'Warvn.aternos.me:43541, // Dùng Dyn IP để kết nối ổn định nhất từ Railway
  port: 25565,                 // Cổng riêng của server Aternos
  username: 'BotAFK_1214',     // Tên bot
  version: '1.21.4'            // Phiên bản Minecraft
}

function createBot() {
  console.log('Đang kết nối tới server...')
  const bot = mineflayer.createBot(options)

  bot.on('spawn', () => {
    console.log(`Bot ${bot.username} đã vào server thành công!`)

    // Đợi 2 giây rồi gõ lệnh chuyển spectator
    setTimeout(() => {
      bot.chat('/gamemode spectator')
      console.log('Đã gửi lệnh chuyển sang chế độ khán giả.')
    }, 2000)
  })

  // Tự động vào lại khi bị kick hoặc đứt kết nối
  bot.on('end', (reason) => {
    console.log(`Bot bị ngắt kết nối (${reason}). Đang thử vào lại sau 5 giây...`)
    setTimeout(createBot, 5000)
  })

  bot.on('error', (err) => {
    console.log('Lỗi kết nối:', err.message)
  })
}

createBot()
