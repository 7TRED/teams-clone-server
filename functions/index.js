const functions = require('firebase-functions');

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
dotenv.config();
// const client = require('twilio')(process.env.ACCOUNT_SID, process.env.ACCOUNT_AUTH_TOKEN);

const AccessToken = require('twilio').jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// app.get('/rooms', (req, res) => {
// 	client.video.rooms
// 		.create({
// 			type       : 'group',
// 			uniqueName : `${uuidv4()}`,
// 			duration   : '36000',
// 		})
// 		.then((room) => {
// 			res.send(room);
// 		})
// 		.catch((err) => {
// 			res.statusCode(405).send({
// 				message : 'Room could not be created',
// 			});
// 		});
// });

app.get('/token', (req, res) => {
	const token = new AccessToken(process.env.ACCOUNT_SID, process.env.API_SID, process.env.API_SECRET);

	token.identity = req.query.identity;

	const grant = new VideoGrant({
		room : req.query.room,
	});

	token.addGrant(grant);

	res.send({
		identity : req.query.identity,
		token    : token.toJwt(),
	});
});

// app.get('/room', (req, res) => {
// 	client.video
// 		.rooms(req.query.room)
// 		.fetch()
// 		.then((room) => {
// 			res.send(room);
// 		})
// 		.catch((err) => {
// 			res.send({
// 				type    : 'ROOM_NOT_FOUD',
// 				message : 'This room does not exist',
// 			});
// 		});
// });

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.app = functions.https.onRequest(app);
