// if(process.env.NODE_ENV !== "production"){
//   require('dotenv').config();

//require('dotenv').config();
const express = require("express");
// is to handle registering and sending push notifications
const app = express();
//

const port = process.env.PORT || 3000;
const router = require("./routers/router");
const cors = require("cors");
const errorHandler = require("./middlewares/errorHandler");

app.use(cors());
// for storing any tokens that are registered with react native app
// let savedPushTokens = []
// const handlePushTokens = ({ title, body }) => {
//     let notifications = []
//     for (let pushToken of savedPushTokens) {
//         if (!Expo.isExpoPushToken(pushToken)) {
//             console.log(`Push token${pushToken} is not valid Expo push token`);
//             continue;
//         }
//         notifications.push({
//             to: pushToken,
//             sound: "default",
//             title: title,
//             body: body,
//             data: { body }
//         })
//     }

//     let chuncks = expo.chunkPushNotifications(notifications)

//     console.log(chuncks, '<<< chuncks ');

//     (async()=> { 
//         for (let chunck of chuncks) { 
//             console.log(chunck, '<<< chunck');
//             try { 
//                 let receipts = await expo.sendPushNotificationsAsync(chunck)
//                 console.log(receipts);
//             } catch (err) { 
//                 console.log(err);
//             }
//         }
//     })();
// }

// const saveToken = token => { 
//     console.log(token, savedPushTokens)
//     const exists = savedPushTokens.find(el => el === token)
//     if (!exists) { 
//         savedPushTokens.push(token)
//     }
// }

// we need is a handler for sending the push notifications when
// a message received from the react native app, we'll loop over
// all of the tokens that have been saved to the savePushTokens 
// array and create message object for each token. Each message
// object has a title of "Message received"

// const handlePushTokens = (message) => { 
//     let notifications = []
//     for (let pushToken of savedPushTokens) { 
//         if (!Expo.isExpoPushToken(pushToken)) { 
//             console.error(`Push token ${pushToken} is not a valid Expo
//             push token`);
//             continue;
//         }
//         notifications.push({ 
//             to: pushToken, 
//             sound: 'default',
//             title: 'Message received!',
//             body: message,
//             data: {message}
//         })
//     }   

    // once we've an array of messages we can send them to Expo's server, 
    // which in turn will send the push notification to all registered devices
    // we'll send the messages array via the expo server's chunckPushNotifications 
    // and sendPushNotificationsAsync methods, and console.log

    // let chuncks = expo.chunkPushNotifications(notifications)
    // (async () => { 
    //     for (let chunck of chuncks) { 
    //         try { 
    //             expo.sendPushNotificationsAsync(chunck)
    //         } catch (err) { 
    //             console.log(err);
    //         }
    //     }
    // })

    // Now we want expose those functions by creating API endpoints

// }

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", router);
app.use(errorHandler);


// app.get('/', (req, res) => { 
//     res.send('Push Notification Server Running')
// })

// implement the endpoint for saving a push notification token, 
// when a POST request is sent to the /token endpoint

// app.post('/token', (req, res) => { 
//     saveToken(req.body.token.value)
//     console.log(`Received push token, ${req.body.token.value}`)
//     res.send(`Received push token, ${req.body.token.value}`)
// })

// the /message endpoint will take the message from the 
// request body and pass it to the handlePushTokens 
// function for processing. Then, we’ll send back a response that 
// the message was received

// app.post('/message', (req, res) => { 
//     handlePushTokens(req.body)
//     console.log(`Received message, with title: ${req.body.title}`);
//     res.send(`Received message, with title: ${req.body.title}`)
// })



// Ganti username sama password di config DB aja, sisany biarin samaan
// Kalau mau sambil coba run di postman, run server pake "npm run dev" aja
// Buat test run "npm run test <nama file test>" aja biar ga ke run semua

// Selama Testing & Develop ini Jangan di Uncomment ya Gaes!
// // Gunakan Saat Production Saja!
// app.listen(port, () => {
//   console.log(`app listen on port ${port}`);
// });

module.exports = app;
