import express from 'express';
import Customer from '../../models/customer';
import customer from '../../models/customer';

class Record {
    constructor(record) {
        this.date = record.date;
        this.amount = record.amount;
        this.comment = record.comment;
    }
}

const router = express.Router();

// @route   POST api/record
// @desc    Post new record for a customer by id 
// @access  Private
router.post('/', (req, res) => {
    const newRecord = new Record(req.body.record);
    Customer.updateOne({ _id: req.body.id }, {
        $push: {
            "records": {
                $each: [newRecord],
                $sort: { "date": 1 }
            }
        }
    })
        .then(item => res.status(200).json(item))
        .catch(err => res.status(400).json("Add Record Failed : " + err));
});

// @route   DELETE api/record
// @desc    DELETE a record
// @access  Private
router.delete('/', (req, res) => {
    Customer.updateOne({ _id: req.body.id }, {
        $pull: { "records": req.body.record }
    })
        .then(item => res.status(200).json(item))
        .catch(err => res.status(400).json("Delete Record Failed : " + err));
});

export default router;