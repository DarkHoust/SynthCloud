const isAdmin = (req, res, next) => {
    const currentUser = req.session.user;
    
    if (currentUser && currentUser.isAdmin) {
        next();
    } else {
        res.status(403).send('Access Forbidden');
    }
};

module.exports = isAdmin;