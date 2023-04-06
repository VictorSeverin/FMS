import React, { createContext, useState } from "react";
import { useUser } from '@auth0/nextjs-auth0/client';

export const userContext = createContext();

export default function userContextProvider() {
    const { error, isLoading } = useUser();
    const owner = useUser.user
    const jora = "hello"

    return (
        <userContext.Provider value={owner} >
            {props.children}
        </userContext.Provider>
    )
}

export async function getServerSideProps() {
    const session = await getSession(context.req, context.res)
    if (!session?.user) {
        return {
            redirect: {
                destination: 'api/auth/login',
                permanent: false,
            },
        };
    }
    const { user } = session
    const now = new Date()
    const owner = await prisma.user.findFirst({
        where: {
            email: user.email
        }
    })

    // Pass data to the page via props
    return { props: { owner } }
}