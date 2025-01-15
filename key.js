const fs = require('fs');

const KEYBOARD_TodayTomorrow = {
    reply_markup: JSON.stringify({
        "keyboard": [
            [{ "text": "Сегодня" },],
            [{ "text": "Завтра" },],
        ],
        "resize_keyboard": true,
        "one_time_keyboard": true,
    })
};


function autoGroups() {
    let file = fs.readFileSync("../CalendarJSON/CalendarJSON.json", { encoding: 'utf8' })
    let JN = JSON.parse(file)

    let arrGroup = Object.keys(JN)

    let keyB = {
        "inline_keyboard": [

        ]
    };


    let coc = 3
    let caunt = -1
    arrGroup.forEach(el => {
        if (el != '') {
            if (coc === 3) {
                coc = 1
                caunt += 1
                keyB.inline_keyboard.push([])
            }

            keyB.inline_keyboard[caunt].push({ "text": el, 'callback_data': '3849, ' + el })

            coc += 1
        }
    })


    keyB = {
        reply_markup: `{"inline_keyboard":${JSON.stringify(keyB.inline_keyboard)}}`

    }

    return keyB
}



module.exports = {autoGroups, KEYBOARD_TodayTomorrow}