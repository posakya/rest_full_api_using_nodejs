const express = require('express');
const router = express.Router();

router.get('/',(req,res,next) => {

	res.status(200).json({
		message: 'Handling get order request'
	});

});

router.post('/',(req, res, next) => {
	res.status(200).json({
		message: 'handing post order request'
	});
});

router.get('/:orderId', (req,res,next) => {
	const id = req.params.orderId;

	if (id === 'special'){
		res.status(200).json({
		message: 'You discovered the order special id',
		id: id
	});
	}else{
		res.status(200).json({
		message: 'You passed order an Id'
	});
	}

});

module.exports = router;