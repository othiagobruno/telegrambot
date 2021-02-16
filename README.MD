# TelegramBot

Um Bot para o Telegram, com back-end escrito em node.js, que recebe do usuário as seguinte perguntas:

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

## Como usar

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
