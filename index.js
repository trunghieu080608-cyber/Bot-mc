const mineflayer = require('mineflayer')

const options = {
  host: 'Warvn.aternos.me', // Thay bằng IP server của bạn
  port: 43541,               // Cổng server (mặc định là 25565)
  username: 'BotAFK_1214',   // Tên bot
  version: '1.21.4'          // Phiên bản Minecraft
}

function createBot() {
  console.log('Đang kết nối tới server...')
  const bot = mineflayer.createBot(options)

  // Xử lý khi kết nối thành công và xuất hiện trong game
  bot.on('spawn', () => {
    console.log(`Bot ${bot.username} đã vào server thành công!`)

    // Chờ 2 giây sau khi vào server rồi mới gửi lệnh (tránh bị server chặn do gửi quá nhanh)
    setTimeout(() => {
      bot.chat('/gamemode spectator')
      console.log('Đã gửi lệnh chuyển sang chế độ khán giả.')
    }, 2000)
  })

  // Tự động kết nối lại khi bị kick hoặc ngắt kết nối
  bot.on('end', (reason) => {
    console.log(`Bot bị ngắt kết nối (Lý do: ${reason}). Đang thử vào lại sau 5 giây...`)
    setTimeout(createBot, 5000)
  })

  // Bỏ qua lỗi kết nối để không bị văng chương trình
  bot.on('error', (err) => {
    console.log('Lỗi kết nối:', err.message)
  })
}

// Khởi chạy bot
createBot()
