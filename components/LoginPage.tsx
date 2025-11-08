import React, { useState } from 'react';
import { Page } from '../types';
import Logo from './Logo';
import { EyeIcon } from './icons/EyeIcon';
import { EyeOffIcon } from './icons/EyeOffIcon';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';

interface LoginPageProps {
    navigateTo: (page: Page) => void;
    onLogin: (success: boolean) => void;
}

const ADMIN_EMAIL = 'admin@zulltheclub.com';
const ADMIN_PASSWORD = 'admin123';

const LoginPage: React.FC<LoginPageProps> = ({ navigateTo, onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
            onLogin(true);
        } else {
            setError('Correo o contraseña incorrectos.');
            onLogin(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-[#0a0f2c] to-[#101847]">
            <div className="absolute top-4 left-4">
                <button onClick={() => navigateTo('home')} className="flex items-center gap-2 text-cyan-400 hover:text-cyan-200 transition-colors">
                    <ArrowLeftIcon className="h-5 w-5" />
                    Volver
                </button>
            </div>
            <div className="w-full max-w-sm bg-gray-900/50 backdrop-blur-md border border-gray-700 rounded-2xl p-8 shadow-2xl">
                <div className="text-center mb-8">
                   <Logo className="h-16 w-16 mx-auto" />
                   <h2 className="text-3xl font-bold text-white mt-4">Acceso Admin</h2>
                   <p className="text-gray-400 mt-1">Inicia sesión para gestionar socios</p>
                </div>
                <form onSubmit={handleSubmit}>
                    {error && <p className="bg-red-900/50 border border-red-500/50 text-red-300 text-center text-sm p-3 rounded-md mb-4">{error}</p>}
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Correo Electrónico</label>
                        <input 
                            type="email" 
                            id="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="admin@zulltheclub.com" 
                            className="mt-1 block w-full bg-gray-800 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500" 
                            required 
                        />
                    </div>
                    <div className="mb-6 relative">
                         <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">Contraseña</label>
                         <input 
                            type={showPassword ? "text" : "password"} 
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} 
                            placeholder="Tu contraseña" 
                            className="mt-1 block w-full bg-gray-800 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500" 
                            required
                        />
                        <button 
                            type="button" 
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 top-6 pr-3 flex items-center text-gray-400 hover:text-gray-200"
                        >
                            {showPassword ? <EyeOffIcon className="h-5 w-5"/> : <EyeIcon className="h-5 w-5"/>}
                        </button>
                    </div>
                    <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-lg transition-transform transform hover:scale-105 duration-300">
                        Iniciar Sesión
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;