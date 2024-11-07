import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import TreeNode from '../components/TreeNode';
import { TreeProvider } from '../context/TreeContext';

it('should render and toggle checkbox on click', () => {
    // Example of mock data
    const nodeData = {
        id: 'node1',
        label: 'Node 1',
        children: [
            { id: 'node1-1', label: 'Child Node 1-1', children: [] },
            { id: 'node1-2', label: 'Child Node 1-2', children: [] },
        ],
    };

    const { getByTestId } = render(
        <MemoryRouter>
            <TreeProvider>
                <TreeNode node={nodeData} />
            </TreeProvider>
        </MemoryRouter>
    );

    const checkbox = getByTestId('checkbox') as HTMLInputElement;

    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(true);

    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(false);
});
