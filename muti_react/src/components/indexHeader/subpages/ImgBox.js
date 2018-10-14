import React from "react";
import { Link } from "react-router-dom";

const ImgBox = ({ headerLogo,openOuterLink }) => (
    <div className="img-box">
        <span onClick={ () => openOuterLink("./home.html") }>
            <img className="headImg" src={headerLogo} alt="暂无图片" />
        </span>
    </div>
);

export default ImgBox;
