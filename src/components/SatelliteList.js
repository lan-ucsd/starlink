import React, {Component} from 'react';
import { Button, Spin, List, Avatar, Checkbox } from "antd";
import satellite from "../assets/images/satellite.svg";

class SatelliteList extends Component {
    constructor() {
        super();
        this.state = {
            selected: [],
            isLoad: false
        };
    }

    onChange = e => {
        console.log(e.target);
        const { dataInfo, checked } = e.target;
        // get selected array
        const { selected } = this.state;
        // push or remove satellite
        const list = this.addOrRemove(dataInfo, checked, selected);
        // set state
        this.setState({selected: list})
    }

    addOrRemove = (item, status, list) => {
        // check is true
        // -> item not in the list -> add
        // -> item in the list -> do nothing

        // check is false
        // -> item not in the list -> do nothing
        // -> item in the list -> remove

        // step1: item in the list or not
        const found = list.some( entry => entry.satid === item.satid);
        if (status && !found){
            list.push(item)
        }
        if (!status && found){
            list = list.filter( entry => {
                console.log('entry ->', entry);
                return entry.satid !== item.satid;
            });
        }
        return list;
    }

    onShowSatMap = () => {
        this.props.onShowMap(this.state.selected);
    }

    render() {
        const satList = this.props.satInfo ? this.props.satInfo.above : [];
        const { isLoad } = this.props;
        const { selected } = this.state;

        return (
            <div className="sat-list-box">
                <Button className="sat-list-btn"
                        size="large"
                        disabled={ selected.length === 0 }
                        onClick={this.onShowSatMap}
                >Track on the map</Button>
                <hr/>

                {
                    isLoad ?
                        <div className="spin-box">
                            <Spin tip="loading..." size="large" />
                        </div>
                        :
                        <List
                            className="sat-list"
                            itemLayout="horizontal"
                            size="small"
                            dataSource={satList}
                            renderItem={item => (
                                <List.Item
                                    actions={[<Checkbox dataInfo={item} onChange={this.onChange}/>]}
                                >
                                    <List.Item.Meta
                                        avatar={<Avatar src={satellite} size={50} alt="satellite"/>}
                                        title={<p>{item.satname}</p>}
                                        description={`Launch Date:${item.launchDate}`}
                                    />
                                </List.Item>
                            )}
                        />
                }
            </div>
        );
    }
}

export default SatelliteList;