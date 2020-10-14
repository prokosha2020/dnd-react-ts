import React from "react";
export type Tcolumn = {
    id: string;
    title: string;
    taskIds: string[];
}
export interface IFinitialData {
    _id: string;
    columns: { [key: string]: Tcolumn };
    tasks: iTasks;
    columnOrder: string[];
    status: string[];
    markColor: string[];
};
export interface iTasks {
    [key: string]: Itask
}
export interface Itask {
    title: string;
    content: string;
    id: string;
    status: string;
    mark: { titleMark: string; bgMark: string };
};
export type InnerListProps = {
    column: Tcolumn;
    taskMap: any;
    index: number;
};
export interface Icontext {
    editTask: (id: string) => void;
    status: string[];
    marks: string[];
    openDrawerWithStatus: (
        e: React.MouseEvent<HTMLElement>,
        status: string
    ) => void;
}
export interface IPropsSelect {
    task: Itask,
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void,
}
export interface IPropsTask {
    task: Itask,
    index: number
}
export type isDraggingStylesProps = {
    isDragging: boolean
}
export type isDraggingOverStylesProps = {
    isDraggingOver: boolean
}
export interface IPropsNewTask {
    currentColumn: string;
    currentTask: any;
    isActiveDrawer: boolean;
    saveTask: (item: Itask, flag: string) => void;
    toggleActiveDrawer: (e: React.MouseEvent<HTMLElement>) => void
}
export type ImgSpinnerProps = {
    width: string;
    height: string
}
export interface IPropsMark {
    task: Itask;
    onChange: ({
        target,
    }: React.ChangeEvent<
        HTMLInputElement
    >) => void;

}
export interface IPropsFilter {
    updateFilter: (value: string) => void;
    toggleActiveSearch: () => void;

}
export interface IPropsColumn {
    tasks: Array<Itask>;
    column: Tcolumn;
    index: number
}
export interface IPropsInnnerListColumn {
    tasks: Array<Itask>;
}
export interface IPropsCustomButton {
    classBtn: string,
    onClick: (e?: any) => void;
}