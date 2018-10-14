import React, { Component } from "react";
import { Menu, Icon, Dropdown } from "antd";

class MenuComponent extends Component{
	state = {
        activeKey:"1"
    }
	
	openCustomLink = (item,key) => {
        if(item.type === 16){
            window.open(item.hrefUrl);
        }else{
            window.open("./menuContent.html?id="+ item.id);
        }
        localStorage.setItem("activeKey",key);
        this.setState({
        	activeKey:key
        })
    }
	
	open=(url,key)=>{
		this.props.openOuterLink(url);
		localStorage.setItem("activeKey",key);
		this.setState({
			activeKey:key
		})
	}
	
	componentDidMount() {
		let k = "1";
		if(location.href.indexOf("home.html")>0){
			k = "1";
		}else if(location.href.indexOf("candidate.html")>0){
			k = "2";
		}else if(location.href.indexOf("recrecord.html")>0){
			k = "3";
		}else if(location.href.indexOf("announcement.html")>0){
			k = "4";
		}
		this.setState({
			activeKey: k
		})
	}
	
	render(){
		const _this = this;
		let titleIndex = this.props.titleIndex?this.props.titleIndex:-1;
		let menuListItem = [], customMenuList = [];
		this.props.menuList.map(item => {
			switch(item.id) {
	            case 14:
	                menuListItem.push(
	                    <Menu.Item 
	                        key="1"
	                        style={{color:_this.state.activeKey==="1"?_this.props.textColor:"rgba(0,0,0,.65)", fontWeight: "normal"}}
	                        onClick={ () => _this.open("./home.html","1") }
	                    >
	                        {item.name}
	                    </Menu.Item>
	                );
	                break;
	            case 15:
	                menuListItem.push(
	                    <Menu.Item 
	                        key="2"
	                        style={{color:_this.state.activeKey==="2"?_this.props.textColor:"rgba(0,0,0,.65)", fontWeight: "normal"}}
	                        onClick={() => _this.open("./candidate.html","2") }
	                    >
	                        {item.name}
	                    </Menu.Item>
	                );
	                break;
	            case 16:
	                menuListItem.push(
	                    <Menu.Item 
	                        key="3"
	                        style={{color:_this.state.activeKey==="3"?_this.props.textColor:"rgba(0,0,0,.65)", fontWeight: "normal"}}
	                        onClick={ () => _this.open("./recrecord.html","3") }
	                    >
	                        {item.name}
	                    </Menu.Item>
	                );
	                break;
	            case 17:
	                menuListItem.push(
	                    <Menu.Item 
	                        key="4"
	                        style={{color:_this.state.activeKey==="4"?_this.props.textColor:"rgba(0,0,0,.65)", fontWeight: "normal"}}
	                        onClick={ () => _this.open("./announcement.html#/","4") }
	                    >
	                        {item.name}
	                    </Menu.Item>
	                );
	                break;
	            default: 
	            	customMenuList.push(
	            		<Menu.Item 
	                        key={item.id}
	                        style={{color:"rgba(0,0,0,.65)", fontWeight: "normal"}}
	                        onClick={ () => _this.openCustomLink(item,item.id) }
	                    >
	                    	<a><span className="munu-item">{item.name}</span></a>
	                    </Menu.Item>
	            	)
	        }
	    })
	    // 有自定义的菜单话 
	    if(this.props.menuList.length>5){
	    	const customMenuWrap = <Menu>{customMenuList}</Menu>;
	    	menuListItem.push(
                <Menu.Item 
                    key="custom"
                    style={{color: "rgba(0,0,0,.65)", fontWeight: "bold"}}
                >
                    <Dropdown overlay={customMenuWrap} trigger={['click']}
                    	onVisibleChange={this.props.fixedDropdown}>
					    <span className="header-menu-icon"><Icon type="ellipsis" /></span>
				  	</Dropdown>
                </Menu.Item>
            )
	    }
		return (
			<Menu
	            className="header-menu"
	            theme="light"
	            mode="horizontal"
	            defaultSelectedKeys={[...titleIndex]}
	            style={{
	                lineHeight: '69px'
	            }}
	        >
	            { menuListItem }
	        </Menu>
		)
	}
	
}

export default MenuComponent;