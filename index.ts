require("dotenv").config();
import TelegramBot from "node-telegram-bot-api";
import cron from "node-cron";
const message = process.env["MESSAGE"] as string;
const token = process.env["TELEGRAM_TOKEN"] as string;
import NeoWs from "./app/services/neoWs";

const bot = new TelegramBot(token, {
  polling: true,
});

// AGENDA AS MENSAGEM DIARIAS, SE HOUVER
cron.schedule("* 0-11 * * *", async () => {
  const details = await new NeoWs().getTodayDetails();
  const crons = await new NeoWs().getCrons();
  if (details.length > 0) {
    JSON.parse(JSON.stringify(crons, null, 2)).forEach(async (chat: any) => {
      details.forEach((data) =>
        bot.sendMessage(chat.chat_id, data, { parse_mode: "Markdown" })
      );
    });
  }
});

bot.on("text", async (msg) => {
  const chat_id = msg.chat.id;
  if (msg?.text?.toLowerCase() === message.toLowerCase()) {
    const details = await new NeoWs().getTodayDetails();
    if (details.length === 0)
      return bot.sendMessage(
        chat_id,
        "*Não! Nós não iremos morrer hoje! 😄 *",
        {
          parse_mode: "Markdown",
        }
      );
    await bot.sendMessage(chat_id, "*Sim! O fim está proximo 😢*", {
      parse_mode: "Markdown",
    });
    details.forEach((data) =>
      bot.sendMessage(chat_id, data, { parse_mode: "Markdown" })
    );
  }
  if (msg?.text === "Me alertar sempre") {
    const result = await new NeoWs().createCron(chat_id);
    if (result)
      return await bot.sendMessage(
        chat_id,
        "*OK!* Vamos alertar sempre que tiver um asteroide aqui perto! 🥰",
        {
          parse_mode: "Markdown",
        }
      );
    await bot.sendMessage(
      chat_id,
      "*Ops!* Não foi possivel agendar o envio automático de alertas! 🥺",
      {
        parse_mode: "Markdown",
      }
    );
  }

  if (msg?.text === "Cancelar alertas") {
    const result = await new NeoWs().cancelCrons(chat_id);
    if (result)
      return await bot.sendMessage(
        chat_id,
        "*OK!* O alerta automático de asteroides foi cancelado! 😔",
        {
          parse_mode: "Markdown",
        }
      );
    await bot.sendMessage(
      chat_id,
      "*Ops!* Não foi possível cancelar o envios automático ☹",
      {
        parse_mode: "Markdown",
      }
    );
  }
});
