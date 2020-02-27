import React,{useState, useEffect} from 'react';
import { Provider, Client, useQuery, subscriptionExchange, useSubscription, createClient} from 'urql';
import { cacheExchange } from '@urql/exchange-graphcache';

import {SubscriptionClient} from 'subscriptions-transport-ws';
import { useSelector } from 'react-redux';
import {IState} from '../../store';

const subscriptionClient = new SubscriptionClient(
    "http://react.eogresources.com/graphql",{
    reconnect: true
});

const client = createClient({
    url: 'https://react.eogresources.com/graphql',
    });

const query = `
    query getlastmetric($metricName: String!){
        getLastKnownMeasurement(metricName: $metricName){
          value
        }
  }
`;

type CardProp = {
    measurement: string
}

export default ({measurement}: CardProp) => {
    return (
        <Provider value={client}>
            <InfoCard measurement={measurement}/>
        </Provider>
    )
}
   

const InfoCard = ({measurement}: CardProp) => {
    const [lastValue, setLastValue] = useState(0);

    const [result] = useQuery({
        query,
        variables: {metricName: measurement}
      });
      const { fetching, data, error } = result;
      useEffect(() => {
        if (error) {
            console.log(error);
            return; 
        }
        if (!data) {
            console.log('no data...');
            return;
          }
        setLastValue(data.getLastKnownMeasurement.value)
      }, [null, data, error]);
    useSubscription({query: query});

    return (<div>{measurement},{lastValue}</div>)
  };
  