import express from "express";
import Customer from "../../models/customer";

const router = express.Router();

// @route   GET api/customer
// @desc    Get customers by given parameters
// @access  Private
router.get("/", (req, res) => {
  let a = req.query;
  Object.keys(a).forEach(i => {
    if (a[i] == "") delete a[i];
  });
  Customer.find(a)
    .sort({ houseNo: 1 })
    .then(customers => res.status(200).json(customers))
    .catch(err => res.status(404).json("No customers Found : " + err));
});

// @route   POST api/customer
// @desc    Post new customer
// @access  Private
router.post("/", (req, res) => {
  const newCustomer = new Customer({
    name: req.body.name,
    houseNo: req.body.houseNo,
    sector: req.body.sector,
    phone: req.body.phone
  });
  newCustomer
    .save()
    .then(item => res.status(200).json(item))
    .catch(err => res.status(400).json("Add Customer Failed : " + err));
});

// @route   POST api/customer/update
// @desc    Update a customer by id
// @access  Private
router.post("/update", (req, res) => {
  Customer.updateOne({ _id: ObjectId(req.body.id) }, req.body.customer)
    .then(item => res.status(200).json(item))
    .catch(err => res.status(400).json("Update Customer Failed : " + err));
});

export default router;
