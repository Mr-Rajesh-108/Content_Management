import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function AdminDashboard() {
  const [adminData, setAdminData] = useState(null);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Function to fetch admin data
    const fetchAdminData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/adminLogin'); // Redirect if no token
        return;
      }

      try {
        const response = await fetch('/api/admin/data', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setAdminData(data);
        } else {
          setError('Failed to fetch admin data');
          router.push('/adminLogin'); // Redirect on failure
        }
      } catch (err) {
        setError('An error occurred');
        console.error(err);
        router.push('/adminLogin'); // Redirect on error
      }
    };

    fetchAdminData();
  }, [router]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!adminData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome to the Admin Dashboard!</h1>
      <pre>{JSON.stringify(adminData, null, 2)}</pre>
    </div>
  );
}
