import React, { useState, useEffect } from 'react';
import { Page, Member } from '../types';
import Logo from './Logo';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';

interface ScannerPageProps {
    navigateTo: (page: Page) => void;
    onRecordVisit: (memberId: string) => Member | null;
}

const ScannerPage: React.FC<ScannerPageProps> = ({ navigateTo, onRecordVisit }) => {
    const [memberIdInput, setMemberIdInput] = useState('');
    const [scannedMember, setScannedMember] = useState<Member | null>(null);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    useEffect(() => {
        // FIX: The return type of setTimeout in the browser is `number`, not `NodeJS.Timeout`.
        let timer: number;
        if (status !== 'idle') {
            timer = setTimeout(() => {
                setStatus('idle');
                setScannedMember(null);
                setMessage('');
                setMemberIdInput('');
            }, 4000);
        }
        return () => clearTimeout(timer);
    }, [status]);

    const handleVerify = () => {
        const member = onRecordVisit(memberIdInput);
        if (member) {
            setScannedMember(member);
            setStatus('success');
            setMessage('¡Acceso Concedido!');
        } else {
            setScannedMember(null);
            setStatus('error');
            setMessage('Acceso Denegado. Socio no encontrado.');
        }
    };
    
    const getStatusStyles = () => {
        switch (status) {
            case 'success':
                return {
                    borderColor: 'border-green-500',
                    textColor: 'text-green-400',
                    bgColor: 'bg-green-900/50',
                };
            case 'error':
                 return {
                    borderColor: 'border-red-500',
                    textColor: 'text-red-400',
                    bgColor: 'bg-red-900/50',
                };
            default:
                 return {
                    borderColor: 'border-cyan-500',
                    textColor: 'text-cyan-400',
                    bgColor: 'bg-gray-900/50',
                };
        }
    };
    
    const styles = getStatusStyles();

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-[#0a0f2c] to-[#101847]">
            <div className="absolute top-4 left-4">
                <button onClick={() => navigateTo('home')} className="flex items-center gap-2 text-cyan-400 hover:text-cyan-200 transition-colors">
                    <ArrowLeftIcon className="h-5 w-5" />
                    Volver
                </button>
            </div>
             <div className="w-full max-w-md">
                <div className="text-center mb-8">
                   <Logo className="h-20 w-20 mx-auto" />
                   <h2 className="text-3xl font-bold text-white mt-4">Control de Acceso</h2>
                   <p className="text-gray-400 mt-1">Verificar QR de socio</p>
                </div>

                <div className={`relative border-2 ${styles.borderColor} rounded-2xl p-8 shadow-2xl transition-all duration-300 ${styles.bgColor}`}>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <input 
                            type="text" 
                            value={memberIdInput}
                            onChange={(e) => setMemberIdInput(e.target.value.toUpperCase())}
                            onKeyDown={(e) => e.key === 'Enter' && handleVerify()}
                            placeholder="Introduce o escanea el Nº Socio" 
                            className="flex-grow bg-gray-800 border border-gray-600 rounded-md py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 font-mono" 
                            disabled={status !== 'idle'}
                        />
                        <button 
                            onClick={handleVerify}
                            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-md transition-colors disabled:bg-gray-600"
                            disabled={status !== 'idle' || !memberIdInput}
                        >
                            Verificar
                        </button>
                    </div>

                    <div className="mt-8 text-center min-h-[120px] flex flex-col justify-center">
                        {status === 'idle' && <p className="text-gray-500">Esperando verificación...</p>}
                        {status !== 'idle' && (
                            <div className="animate-fade-in">
                                <h3 className={`text-3xl font-bold ${styles.textColor}`}>{message}</h3>
                                {scannedMember && (
                                    <>
                                        <p className="text-xl text-white mt-2">{scannedMember.name} {scannedMember.lastName}</p>
                                        <p className="text-sm text-gray-400 font-mono">{scannedMember.memberId}</p>
                                        <p className="text-sm text-gray-300 mt-2">Visitas totales: <span className={`font-bold text-lg ${styles.textColor}`}>{scannedMember.visitCount}</span></p>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ScannerPage;