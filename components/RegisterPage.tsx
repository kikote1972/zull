import React, { useState, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Page, Member } from '../types';
import Logo from './Logo';

interface RegisterPageProps {
    navigateTo: (page: Page) => void;
    addMember: (member: Omit<Member, 'visitCount'>) => void;
    nextMemberId: string;
}

const RegisterPage: React.FC<RegisterPageProps> = ({ navigateTo, addMember, nextMemberId }) => {
    const [formData, setFormData] = useState({
        name: '',
        lastName: '',
        dni: '',
        dob: '',
        email: '',
        consent: false,
    });
    const [errors, setErrors] = useState<Partial<Record<keyof typeof formData, string>>>({});
    const [isRegistered, setIsRegistered] = useState(false);
    const qrCodeRef = useRef<HTMLDivElement>(null);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const validate = () => {
        const newErrors: Partial<Record<keyof typeof formData, string>> = {};
        if (!formData.name) newErrors.name = 'El nombre es obligatorio.';
        if (!formData.lastName) newErrors.lastName = 'El apellido es obligatorio.';
        if (!formData.dni) newErrors.dni = 'El DNI es obligatorio.';
        if (!formData.dob) newErrors.dob = 'La fecha de nacimiento es obligatoria.';
        if (!formData.email) newErrors.email = 'El correo electrónico es obligatorio.';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'El correo electrónico no es válido.';
        if (!formData.consent) newErrors.consent = 'Debes aceptar la protección de datos.';
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            const newMember: Omit<Member, 'visitCount'> = {
                memberId: nextMemberId,
                name: formData.name,
                lastName: formData.lastName,
                dni: formData.dni,
                dob: formData.dob,
                email: formData.email,
            };
            addMember(newMember);
            setIsRegistered(true);
        }
    };
    
    if (isRegistered) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#0a0f2c] to-[#101847] p-4">
                <div className="w-full max-w-md bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 shadow-2xl text-center">
                    <h2 className="text-2xl font-bold text-cyan-400 mb-2">¡Registro Completado!</h2>
                    <p className="text-gray-300 mb-6">Tu código QR de socio ha sido generado con tu número: <strong className="font-mono text-white">{nextMemberId}</strong></p>
                    <div ref={qrCodeRef} className="bg-white p-4 rounded-lg inline-block mb-6">
                        <QRCodeSVG value={nextMemberId} size={192} />
                    </div>
                     <div className="text-left bg-gray-800/50 p-4 rounded-lg border border-cyan-500/30">
                        <h3 className="font-bold text-lg text-cyan-300 mb-2">Importante</h3>
                        <ul className="list-disc list-inside text-sm text-gray-300 space-y-2">
                            <li>Este código es tu llave de acceso al club.</li>
                            <li>Deberás presentarlo en cada visita.</li>
                            <li>El código es único, personal e intransferible.</li>
                        </ul>
                    </div>
                     <button onClick={() => navigateTo('home')} className="mt-8 w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-lg transition-transform transform hover:scale-105 duration-300">
                        Volver al Inicio
                    </button>
                </div>
            </div>
        );
    }
    
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#0a0f2c] to-[#101847] p-4">
             <div className="absolute top-4 left-4">
                <button onClick={() => navigateTo('home')} className="flex items-center gap-2 text-cyan-400 hover:text-cyan-200 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
                    Volver
                </button>
            </div>
            <div className="text-center mb-6">
                <Logo className="h-16 w-16 mx-auto" />
                <h1 className="text-4xl font-bold text-white mt-2">Zull The Club</h1>
                <p className="text-cyan-300">Registro de Nuevos Socios</p>
            </div>
            <div className="w-full max-w-lg bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 shadow-2xl">
                <h2 className="text-2xl font-bold text-white mb-1">Registrar Nuevo Socio</h2>
                <p className="text-gray-400 mb-6">Complete el formulario para convertirse en socio.</p>
                
                <form onSubmit={handleSubmit} noValidate>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-300">Nombre *</label>
                            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Ej: Juan" className="mt-1 block w-full bg-gray-800 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500" />
                            {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                        </div>
                        <div>
                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-300">Apellido *</label>
                            <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Ej: Pérez" className="mt-1 block w-full bg-gray-800 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500" />
                            {errors.lastName && <p className="text-red-400 text-xs mt-1">{errors.lastName}</p>}
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="dni" className="block text-sm font-medium text-gray-300">DNI *</label>
                        <input type="text" id="dni" name="dni" value={formData.dni} onChange={handleChange} placeholder="Ej: 12345678A" className="mt-1 block w-full bg-gray-800 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500" />
                        {errors.dni && <p className="text-red-400 text-xs mt-1">{errors.dni}</p>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="dob" className="block text-sm font-medium text-gray-300">Fecha de Nacimiento *</label>
                        <input type="date" id="dob" name="dob" value={formData.dob} onChange={handleChange} className="mt-1 block w-full bg-gray-800 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500" />
                        {errors.dob && <p className="text-red-400 text-xs mt-1">{errors.dob}</p>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300">Correo Electrónico *</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="ejemplo@correo.com" className="mt-1 block w-full bg-gray-800 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500" />
                        {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                    </div>
                    <div className="mb-6">
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input id="consent" name="consent" type="checkbox" checked={formData.consent} onChange={handleChange} className="focus:ring-purple-500 h-4 w-4 text-purple-600 border-gray-500 rounded" />
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor="consent" className="font-medium text-gray-300">Acepto la protección de datos *</label>
                                <p className="text-gray-500 text-xs">Doy mi consentimiento para el tratamiento de mis datos personales de acuerdo con la normativa.</p>
                            </div>
                        </div>
                        {errors.consent && <p className="text-red-400 text-xs mt-1">{errors.consent}</p>}
                    </div>
                    
                    <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-lg transition-transform transform hover:scale-105 duration-300">
                        Registrar Socio
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;