import "./LoadingSpinner.css";

export default function LoadingSpinner() {

    return (
        <div className="lds-ellipsis">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
}