// pages/api/auth/hook.ts
import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
    const { email, firstName, lastName, avatarUrl, secret } = req.body;
    if (req.method !== 'POST') {
        return res.status(403).json({ message: 'Method not allowed' });
    }
    if (secret !== process.env.AUTH0_HOOK_SECRET) {
        return res.status(403).json({ message: process.env.AUTH0_HOOK_SECRET });
    }
    if (email) {
        const user = await prisma.user.create({
            data: {
                email: email,
                firstName: firstName,
                lastName: lastName,
                avatarUrl: avatarUrl
            },
        });
        res.status(200).json(user);
    }
};
