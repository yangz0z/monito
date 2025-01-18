import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const saltRounds = 10;

const userSchema = mongoose.Schema({
    email: {
        type: String,
        trim: true,
        unique: true,
        lowercase: true
    },
    regDate: {
        type: String
    },
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
});

userSchema.methods.generateToken = function (next) {
    const user = this;
    const token = jwt.sign(user._id.toHexString(), 'secretToken');
    user.token = token;
    user.save()
        .then((user) => {
            console.log('generate token success!');
            next(null, user);
        })
        .catch((err) => {
            console.log('generate token fail...', err);
            next(err, null);
        });
};

userSchema.statics.findByToken = function (token, next) {
    const user = this;
    console.log('User.findByToken');
    jwt.verify(token, 'secretToken', function (err, decoded) {
        if (err) return next(err);
        user.findOne({ _id: decoded, token: token })
            .then(user => {
                console.log('find user success!');
                next(null, user);
            })
            .catch(err => {
                console.log('find user failed!', err);
                next(err, null);
            });
    });
};

const User = mongoose.model('User', userSchema);

export { User };
