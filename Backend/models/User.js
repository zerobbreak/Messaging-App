import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    bio: String
});

// Pre-save hook to hash the password
userSchema.pre('save', async function (next) {
    if (!this.isModified("password")) {
        return next();
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        console.log(`Hashing password: ${this.password} -> ${hashedPassword}`);
        this.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
});

// Method to compare passwords
userSchema.methods.matchPassword = async function (enteredPassword) {
    const isMatch = await bcrypt.compare(enteredPassword, this.password);
    console.log(`Comparing passwords: ${enteredPassword} -> ${this.password}, match: ${isMatch}`);
    return isMatch;
};

const User = mongoose.model("User", userSchema);
export default User;
