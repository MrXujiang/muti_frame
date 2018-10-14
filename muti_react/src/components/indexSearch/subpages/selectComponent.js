import React from "react";
import { Select, Menu, Dropdown, Icon } from "antd";

const { Option } = Select;

const SelectComponent = ({ 
    states, 
    addSetItem, 
    defaultKey, 
    defaultValue, 
    postListArr, 
    handleSetItem,
    searchTypeArrs,
    len
}) => {
    const onClicks = ({ key }) => {
        const showName = postListArr[defaultKey][key] && postListArr[defaultKey][key].showName;
        const showCode = postListArr[defaultKey][key] && postListArr[defaultKey][key].showCode;
        addSetItem(defaultKey, key, { name: showName, code: showCode });
    }
    const menu = (
        <Menu 
            onClick={ onClicks }
        >
            {
                postListArr[defaultKey].map((item, index) => (
                    <Menu.Item 
                        key={ index }
                    >
                        { item.showName }
                    </Menu.Item>
                ))
            }
        </Menu>
    );
	
    return (
        <Dropdown
            overlay={ menu } 
            trigger={['click']}
        >
            <span className="select-box" style={{width: len>4?"25%":"33%"}}>
                { defaultValue }
            </span>
        </Dropdown>
    );
}

export default SelectComponent;
