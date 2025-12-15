import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Send, Zap, Shield, Globe } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4" variant="secondary">
            <Zap className="w-3 h-3 mr-1" />
            v1.0.0
          </Badge>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            🤖 Telegram Bot
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Современный многофункциональный бот с красивым интерфейсом, готовый к деплою на Vercel
          </p>
        </div>

        {/* Status Card */}
        <div className="max-w-4xl mx-auto mb-12">
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                Статус бота
              </CardTitle>
              <CardDescription>Ваш бот готов к работе и ожидает подключения</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">✅ Активен</div>
                  <div className="text-sm text-muted-foreground">API работает</div>
                </div>
                <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">⚡️ Быстро</div>
                  <div className="text-sm text-muted-foreground">Мгновенные ответы</div>
                </div>
                <div className="p-4 rounded-lg bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">🔒 Безопасно</div>
                  <div className="text-sm text-muted-foreground">Защищенное API</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Features Grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Card>
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-2">
                <Send className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <CardTitle>Интерактивные кнопки</CardTitle>
              <CardDescription>Удобное меню с inline-кнопками для быстрой навигации по функциям бота</CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-2">
                <Zap className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <CardTitle>Быстрые команды</CardTitle>
              <CardDescription>
                /start, /help, /stats, /about - полный набор команд для управления ботом
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-2">
                <Shield className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <CardTitle>Безопасность</CardTitle>
              <CardDescription>Webhook API с проверкой подлинности запросов от Telegram</CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mb-2">
                <Globe className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <CardTitle>Готов к деплою</CardTitle>
              <CardDescription>Полная интеграция с Vercel - деплой в один клик</CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Setup Instructions */}
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>📋 Инструкция по установке</CardTitle>
              <CardDescription>Следуйте этим шагам для запуска бота</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-blue-500 text-white text-sm flex items-center justify-center">
                    1
                  </span>
                  Создайте бота в Telegram
                </h3>
                <ul className="list-disc list-inside space-y-1 ml-8 text-muted-foreground">
                  <li>Откройте @BotFather в Telegram</li>
                  <li>Отправьте команду /newbot</li>
                  <li>Придумайте имя и username для бота</li>
                  <li>Сохраните токен бота (формат: 123456:ABC-DEF...)</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-blue-500 text-white text-sm flex items-center justify-center">
                    2
                  </span>
                  Добавьте переменную окружения
                </h3>
                <ul className="list-disc list-inside space-y-1 ml-8 text-muted-foreground">
                  <li>Откройте раздел "Vars" в боковой панели v0</li>
                  <li>Добавьте переменную TELEGRAM_BOT_TOKEN со значением вашего токена</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-blue-500 text-white text-sm flex items-center justify-center">
                    3
                  </span>
                  Деплой на Vercel
                </h3>
                <ul className="list-disc list-inside space-y-1 ml-8 text-muted-foreground">
                  <li>Нажмите кнопку "Publish" в верхнем правом углу v0</li>
                  <li>Дождитесь завершения деплоя</li>
                  <li>Скопируйте URL вашего проекта (например: https://your-bot.vercel.app)</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-blue-500 text-white text-sm flex items-center justify-center">
                    4
                  </span>
                  Настройте webhook
                </h3>
                <div className="ml-8 space-y-2">
                  <p className="text-muted-foreground">
                    Откройте в браузере следующую ссылку (замените YOUR_TOKEN и YOUR_URL):
                  </p>
                  <code className="block p-3 bg-muted rounded-lg text-xs overflow-x-auto">
                    https://api.telegram.org/botYOUR_TOKEN/setWebhook?url=YOUR_URL/api/bot
                  </code>
                  <p className="text-muted-foreground text-sm">
                    Пример:
                    https://api.telegram.org/bot123456:ABC-DEF.../setWebhook?url=https://your-bot.vercel.app/api/bot
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-green-500 text-white text-sm flex items-center justify-center">
                    ✓
                  </span>
                  Готово!
                </h3>
                <p className="ml-8 text-muted-foreground">Найдите вашего бота в Telegram и отправьте команду /start</p>
              </div>

              <div className="pt-4 border-t">
                <Button className="w-full" size="lg" asChild>
                  <a href="https://t.me/botfather" target="_blank" rel="noopener noreferrer">
                    <Send className="w-4 h-4 mr-2" />
                    Открыть @BotFather
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 text-muted-foreground">
          <p>Создано с ❤️ на Next.js 16 и готово к деплою на Vercel</p>
        </div>
      </div>
    </div>
  )
}
