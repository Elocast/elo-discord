import request from 'request-promise'

import config from '../config'

const Stream = function() {
  this.dclient = null
  this.stream = {}
  this.timeout = null
}

Stream.prototype.loop = function() {
  return new Promise((resolve, reject) => {
    request.get({
      url: `${config.ELOCAST_API_URL}/stream/${config.ADDON_STREAM_ELOCAST_SEO}`,
      json: true
    })
      .then(response => response.data)
      .catch(err => err.statusCode === 404
        ? Promise.resolve({ statusCode: 404 })
        : Promise.reject(err)
      )
      .then(stream => {
        let _message = null

        if (stream.statusCode) {
          if (stream.statusCode === 404 && stream.statusCode !== this.stream.statusCode) {
            if (config.ADDON_STREAM_NOTIFY_ON_NOT_FOUND) {
              _message = `The stream is offline`
            }
          }
        } else if (stream.status !== this.stream.status || stream.id !== this.stream.id) {
          if (stream.status === 'ended') {
            if (config.ADDON_STREAM_NOTIFY_ON_ENDED) {
              _message = `Stream has ended`
            }
          } else if (stream.status === 'broadcasting') {
            _message = `<@${config.ADDON_STREAM_USER_ID}> has started streaming **${stream.category.title}** (**${stream.title}**) .\nYou can watch it at Elocast! <https://elocast.com/${config.ADDON_STREAM_ELOCAST_SEO}>`
          }
        }

        if (!_message) {
          this.stream = stream
          return resolve()
        }

        return this.dclient.channels.fetch(config.ADDON_STREAM_CHANNEL_ID)
          .then(channel => channel.send(_message))
          .then(() => {
            this.stream = stream
            resolve()
          })
          .catch(err => console.log(err))
      })
      .catch(err => {
        console.error(`ADDON [STREAM]: error: `, err.message)
        resolve()
      })
  })
    .then(() => this.timeout = setTimeout(() => this.loop(), config.ADDON_STREAM_LOOP_TIME))
}

Stream.prototype.init = function({ dclient }) {
  this.dclient = dclient
  this.loop()
}

Stream.prototype.stop = function() {
  clearTimeout(this.timeout)
}

export default Stream
