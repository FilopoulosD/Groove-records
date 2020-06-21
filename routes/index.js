const Favorite = require('../models/favorite')
const Artist = require('../models/artist')
const User = require('../models/Users')

const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

router.get('/',(req,res)=>{
  
    res.render('index')
})

// Dashboard
router.get('/dashboard', ensureAuthenticated, async(req, res) =>{
let searchOptions = {}


  const favorite = await Favorite.find({})
  const artist = await Artist.find({})
  const user = await User.find({})


  //console.log(req.user)
  //console.log('\n')
  //console.log(user[0])


  res.render('dashboard', {
    user: user,
    user_con: req.user,
    favorite: favorite,
    artist:artist
  })
});

//router.get('/artist',(req,res)=>{
  //res.render('arist')
//})

router.get('/dashboard/:id2',  (req, res) => {
  //console.log(req.params.id2)
  

  Favorite.findByIdAndRemove( req.params.id2,(err, todo) => {
    if(err) {
      console.log(err);
    }
    res.redirect('/dashboard')
  });
 
 
  

  
})

module.exports = router