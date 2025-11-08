import React from 'react';
import Logo from './Logo';
import { Page } from '../types';
import { QrCodeIcon } from './icons/QrCodeIcon';
import { UsersIcon } from './icons/UsersIcon';
import { QRCodeSVG } from 'qrcode.react';

interface HomePageProps {
    navigateTo: (page: Page) => void;
    isAuthenticated: boolean;
    onLogout: () => void;
}

const features = [
    {
        icon: <UsersIcon className="h-8 w-8 text-blue-400" />,
        bgColor: 'bg-blue-900/50',
        title: "Eventos Exclusivos",
        description: "Accede a sesiones de DJ, música en vivo y eventos únicos solo para socios."
    },
    {
        icon: <QrCodeIcon className="h-8 w-8 text-cyan-400" />,
        bgColor: 'bg-cyan-900/50',
        title: "Acceso con QR",
        description: "Tu móvil es tu entrada. Accede de forma rápida y segura con tu código QR personal."
    },
];

const HomePage: React.FC<HomePageProps> = ({ navigateTo, isAuthenticated, onLogout }) => {
    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#0a0f2c] to-[#101847]">
            <main className="flex-grow">
                {/* Hero Section */}
                <section className="relative text-center py-20 sm:py-32 px-4 overflow-hidden">
                    <div className="absolute inset-0 bg-grid-cyan-500/10 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
                    <div className="relative z-10">
                        <div className="flex justify-center mb-6">
                            <Logo className="h-24 w-24" />
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white animate-fade-in-down">
                            Zull The Club
                        </h1>
                        <p className="mt-4 text-lg md:text-xl text-cyan-300 max-w-2xl mx-auto animate-fade-in-up">
                            Sistema de Gestión de Socios
                        </p>
                        <div className="mt-10 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 animate-fade-in-up">
                             {isAuthenticated ? (
                                <>
                                    <button onClick={() => navigateTo('members')} className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full transition-transform transform hover:scale-105 duration-300 shadow-lg shadow-purple-500/50">
                                        Panel de Admin
                                    </button>
                                     <button onClick={() => navigateTo('scanner')} className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full transition-transform transform hover:scale-105 duration-300 shadow-lg shadow-green-500/50">
                                        Escanear Acceso
                                    </button>
                                    <button onClick={onLogout} className="w-full sm:w-auto border-2 border-red-400 text-red-400 font-bold py-3 px-8 rounded-full transition-all duration-300 hover:bg-red-400 hover:text-black hover:scale-105 shadow-lg shadow-red-500/50">
                                        Cerrar Sesión
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button onClick={() => navigateTo('register')} className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full transition-transform transform hover:scale-105 duration-300 shadow-lg shadow-purple-500/50">
                                        Registrarse como Socio
                                    </button>
                                    <button onClick={() => navigateTo('login')} className="w-full sm:w-auto border-2 border-cyan-400 text-cyan-400 font-bold py-3 px-8 rounded-full transition-all duration-300 hover:bg-cyan-400 hover:text-black hover:scale-105 shadow-lg shadow-cyan-500/50">
                                        Acceso Personal
                                    </button>
                                    <button onClick={() => navigateTo('scanner')} className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full transition-transform transform hover:scale-105 duration-300 shadow-lg shadow-green-500/50">
                                        Escanear Acceso
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </section>
                
                 {/* Static QR Registration Section */}
                <section className="py-20 sm:py-24 bg-gradient-to-r from-purple-800 via-indigo-900 to-blue-900">
                    <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-8">
                        <div className="bg-white p-4 rounded-lg inline-block shadow-2xl shadow-white/20">
                           <QRCodeSVG value={window.location.href.replace(/\/$/, '') + '?page=register'} size={160} />
                        </div>
                        <div className="md:text-left">
                            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                               ¿Quieres ser socio?
                            </h2>
                            <p className="mt-4 text-lg text-gray-300">
                                Escanea este código QR con tu móvil o haz clic en el botón para ir directamente al formulario de registro.
                            </p>
                            <div className="mt-6">
                                <button onClick={() => navigateTo('register')} className="bg-white text-purple-700 font-bold py-3 px-8 rounded-full transition-transform transform hover:scale-105 duration-300 shadow-lg shadow-white/30">
                                    ¡Regístrate Ahora!
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="py-20 sm:py-24 bg-[#101847]">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                                Una Experiencia Única
                            </h2>
                            <p className="mt-4 text-lg text-gray-400">
                                Más que un club, una comunidad.
                            </p>
                        </div>
                        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
                            {features.map((feature, index) => (
                                <div key={index} className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 text-center shadow-lg transition-transform transform hover:-translate-y-2 duration-300">
                                    <div className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full ${feature.bgColor}`}>
                                        {feature.icon}
                                    </div>
                                    <h3 className="mt-6 text-xl font-semibold text-white">{feature.title}</h3>
                                    <p className="mt-2 text-base text-gray-400">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-[#0a0f2c] border-t border-gray-800">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center text-gray-500 text-sm">
                    <p>&copy; 2025 Zull The Club. Todos los derechos reservados.</p>
                    <p className="mt-1">Travesía de la Laguna, 2, 28942 Fuenlabrada, Madrid</p>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;