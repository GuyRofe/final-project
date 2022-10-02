const socketIo = require('socket.io');

const Product = require('./models/product');

let serverSocket = null;
let socketConnections = {};

const setupSocket = (server) => {
    serverSocket = socketIo(server);

    serverSocket.on('connection', (socket) => {
        socket.on('disconnect', () => {
            delete socketConnections[socket.id];
        });

        socket.on('ack-user-id', (userId) => {
            socketConnections[socket.id] = { userId };
        });
    });
}

const purchaseProductAction = async (productId) => {
    if (!serverSocket) {
        return;
    }

    try {
        const productInDb = await Product.findById(productId);
        const productOwnerId = productInDb.owner.toString();

        const matchingSocketConnIndex = Object.values(socketConnections).findIndex((connValue) => connValue.userId === productOwnerId);

        if (matchingSocketConnIndex === -1) {
            return;
        }

        const socketId = Object.keys(socketConnections)[matchingSocketConnIndex];
        const productOwnerSocket = serverSocket.sockets.sockets.get(socketId);
        
        productOwnerSocket.emit('product-purchased', productInDb.title);
    } catch {}
}

module.exports = { setupSocket, purchaseProductAction };