import React from 'react';
import { Member } from '../types';
import { QRCodeSVG } from 'qrcode.react';
import { XIcon } from './icons/XIcon';

interface MemberDetailsModalProps {
    member: Member;
    onClose: () => void;
}

const MemberDetailsModal: React.FC<MemberDetailsModalProps> = ({ member, onClose }) => {
    return (
        <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="member-details-title"
        >
            <div 
                className="relative bg-gray-900/80 border border-gray-700 rounded-2xl shadow-2xl w-full max-w-md p-6 sm:p-8 text-white animate-fade-in-up"
                onClick={(e) => e.stopPropagation()}
            >
                <button 
                    onClick={onClose} 
                    className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                    aria-label="Cerrar modal"
                >
                    <XIcon className="h-6 w-6" />
                </button>
                
                <div className="text-center">
                    <h2 id="member-details-title" className="text-2xl sm:text-3xl font-bold text-cyan-400">{member.name} {member.lastName}</h2>
                    <p className="font-mono text-sm text-gray-400 mt-1">{member.memberId}</p>
                </div>

                <div className="my-8 flex justify-center bg-white p-4 rounded-lg">
                    <QRCodeSVG value={member.memberId} size={160} />
                </div>
                
                <div className="space-y-4 text-sm sm:text-base">
                    <div className="flex justify-between border-b border-gray-700/50 pb-2">
                        <span className="font-semibold text-gray-400">Total de Visitas</span>
                        <span className="font-bold text-lg text-cyan-400">{member.visitCount}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-700/50 pb-2">
                        <span className="font-semibold text-gray-400">DNI</span>
                        <span className="font-medium">{member.dni}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-700/50 pb-2">
                        <span className="font-semibold text-gray-400">Correo Electrónico</span>
                        <span className="font-medium">{member.email}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-semibold text-gray-400">Fecha de Nacimiento</span>
                        <span className="font-medium">{member.dob}</span>
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <button
                        onClick={onClose}
                        className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-8 rounded-full transition-transform transform hover:scale-105 duration-300"
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MemberDetailsModal;