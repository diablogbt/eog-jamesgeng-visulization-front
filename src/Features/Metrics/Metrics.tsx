import React,{useEffect} from 'react';
import { Provider, createClient, useQuery } from 'urql';
import { useDispatch, useSelector } from 'react-redux';
import {IState} from '../../store';
import {actions} from './reducer';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import { MenuItem } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';

const client = createClient({
url: 'https://react.eogresources.com/graphql',
});

const query = `
    query {
        getMetrics
    }
`;

export default () => {
    return (
        <Provider value={client}>
            <Metrics />
        </Provider>
    )
}
  
const getMetrics = (state: IState) => {
    const { selectedMeasurements } = state.metrics;
    return {
        selectedMeasurements
    };
  };

const Metrics = () => {

    const handleMetricsSelection = (event: React.ChangeEvent<{value: unknown}>) => {
        console.log('selected '+event.target.value);
        let selectedMeasurements = (event.target.value as string[]);
        selectedMeasurements = selectedMeasurements.filter(ele => ele.length>0);
        console.log(selectedMeasurements);
        dispatch(actions.SelectionChanged(selectedMeasurements));
    }

    const dispatch = useDispatch();
    const { selectedMeasurements } = useSelector(getMetrics);


    const [result] = useQuery({
      query
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
    }, [null, data, error]);
  
    if(fetching) return (<div><p>loading...</p></div>);
    
    let options = [];
    for(let ele of data.getMetrics){
        options.push(<MenuItem value={ele}>{ele}</MenuItem>);
    }
    return (<div>
        <Select
            multiple
            value = {selectedMeasurements}
            onChange = {handleMetricsSelection}
            labelWidth = {150}
            renderValue = {selected => (
                <div>
                    {(selected as string[]).map(element => (
                        (element.length>0)?(<Chip key={element} label={element} />):(<span />)
                    ))}
                </div>
            )}
            >
            {options}
        </Select>
    </div>);
  };
  