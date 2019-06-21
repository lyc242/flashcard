const express = require('express');
const router = express.Router();
const { data } = require('../data/flashcardData.json');
const { cards } = data;

router.get('/', (req, res) => {
	const id = Math.floor(Math.random() * cards.length);
	res.redirect('/cards/' + id + '?side=question');
});

router.get('/:index', (req, res) => {
	const side = req.query.side;
	const index = req.params.index;
	const text = cards[index][side];
	const hint = cards[index].hint;
	const name = req.cookies.username;
	let template;
	if (side === 'answer') {
		let link = '/cards';
		let tagA = 'question';
		let side = req.query.side;
		link = link + req.url.replace(req.query.side, tagA);
		template = { text, link, tagA, name, side };
	} else if (side === 'question') {
		let link = '/cards';
		let tagA = 'answer';
		let side = req.query.side;
		link = link + req.url.replace(req.query.side, tagA);
		template = { text, hint, link, tagA, name, side };
	} else {
		return res.redirect('/cards/' + index + '?side=question');
	}

	res.render('card', template);
});

module.exports = router;
