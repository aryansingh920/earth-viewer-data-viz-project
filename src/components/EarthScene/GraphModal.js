import React from 'react';
import { X } from 'lucide-react';
import { Html } from '@react-three/drei';

function GraphModal({ title, imageData, onClose }) {
    return (
        <Html fullscreen style={{ pointerEvents: 'none' }}>
            <div className="modal-overlay" onClick={onClose} style={{ pointerEvents: 'auto' }}>
                <div className="modal-content" onClick={e => e.stopPropagation()}>
                    <div className="modal-header">
                        <h3>{title}</h3>
                        <button className="close-button" onClick={onClose}>
                            <X size={24} />
                        </button>
                    </div>
                    <div className="modal-body">
                        <img
                            src={`data:image/png;base64,${imageData}`}
                            alt={title}
                            style={{
                                maxWidth: '100%',
                                maxHeight: 'calc(90vh - 100px)',
                                objectFit: 'contain'
                            }}
                        />
                    </div>
                </div>
            </div>
        </Html>
    );
}

export default GraphModal;
