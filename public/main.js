  var socket=io.connect()
const video = document.querySelector('video')
let client = {}


//get stream
navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    .then(stream => {
        socket.emit('NewClient')
        video.srcObject = stream
        video.play()

        //used to initialize a peer
        function InitPeer(type) {
            let peer = new  SimplePeer({ initiator: (type == 'init') ? true : false, stream: stream, trickle: false })
            peer.on('stream', function (stream) {
                CreateVideo(stream)
            })
            // peer.on('close', function () {
            //      document.querySelector('#peerVideo').remove();
            //      peer.destroy()
            // })
            return peer
        }

        //for peer of type init
        function MakePeer() {
            client.gotAnswer = false
            let peer = InitPeer('init')
            peer.on('signal', function (data) {
                if (!client.gotAnswer) {
                    socket.emit('Offer', data)
                }
            })
            client.peer = peer
        }

        //for peer of type not init
        // function FrontAnswer(offer) {
        //     let peer = InitPeer('notInit')
        //     peer.on('signal', (data) => {
        //         socket.emit('Answer', data)
        //     })
        //     peer.signal(offer)
        //     // client.peer = peer
        // }

        // function SignalAnswer(answer) {
        //     client.gotAnswer = true
        //     let peer = client.peer
        //     peer.signal(answer)
        // }

        function CreateVideo(stream) {
            
            let video = document.createElement('video')
            video.id = 'peerVideo'
            video.srcObject = stream
            video.setAttribute('class', 'embed-responsive-item')
            document.querySelector('#peerDiv').appendChild(video)
            video.play()
           
        }

        // function SessionActive() {
        //     document.write('Session Active. Please come back later')
        // }

         function RemovePeer() {
            document.getElementById("peerVideo").remove();
            document.getElementById("muteText").remove();
            if (client.peer) {
                client.peer.destroy()
            }
        }

        // socket.on('BackOffer', FrontAnswer)
        // socket.on('BackAnswer', SignalAnswer)
        // socket.on('SessionActive', SessionActive)
        socket.on('CreatePeer', MakePeer)
        socket.on('Disconnect', RemovePeer)

    })
    .catch(err => document.write(err))

// checkboxTheme.addEventListener('click', () => {
//     if (checkboxTheme.checked == true) {
//         document.body.style.backgroundColor = '#212529'
//         if (document.querySelector('#muteText')) {
//             document.querySelector('#muteText').style.color = "#fff"
//         }

//     }
//     else {
//         document.body.style.backgroundColor = '#fff'
//         if (document.querySelector('#muteText')) {
//             document.querySelector('#muteText').style.color = "#212529"
//         }
//     }
// }
// )

function CreateDiv() {
    let div = document.createElement('div')
    div.setAttribute('class', "centered")
    div.id = "muteText"
    div.innerHTML = "Click to Mute/Unmute"
    document.querySelector('#peerDiv').appendChild(div)
    if (checkboxTheme.checked == true)
        document.querySelector('#muteText').style.color = "#fff"
}

// get video/voice stream
//  var video = document.querySelector('video')
//  navigator.getUserMedia=(navigator.getUserMedia||navigator.webkitGetUserMedia||navigator.msgGetUserMedia)
// navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(gotMedia)

// function gotMedia (stream) {
//   var peer1 = new SimplePeer({ initiator: true, stream: stream })
//   var peer2 = new SimplePeer()
//   peer1.on('signal', data => {
//     peer2.signal(data)
//   })

//   peer2.on('signal', data => {
//     peer1.signal(data)
//     console.log(data)
//   })

//   // peer2.on('stream', stream => {
//   //   // got remote video stream, now let's show it in a video tag
//   //   console.log(stream)

//     if ('srcObject' in video) {
//         alert("55")
//       video.srcObject = stream
//       socket.emit("envoiestream",{moi:"2222"})
//     } else {
//       video.src = window.URL.createObjectURL(stream) // for older browsers
//        socket.emit("envoiestream",{moi:"2222"})
//     }
//     video.play()
//    // CreateVideo(stream)
//   // })

// }
//  socket.on("stream",function(stream1){
//     CreateVideo(stream1)
// })
//  function CreateVideo(stream) {
            
//             let video = document.createElement('video')
//             video.id = 'peerVideo'
//             video.srcObject = stream
//             video.setAttribute('class', 'embed-responsive-item')
//             document.querySelector('#peerDiv').appendChild(video)
//             video.play()
           
//         }
