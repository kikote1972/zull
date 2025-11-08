import React, { useState, useCallback } from 'react';
import HomePage from './components/HomePage';
import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage';
import MembersListPage from './components/MembersListPage';
import EditMemberPage from './components/EditMemberPage';
import ScannerPage from './components/ScannerPage';
import { Page, Member } from './types';

const initialMembers: Member[] = [
    { memberId: 'ZTC-001', name: 'Juan', lastName: 'Pérez', dni: '12345678A', dob: '1990-01-15', email: 'juan.perez@example.com', visitCount: 5 },
    { memberId: 'ZTC-002', name: 'Ana', lastName: 'García', dni: '87654321B', dob: '1995-05-20', email: 'ana.garcia@example.com', visitCount: 12 },
    { memberId: 'ZTC-003', name: 'Carlos', lastName: 'Sánchez', dni: '11223344C', dob: '1988-03-22', email: 'carlos.sanchez@example.com', visitCount: 8 },
    { memberId: 'ZTC-004', name: 'Lucía', lastName: 'Martínez', dni: '22334455D', dob: '1992-11-30', email: 'lucia.martinez@example.com', visitCount: 20 },
    { memberId: 'ZTC-005', name: 'David', lastName: 'López', dni: '33445566E', dob: '2000-07-12', email: 'david.lopez@example.com', visitCount: 2 },
    { memberId: 'ZTC-006', name: 'María', lastName: 'Hernández', dni: '44556677F', dob: '1998-09-05', email: 'maria.hernandez@example.com', visitCount: 15 },
    { memberId: 'ZTC-007', name: 'Javier', lastName: 'González', dni: '55667788G', dob: '1993-02-18', email: 'javier.gonzalez@example.com', visitCount: 7 },
    { memberId: 'ZTC-008', name: 'Laura', lastName: 'Díaz', dni: '66778899H', dob: '1997-06-25', email: 'laura.diaz@example.com', visitCount: 9 },
    { memberId: 'ZTC-009', name: 'Sergio', lastName: 'Moreno', dni: '77889900I', dob: '1991-12-01', email: 'sergio.moreno@example.com', visitCount: 4 },
    { memberId: 'ZTC-010', name: 'Elena', lastName: 'Álvarez', dni: '88990011J', dob: '1994-04-14', email: 'elena.alvarez@example.com', visitCount: 11 },
    { memberId: 'ZTC-011', name: 'Adrián', lastName: 'Romero', dni: '99001122K', dob: '1999-08-29', email: 'adrian.romero@example.com', visitCount: 3 },
    { memberId: 'ZTC-012', name: 'Sofía', lastName: 'Navarro', dni: '00112233L', dob: '1996-10-08', email: 'sofia.navarro@example.com', visitCount: 6 },
];

const App: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<Page>('home');
    const [members, setMembers] = useState<Member[]>(initialMembers);
    const [editingMember, setEditingMember] = useState<Member | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const navigateTo = useCallback((page: Page) => {
        setCurrentPage(page);
        window.scrollTo(0, 0);
    }, []);

    const addMember = useCallback((member: Omit<Member, 'visitCount'>) => {
        const newMemberWithVisits = { ...member, visitCount: 0 };
        setMembers(prevMembers => [...prevMembers, newMemberWithVisits]);
    }, []);

    const handleEditMember = useCallback((member: Member) => {
        setEditingMember(member);
        navigateTo('editMember');
    }, [navigateTo]);

    const updateMember = useCallback((updatedMember: Member) => {
        setMembers(prevMembers => 
            prevMembers.map(m => m.memberId === updatedMember.memberId ? updatedMember : m)
        );
        setEditingMember(null);
        navigateTo('members');
    }, [navigateTo]);
    
    const handleLogin = (success: boolean) => {
        if (success) {
            setIsAuthenticated(true);
            navigateTo('members');
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        navigateTo('home');
    };

    const recordVisit = (memberId: string): Member | null => {
        let visitedMember: Member | null = null;
        setMembers(prevMembers => {
            const updatedMembers = prevMembers.map(member => {
                if (member.memberId.toLowerCase() === memberId.toLowerCase()) {
                    const updatedMember = { ...member, visitCount: member.visitCount + 1 };
                    visitedMember = updatedMember;
                    return updatedMember;
                }
                return member;
            });
            return updatedMembers;
        });
        return visitedMember;
    };


    const renderPage = () => {
        switch (currentPage) {
            case 'register':
                const nextMemberId = `ZTC-${String(members.length + 1).padStart(3, '0')}`;
                return <RegisterPage navigateTo={navigateTo} addMember={addMember} nextMemberId={nextMemberId} />;
            case 'login':
                return <LoginPage navigateTo={navigateTo} onLogin={handleLogin} />;
            case 'scanner':
                 return <ScannerPage navigateTo={navigateTo} onRecordVisit={recordVisit} />;
            case 'members':
                return isAuthenticated ? <MembersListPage navigateTo={navigateTo} members={members} onEditMember={handleEditMember} onLogout={handleLogout}/> : <HomePage navigateTo={navigateTo} isAuthenticated={isAuthenticated} onLogout={handleLogout} />;
            case 'editMember':
                if (!isAuthenticated || !editingMember) {
                    return <LoginPage navigateTo={navigateTo} onLogin={handleLogin} />;
                }
                return <EditMemberPage navigateTo={navigateTo} member={editingMember} onUpdateMember={updateMember} />;
            case 'home':
            default:
                return <HomePage navigateTo={navigateTo} isAuthenticated={isAuthenticated} onLogout={handleLogout} />;
        }
    };

    return (
        <div className="bg-[#0a0f2c] min-h-screen text-gray-200">
            {renderPage()}
        </div>
    );
};

export default App;