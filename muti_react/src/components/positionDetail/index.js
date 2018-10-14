import React from "react";
import { Modal, Button } from "antd";
import { setNewHtml, hex2Rgba,confirmBox } from "../../utils/common";
import "./styles";

const PositionDetail = ({ positionListArr, openLink, id, showBtn="none" }) => {
    const handleOk = () => {
        localStorage.setItem("tab","1");
        openLink("/resolve", id);
    }

    const handleLink = (flag) => {
    	if(!flag){
			localStorage.setItem("tab","1");
        	openLink("/resolve", id);
		}else{
	  		confirmBox({content:"HR未接受简历前，系统会隐藏联系方式哦！",onOk:function(){
	  			localStorage.setItem("tab","1");
                setTimeout(() => {
                    openLink("/resolve", id);
                }, 300)
	  		}});
		}
    }
    
    return(
        <React.Fragment>
            <div className="position-detail-box">
                <div className="meta">
                    工作职责
                </div>
                <div 
                    className="meta-tail"
                    dangerouslySetInnerHTML={ setNewHtml(positionListArr.workContent) }
                >
                </div>
                <div className="meta">
                    工作要求
                </div>
                <div 
                    className="meta-tail"
                    dangerouslySetInnerHTML={ setNewHtml(positionListArr.serviceCondition) }
                >
                </div>
                <div className="meta">
                    职位备注
                </div>
                <div 
                    className="meta-tail"
                    dangerouslySetInnerHTML={ setNewHtml(positionListArr.postRemark) }
                >
                </div>
                <div
                    className="positiondetail-rec-box"
                    style={{
                        'display': showBtn
                    }}
                >
                </div>
                <div
                    className="positiondetail-recommend-resume"
                    onClick={ ()=>handleLink(positionListArr.headhunterHideContact) }
                    style={{
                        'display': showBtn,
                        "backgroundColor": localStorage.themeColor,
                        boxShadow: "1px 1px 10px "+ hex2Rgba(localStorage.themeColor, "0.3")
                    }}
                >
                    推荐简历
                </div>
            </div>
        </React.Fragment>
    )
}

export default PositionDetail;
