import User from "../models/user.model.js"
import ApiError from "../utils/ApiError.js"
import httpStatus from "http-status"

export const createUser = async (userBody) => {
    if (await User.isEmailTaken(userBody.email)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    }
    return await User.create(userBody);
}

export const queryUsers = async (filter, options) => {
    const users = await User.paginate(filter, options);
    return users;
}

export const getUserById = async (id) => {
    return User.findById(id);
}

export const getUserByEmail = async (email) => {
    return User.findOne({ email });
}

export const updateUserById = async (userId, updateBody) => {
    const user = await getUserById(userId);
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    }
    Object.assign(user, updateBody);
    await user.save();
    return user;
}

export const deleteUserById = async (userId) => {
    const user = await getUserById(userId);
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    await user.remove();
    return user;
}
