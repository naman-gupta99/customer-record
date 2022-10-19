import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    houseNo: {
        type: String,
        required: true
    },
    sector: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    records: {
        type: Array,
        required: false
    }
});

export default mongoose.model('Customer', CustomerSchema);
