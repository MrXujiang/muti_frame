import React, { Component } from "react";
import PositionTitle from "./subpages/positionTitle";
import PositionContent from "./subpages/positionContent";

import "./styles";

const PositionList = props => {
    return (
        <div className="position-list-box">
            <div className="list-line"></div>
            <PositionTitle
                addSearchData={ props.addSearchData }
                positionResultAjax={ props.positionResultAjax }
                states={ props.states }
                judgeLoading={ props.judgeLoading }
            >
                <PositionContent
                    positionListArr={ props.positionListArr }
                    openLink={ props.openLink }
                    isLoading={ props.isLoading }
                    states={ props.states }
                    name="进行中职位"
                />
                <PositionContent 
                    positionListArr={ props.positionListArr }
                    isLoading={ props.isLoading }
                    states={ props.states }
                    name="历史职位"
                />
            </PositionTitle>
        </div>
    );
}

export default PositionList;
