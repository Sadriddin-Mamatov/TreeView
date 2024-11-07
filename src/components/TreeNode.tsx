import React, { useState } from 'react';
import { useTreeContext } from '../context/TreeContext';
import Checkbox from './Checkbox';
import { TreeNodeProps } from '../types';
import { MdOutlineKeyboardArrowRight , MdOutlineKeyboardArrowDown } from "react-icons/md"

const TreeNode: React.FC<TreeNodeProps> = ({ node }) => {
    const { toggleSelect, getParentCheckboxState } = useTreeContext();
    const [isExpanded, setIsExpanded] = useState(false);

    const handleExpandToggle = () => setIsExpanded(!isExpanded);
    const parentCheckboxState = getParentCheckboxState(node);

    const handleCheckboxChange = () => {
        toggleSelect(node);
    };

    return (
        <div className="bg-gray-100 border-r border-gray-300 p-2 max-h-screen w-[320px] overflow-y-auto custom-scrollbar">
            <div className="flex items-center p-2 hover:bg-gray-200 transition-colors duration-200 ease-in-out">
                <button
                    onClick={handleExpandToggle}
                    className="w-5 h-5 mr-2 text-gray-600 focus:outline-none"
                >
                    {isExpanded ? <MdOutlineKeyboardArrowDown /> : <MdOutlineKeyboardArrowRight />}
                </button>
                <Checkbox
                    checked={parentCheckboxState === 'checked'}
                    indeterminate={parentCheckboxState === 'indeterminate'}
                    onChange={handleCheckboxChange}
                />
                <span className="text-gray-800 font-medium">{node.label}</span>
            </div>

            {isExpanded && node.children && (
                <div className="pl-6">
                    {node.children.map((child) => (
                        <TreeNode key={child.id} node={child} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default TreeNode;
