const socketMiddleware = (req, res, next) => {
    if (req.session.user && req.session.user.role === 1) {
        
    }
    
    next();
}