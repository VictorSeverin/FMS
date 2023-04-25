import prisma from "../../lib/prisma"

export default async function handler(req, res) {
    const now = new Date()
    if (req.method === 'POST') {
        const { values } = req.body
        const driver = await prisma.driver.create({
            data: {
                email: values.email,
                avatarUrl: values.avatarUrl,
                firstName: values.firstName,
                lastName: values.lastName,
                companyId: 1,
                miles: 0,
                deliveries: 0,
                experience: parseInt(values.experience),
                address: values.address,
                phoneNumber: values.phoneNumber,
                //hiredDate: now,
                medicalExpiration: values.medicalExpiration,
                licenseNumber: values.licenseNumber,
                insuranceNumber: values.insuranceNumber,
                tankerEndorsed: values.tankerEndorsed,
                hazmatEndorsed: values.hazmatEndorsed,
                notes: values.notes,
            }
        })
        res.status(200).json(driver)
    }
    else if (req.method === 'DELETE') {
        const { id } = req.body
        const driver = await prisma.driver.delete({
            where: {
                id: id,
            }
        })
        res.status(200).json(driver)
    }
    else {
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}