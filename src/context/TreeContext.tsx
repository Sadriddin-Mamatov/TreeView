import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { TreeNodeType } from '../types';

interface TreeContextProps {
    selectedNodes: Set<string>;
    toggleSelect: (node: TreeNodeType) => void;
    getParentCheckboxState: (node: TreeNodeType) => 'checked' | 'indeterminate' | 'unchecked';
}

const TreeContext = createContext<TreeContextProps | undefined>(undefined);

export const TreeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const location = useLocation();
    const navigate = useNavigate();
    const [selectedNodes, setSelectedNodes] = useState<Set<string>>(new Set());

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const selectedIds = queryParams.get('selected')?.split(',') || [];
        setSelectedNodes(new Set(selectedIds));
    }, [location.search]);

    const toggleSelect = useCallback((node: TreeNodeType) => {
        const newSelectedNodes = new Set(selectedNodes);

        const toggleRecursive = (node: TreeNodeType, isSelected: boolean) => {
            if (isSelected) newSelectedNodes.add(node.id);
            else newSelectedNodes.delete(node.id);

            if (node.children) {
                node.children.forEach((child) => toggleRecursive(child, isSelected));
            }
        };

        const isNodeSelected = selectedNodes.has(node.id);
        toggleRecursive(node, !isNodeSelected);

        setSelectedNodes(newSelectedNodes);

        const queryParams = new URLSearchParams(location.search);
        queryParams.set('selected', Array.from(newSelectedNodes).join(','));
        navigate({ search: queryParams.toString() }, { replace: true });
    }, [selectedNodes, location.search, navigate]);

    const getParentCheckboxState = useCallback(
        (node: TreeNodeType): 'checked' | 'indeterminate' | 'unchecked' => {
            const hasChildren = node.children && node.children.length > 0;
            if (!hasChildren) return selectedNodes.has(node.id) ? 'checked' : 'unchecked';

            const allChildrenSelected = node.children!.every((child) => selectedNodes.has(child.id));
            const someChildrenSelected = node.children!.some((child) => selectedNodes.has(child.id));

            if (allChildrenSelected) return 'checked';
            if (someChildrenSelected) return 'indeterminate';
            return 'unchecked';
        },
        [selectedNodes]
    );


    return (
        <TreeContext.Provider value={{ selectedNodes, toggleSelect, getParentCheckboxState }}>
            {children}
        </TreeContext.Provider>
    );
};

export const useTreeContext = () => {
    const context = useContext(TreeContext);
    if (!context) throw new Error('useTreeContext TreeProvider ichida ishlatilishi kerak');
    return context;
};
