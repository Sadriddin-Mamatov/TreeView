// src/types.ts

export interface TreeNodeType {
    id: string;
    label: string;
    children?: TreeNodeType[];
}

export interface TreeNodeProps {
    node: TreeNodeType;
}
