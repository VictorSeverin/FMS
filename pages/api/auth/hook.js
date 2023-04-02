// pages/api/auth/hook.ts
import prisma from '../../../lib/prisma';

const handler = async (req, res) => {
    const { email, secret } = req.body;

    if (req.method !== 'POST') {
        return res.status(403).json({ message: 'Method not allowed' });
    }
    // // 2
    // if (secret !== process.env.AUTH0_HOOK_SECRET) {
    //     return res.status(403).json({ message: `You must provide the secret 🤫` });
    // }
    // // 3
    if (email) {
        // 4
        const res = await prisma.user.create({
            data: {
                email: email,
                firstName: "prod",
                lastName: "test",
                companyId: 1,
            },
        });
        return res.status(200).json({
            message: "hello",
        });
    }
};

export default handler;