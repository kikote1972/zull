import React, { useState, useEffect } from 'react';
import { Page, Member } from '../types';
import Logo from './Logo';

interface EditMemberPageProps {
    navigateTo: (page: Page) => void;
    member: Member;
    onUpdateMember: (member: Member) => void;
}

const EditMemberPage: React.FC<EditMemberPageProps> = ({ navigateTo, member, onUpdateMember }) => {
    // FIX: Added visitCount to the initial state to match the Member type.
    const [formData, setFormData] = useState<Member>({
        memberId: '',
        name: '',
        lastName: '',
        dni: '',
        dob: '',
        email: '',
        visitCount: 0,
    });
    const [errors, setErrors] = useState<Partial<Record<keyof Omit<Member, 'memberId' | 'visitCount'>, string>>>({});

    useEffect(() => {
        if (member) {
            setFormData(member);
        }
    }, [member]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const validate = () => {
        const newErrors: Partial<Record<keyof Omit<Member, 'memberId' | 'visitCount'>, string>> = {};
        if (!formData.name) newErrors.name = 'El nombre es obligatorio.';
        if (!formData.lastName) newErrors.lastName = 'El apellido es obligatorio.';
        if (!formData.dob) newErrors.dob = 'La fecha de nacimiento es obligatoria.';
        if (!formData.email) newErrors.email = 'El correo electrónico es obligatorio.';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'El correo electrónico no es válido.';
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            onUpdateMember(formData);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#0a0f2c] to-[#101847] p-4">
            <div className="text-center mb-6">
                <Logo className="h-16 w-16 mx-auto" />
                <h1 className="text-4xl font-bold text-white mt-2">Editar Socio</h1>
                <p className="text-cyan-300">{member.name} {member.lastName}</p>
            </div>
            <div className="w-full max-w-lg bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 shadow-2xl">
                <form onSubmit={handleSubmit} noValidate>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-300">Nombre *</label>
                            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="mt-1 block w-full bg-gray-800 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500" />
                            {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                        </div>
                        <div>
                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-300">Apellido *</label>
                            <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} className="mt-1 block w-full bg-gray-800 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500" />
                            {errors.lastName && <p className="text-red-400 text-xs mt-1">{errors.lastName}</p>}
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="memberId" className="block text-sm font-medium text-gray-300">Nº Socio (no editable)</label>
                        <input type="text" id="memberId" name="memberId" value={formData.memberId} readOnly className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-gray-400 cursor-not-allowed font-mono" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="dni" className="block text-sm font-medium text-gray-300">DNI (no editable)</label>
                        <input type="text" id="dni" name="dni" value={formData.dni} readOnly className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-gray-400 cursor-not-allowed" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="dob" className="block text-sm font-medium text-gray-300">Fecha de Nacimiento *</label>
                        <input type="date" id="dob" name="dob" value={formData.dob} onChange={handleChange} className="mt-1 block w-full bg-gray-800 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500" />
                        {errors.dob && <p className="text-red-400 text-xs mt-1">{errors.dob}</p>}
                    </div>
                    <div className="mb-6">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300">Correo Electrónico *</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="mt-1 block w-full bg-gray-800 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500" />
                        {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button type="button" onClick={() => navigateTo('members')} className="w-full sm:w-auto flex-1 bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300">
                            Cancelar
                        </button>
                        <button type="submit" className="w-full sm:w-auto flex-1 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-lg transition-transform transform hover:scale-105 duration-300">
                            Guardar Cambios
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditMemberPage;