import prisma from "../../lib/prisma"

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { values } = req.body
        const company = await prisma.company.create({
            data: {
                companyName: values.companyName,
                companyAddress: values.companyAddress,
                avatarUrl: values.avatarUrl,
                OwnerId: values.OwnerId
            }
        })
        res.status(200).json(company)
    }
    else {
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}