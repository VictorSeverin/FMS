import { UserContext, UserProvider } from '@auth0/nextjs-auth0/client';
import '../styles/globals.css'
import userContext from '../Contexts/userContext'

export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <userContext>
        <Component {...pageProps} />
      </userContext>
    </UserProvider>
  );
}
