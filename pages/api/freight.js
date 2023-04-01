import prisma from "../../lib/prisma"

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { freight } = req.body
        const response = await prisma.freight.create({
            data: {
                pickupDate: freight.pickupDate + ":00.000Z",
                dropDate: freight.dropDate + ":00.000Z",
                broker: freight.broker,
                pickupLocation: freight.pickupLocation,
                dropLocation: freight.dropLocation,
                commodity: freight.commodity,
                weight: parseFloat(freight.weight),
                rate: parseFloat(freight.rate),
                completed: freight.completed,
                driverId: parseInt(freight.driverId),
                companyId: 1,
                truckId: parseInt(freight.truckId),
            },
        })
        res.status(200).json(response)
    }
    else if (req.method === 'DELETE') {

        res.status(200).json(driver)
    }
    else {
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}