/*
********************************************
 Copyright © 2021 Agora Lab, Inc., all rights reserved.
 AppBuilder and all associated components, source code, APIs, services, and documentation 
 (the “Materials”) are owned by Agora Lab, Inc. and its licensors. The Materials may not be 
 accessed, used, modified, or distributed for any purpose without a license from Agora Lab, Inc.  
 Use without a license or in violation of any license terms and conditions (including use for 
 any purpose competitive to Agora Lab, Inc.’s business) is strictly prohibited. For more 
 information visit https://appbuilder.agora.io. 
*********************************************
*/
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  ApolloProvider,
} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
// import useMount from './useMount';
import React, {useContext, useRef} from 'react';
import StorageContext from './StorageContext';
import AsyncStorage from '@react-native-community/async-storage';

const GraphQLProvider = (props: {children: React.ReactNode}) => {
  const httpLink = createHttpLink({
    uri: `${$config.BACKEND_ENDPOINT}/query`,
  });
  const {store} = useContext(StorageContext);
  const authLink = setContext(async (_, {headers}) => {
    // get the authentication token from local storage if it exists
    // return the headers to the context so httpLink can read them
    const storeString = await AsyncStorage.getItem('store');
    let token;
    if (storeString) {
      token = JSON.parse(storeString).token;
    }
    console.log('link module token', storeString);
    if (token) {
      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : '',
        },
      };
    } else {
      return headers;
    }
  });

  const client = useRef(
    new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache(),
    }),
  );

  // useEffect(() => {
  //   console.log("store changed", store)
  //   client.current = new ApolloClient({
  //     link: authLink.concat(httpLink),
  //     cache: new InMemoryCache(),
  //   });
  // }, [authLink, httpLink, store]);
  console.log('GraphQL render triggered', store);

  return (
    <ApolloProvider client={client.current}>{props.children}</ApolloProvider>
  );
};

export default GraphQLProvider;
