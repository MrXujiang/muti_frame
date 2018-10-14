import React, { Component } from "react";
import { getQueryString } from "../../../utils/common";
import { get } from "../../../fetch/get";

class Index extends Component {
    state = {
        menuContent: ""
    }

    componentDidMount() {
        const redirects = getQueryString(window.location.href);
        get("/auth/common/column").then(response => response.json()).then(res => {
            res.data.map(item => {
                if(redirects.id == item.id){
                    this.setState({
                        menuContent: item.content
                    })
                }
            })
        })
    }

    render() {
        return (
            <div className="menu-content-box" dangerouslySetInnerHTML={{__html: this.state.menuContent}}></div>
        )
    }
}

export default Index;
