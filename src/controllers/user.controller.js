const User = require('../schema/user.schema');
const Post = require('../schema/post.schema');

module.exports.getUsersWithPostCount = async(req, res) => {
    try {
        const data = [];
        const result = await User.find();
        result.forEach(async element => {
            let count = await Post.count({ userId: element.id });
            data.push({ _id: element.id, name: element.name, posts: count })
        });
        let response = { "users": data }
        res.status(200).json({
            data: response,
            message: 'Success'
        })
    } catch (error) {
        res.send({ error: error.message });
    }
}