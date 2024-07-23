const Modal = ({ show, onClose, title, children }) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-4 shadow-lg w-1/3" style={{ marginTop: '-10%' }}>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">{title}</h2>
                    <button onClick={onClose} className="text-gray-700">&times;</button>
                </div>
                <div>{children}</div>
                <div className="text-right mt-4">
                    <button onClick={onClose} className="px-4 py-2 bg-blue-500 text-white rounded-md">Close</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
