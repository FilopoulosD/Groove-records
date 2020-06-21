const express = require('express')
const router = express.Router()
const Artist = require('../models/artist')
const Album = require('../models/albums')
const User = require('../models/Users')
const Favorite = require('../models/favorite')



const multer = require('multer')
const path = require('path')
const fs = require('fs')
const uploadPath = path.join('public', Artist.coverImageBasePath)
const imageMimeTypes = ['image/jpeg', 'image/png', 'images/gif']
const upload = multer({
    dest: uploadPath,
    fileFilter: (req, file, callback) => {
        callback(null, imageMimeTypes.includes(file.mimetype))
    }
})



const { ensureAuthenticated2, forwardAuthenticated2 } = require('../config/auth');



// All Authors Route
router.get('/', ensureAuthenticated2, async (req, res,err) => {

    let searchOptions = {}
    if (req.query.name != null && req.query.name !== '') {
      searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try {
      const artists = await Artist.find(searchOptions)
      const users = await User.find({})
      
      let favoritesUser = null;
      
      //console.log(req.user)
  
      if(req.user!= undefined) {
        favoritesUser = await Favorite.find({user: req.user.name})
  
     }
      //console.log(favoritesUser);
  
  
      res.render('artists/index',  {
        favoritesUser:favoritesUser,
        artists: artists,
        users: users,
        searchOptions: req.query,
        user_con: req.user
      })
    } catch {
      res.redirect('/')
    }
  })


// New Author Route
router.get('/new', (req, res) => {
    res.render('artists/new', { artist: new Artist() })
    console.log(1);
})

// Create Author Route
router.post('/', upload.single('cover'), async(req, res) => {
    const fileName = req.file != null ? req.file.filename : null
    const artist = new Artist({
        name: req.body.name,
        coverImageName: fileName,

    })
    try {
        const newArtist = await artist.save()
            // res.redirect(`authors/${newAuthor.id}`)
        res.redirect(`artists`)
        console.log(2);

    } catch {
        if (artist.coverImageName != null) {
            removeBookCover(book.coverImageName)
            console.log(3);

        }
        res.render('artists/new', {
            artist: artist,
            errorMessage: 'Error creating Artist'

        })
        console.log(4);

    }
})


function removeBookCover(fileName) {
    fs.unlink(path.join(uploadPath, fileName), err => {
        if (err) console.error(err)
    })
}




router.get('/:id', async(req, res) => {
    try {
        const artist = await Artist.findById(req.params.id)
        const albums = await Album.find({ artist: artist.id })
        res.render('artists/show', {
            artist: artist,
            albumsByArtist: albums
        })
    } catch {
        res.redirect('/')
    }
})




router.get('/:id/:id2', async(req, res) => {
    try {

        const artist = await Artist.findById(req.params.id)
        const album = await Album.findById(req.params.id2)
        res.render('artists/show_video', {

            artist: artist,
            albumsByArtist: album
        })
    } catch (e) {
        console.log(e)
    }
})

router.get('/:id/:id2/:1', async(req, res) => {
    const favorite = new Favorite({
        user: req.params.id2,
        artist: req.params.id,

    })
    try {
        const newFavorite = await favorite.save()
            // res.redirect(`authors/${newAuthor.id}`)
        res.redirect('/artists')
        console.log(2);

    } catch {
        console.log("erroorrrs")
    }
})



router.post('/', upload.single('cover'), async(req, res) => {
    const fileName = req.file != null ? req.file.filename : null
    const artist = new Artist({
        name: req.body.name,
        coverImageName: fileName,

    })
    try {
        const newArtist = await artist.save()
            // res.redirect(`authors/${newAuthor.id}`)
        res.redirect(`artists`)
        console.log(2);

    } catch {
        if (artist.coverImageName != null) {
            removeBookCover(book.coverImageName)
            console.log(3);

        }
        res.render('artists/new', {
            artist: artist,
            errorMessage: 'Error creating Artist'

        })
        console.log(4);

    }
})

module.exports = router