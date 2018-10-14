import { Spin,Icon  } from "antd";
import React, { Component } from "react";
import { hex2Rgba } from "../../utils/common";
import SelectComponent from "./subpages/selectComponent";
import SearchSelect from "./subpages/SearchSelect";
import ScreeningEntries from "./subpages/ScreeningEntries";

import "./styles";
import deleteIcon from "../../images/icons/delete_icon.png";

class IndexSearch extends Component {
    state = {
        selItem: [],
        showPull:false
    }
    
    handleShowPull=()=>{
    	let flag = this.state.showPull;
    	this.setState({
    		showPull:!flag
    	})
    }

    addSetItem = (defaultKey, key, itemCollection) => {
        let oldItem = this.state.selItem,
            boolItem = true,
            showItem = this.props.searchArray[defaultKey];
            
        boolItem = oldItem.some(item => item.name === itemCollection.name);
        
        itemCollection["field"] = showItem;
        
        if(!boolItem) {
            this.props.addSearchData(showItem, itemCollection.code, false);

            if(defaultKey == 8) {
                if(!this.props.states.releaseTimeCode) {
                    this.setState({
                        selItem: [
                            ...oldItem,
                            itemCollection
                        ]
                    });
                }
            } else {
                this.setState({
                    selItem: [
                        ...oldItem,
                        itemCollection
                    ]
                });
            }
        }
    }

    deleteSingleItem = (item, index) => {
        this.setState({
            selItem: [
                ...this.state.selItem.slice(0, index),
                ...this.state.selItem.slice(index + 1)
            ]
        });

        //删除相应的搜索条件
        this.props.delSearchData(item);
    }

    deleteAllItem = () => {
        this.setState({
            selItem: []
        });

        this.props.addSearchData("postionTabIndex", this.props.states.postionTabIndex, false);

        this.props.searchArray.map((item, index) => {
            item && this.props.addSearchData(item, "", true);
        });
    }
    
    render() {
        const { searchArr, allArr,showSearch } = this.props;
		let placehold = "";
		if(showSearch&&showSearch.indexOf(11)){
			placehold = "输入职位名称";
		}else{
			placehold = "输入关键字";
		}
        const SearchSelectComponent = (
            searchArr.map((item, index) => {
                return(
                    <React.Fragment key={ index }>
                        {  
                            (Object.keys(item) == 10 || Object.keys(item) == 11) &&
                                <SearchSelect
                                    defaultKey={Object.keys(item)}
                                    addSearchData={this.props.addSearchData}
                                    postListArr={this.props.postListArr}
                                    addSetItem={this.addSetItem}
                                    placehold={placehold}
                                />
                            }
                        </React.Fragment>
                )
            })
        )
        return (
            <div className="index-search-box clearfix">
                {
                    searchArr.length > 0 &&
                        <React.Fragment>
                            <div className="clearfix">
                                <div className="pulldown-box clearfix" style={{height:this.state.showPull?"auto":"46px"}}>
                                    {
                                        searchArr.map((item, index) => {
                                            return (
                                                <React.Fragment key={index}>
                                                    {
                                                        (Object.keys(item) == 10 || Object.keys(item) == 11) ?
                                                            ""
                                                            :
                                                            <SelectComponent
                                                                states={this.props.states}
                                                                defaultKey={Object.keys(item)}
                                                                defaultValue={Object.values(item)}
                                                                postListArr={this.props.postListArr}
                                                                addSetItem={this.addSetItem}
                                                                len={searchArr.length}
                                                            />
                                                    }
                                                </React.Fragment>
                                            )
                                        })
                                    }
                                </div>
                                {SearchSelectComponent}
                                <button
                                    className="search-btn"
                                    style={{backgroundColor: localStorage.themeColor,
                                        boxShadow: "1px 1px 10px "+ hex2Rgba(localStorage.themeColor, "0.3")}}
                                    onClick={() =>
                                        this.props.positionResultAjax(
                                            this.props.states.postionTabIndex,
                                            this.props.states.keyWord,
                                            this.props.states.positionName,
                                            this.props.states.workPlace,
                                            this.props.states.positionType,
                                            this.props.states.workType,
                                            this.props.states.releaseTimeCode,
                                            this.props.states.salaryType,
                                            this.props.states.orgCode,
                                            this.props.states.rowSize,
                                            this.props.states.currentPage
                                        )
                                    }
                                >
                                    搜&nbsp;&nbsp;&nbsp;&nbsp;索
                                </button>
                            </div>
                            <div style={{display: "none"}}>
                            	<span className="show_pull" style={{display:this.state.showPull?"none":"block"}} onClick={this.handleShowPull}><Icon type="down" /></span>
                            	<span className="show_pull" style={{display:this.state.showPull?"block":"none"}} onClick={this.handleShowPull}><Icon type="up" /></span>
                            </div>
                            <ScreeningEntries
                                deleteIcon={deleteIcon}
                                selItem={this.state.selItem}
                                deleteSingleItem={this.deleteSingleItem}
                                deleteAllItem={this.deleteAllItem}
                            />
                        </React.Fragment>
                }
            </div>
        )
    }
}

export default IndexSearch;
