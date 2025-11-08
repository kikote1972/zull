import React, { useState, useEffect } from 'react';
import { Page, Member } from '../types';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import { PencilIcon } from './icons/PencilIcon';
import { QrCodeIcon } from './icons/QrCodeIcon';
import Logo from './Logo';
import MemberDetailsModal from './MemberDetailsModal';
import QrCodeModal from './QrCodeModal';

interface MembersListPageProps {
    navigateTo: (page: Page) => void;
    members: Member[];
    onEditMember: (member: Member) => void;
    onLogout: () => void;
}

const ITEMS_PER_PAGE = 10;

const MembersListPage: React.FC<MembersListPageProps> = ({ navigateTo, members, onEditMember, onLogout }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [viewingMember, setViewingMember] = useState<Member | null>(null);
    const [qrCodeMember, setQrCodeMember] = useState<Member | null>(null);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    const filteredMembers = members.filter(member => {
        const searchTermLower = searchTerm.toLowerCase();
        const fullName = `${member.name} ${member.lastName}`.toLowerCase();
        
        return (
            member.memberId.toLowerCase().includes(searchTermLower) ||
            fullName.includes(searchTermLower) ||
            member.dni.toLowerCase().includes(searchTermLower) ||
            member.email.toLowerCase().includes(searchTermLower)
        );
    });
    
    const totalPages = Math.ceil(filteredMembers.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedMembers = filteredMembers.slice(startIndex, startIndex + ITEMS_PER_PAGE);


    const handleExportCSV = () => {
        if (filteredMembers.length === 0) {
            return;
        }

        const headers = ["Nº Socio", "Nombre Completo", "DNI", "Correo Electrónico", "Fecha de Nacimiento", "Visitas"];
        const csvHeader = headers.join(',') + '\n';
        const csvRows = filteredMembers.map(member => {
            const row = [
                `"${member.memberId}"`,
                `"${member.name} ${member.lastName}"`,
                `"${member.dni}"`,
                `"${member.email}"`,
                `"${member.dob}"`,
                member.visitCount
            ];
            return row.join(',');
        }).join('\n');

        const csvContent = csvHeader + csvRows;
        const blob = new Blob([`\uFEFF${csvContent}`], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        const date = new Date().toISOString().split('T')[0];
        link.setAttribute('download', `socios_zull_the_club_${date}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const handleActionClick = (e: React.MouseEvent) => e.stopPropagation();
    
    return (
        <>
            <div className="min-h-screen bg-gradient-to-b from-[#0a0f2c] to-[#101847] p-4 sm:p-6 lg:p-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
                         <button onClick={() => navigateTo('home')} className="flex items-center gap-2 text-cyan-400 hover:text-cyan-200 transition-colors">
                            <ArrowLeftIcon className="h-5 w-5" />
                            Volver al Inicio
                        </button>
                        <div className="flex items-center gap-3">
                            <h1 className="text-3xl sm:text-4xl font-bold text-white text-right">Panel de Admin</h1>
                            <Logo className="h-12 w-12" />
                        </div>
                    </div>

                    <div className="mb-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
                        <div className="relative flex-grow w-full sm:w-auto">
                             <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Buscar socio..."
                                className="w-full bg-gray-800 border border-gray-600 rounded-md shadow-sm py-2 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            />
                        </div>
                         <div className="flex gap-4 w-full sm:w-auto">
                            <button 
                                onClick={handleExportCSV}
                                className="w-full sm:w-auto flex-shrink-0 bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed"
                                disabled={filteredMembers.length === 0}
                            >
                                Exportar CSV
                            </button>
                            <button onClick={onLogout} className="w-full sm:w-auto flex-shrink-0 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md transition-colors">
                                Cerrar Sesión
                            </button>
                        </div>
                    </div>

                    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl shadow-2xl overflow-hidden">
                        <div className="overflow-x-auto">
                            {members.length > 0 && (
                                <div className="px-6 py-4"><p className="text-sm text-gray-400">Mostrando <span className="font-bold text-white">{filteredMembers.length}</span> de <span className="font-bold text-white">{members.length}</span> socios.</p></div>
                            )}
                            {members.length === 0 ? (
                                <div className="text-center py-16 px-6">
                                    <p className="text-lg text-gray-400">No hay socios registrados.</p>
                                    <button onClick={() => navigateTo('register')} className="mt-6 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-full transition-transform transform hover:scale-105">Registrar Socio</button>
                                </div>
                            ) : paginatedMembers.length > 0 ? (
                                <table className="min-w-full divide-y divide-gray-700">
                                    <thead className="bg-gray-800/50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-cyan-300 uppercase tracking-wider">Nº Socio</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-cyan-300 uppercase tracking-wider">Nombre Completo</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-cyan-300 uppercase tracking-wider">Visitas</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-cyan-300 uppercase tracking-wider">DNI</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-cyan-300 uppercase tracking-wider">Correo</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-cyan-300 uppercase tracking-wider">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-800">
                                        {paginatedMembers.map((member) => (
                                            <tr key={member.memberId} className="hover:bg-gray-800/60 transition-colors duration-200 cursor-pointer" onClick={() => setViewingMember(member)}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 font-mono">{member.memberId}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{member.name} {member.lastName}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-cyan-400 font-bold text-center">{member.visitCount}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{member.dni}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{member.email}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium" onClick={handleActionClick}>
                                                    <div className="flex items-center gap-4">
                                                        <button onClick={() => setQrCodeMember(member)} className="text-cyan-400 hover:text-cyan-300" title="Mostrar QR"><QrCodeIcon className="h-5 w-5" /></button>
                                                        <button onClick={() => onEditMember(member)} className="text-purple-400 hover:text-purple-300" title="Editar Socio"><PencilIcon className="h-5 w-5" /></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <div className="text-center py-16 px-6"><p className="text-lg text-gray-400">No se encontraron socios.</p></div>
                            )}
                        </div>
                        {totalPages > 1 && (
                            <div className="flex items-center justify-between text-sm text-gray-400 mt-4 px-6 py-4 border-t border-gray-700">
                                <button 
                                    onClick={() => setCurrentPage(prev => prev - 1)}
                                    disabled={currentPage === 1}
                                    className="px-4 py-2 bg-gray-700 rounded-md hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed transition-colors"
                                >
                                    Anterior
                                </button>
                                <span>Página {currentPage} de {totalPages}</span>
                                <button 
                                    onClick={() => setCurrentPage(prev => prev + 1)}
                                    disabled={currentPage === totalPages}
                                    className="px-4 py-2 bg-gray-700 rounded-md hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed transition-colors"
                                >
                                    Siguiente
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {viewingMember && <MemberDetailsModal member={viewingMember} onClose={() => setViewingMember(null)} />}
            {qrCodeMember && <QrCodeModal member={qrCodeMember} onClose={() => setQrCodeMember(null)} />}
        </>
    );
};

export default MembersListPage;