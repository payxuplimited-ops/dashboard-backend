import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'; // Importamos el componente Card de shadcn
import { Skeleton } from './ui/skeleton'; // Importamos el componente Skeleton para el estado de carga
import { Button } from './ui/button'; // Importamos el componente Button
import { RefreshCw, Server } from 'lucide-react';

interface Tenant {
  id: number;
  name: string;
}

const TenantsList = () => {
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTenants = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:4000/api/tenants');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setTenants(data.data);
    } catch (e) {
      console.error("Error fetching tenants:", e);
      setError("No se pudieron cargar los datos. Asegúrate de que el backend esté funcionando.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTenants();
  }, []);

  const renderContent = () => {
    if (loading) {
      return (
        <div className="space-y-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center p-4 text-center">
          <p className="text-red-500 font-semibold">{error}</p>
          <Button onClick={fetchTenants} className="mt-4">
            <RefreshCw className="w-4 h-4 mr-2" />
            Reintentar
          </Button>
        </div>
      );
    }

    if (tenants.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center p-4 text-center">
          <Server className="text-gray-400 w-12 h-12" />
          <p className="mt-4 text-lg font-semibold text-gray-800">No se encontraron tenants.</p>
          <Button onClick={fetchTenants} className="mt-4">
            <RefreshCw className="w-4 h-4 mr-2" />
            Volver a cargar
          </Button>
        </div>
      );
    }

    return (
      <ul className="space-y-3">
        {tenants.map(tenant => (
          <li key={tenant.id} className="p-4 border rounded-md transition-all hover:bg-gray-50">
            <span className="font-medium text-gray-700">ID: {tenant.id}</span>
            <span className="ml-4 font-bold text-indigo-600">{tenant.name}</span>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center">
          <Server className="w-6 h-6 mr-2 text-indigo-600" />
          Lista de Tenants
        </CardTitle>
      </CardHeader>
      <CardContent>
        {renderContent()}
      </CardContent>
    </Card>
  );
};

export default TenantsList;
