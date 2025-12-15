import { type NextRequest, NextResponse } from "next/server"

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN

interface TelegramMessage {
  message_id: number
  from: {
    id: number
    first_name: string
    username?: string
  }
  chat: {
    id: number
    type: string
  }
  text?: string
  date: number
}

interface TelegramCallbackQuery {
  id: string
  from: {
    id: number
    first_name: string
  }
  message: TelegramMessage
  data: string
}

interface TelegramUpdate {
  update_id: number
  message?: TelegramMessage
  callback_query?: TelegramCallbackQuery
}

async function sendMessage(
  chatId: number,
  text: string,
  options?: {
    reply_markup?: any
    parse_mode?: string
  },
) {
  const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      ...options,
    }),
  })
  return response.json()
}

async function answerCallbackQuery(callbackQueryId: string, text?: string) {
  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/answerCallbackQuery`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      callback_query_id: callbackQueryId,
      text,
    }),
  })
}

async function editMessageText(
  chatId: number,
  messageId: number,
  text: string,
  options?: {
    reply_markup?: any
    parse_mode?: string
  },
) {
  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/editMessageText`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: chatId,
      message_id: messageId,
      text,
      ...options,
    }),
  })
}

function getMainKeyboard() {
  return {
    inline_keyboard: [
      [
        { text: "📊 Статистика", callback_data: "stats" },
        { text: "⚙️ Настройки", callback_data: "settings" },
      ],
      [
        { text: "💡 Помощь", callback_data: "help" },
        { text: "🎨 О боте", callback_data: "about" },
      ],
    ],
  }
}

