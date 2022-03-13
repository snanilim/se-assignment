import { User, Users } from './user.model';

export const get = async (req, res, next) => {
    console.log('user call');
    res.json({ user: 'users' });
};

export const post = async (req, res, next) => {
    User.name = 'Shah Noor Alam Nilim';
    User.isPublic = true;

    await User.save();
    return res.json('user save successfully');
};