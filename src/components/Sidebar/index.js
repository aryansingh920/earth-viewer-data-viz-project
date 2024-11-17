import React from 'react';
import { ArrowLeftRight } from 'lucide-react';
import './Sidebar.css';

function Sidebar({ position, isOpen, onToggle, children, title }) {
    return (
        <div className={`sidebar ${position} ${isOpen ? 'open' : ''}`}>
            <div className="sidebar-toggle" onClick={onToggle}>
                <ArrowLeftRight size={16} />
            </div>
            <div className="sidebar-content">
                <div className="sidebar-header">
                    <h3>{title}</h3>
                </div>
                {children}
            </div>
        </div>
    );
}

export default Sidebar;

