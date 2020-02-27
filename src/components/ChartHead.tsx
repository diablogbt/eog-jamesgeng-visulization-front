import React from 'react';
import {IState} from '../store';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Metrics from '../Features/Metrics/Metrics';
import InfoCard from '../Features/InfoCard/InfoCard';

const myStyles = makeStyles({
    pureblock: {
        border: '1px solid blue'
    },
    fontcolor: {
        font: '15px yellow'
    },
    alignright: {
        textAlign: 'right',
    },
    flex: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    flexBox: {
        display: 'flexbox'
    }
});

const getMetrics = (state: IState) => {
    const { selectedMeasurements } = state.metrics;
    return {
        selectedMeasurements
    };
  };

export default () => {
    const styles = myStyles();
    const { selectedMeasurements } = useSelector(getMetrics);

    return (
        <div>
            <header className={[styles.pureblock, styles.fontcolor, styles.flex].join(' ')}>
                <div className={styles.flexBox}>
                    {
                        (selectedMeasurements).map(
                            measurement => (
                                (measurement.length>0)?(<InfoCard measurement={measurement}></InfoCard>):(<span />)
                            )
                        )
                    }
                </div>
                <div className={styles.flexBox}>
                    <Metrics/>
                </div>
            </header>
        </div>
    );
}