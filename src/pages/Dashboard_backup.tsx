import { useState, useEffect } from "react"
import {
  Users,
  Calendar,
  Stethoscope,
  TrendingUp,
  Activity,
  Clock,
  RefreshCcw,
} from "lucide-react"

import { StatCard } from "@/components/StatCard"
import { AppointmentsList } from "@/components/AppointmentsList"
import { RecentPatients } from "@/components/RecentPatients"
import TenantsList from "@/components/TenantsList" // Importamos el nuevo componente
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

// Definimos interfaces para los datos que esperamos del backend
interface DashboardStats {
  totalPatients: number;
  appointmentsToday: number;
  monthlyConsultations: number;
  attendanceRate: number;
  averageTime: number;
  newPatientsThisMonth: number;
  pendingFollowUps: number;
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Función para obtener todos los datos del dashboard desde el backend
  const fetchDashboardData = async () => {
    setLoading(true);
    setError(null);
    try {
      // Usaremos un endpoint único para obtener todas las estadísticas del dashboard
      const response = await fetch("http://localhost:4000/api/dashboard/stats");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      // Asumimos que la respuesta tiene una estructura similar a la interfaz DashboardStats
      setStats(data);
    } catch (e) {
      console.error("Error fetching dashboard data:", e);
      setError("No se pudieron cargar las estadísticas. Revisa la conexión del servidor.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Resumen de la actividad del consultorio médico</p>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Skeleton className="h-[120px] w-full" />
          <Skeleton className="h-[120px] w-full" />
          <Skeleton className="h-[120px] w-full" />
          <Skeleton className="h-[120px] w-full" />
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <Skeleton className="h-[300px] w-full" />
          <Skeleton className="h-[300px] w-full" />
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <Skeleton className="h-[120px] w-full" />
          <Skeleton className="h-[120px] w-full" />
          <Skeleton className="h-[120px] w-full" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-xl text-red-500 font-semibold">{error}</p>
        <Button onClick={fetchDashboardData} className="mt-4">
          <RefreshCcw className="w-4 h-4 mr-2" />
          Reintentar
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Resumen de la actividad del consultorio médico
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Pacientes Totales"
          value={stats?.totalPatients.toString() || 'N/A'}
          icon={Users}
          description="Pacientes registrados"
          trend={{ value: 12, isPositive: true }} // Este valor aún es estático
          variant="default"
        />
        <StatCard
          title="Citas Hoy"
          value={stats?.appointmentsToday.toString() || 'N/A'}
          icon={Calendar}
          description="Citas programadas"
          variant="success"
        />
        <StatCard
          title="Consultas del Mes"
          value={stats?.monthlyConsultations.toString() || 'N/A'}
          icon={Stethoscope}
          description="Consultas realizadas"
          trend={{ value: 8, isPositive: true }} // Este valor aún es estático
          variant="default"
        />
        <StatCard
          title="Tasa de Asistencia"
          value={`${stats?.attendanceRate.toString() || 'N/A'}%`}
          icon={TrendingUp}
          description="Promedio mensual"
          trend={{ value: 2, isPositive: true }} // Este valor aún es estático
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
          value={`${stats?.averageTime.toString() || 'N/A'} min`}
          icon={Clock}
          description="Por consulta"
          variant="default"
        />
        <StatCard
          title="Pacientes Nuevos"
          value={stats?.newPatientsThisMonth.toString() || 'N/A'}
          icon={Users}
          description="Este mes"
          trend={{ value: 15, isPositive: true }} // Este valor aún es estático
          variant="success"
        />
        <StatCard
          title="Seguimientos"
          value={stats?.pendingFollowUps.toString() || 'N/A'}
          icon={Activity}
          description="Pendientes"
          variant="warning"
        />
      </div>

      {/* Lista de Tenants */}
      <div className="mt-8">
        <TenantsList />
      </div>
    </div>
  );
}
