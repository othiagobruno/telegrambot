# TelegramBot

Um Bot para o Telegram, com back-end escrito em node.js, que recebe do usuário as seguinte perguntas:

## Como usar
* para trazer a lista com todos os asteroides que causam um potencial risco ao planeta terra:
```bash
Algum asteroide oferece perigo ao planeta Terra na data de hoje?
```
* Para receber atualizações diárias de potenciais riscos no dia atual:
```bash
Me alertar sempre
```

* Para cancelar as atualizações:
```bash
Cancelar alertas
```

## Rodar aplicação local

Após clonar o projeto:
```bash
$ yarn
```
configure as variáveis de ambiente (.env):
```bash
TELEGRAM_TOKEN=    # Api do bot do telegra
NEO_TOKEN=         # Api da neoWs
MESSAGE=           # Mensagem padrão: (Algum asteroide oferece perigo ao planeta Terra na data de hoje?)
```

```bash
$ npx sequelize db:migrate
```


## O porquê:
  * apisauce - para reuisições na api do neoWs, facilitando a comunicação
  * nodemon - pra monitorar as mudanças no código e agilizar no processo de desenvolvimento
  * sequelize - uma orm para cominicação com o banco de dados de uma forma menos verbosa e mais escalavel 
  * sqlite3 - como são apenas dados simpes, o sqlite3 daria conta
  * moment - para formatar datas de forma mais agradável
  * dotenv - acessar variaveis de ambiente
  * node-cron - gerenciar tarefas cron, onde posso realizar o envio de mensagem automático
