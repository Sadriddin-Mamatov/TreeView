import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter
import TreeNode from '../components/TreeNode'; // Adjust the import path for TreeNode
import { TreeProvider } from '../context/TreeContext'; // Adjust the import for your context

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

    // Render the component wrapped in both TreeProvider and MemoryRouter
    const { getByTestId } = render(
        <MemoryRouter>
            <TreeProvider>
                <TreeNode node={nodeData} />
            </TreeProvider>
        </MemoryRouter>
    );

    // Now you can safely interact with the component as it has access to location and routing context
    const checkbox = getByTestId('checkbox') as HTMLInputElement;

    // Fire events to toggle the checkbox and check the result
    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(true);  // Checkbox should be checked after click

    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(false); // Checkbox should be unchecked after second click
});