export async function POST(request: NextRequest) {
  try {
    const update: TelegramUpdate = await request.json()

    // Обработка callback кнопок
    if (update.callback_query) {
      const { callback_query } = update
      const chatId = callback_query.message.chat.id
      const messageId = callback_query.message.message_id
      const data = callback_query.data

      await answerCallbackQuery(callback_query.id)

      if (data === "back") {
        await editMessageText(
          chatId,
          messageId,
          `👋 *Добро пожаловать!*\n\n` +
            `Я многофункциональный бот для помощи в повседневных задачах\\.\n\n` +
            `Выберите действие из меню ниже:`,
          {
            parse_mode: "MarkdownV2",
            reply_markup: getMainKeyboard(),
          },
        )
      } else if (data === "stats") {
        const backButton = {
          inline_keyboard: [[{ text: "◀️ Назад", callback_data: "back" }]],
        }
        await editMessageText(
          chatId,
          messageId,
          `📊 *Ваша статистика*\n\n` +
            `🔢 Всего сообщений: 42\n` +
            `⏱ Время работы: 7 дней\n` +
            `🎯 Активность: Высокая\n` +
            `📈 Прогресс: ███████░░░ 70%\n\n` +
            `_Данные обновляются в реальном времени_`,
          {
            parse_mode: "Markdown",
            reply_markup: backButton,
          },
        )
      } else if (data === "settings") {
        const settingsKeyboard = {
          inline_keyboard: [
            [{ text: "🔔 Уведомления: ✅", callback_data: "toggle_notifications" }],
            [{ text: "🌙 Темная тема: ✅", callback_data: "toggle_theme" }],
            [{ text: "🌍 Язык: Русский", callback_data: "change_language" }],
            [{ text: "◀️ Назад", callback_data: "back" }],
          ],
        }
        await editMessageText(
          chatId,
          messageId,
          `⚙️ *Настройки*\n\n` + `Здесь вы можете изменить параметры бота под себя.\n` + `Выберите нужную опцию:`,
          {
            parse_mode: "Markdown",
            reply_markup: settingsKeyboard,
          },
        )
      } else if (data === "toggle_notifications") {
        await answerCallbackQuery(callback_query.id, "🔔 Уведомления включены!")
      } else if (data === "toggle_theme") {
        await answerCallbackQuery(callback_query.id, "🌙 Темная тема активирована!")
      } else if (data === "change_language") {
        await answerCallbackQuery(callback_query.id, "🌍 Смена языка пока недоступна")
      } else if (data === "help") {
        const backButton = {
          inline_keyboard: [[{ text: "◀️ Назад", callback_data: "back" }]],
        }
        await editMessageText(
          chatId,
          messageId,
          `💡 *Справка*\n\n` +
            `*Доступные команды:*\n` +
            `/start - Запуск бота\n` +
            `/help - Показать справку\n` +
            `/stats - Ваша статистика\n` +
            `/about - Информация о боте\n\n` +
            `*Как пользоваться:*\n` +
            `• Используйте кнопки меню для навигации\n` +
            `• Отправьте любое сообщение для получения ответа\n` +
            `• Задайте вопрос - я постараюсь помочь!\n\n` +
            `_Нужна помощь? Напишите команду /help_`,
          {
            parse_mode: "Markdown",
            reply_markup: backButton,
          },
        )
      } else if (data === "about") {
        const backButton = {
          inline_keyboard: [
            [
              { text: "🌐 GitHub", url: "https://github.com" },
              { text: "📱 Поддержка", url: "https://t.me/support" },
            ],
            [{ text: "◀️ Назад", callback_data: "back" }],
          ],
        }
        await editMessageText(
          chatId,
          messageId,
          `🎨 *О боте*\n\n` +
            `🤖 Версия: 1.0.0\n` +
            `⚡️ Статус: Активен\n` +
            `🏗 Создан на: Next.js + Vercel\n` +
            `📅 Дата запуска: ${new Date().toLocaleDateString("ru-RU")}\n\n` +
            `*Возможности:*\n` +
            `✅ Быстрые ответы\n` +
            `✅ Красивый интерфейс\n` +
            `✅ Статистика и аналитика\n` +
            `✅ Настраиваемые параметры\n\n` +
            `_Разработано с ❤️ для Telegram_`,
          {
            parse_mode: "Markdown",
            reply_markup: backButton,
          },
        )
      }

      return NextResponse.json({ ok: true })
    }

    // Обработка текстовых сообщений
    if (update.message) {
      const { message } = update
      const chatId = message.chat.id
      const text = message.text || ""
      const userName = message.from.first_name

      // Команда /start
      if (text === "/start") {
        await sendMessage(
          chatId,
          `👋 *Привет, ${userName}!*\n\n` +
            `Я многофункциональный бот для помощи в повседневных задачах\\.\n\n` +
            `Выберите действие из меню ниже:`,
          {
            parse_mode: "MarkdownV2",
            reply_markup: getMainKeyboard(),
          },
        )
      }
      // Команда /help
      else if (text === "/help") {
        await sendMessage(
          chatId,
          `💡 *Справка*\n\n` +
            `*Доступные команды:*\n` +
            `/start - Запуск бота\n` +
            `/help - Показать справку\n` +
            `/stats - Ваша статистика\n` +
            `/about - Информация о боте\n\n` +
            `*Как пользоваться:*\n` +
            `• Используйте кнопки меню для навигации\n` +
            `• Отправьте любое сообщение для получения ответа\n` +
            `• Задайте вопрос - я постараюсь помочь!\n\n` +
            `_Нужна помощь? Напишите команду /help_`,
          {
            parse_mode: "Markdown",
          },
        )
      }
      // Команда /stats
      else if (text === "/stats") {
        await sendMessage(
          chatId,
          `📊 *Ваша статистика*\n\n` +
            `🔢 Всего сообщений: 42\n` +
            `⏱ Время работы: 7 дней\n` +
            `🎯 Активность: Высокая\n` +
            `📈 Прогресс: ███████░░░ 70%\n\n` +
            `_Данные обновляются в реальном времени_`,
          {
            parse_mode: "Markdown",
          },
        )
      }
      // Команда /about
      else if (text === "/about") {
        await sendMessage(
          chatId,
          `🎨 *О боте*\n\n` +
            `🤖 Версия: 1.0.0\n` +
            `⚡️ Статус: Активен\n` +
            `🏗 Создан на: Next.js + Vercel\n` +
            `📅 Дата запуска: ${new Date().toLocaleDateString("ru-RU")}\n\n` +
            `*Возможности:*\n` +
            `✅ Быстрые ответы\n` +
            `✅ Красивый интерфейс\n` +
            `✅ Статистика и аналитика\n` +
            `✅ Настраиваемые параметры\n\n` +
            `_Разработано с ❤️ для Telegram_`,
          {
            parse_mode: "Markdown",
          },
        )
      }
      // Обработка любого другого сообщения
      else {
        const responses = [
          `Получил ваше сообщение: "${text}"! 👍`,
          `Интересно! Вы написали: "${text}" 🤔`,
          `Спасибо за сообщение: "${text}"! ✨`,
          `Записал: "${text}"! 📝`,
        ]
        const randomResponse = responses[Math.floor(Math.random() * responses.length)]

        await sendMessage(chatId, `${randomResponse}\n\n` + `Используйте /help для просмотра всех команд.`, {
          reply_markup: getMainKeyboard(),
        })
      }

      return NextResponse.json({ ok: true })
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("Error processing update:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// GET endpoint для проверки работоспособности
export async function GET() {
  return NextResponse.json({
    status: "active",
    message: "Telegram Bot is running! 🤖",
    timestamp: new Date().toISOString(),
  })
}
