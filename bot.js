const { default: makeWASocket, useMultiFileAuthState } = require('@whiskeysockets/baileys')

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState('auth')
    const sock = makeWASocket({ auth: state })
    sock.ev.on('creds.update', saveCreds)

    console.log("✅ البوت الشامل اشتغل بكل الأسماء")

    sock.ev.on('messages.upsert', async (m) => {
        const msg = m.messages[0]
        if (!msg.message || msg.key.fromMe || msg.key.remoteJid.includes('@g.us')) return

        const jid = msg.key.remoteJid
        const pushName = msg.pushName || "يا غالي"
        const text = msg.message.conversation || msg.message.extendedTextMessage?.text || ""
        const name = pushName.toLowerCase()

        console.log(`📩 من [${pushName}]: ${text}`)
        let reply = ""

        // 1- الحبايب - رومانسي
        if (name.includes("حياتي") || name.includes("my baby") || name.includes("حبيبه") || name.includes("غرام") || name.includes("كريم 800")) {
            reply = `يا روح قلبي يا ${pushName} ❤️ وحشتيني أوي والله، عاملة ايه دلوقتي؟`
        }
        // 2- الأم والعائلة - احترام
        else if (name.includes("امي") || name.includes("البيت") || name.includes("خالتي") || name.includes("رنيا اخت") || name.includes("كريم ابن خالتي") || name.includes("الحج شحاته") || name.includes("شرين")) {
            reply = `حاضر يا ${pushName} يا حبيبتي ❤️ عنيا ليكي، تأمريني بحاجة؟`
        }
        // 3- الشغل - المهندسين والدكاترة والمحاسب - رسمي
        else if (name.includes("مهندس") || name.includes("دكتور") || name.includes("محاسب") || name.includes("بشواي") || name.includes("أبو عبدالله") || name.includes("abdalaziz") || name.includes("احمد طلعت") || name.includes("محمد دهب") || name.includes("عيادات")) {
            reply = `أهلا وسهلا يا باشمهندس ${pushName}، تمام يا فندم تحت أمرك، قولّي حضرتك محتاج ايه وانا اخلصه حالا`
        }
        // 4- الصحاب المقربين - هزار وصحوبية
        else if (name.includes("bebo") || name.includes("ادهم") || name.includes("كوكو") || name.includes("يوسف ربيع") || name.includes("محمد شعبان") || name.includes("معاذ") || name.includes("عبدو الاسواني") || name.includes("عبد الرحمن") || name.includes("شعبان مواقع") || name.includes("دارك") || name.includes("حسين") || name.includes("مصطفي جاري") || name.includes("محمد جاري")) {
            reply = `يااا ${pushName} يا غالي 😂 عامل ايه يا وحش فينك كده ليك وحشة والله`
        }
        // 5- ناس محترمة - أبو زيد - عبد الوهاب
        else if (name.includes("أبو زيد") || name.includes("عبد الوهاب") || name.includes("هبة") || name.includes("اشرف") || name.includes("حسام") || name.includes("محمود فكري") || name.includes("محمود وراق")) {
            reply = `حبيبي يا أستاذ ${pushName} عامل ايه يا غالي، منور والله`
        }
        // 6- أي حد تاني - عام
        else {
            reply = `أهلا يا ${pushName} يا غالي، زي الفل والله معاك اهو، محتاج ايه؟`
        }

        await sock.sendMessage(jid, { text: reply })
        console.log(`🤖 رد على ${pushName}: ${reply}`)
    })
}
startBot()
