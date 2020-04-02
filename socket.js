var socketIo      = require('socket.io');
var users         = [];

const initialize = (server) => {
    const io     = socketIo(server);
    //open socket
    io.on('connection', socket => {
        socket.on('connect',msg=>{
            console.log("connect")
        });
        // check if sender and receiver of socket 
        socket.on('addUser',data=>{
            console.log("addUser")
            socketData = data.user_id;
            if(! users.includes(data.user_id.toString())){
                users.push(data.user_id);
            }
            socket.user_id=data.user_id
        });
        //send message of socket
        socket.on('sendMessage',data => {
            console.log(data)
            /*
            1- save message of table of message
            2- check if receiverId of socket
               if found send message to socket of receiver 
               if not send fcm 
             */

            // save the message to the database of table message
            if(users.includes(message.reciverId.toString())){
                let messageItem = {};//is the object of message that sender send
                socket.broadcast.emit('checkMessage',messageItem);
            }
            else{
                //send message of fcm notification
            }
        });

        //video - audio call by socket 
        socket.on("requestPeerId", data => {
            console.log(data)
            //check if receiverId in socket
            if(users.includes(data.receiverId.toString())){
                socket.broadcast.to(data.chatId).emit("getPeerId",{avaliable:true});
            }else{
                // receiver not open socket do if you
                
            }
        });

        socket.on("sendPeerId", data => {
            console.log("1")
            console.log(data.peerId)
            //if found room id 
            socket.broadcast.to(data.chatId).emit("recievePeerId", data.peerId);
        });









        socket.on('disconnect', ()=>{
            console.log("disConnect");
            if(users.includes(socket.user_id)){
                index = users.indexOf(socket.user_id);
                if (index !== -1) users.splice(index, 1);
            }
        });
    });
};
