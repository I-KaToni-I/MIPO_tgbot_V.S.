
const fs = require('fs');
const TelegramApi = require("node-telegram-bot-api")
process.env.NTBA_FIX_350 = true;

// токен тест бота
// const token = JSON.parse(fs.readFileSync("../keys.json", { encoding: 'utf8' }))['tgBotTEST']


const token = JSON.parse(fs.readFileSync("../keys.json", { encoding: 'utf8' }))['tgBotS']

const bot = new TelegramApi(token, { polling: true })



const {saveUser, setGroup, stressSave} = require("./user");
const {getDay} = require("./brains");
const {autoGroups, KEYBOARD_TodayTomorrow} = require("./key")



async function respondText(){
    await bot.on('message', msg => {
    
        let text = msg.text.toLowerCase().replace(/ +/g, ' ').trim();
        let chat_id = msg.chat.id;
        let botText
        console.log(text)
        console.log(chat_id);
    
        try {
            if (text === "/start" || text === "/about") {
                saveUser(msg)

                botText = "⚡️Этот бот открывает вам доступ к быстрому получению расписанию для своей группы. \n\n🧩 Чтобы иметь возможность запрашивать расписание, вам необходимо просто указать свою группу при помощи команды /setgroup \n🌅 После чего вы сможете запросить расписание на завтра / сегодня \n\n🔄 Чтобы изменить свою группу используйте туже команду /setgroup \n\n🎯Чтобы узнать расписание на определенный день, воспользуйтесь командой /getday \nПример использования: /getday 04.04.2024"
                
                return bot.sendMessage(chat_id, botText);
            }

            if (text === "/setgroup"){
                saveUser(msg)
          
                bot.sendMessage(chat_id, "Выберите группу", autoGroups());
            }

            if (text === "сегодня" || text === "завтра"){
                stressSave(chat_id)
                bot.sendMessage(chat_id, getDay(chat_id, text), { parse_mode: 'HTML' }, KEYBOARD_TodayTomorrow)
            }

            if (text.split(' ')[0] === "/getday"){
                stressSave(chat_id)
                bot.sendMessage(chat_id, getDay(chat_id, text.split(' ')[1]), { parse_mode: 'HTML' }, KEYBOARD_TodayTomorrow)
            }

            
            
        } catch (error) {
            console.log(error);
        }
    
    })
}

async function respondButton(){
    await bot.on('callback_query', msg => {
        let dataBtn = msg.data;
        let chat_id = msg.message.chat.id;


        if (dataBtn.split(', ')[0] === '3849'){
            setGroup(chat_id, dataBtn.split(', ')[1])
      
            bot.sendMessage(chat_id, "Данные сохранены", KEYBOARD_TodayTomorrow);
        }
        
        
    })
}


respondText()
respondButton()