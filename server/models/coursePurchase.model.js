import mongoose, { mongo } from 'mongoose'

const coursePurchaseSchema = new mongoose.Schema({
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    amount: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "completed", "failed"],
        default: "pending"
    },
    paymentId: {
        type: String,
        required: true,
    },
}, { timestamps: true });

export const CoursePurchase = mongoose.model('CoursePurchase', coursePurchaseSchema)