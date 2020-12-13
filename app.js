// if(process.env.NODE_ENV !== "production"){
//   require('dotenv').config();

//require('dotenv').config();
const express = require("express");
//
const { Expo } = require('expo-server-sdk')
const app = express();
//
const expo = new Expo()

const port = process.env.PORT || 3000;
const router = require("./routers/router");
const cors = require("cors");
const errorHandler = require("./middlewares/errorHandler");

app.use(cors());
//
let savedPushTokens = []
const handlePushTokens = ({ title, body }) => {
    let notifications = []
    for (let pushToken of savedPushTokens) {
        if (!Expo.isExpoPushToken(pushToken)) {
            console.log(`Push token${pushToken} is not valid Expo push token`);
            continue;
        }
        notifications.push({
            to: pushToken,
            sound: "default",
            title: title,
            body: body,
            data: { body }
        })
    }

    let chuncks = expo.chunkPushNotifications(notifications)

    (async()=> { 
        for (let chunck of chuncks) { 
            try { 
                let receipts = await expo.sendPushNotificationsAsync(chunck)
                console.log(receipts);
            } catch (err) { 
                console.log(err);
            }
        }
    })();
}

const saveToken = token => { 
    console.log(token, savedPushTokens)
    const exists = savedPushTokens.find(el => el === token)
    if (!exists) { 
        savedPushTokens.push(token)
    }
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", router);
app.use(errorHandler);


app.get('/', (req, res) => { 
    res.send('Push Notification Server Running')
})

app.post('/token', (req, res) => { 
    saveToken(req.body.token.value)
    console.log(`Received push token, ${req.body.token.value}`)
    res.send(`Received push token, ${req.body.token.value}`)
})

app.post('/message', (req, res) => { 
    handlePushTokens(req.body)
    console.log(`Received message, with title: ${req.body.title}`);
    res.send(`Received message, with title: ${req.body.title}`)
})



// Ganti username sama password di config DB aja, sisany biarin samaan
// Kalau mau sambil coba run di postman, run server pake "npm run dev" aja
// Buat test run "npm run test <nama file test>" aja biar ga ke run semua

// Selama Testing & Develop ini Jangan di Uncomment ya Gaes!
// // Gunakan Saat Production Saja!
// app.listen(port, () => {
//   console.log(`app listen on port ${port}`);
// });

module.exports = app;
