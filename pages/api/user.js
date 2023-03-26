import prisma from '../../lib/prisma'
import { useUser } from '@auth0/nextjs-auth0/client';

async function freight(req, res) {
    const { user, error, isLoading } = useUser();
    if (user) {
        const freights = await prisma.User.findUnique({
            where: {
                email: user.email,
            }
        })
        res.status(200).json(freights)
    }
}

export default freight;