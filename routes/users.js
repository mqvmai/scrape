var express = require("express");
var app = express();

//Creating Router() object
var router = express.Router();

// Router middleware, mentioned it before defining routes.
router.use(function(req,res,next) {
  console.log('USERS REQUEST');
  next();
});

/* run this middleware before get request to error check for param 0 */
router.use("/user/:id",function(req,res,next){
  if(req.params.id == 0) {
    res.json({"message" : "You must pass ID other than 0"});
  }
  else next();
});

// Provide all routes here, this is for Home page.
router.get("/",function(req,res){
  res.json({"message" : "Hello World"});
});

router.get("/user/:id",function(req,res){
  res.json({"message" : "Hello " + req.params.id});
});

module.exports = router;
