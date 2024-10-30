const mongoose = require('mongoose')

const customerSchema = mongoose.Schema(
    {
        first_name: {
            type: String,
            required: [true, "Please enter a First name"]
        },
		last_name: {
            type: String,
            required: [true, "Please enter a Last name"]
        },
		phone: {
            type: String,
            required: [true, "Please enter a Phone name"]
        },
		billing_address: {
            type: String,
            required: [true, "Please enter a Billing Address"]
        },
		mailing_address: {
            type: String,
            required: [true, "Please enter a Mailing Address"]
        },
        q1: {
            type: String,
        },
        q2: {
            type: String,
        }, 
		q3: {
            type: String,
        },
		q4: {
            type: String,  
        },
		q5: {
            type: String,
        }
    },
    {
        timestamps: true
    }
)


const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;     