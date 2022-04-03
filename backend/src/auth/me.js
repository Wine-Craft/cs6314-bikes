export default function getMe(req, res) {
    return res.status(200).json({
        user: req.user.getSafeObject(),
    });
}

