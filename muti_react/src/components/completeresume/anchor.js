import React from "react";
import { Anchor } from 'antd';
import { hex2Rgba } from '../../utils/common';

const { Link } = Anchor;

function  AnchorWrap(props) {
	return (
		<Anchor affix={false} offsetTop={150}>
    		{
    			props.resumeTemplate.map((item) => {
    				const titleNode = (
    					<React.Fragment>
    						<p className="anchor-link-text" style={{
		    					color: "rgba(0, 0, 0, 0.65)"
		    				}}>
		    					{item.name}
		    					{item.required && props.isNeedRequired?<span style={{color: "red"}}>*</span>:""}
	    					</p>
		    				<p className="anchor-link-text-active" style={{
		    					color: localStorage.themeColor,
		    					borderLeftColor: localStorage.themeColor,
		    					backgroundColor: hex2Rgba(localStorage.themeColor, "0.05")
		    				}}>
		    					{item.name}
		    					{item.required && props.isNeedRequired?<span style={{color: "red"}}>*</span>:""}
	    					</p>
	    				</React.Fragment>
	    			)
    				return (
    					<Link key={item.id+""}
    						href={`#${item.id}`}
    						title={titleNode} />
    				)
    			})
    		}
		</Anchor>
	)
}

export default AnchorWrap;