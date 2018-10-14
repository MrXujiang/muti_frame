import React, { Component } from "react";
import { Tabs } from 'antd';

const { TabPane } = Tabs;

class positionTitle extends Component {
    positionResultHandle = (index) => {
        this.props.addSearchData("postionTabIndex", index, true);
        this.props.positionResultAjax(
            index,
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
        );
    }

    render() {
        const {
            children,
            positionListArr
         } = this.props;

        return (
            <div className="position-title-box">
                <Tabs 
                    className="tabs-box"
                    closable={ false }
                    animated={ false }
                    onTabClick={ this.positionResultHandle }
                >
                    {
                        children.map((item, index) => {
                            return(
                                <TabPane 
                                    tab={
                                        <React.Fragment>
                                            {item.props.name}
                                            <p className="tab-bar-line-fixed" style={{backgroundColor: localStorage.themeColor}}></p>
                                        </React.Fragment>
                                    } 
                                    key={ index }
                                    positionListArr={ positionListArr }
                                    forceRender={ false }
                                >
                                    { item }
                                </TabPane>
                            );
                        })
                    }
                </Tabs>
                <div className="pagenum-show-box">
                    共<span style={{color: localStorage.themeColor}}>{ this.props.states.totalPage }</span>页，
                    共<span style={{color: localStorage.themeColor}}>{ this.props.states.rowCount }</span>条数据
                </div>
            </div>
        );
    }
}

export default positionTitle;
