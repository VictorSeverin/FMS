import prisma from "../../lib/prisma"

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { values } = req.body
        const driver = await prisma.driver.create({
            data: {
                email: values.email,
                avatarUrl: values.avatarUrl,
                firstName: values.firstName,
                lastName: values.lastName,
                companyId: 0,
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