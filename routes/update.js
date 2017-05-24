var express = require('express');
var router = express.Router();

router.post('/api/update', function(req, res) 
	{
		var email=req.body.email;
		var name=req.body.name;
   
			User.find({where:{eEmail:email}}).then(function(upd){
				if(upd){
					upd.update({
						eName:name,
						eEmail:email
					}).then(function(){
						console.log('update success')
					})
					
				}
			
			});
	});

module.exports = router;
