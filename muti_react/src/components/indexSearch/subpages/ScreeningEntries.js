import React from "react";
import { Tag } from "antd";

const ScreeningEntries = ({ 
    deleteIcon, 
    selItem,
    deleteSingleItem,
    deleteAllItem
}) => (
    <div className="screening-entries-box clearfix">
        {
            selItem.map((item, index) => (
                <Tag
                    key={ index }
                    color={localStorage.themeColor || "#18bae2"}
                >
                    <span className="tags">
                        { item.name }
                        <strong
                            onClick={ () => deleteSingleItem(item, index) }
                        >
                            <img src={ deleteIcon } alt="暂无图片" />
                        </strong>
                    </span>
                </Tag>
            ))
        }
        <div 
            className="clearall"
            onClick={ deleteAllItem }
            style={{
                display : selItem.length > 0 ? "block" : "none"
            }}
        >
            清除所有选项
        </div>
    </div>
);

export default ScreeningEntries;
