import React, { Component } from "react";
import NewModifyPwdCp from "../../../components/NewModifyPwdCp";

class Newmodifypwd extends Component {
    componentDidMount() {
        document.title = "修改密码";
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