import { LayoutGrid, Table } from "lucide-react";
import React, { FC } from "react";

interface LeaveCategoryProps {
    categories: string[];
    selectedCategory: string;
    setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
}

export const LeaveCategory: FC<LeaveCategoryProps> = ({ categories, selectedCategory, setSelectedCategory }) => {
    return (
        <div className="flex gap-3">
            <div>
                <div
                    className={
                        `${selectedCategory.length === 0 
                        ? "bg-green-50 border-color-base text-color-base dark:bg-dark-main" 
                        : "border-gray-300 text-gray-600 dark:text-white"} 
                        px-4 py-2 rounded-2xl border cursor-pointer text-sm flex gap-2 items-center`}
                    onClick={() => setSelectedCategory('')}
                >
                    <LayoutGrid/> Grid
                </div>
            </div>
            {categories.map((val: string, i:number) => {
                return (
                    <div key={i}>
                        <div
                            onClick={() => setSelectedCategory(val)}
                            className={
                                `${selectedCategory === val 
                                ? "bg-green-50 border-color-base text-color-base dark:bg-dark-main" 
                                : "border-gray-300 text-gray-600 dark:text-white"} 
                                px-4 py-2 rounded-2xl border cursor-pointer text-sm flex gap-2 items-center`}
                        >
                            <Table/> {val}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}