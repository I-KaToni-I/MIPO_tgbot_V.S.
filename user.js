const fs = require('fs');



function saveUser(msg) {
    let file = fs.readFileSync("../SAVES/student.json", { encoding: 'utf8' })
    let JN = JSON.parse(file)
    let chatID = msg.chat.id

    try {
        let first_name = msg.chat.first_name
        let last_name = msg.chat.last_name
        let username = msg.chat.username
        JN[chatID]["first_name"] = first_name
        JN[chatID]["last_name"] = last_name
        JN[chatID]["username"] = username
    } catch (err) {
        try {
            JN[chatID] = {
                "group": JN[chatID]["group"],
                "usageCounter": JN[chatID]["usageCounter"],
                "lastUse": JN[chatID]["lastUse"]
            }
        } catch (err) {
            JN[chatID] = {
                "group": "",
                "usageCounter": 0,
                "lastUse": ""
            }
        }
    }

    fs.writeFileSync("../SAVES/student.json", JSON.stringify(JN))
}



function setGroup(chat_id, group) {
    let file = fs.readFileSync("../SAVES/student.json", { encoding: 'utf8' })
    let JN = JSON.parse(file)

    JN[chat_id]["group"] = group
    fs.writeFileSync("../SAVES/student.json", JSON.stringify(JN))
}



function getInfoUser(chat_id, info) {
    let file = fs.readFileSync("../SAVES/student.json", { encoding: 'utf8' })
    let JN = JSON.parse(file)


    return JN[chat_id][info]
}



function stressSave(ID) {
    let file = fs.readFileSync("../SAVES/student.json", { encoding: 'utf8' })
    let JN = JSON.parse(file)
    if ("usageCounter" in JN[ID]) {
        if (typeof JN[ID]["usageCounter"] == 'string') {
            JN[ID]["usageCounter"] = 1
        } else {
            JN[ID]["usageCounter"] = JN[ID]["usageCounter"] + 1
        }
        JN[ID]["lastUse"] = new Date()
        
    } else {
        JN[ID]["usageCounter"] = 1
        JN[ID]["lastUse"] = new Date()
    }
    fs.writeFileSync("../SAVES/student.json", JSON.stringify(JN))
}



module.exports = {saveUser, setGroup, getInfoUser, stressSave}