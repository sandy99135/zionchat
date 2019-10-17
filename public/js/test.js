let Peer = require('simple-peer')

const peer = new Peer('receiver', { host: 'localhost', port: 9000, path: '/' })

peer.on('connection', (conn) => {
  conn.on('data', (data) => {
    console.log(data);
  })
})
