const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const fs = require('fs')

const Album = require('../models/albums')
const Artist = require('../models/artist')

const uploadPath = path.join('public', Album.coverImageBasePath)
const imageMimeTypes = ['image/jpeg', 'image/png', 'images/gif']
const upload = multer({
  dest: uploadPath,
  fileFilter: (req, file, callback) => {
    callback(null, imageMimeTypes.includes(file.mimetype))
  }
})

// All Albums Route
router.get('/', async (req, res) => {
    let query = Album.find()
    if (req.query.title != null && req.query.title != '') {
      query = query.regex('title', new RegExp(req.query.title, 'i'))
    }
    if (req.query.publishedBefore != null && req.query.publishedBefore != '') {
      query = query.lte('publishDate', req.query.publishedBefore)
    }
    if (req.query.publishedAfter != null && req.query.publishedAfter != '') {
      query = query.gte('publishDate', req.query.publishedAfter)
    }
    try {
      const albums = await query.exec()
      res.render('albums/index', {
        albums: albums,
        searchOptions: req.query,
      })
    } catch {
      res.redirect('/')
    }})

// New Book Route
router.get('/new', async (req, res) => {
    renderNewPage(res, new Album())

})

// Create Album Route
router.post('/',upload.single('cover'), async (req, res) => {
    const fileName = req.file != null ? req.file.filename : null

    const album = new Album({
      title: req.body.title,
      artist: req.body.artist,
      publishDate: new Date(req.body.publishDate),
      tracksCount: req.body.tracksCount,
      coverImageName: fileName,
    })
    //saveCover(album, req.body.cover)
  
    try {
        const newAlbum = await album.save()
        // res.redirect(`books/${newBook.id}`)
        res.redirect(`albums`)
        console.log(2);

      } catch {
        if (album.coverImageName != null) {
          removeAlbumCover(album.coverImageName)
          console.log(3);

        }
        res.render('albums/new', {
            album: album,
            errorMessage: 'Error creating Artist'
            
          })
        console.log(4);

      }
  })
  


function removeAlbumCover(fileName) {
    fs.unlink(path.join(uploadPath, fileName), err => {
      if (err) console.error(err)
    })
  }
  
  async function renderNewPage(res, album, hasError = false) {
    try {
      const artists = await Artist.find({})
      const params = {
        artists: artists,
        album: album
      }
      console.log(5);

      if (hasError) params.errorMessage = 'Error Creating Album'
      res.render('albums/new', params)
    } catch {
        console.log(6);

      res.redirect('/albums')
    }
  }
  
  function saveCover(album, coverEncoded) {
    if (coverEncoded == null) return
    const cover = JSON.parse(coverEncoded)
    if (cover != null && imageMimeTypes.includes(cover.type)) {
      album.coverImage = new Buffer.from(cover.data, 'base64')
      album.coverImageType = cover.type
    }
  }



module.exports = router