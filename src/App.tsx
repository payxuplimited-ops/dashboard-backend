// Importamos las librerías necesarias de React
import React, { useState } from 'react';
// Importamos los íconos de lucide-react para dar estilo
import { 
  Users, 
  Calendar, 
  Stethoscope, 
  TrendingUp, 
  Activity,
  Clock,
  CircleAlert,
  ChevronUp,
  ChevronDown
} from "lucide-react";

// Componente de marcador de posición para StatCard
// NOTA: Para evitar errores de importación, todos los componentes están en este archivo.
const StatCard = ({ title, value, icon: Icon, description, trend, variant }) => {
  const getColors = (variant) => {
    switch (variant) {
      case 'success':
        return 'bg-green-100 text-green-700';
      case 'warning':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-sky-100 text-sky-700';
    }
  };
  const colors = getColors(variant);
  return (
    <div className={`p-4 rounded-xl shadow-md flex items-center justify-between transition-all duration-300 transform hover:scale-105 ${colors}`}>
      <div>
        <h3 className="text-sm font-medium">{title}</h3>
        <p className="text-2xl font-bold mt-1">{value}</p>
        <div className="flex items-center text-xs mt-1">
          {trend && (
            <span className={`flex items-center font-semibold mr-1 ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {trend.isPositive ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
              {trend.value}%
            </span>
          )}
          <span className="text-muted-foreground">{description}</span>
        </div>
      </div>
      <div className="p-2 rounded-full bg-white/30">
        {Icon ? <Icon className="w-6 h-6" /> : <CircleAlert className="w-6 h-6" />}
      </div>
    </div>
  );
};

// Componente de marcador de posición para AppointmentsList
const AppointmentsList = () => (
  <div className="bg-white p-6 rounded-xl shadow-md">
    <h2 className="text-xl font-bold mb-4">Próximas Citas</h2>
    <div className="space-y-2">
      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg transition-colors hover:bg-gray-100">
        <div>
          <p className="font-medium">Cita de prueba 1</p>
          <p className="text-sm text-gray-500">Dr. Smith, 10:00 AM</p>
        </div>
        <Clock className="w-5 h-5 text-gray-400" />
      </div>
      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg transition-colors hover:bg-gray-100">
        <div>
          <p className="font-medium">Cita de prueba 2</p>
          <p className="text-sm text-gray-500">Dra. Garcia, 11:30 AM</p>
        </div>
        <Clock className="w-5 h-5 text-gray-400" />
      </div>
      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg transition-colors hover:bg-gray-100">
        <div>
          <p className="font-medium">Cita de prueba 3</p>
          <p className="text-sm text-gray-500">Dr. Perez, 2:00 PM</p>
        </div>
        <Clock className="w-5 h-5 text-gray-400" />
      </div>
    </div>
  </div>
);

// Componente de marcador de posición para RecentPatients
const RecentPatients = () => (
  <div className="bg-white p-6 rounded-xl shadow-md">
    <h2 className="text-xl font-bold mb-4">Pacientes Recientes</h2>
    <div className="space-y-2">
      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg transition-colors hover:bg-gray-100">
        <div>
          <p className="font-medium">Paciente de prueba A</p>
          <p className="text-sm text-gray-500">Última visita: 2 días atrás</p>
        </div>
        <Users className="w-5 h-5 text-gray-400" />
      </div>
      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg transition-colors hover:bg-gray-100">
        <div>
          <p className="font-medium">Paciente de prueba B</p>
          <p className="text-sm text-gray-500">Última visita: 1 semana atrás</p>
        </div>
        <Users className="w-5 h-5 text-gray-400" />
      </div>
      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg transition-colors hover:bg-gray-100">
        <div>
          <p className="font-medium">Paciente de prueba C</p>
          <p className="text-sm text-gray-500">Última visita: 1 mes atrás</p>
        </div>
        <Users className="w-5 h-5 text-gray-400" />
      </div>
    </div>
  </div>
);

// Componente de Dashboard (ahora con el código real)
const Dashboard = ({ onLogout }) => {
  return (
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen font-sans">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
        <p className="text-gray-500">
          Resumen de la actividad del consultorio médico
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Pacientes Totales"
          value="1,284"
          icon={Users}
          description="Pacientes registrados"
          trend={{ value: 12, isPositive: true }}
          variant="default"
        />
        <StatCard
          title="Citas Hoy"
          value="8"
          icon={Calendar}
          description="Citas programadas"
          variant="success"
        />
        <StatCard
          title="Consultas del Mes"
          value="156"
          icon={Stethoscope}
          description="Consultas realizadas"
          trend={{ value: 8, isPositive: true }}
          variant="default"
        />
        <StatCard
          title="Tasa de Asistencia"
          value="94%"
          icon={TrendingUp}
          description="Promedio mensual"
          trend={{ value: 2, isPositive: true }}
          variant="success"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        <AppointmentsList />
        <RecentPatients />
      </div>

      {/* Additional Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard
          title="Tiempo Promedio"
          value="25 min"
          icon={Clock}
          description="Por consulta"
          variant="default"
        />
        <StatCard
          title="Pacientes Nuevos"
          value="23"
          icon={Users}
          description="Este mes"
          trend={{ value: 15, isPositive: true }}
          variant="success"
        />
        <StatCard
          title="Seguimientos"
          value="45"
          icon={Activity}
          description="Pendientes"
          variant="warning"
        />
      </div>
      <div className="text-center mt-8">
        <button
          onClick={onLogout}
          className="text-sky-600 hover:text-red-500 font-medium transition-colors"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};

// Componente para el formulario de inicio de sesión
const LoginForm = ({ onSwitchToRegister, onLoginSuccess }) => {
  // Estado para los datos del formulario
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Estado para mensajes de la UI
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setIsError(false);
    setMessage('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Inicio de sesión exitoso:', data);
        setMessage('¡Inicio de sesión exitoso!');
        setIsError(false);
        onLoginSuccess();
      } else {
        console.error('Error de inicio de sesión:', data.message);
        setMessage(data.message || 'Error al iniciar sesión.');
        setIsError(true);
      }
    } catch (error) {
      console.error('Error de red:', error);
      setMessage('Error de conexión. Inténtalo de nuevo más tarde.');
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm p-8 bg-white rounded-xl shadow-2xl transition-all duration-300 transform hover:scale-105">
      <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">Iniciar Sesión</h2>
      {message && (
        <div className={`mb-4 text-center text-sm ${isError ? 'text-red-600 bg-red-100' : 'text-green-600 bg-green-100'} p-3 rounded-lg animate-fade-in-down`}>
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-sky-500 focus:border-sky-500 transition-colors"
            disabled={isLoading}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-sky-500 focus:border-sky-500 transition-colors"
            disabled={isLoading}
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 px-4 rounded-lg text-white font-semibold bg-sky-600 hover:bg-sky-700 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-all duration-200"
        >
          {isLoading ? 'Accediendo...' : 'Acceder'}
        </button>
      </form>
      <div className="mt-6 text-center text-sm text-gray-600">
        ¿No tienes una cuenta?{' '}
        <button
          onClick={onSwitchToRegister}
          disabled={isLoading}
          className="font-medium text-sky-600 hover:text-sky-500 disabled:opacity-50 focus:outline-none focus:underline transition-colors"
        >
          Regístrate
        </button>
      </div>
    </div>
  );
};

// Componente para el formulario de registro
const RegisterForm = ({ onSwitchToLogin }) => {
  // Estado para los datos del formulario
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Estado para mensajes de la UI
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setIsError(false);
    setMessage('');

    if (password !== confirmPassword) {
      setMessage('Las contraseñas no coinciden.');
      setIsError(true);
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Registro exitoso:', data);
        setMessage('¡Registro exitoso! Ya puedes iniciar sesión.');
        setIsError(false);
        setTimeout(() => onSwitchToLogin(), 2000);
      } else {
        console.error('Error de registro:', data.message);
        setMessage(data.message || 'Error al registrarse.');
        setIsError(true);
      }
    } catch (error) {
      console.error('Error de red:', error);
      setMessage('Error de conexión. Inténtalo de nuevo más tarde.');
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm p-8 bg-white rounded-xl shadow-2xl transition-all duration-300 transform hover:scale-105">
      <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">Registrarse</h2>
      {message && (
        <div className={`mb-4 text-center text-sm ${isError ? 'text-red-600 bg-red-100' : 'text-green-600 bg-green-100'} p-3 rounded-lg animate-fade-in-down`}>
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-sky-500 focus:border-sky-500 transition-colors"
            disabled={isLoading}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-sky-500 focus:border-sky-500 transition-colors"
            disabled={isLoading}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Confirmar Contraseña</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-sky-500 focus:border-sky-500 transition-colors"
            disabled={isLoading}
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 px-4 rounded-lg text-white font-semibold bg-sky-600 hover:bg-sky-700 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-all duration-200"
        >
          {isLoading ? 'Creando cuenta...' : 'Crear Cuenta'}
        </button>
      </form>
      <div className="mt-6 text-center text-sm text-gray-600">
        ¿Ya tienes una cuenta?{' '}
        <button
          onClick={onSwitchToLogin}
          disabled={isLoading}
          className="font-medium text-sky-600 hover:text-sky-500 disabled:opacity-50 focus:outline-none focus:underline transition-colors"
        >
          Inicia sesión
        </button>
      </div>
    </div>
  );
};

// Componente principal que maneja la vista actual (login/register/dashboard)
export default function App() {
  const [view, setView] = useState('login');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleSwitch = (newView) => {
    setView(newView);
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setView('login'); // Regresar a la vista de login al cerrar sesión
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      {isAuthenticated ? (
        <Dashboard onLogout={handleLogout} />
      ) : (
        view === 'login' ? (
          <LoginForm onSwitchToRegister={() => handleSwitch('register')} onLoginSuccess={handleLoginSuccess} />
        ) : (
          <RegisterForm onSwitchToLogin={() => handleSwitch('login')} />
        )
      )}
    </div>
  );
}

