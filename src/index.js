import uuidv4 from 'uuid/v4';
import 'dotenv/config';
import cors from 'cors';
import express from 'express';

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

let users = {
    1: {
        id: '1',
        username: 'Hassan',
    },
    2: {
        id: '2',
        username: 'Ahmed',
    },
};

let messages= {
    1: {
        id: '1',
        text: 'Hello World',
        userId: '1',
    },
    2: {
        id: '2',
        text: 'Goodbye World',
        userId: '2'
    },
};

app.get('/users', (req, res) => {
    return res.send(Object.values(users));
});

app.get('/users/:userId', (req, res) => {
    return res.send(users[req.params.userId]);
});

app.get('/messages', (req, res) => {
    return res.send(Object.values(messages));
});

app.get('/messages/:messageId', (req, res) => {
    return res.send(messages[req.params.messageId]);
});

app.use((req, res, next) => {
    req.me = users[1];
    next();
});

app.post('/messages', (req, res) => {
    const id = uuidv4();
    const message = {
        id,
        text: req.body.text,
        userId: req.me.id,
    };

    messages[id] = message;

    return res.send(message);
});

app.delete('/messages/:messagesId', (req, res) => {
    const {
        [req.params.messageId] : message,
        ...otherMessages
    } = messages;

    messages = otherMessages;
    res.send(messages);
});

app.get('/session', (req, res) => {
    return res.send(users[req.me.id]);
});

app.listen(process.env.PORT, () => 
    console.log(`App is listening on ${process.env.PORT}!`),
);