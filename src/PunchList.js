import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import queryString from 'query-string'
import { withRouter } from "react-router";
import PunchListApi from './Api/PunchListApi'
import ReactMapboxGl, { Layer, Feature, Popup } from "react-mapbox-gl";
import Button from '@material-ui/core/Button';
import SvgIcon from '@material-ui/core/SvgIcon';

const styles = theme => ({
    root: {
        flexGrow: 1,
        padding: "20px 1% 20px 1%"
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    pagination: {
        width: "100%",
        backgroundColor: "#f5f5f5",
        border: "1px solid #e6e6e6",
        boxSizing: "border-box",
    }
});

const Map = ReactMapboxGl({
    // This would ideally be moved to environment 
    accessToken: "pk.eyJ1Ijoiam9obnRiYWxlcyIsImEiOiJjandma3Z0cDcxc3lnNDZxbndsOGV4NjNyIn0.oAgX_-dKa4MiKKdhpjzmxQ",
    minZoom: 10,
    maxZoom: 20,
});

function mod(n, m) {
    return ((n % m) + m) % m;
}

class PunchList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            center: [-96.799036, 32.803468],
            zoom: [16],
            pinIndex: undefined,
            pins: {},
            pinsKeys: []
        };
    }

    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    };

    componentDidMount() {
        const values = queryString.parse(this.props.location.search)
        const { match } = this.props;

        // console.log({ match, location, history })
        // console.log(values.state)

        const pinsArray = PunchListApi.Work.getAll({
            discipline: match.params.discipline,
            state: values.state
        });
        this.setState({
            pins: pinsArray.reduce(function (map, obj) {
                map[obj.guid] = obj;
                return map;
            }, {}),
            // store keys rather than getting them so often
            pinsKeys: pinsArray.map((pin, index) => {
                return pin.guid;
            })
        })
    }

    onDrag = () => {
        if (this.state.pinIndex) {
            this.setState({ pinIndex: undefined });
        }
    };

    onToggleHover(cursor, { map }) {
        map.getCanvas().style.cursor = cursor;
    }

    markerClick = (pinIndex, { feature }) => {
        this.setState({
            center: feature.geometry.coordinates,
            zoom: [18],
            pinIndex
        });
    };

    focusPin({ increment }) {
        const { pins, pinIndex, pinsKeys } = this.state;

        if (pinsKeys.length === 0) return false;

        // console.log({ pins, pinIndex, pinsKeys })

        const newPinIndex = (pinIndex === undefined) ? 0 :
            mod((pinIndex + increment), pinsKeys.length);

        // console.log({ newPinIndex })
        const pin = pins[pinsKeys[newPinIndex]];
        this.setState({
            center: [pin.longitude, pin.latitude],
            zoom: [18],
            pinIndex: newPinIndex
        })
    }

    render() {
        const { classes } = this.props;
        const { center, zoom, pins, pinIndex, pinsKeys } = this.state;
        const pin = pins[pinsKeys[pinIndex]];

        // console.log({ pin, pins, pinIndex, pinsKeys })

        return (
            <div className={classes.root}>
                <Grid container spacing={3} justify="center" >

                    <Grid item xs={12} md={9}>
                        <Map
                            containerStyle={{
                                height: "80vh",
                                width: "100%"
                            }}
                            style='mapbox://styles/mapbox/satellite-streets-v9?optimize=true'
                            zoom={zoom}
                            center={center}
                            flyToOptions={{ speed: 0.8 }}
                            onDrag={this.onDrag}
                        >
                            <Layer type="symbol" id="marker" layout={{ 'icon-image': "circle-15" }}>
                                {
                                    pinsKeys && pinsKeys.map((pinKey, index) => (
                                        <Feature
                                            key={pins[pinKey].guid}
                                            onMouseEnter={this.onToggleHover.bind(this, 'pointer')}
                                            onMouseLeave={this.onToggleHover.bind(this, '')}
                                            onClick={this.markerClick.bind(this, index)}
                                            coordinates={[pins[pinKey].longitude, pins[pinKey].latitude]}
                                        />
                                    ))
                                }
                            </Layer>
                            {
                                pin && (
                                    <Popup key={pin.guid} coordinates={[pin.longitude, pin.latitude]}>
                                        <div>Subcontractor: {pin.subcontractor} </div>
                                        <div>Discipline: {pin.discipline}</div>
                                        <div>State: {pin.state}</div>
                                        <div>Registered: {pin.registered}</div>
                                        <div>Cost: {pin.cost}</div>
                                    </Popup>
                                )
                            }
                        </Map>
                        <div className={classes.pagination}>
                            <Grid container spacing={3} justify="space-between" alignItems="center" alignContent="center" >
                                <Grid item >
                                    <Button size="large" disabled={pinsKeys.length === 0} onClick={this.focusPin.bind(this, { increment: -1 })}>
                                        <SvgIcon><path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z" /></SvgIcon>
                                        Prev
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button size="large" disabled={pinsKeys.length === 0} onClick={this.focusPin.bind(this, { increment: 1 })}>
                                        Next
                                        <SvgIcon><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" /></SvgIcon>
                                    </Button>
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
                </Grid>
            </div>
        );
    }

}

PunchList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(PunchList));
