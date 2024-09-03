// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import 'boxicons/css/boxicons.min.css'
import { ApolloClient, InMemoryCache, ApolloProvider,HttpLink } from '@apollo/client'

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://simplegql-api-production.up.railway.app/'
    // uri: 'http://localhost:4000/'
  }),
  cache: new InMemoryCache()
});

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  // </StrictMode>,
)
