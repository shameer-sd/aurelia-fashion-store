import 'dotenv/config'
import Razorpay from 'razorpay'
import crypto from 'crypto'

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
})

export const createRazorpayOrder = async (req, res) => {
    try {
        const { amount } = req.body

        if (!amount || Number(amount) <= 0) {
            return res.status(400).json({
                success: false,
                message: 'Valid amount is required',
            })
        }

        const options = {
            amount: Math.round(Number(amount) * 100),
            currency: 'INR',
            receipt: `aurelia_${Date.now()}`,
        }

        const order = await razorpay.orders.create(options)

        res.status(200).json({
            success: true,
            order,
            keyId: process.env.RAZORPAY_KEY_ID,
        })
    } catch (error) {
        console.error(
            'Create Razorpay order error:',
            error
        )

        res.status(500).json({
            success: false,
            message: 'Unable to create Razorpay order',
        })
    }
}

export const verifyRazorpayPayment = async (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
        } = req.body

        if (
            !razorpay_order_id ||
            !razorpay_payment_id ||
            !razorpay_signature
        ) {
            return res.status(400).json({
                success: false,
                message: 'Payment verification details are missing',
            })
        }

        const generatedSignature = crypto
            .createHmac(
                'sha256',
                process.env.RAZORPAY_KEY_SECRET
            )
            .update(
                `${razorpay_order_id}|${razorpay_payment_id}`
            )
            .digest('hex')

        if (generatedSignature !== razorpay_signature) {
            return res.status(400).json({
                success: false,
                message: 'Invalid payment signature',
            })
        }

        res.status(200).json({
            success: true,
            message: 'Payment verified successfully',
            paymentId: razorpay_payment_id,
            orderId: razorpay_order_id,
        })
    } catch (error) {
        console.error(
            'Verify Razorpay payment error:',
            error
        )

        res.status(500).json({
            success: false,
            message: 'Payment verification failed',
        })
    }
}