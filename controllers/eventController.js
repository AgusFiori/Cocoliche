const Event = require('../models/Event')
const path = require('path')

const eventController = {
  addEvent: async (req, res) => {

    const { title, descripcion, category, dateEvent } = req.body
    const file = req.files.file
    const articlePictureUbicacion = `/assets/articlePics/${file.md5}.jpg`
    const eventSave = new Event({
      title,
      descripcion,
      picture: articlePictureUbicacion,
      category,
      dateEvent
    })

    // file.mv(path.join(__dirname, `../client/build/assets/articlePics/${file.md5}.jpg`), error => {
    //   if (error) {
    //     return res.json({ response: error })
    //   }
    // })
    Event.save()
      .then(eventSaved => {
        return res.json({ success: true, response: eventSaved })
      })
      .catch(error => {
        return res.json({ success: false, error })
      })

  },
  getEvents: (req, res) => {
    Event.find()
    .then(event => {
      return res.json({ success: true, response: event })
    })
    .catch(error => {
      return res.json({ success: false, error })
    })
  },
  editEvent: async (req, res) => {
    const { _id, date, artist, picture, description, categoty } = req.body.article
    try {
      await Event.findOneAndUpdate(
        { _id: _id },
        {
          $set: {
            'date': date,
            'artist': artist,
            'picture': picture,
            'description': description,
            'categoty': categoty,
          }
        },
        { new: true }
      )
    }

    catch (error) { res.json({ success: false, error }) }
  },
  deleteEvent: async (req, res) => {
    try {
      const { id } = req.body
      const response = await Event.findOneAndDelete(
        { _id: id }
      )
      res.json({
        success: true,
        response
      })
    } catch (error) {
      res.json({
        success: false,
        error
      })
    }
  },
  commentEvent: async (req, res) => {
    try {
      const { comment, artId } = req.body
      const { profilePicture, name } = req.user
      const userId = req.user._id

      const response = await Event.findOneAndUpdate(
        { _id: artId },
        {
          $push: {
            comments: { profilePicture, comment, name, userId }
          }
        },
        { new: true }
      )
      res.json({
        success: true,
        response
      })
    } catch (error) {
      res.json({
        success: false,
        error
      })
    }
  },
  deleteEvent: async (req, res) => {
    try {
      const { artId, commentId } = req.params
      const response = await Event.findOneAndUpdate(
        { _id: artId },
        {
          $pull: {
            comments: {
              _id: commentId
            }
          }
        },
        { new: true })
      res.json({
        success: true,
        response
      })
    } catch (error) {
      res.json({
        success: false,
        error
      })
    }
  },
  editCommentEvent: async (req, res) => {
    try {
      const { commentId, artId, editComment } = req.body
      const response = await Event.findOneAndUpdate(
        { _id: artId, 'comments._id': commentId },
        {
          $set: {
            'comments.$.comment': editComment
          }
        },
        { new: true }
      )
      res.json({
        success: true,
        response
      })
    } catch (error) {
      res.json({
        success: false,
        error
      })
    }
  },
//   addVisit: async (req, res) => {
//     try {
//       const response = await Article.findOneAndUpdate(
//         { _id: req.body.artId },
//         {
//           $inc: {
//             visits: 1
//           },
//         },
//         { new: true }
//       )
//       res.json({
//         success: true,
//         response,
//       })
//     } catch (error) {
//       res.json({
//         success: false,
//         error
//       })
//     }
//   }

}



module.exports = eventController




