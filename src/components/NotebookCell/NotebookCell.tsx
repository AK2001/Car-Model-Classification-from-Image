import React, {useEffect} from "react";
import './NotebookCell.css'

export default function NotebookCell({tableRow}: {
    tableRow: React.ReactNode | React.ReactNode[];
}){

    try {
        useEffect(() => {
            const lines = document.querySelectorAll(".line-number")
            lines.forEach((line, index) => {
                line.innerHTML = String(index + 1);
            });
        }, [])
    }catch (err){
        console.error(err)
    }

    return (
        <div className="cell" >
            <table>
                <tbody>
                    {tableRow}
                </tbody>
            </table>
        </div>
)};