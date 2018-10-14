import React, { Component } from "react";
import ModifyPwdCp from "../../../components/ModifyPwdCp";
import { Modal } from "antd";
import {
    verifyOldPwd,
    changeNewPwd
} from "../../../fetch/passwordmanage/modifypwd";
import { confirmBox } from "../../../utils/common";

class ModifyPwd extends Component {
    state = {
        oldState: {
            index: 0,
            mes: ""
        },
        newState: {
            index: 0,
            mes: "",
            describe: ""
        },
        comState: {
            index: 0,
            mes: ""
        }
    }

    handleCancel = () => {
        window.location.href = "./signin.html";
    }

    handleSave = (oldVal, newVal, comVal) => {
        const oldpwdResult = verifyOldPwd({
            "oldPass": oldVal
        }, data => {
            if (data.state == 500) {
                this.setState({
                    oldState: {
                        index: 2,
                        mes: data.data
                    },
                    newState: {
                        index: 0,
                        describe: ""
                    },
                    comState: {
                        index: 0,
                        mes: ""
                    }
                });
            }

            if (data.state == 200) {
                this.setState({
                    oldState: {
                        index: 1,
                        mes: ""
                    }
                });

                if (newVal != comVal) {
                    this.setState({
                        newState: {
                            index: 0,
                            describe: ""
                        },
                        comState: {
                            index: 2
                        }
                    });
                } else {
                    changeNewPwd({
                        oldPass: oldVal,
                        newPass: newVal
                    }, data => {
                        if (data.state == 500) {
                            this.setState({
                                newState: {
                                    index: 2,
                                    describe: data.data
                                },
                                comState: {
                                    index: 0
                                }
                            });
                        }

                        if (data.state == 200) {
                            this.setState({
                                newState: {
                                    index: 1,
                                    describe: ""
                                },
                                comState: {
                                    index: 1,
                                    mes: ""
                                }
                            });

							confirmBox({content:data.data});
                            setTimeout(() => {
                                window.location.href = "./home.html";
                            }, 1000);
                        }
                    });
                }
            }
        });
    }

    render() {
        return (
            <div className="modify-password-wrap">
                <ModifyPwdCp
                    oldState={this.state.oldState}
                    newState={this.state.newState}
                    comState={this.state.comState}
                    handleCancel={this.handleCancel}
                    handleSave={this.handleSave}
                />
            </div>
        )
    }
}

export default ModifyPwd;