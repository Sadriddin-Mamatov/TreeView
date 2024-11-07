import React from 'react';
import { TreeProvider } from './context/TreeContext';
import TreeNode from './components/TreeNode';
import "./App.css"

const mockData = {
    id: 'root',
    label: 'Root Node',
    children: [
        {
            id: 'child1',
            label: 'Child 1',
            children: [
                { id: 'child1-1', label: 'Child 1-1' },
                { id: 'child1-2', label: 'Child 1-2' },
                { id: 'child1-3', label: 'Child 1-3' },
            ],
        },
        {
            id: 'child2',
            label: 'Child 2',
            children: [
                {
                    id: 'child2-1',
                    label: 'Child 2-1',
                    children: [
                        { id: 'child2-1-1', label: 'Child 2-1-1' },
                        { id: 'child2-1-2', label: 'Child 2-1-2' },
                    ],
                },
                { id: 'child2-2', label: 'Child 2-2' },
            ],
        },
    ],
};

const App: React.FC = () => {
    return (
        <TreeProvider>
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">Treeview with Checkboxes</h1>
                <TreeNode node={mockData} />
            </div>
        </TreeProvider>
    );
};

export default App;
