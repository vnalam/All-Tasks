var express = require('express');
var router = express.Router();
var Sequelize = require('sequelize');
var cacher = require('sequelize-redis-cache');
var redis = require('redis');
var rc = redis.createClient(6379, 'localhost');
var sequelize = new Sequelize('vinay', 'root1', 'vinayraj4', {
  host: "127.0.0.1",
  port: 3306,
  maxConcurrentQueries: 1000,
  dialect: 'mariadb'
  })
  
  var User = sequelize.define('home', {
			eName:Sequelize.STRING,
			eEmail: Sequelize.STRING,
			salary: Sequelize.INTEGER
		 });
			
			
  var cacheObj = cacher(sequelize, rc)
		.model('home')
		.ttl(1000);
router.post('/api/insert', function(req, res, next) {
		var name=req.body.ename;
		var email=req.body.email;
		var salary=req.body.salary;
		console.log(name+""+email+""+salary)
		
	User.create({
			"eName":name,
			"eEmail":email,
			"salary":salary
			
		}).then(function(vin) {
		res.json(vin);},function(error){
			res.send(error);
			
			});
		});
	
	
	
	router.get('/apis', function(req, res){
  res.send('id: ' + req.query.id);
});
	
	
router.get('/api/retrieve/:salary/:limit/:offset', function(req, res,next) 
	{
		var salary = req.param('salary');
		var limit = parseInt(req.param('limit'));
		var offset = parseInt(req.param('offset'));
		/* var a=[];
		a.push(req.query.data); */
		
		var str = req.query.data;
var myarray = str.split(',');

for(var i = 0; i < myarray.length; i++)
{
   console.log(myarray[i]);
}
		
		console.log(salary)
		
		
		cacheObj.findAll({ where: { salary:salary }, limit:limit, offset:offset,
		order: [
            ['eName', 'DESC']
          
        ], attributes: myarray
		})
  .then(function(user) {
    console.log(user); // sequelize db object 
    console.log(cacheObj.cacheHit); // true or false 
	res.json({"resultset":user})
  }).catch(function(err){
	  console.log("error"+err)
	  console.log("error name"+err.name)
	  var ename=err.name;
	  if(ename=="SequelizeDatabaseError")
	  {
		  res.send({"Error":"Bad Field Name"})
	  }
  })
	
	});
router.post('/api/update', function(req, res) 
	{
		var email=req.body.email;
		var name=req.body.name;
		var salary=req.body.salary;
			User.find({where:{salary:salary}}).then(function(upd){
				if(upd){
					upd.update({
						eName:name,
						eEmail:email,
						salary:salary
					}).then(function(){
						console.log('update success')
					})
					
				}
			
			});
	});	
	
module.exports = router;
