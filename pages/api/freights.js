import prisma from '../../lib/prisma'

async function freight(req, res) {
    const { user, error, isLoading } = useUser();
    const freights = await prisma.Freight.findMany()
    res.status(200).json(freights)
}

export default freight;