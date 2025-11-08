import React from 'react';
import { Member } from '../types';
import { QRCodeSVG } from 'qrcode.react';
import { XIcon } from './icons/XIcon';

interface QrCodeModalProps {
    member: Member;
    onClose: () => void;
}

const QrCodeModal: React.FC<QrCodeModalProps> = ({ member, onClose }) => {
    return (
        <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="qr-code-title"
        >
            <div 
                className="relative bg-gray-900/80 border border-gray-700 rounded-2xl shadow-2xl w-full max-w-xs p-8 text-white text-center animate-fade-in-up"
                onClick={(e) => e.stopPropagation()}
            >
                <button 
                    onClick={onClose} 
                    className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                    aria-label="Cerrar modal"
                >
                    <XIcon className="h-6 w-6" />
                </button>
                
                <h2 id="qr-code-title" className="text-xl font-bold text-cyan-400 truncate">{member.name} {member.lastName}</h2>
                <p className="font-mono text-sm text-gray-400 mt-1 mb-6">{member.memberId}</p>

                <div className="bg-white p-4 rounded-lg inline-block">
                    <QRCodeSVG value={member.memberId} size={200} />
                </div>
                
                <div className="mt-8">
                    <button
                        onClick={onClose}
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-8 rounded-full transition-transform transform hover:scale-105 duration-300"
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default QrCodeModal;
