import { InMemoryCache } from 'apollo-boost';
import { ApolloClient } from '@apollo/client';
import { HttpLink } from 'apollo-link-http';
import { setContext } from '@apollo/client/link/context';

const link = new HttpLink({ uri: process.env.REACT_APP_APOLLO_GRAPHQL_URI });

const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem('token');
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : '',
		},
	};
});

const Apolloclient = new ApolloClient({
	cache: new InMemoryCache(),
	link: authLink.concat(link),
});

export default Apolloclient;
