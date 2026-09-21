import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import User from './models/User.js'

dotenv.config()

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)

        const adminEmail = 'admin@aurelia.com'
        const adminPassword = 'Admin@123456'

        const existingAdmin = await User.findOne({
            email: adminEmail,
        })

        if (existingAdmin) {
            existingAdmin.role = 'admin'
            await existingAdmin.save()

            console.log('Existing user promoted to admin.')
        } else {
            const hashedPassword = await bcrypt.hash(
                adminPassword,
                10
            )

            await User.create({
                name: 'AURELIA Admin',
                email: adminEmail,
                password: hashedPassword,
                role: 'admin',
            })

            console.log('Admin account created successfully.')
            console.log(`Email: ${adminEmail}`)
            console.log(`Password: ${adminPassword}`)
        }

        await mongoose.disconnect()
    } catch (error) {
        console.error('Failed to create admin:', error)
        process.exit(1)
    }
}

createAdmin()