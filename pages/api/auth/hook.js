// pages/api/auth/hook.ts
import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
    const { email, secret } = req.body;

    if (req.method !== 'POST') {
        return res.status(403).json({ message: 'Method not allowed' });
    }
    // // 2
    // if (secret !== process.env.AUTH0_HOOK_SECRET) {
    //     return res.status(403).json({ message: `You must provide the secret 🤫` });
    // }
    // // 3
    // 4
    if (email) {
        const user = await prisma.user.create({
            data: {
                email: email,
                // firstName: "prod",
                // lastName: "test",
                // companyId: 1,
                // avatarUrl: "url",
                // image: "image",
            },
        });
        res.status(200).json(user);
    }
};
