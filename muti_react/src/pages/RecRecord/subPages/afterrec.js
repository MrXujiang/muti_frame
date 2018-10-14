import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Icon } from "antd";

const Afterrec = () => (
    <div className="after-rec-wrap">
        <div className="after-rec-box">
            <div className="after-icon">
                <Icon 
                    type="check-circle-o"
                    style={{
                        fontSize: "83px",
                        height: "83px",
                        textAlign: "center",
                        color: "#18BAE2"
                    }}
                />
                <p className="message">
                    推荐完成，您可以后续在系统
                    <Link to="/recommenndrecord">
                        推荐记录
                    </Link>
                    中查看结果
                </p>
                <div className="other-mes">
                    系统也会推送结果消息给到您~
                </div>
                <div className="btn-box">
                    <button className="cancel">好的</button>
                    <button className="save">继续推荐</button>
                </div>
            </div>
        </div>
    </div>
);

export default Afterrec;