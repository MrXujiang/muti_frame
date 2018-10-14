import React, { Component } from "react";
import Resumedetail from "./subPages/resumedetail";
import Recommend from "./subPages/recommend";
import HrReplyCp from "../HrReplyCp";
import { hex2Rgba } from '../../utils/common';
import { Tabs } from 'antd';

import "./styles";

const { TabPane } = Tabs;

const CandidateContent = ({ 
    messageNum, 
    showReplyBox, 
    handleReplyBox,
    showCon,
    handleCon,
    data,
    showBlock
}) => {
    return (
        <div className="candidate-content-box">
            <Tabs
                closable={ false }
                animated={ false }
                defaultActiveKey="1"
                size="large"
            >
                <TabPane
                    tab={
                        <React.Fragment>
                            <span className="tab-text" style={{color: "rgba(0, 0, 0, 0.65)"}}>简历信息</span>
                            <span className="tab-text-active" style={{
                                color: localStorage.themeColor
                            }}>简历信息</span>
                            <span className="tab-text-bg" style={{
                                backgroundColor: hex2Rgba(localStorage.themeColor, "0.05")
                            }}></span>
                        </React.Fragment>
                    }
                    key="1"
                >
                    <Resumedetail 
                        messageNum={ messageNum }
                        showReplyBox={ showReplyBox }
                        handleReplyBox={ handleReplyBox }
                        showCon={ showCon }
                        handleCon={ handleCon }
                        data={data}
                    />
                </TabPane>
                <TabPane
                    tab={
                        <React.Fragment>
                            <span className="tab-text" style={{color: "rgba(0, 0, 0, 0.65)"}}>推荐评语</span>
                            <span className="tab-text-active" style={{
                                color: localStorage.themeColor
                            }}>推荐评语</span>
                            <span className="tab-text-bg" style={{
                                backgroundColor: hex2Rgba(localStorage.themeColor, "0.05")
                            }}></span>
                        </React.Fragment>
                    }
                    key="2"
                >
                    <Recommend data={data} />
                </TabPane>
            </Tabs>
            <HrReplyCp 
                showReplyBox={showReplyBox }
                handleReplyBox={handleReplyBox }
                showCon={showCon }
                handleCon={handleCon }
                showBlock={showBlock}
            />
        </div>
    )
}

export default CandidateContent;