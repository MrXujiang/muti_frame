import React, { Component } from "react";
import NewModifyPwdCp from "../../../components/NewModifyPwdCp";

class Newmodifypwd extends Component {
    componentDidMount() {
        document.title = "修改密码";
//      document.getElementsByClassName("index-header-box")[0].style.display="none";
    }
    
    render() {
        return(
            <div className="newmodify-password-wrap">
                <NewModifyPwdCp />
            </div>
        )
    }
}

export default Newmodifypwd;