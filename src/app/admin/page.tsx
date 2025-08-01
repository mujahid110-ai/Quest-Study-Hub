
"use client";

import AdminDashboardClient from '@/components/admin-dashboard-client';
import { db } from '@/lib/firebase/config';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { ShieldCheck, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { Material } from '@/lib/types';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading) {
      if (!user || user.role !== 'admin') {
        router.push('/login');
      } else {
        const fetchMaterials = async () => {
          setLoading(true);
          const q = query(collection(db, 'materials'), orderBy('createdAt', 'desc'));
          const querySnapshot = await getDocs(q);
          const allMaterials = querySnapshot.docs.map(doc => {
            const data = doc.data();
            return {
              id: doc.id,
              ...data,
              createdAt: data.createdAt.toDate(),
            } as Material;
          });
          const pendingMaterials = allMaterials.filter(m => m.status === 'pending');
          setMaterials(pendingMaterials);
          setLoading(false);
        };
        fetchMaterials();
      }
    }
  }, [user, authLoading, router]);

  if (authLoading || loading) {
    return (
      <div className="container flex min-h-[calc(100vh-8rem)] items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
      return null;
  }

  return (
    <div className="container py-12 md:py-24 bg-background text-foreground">
      <div className="mb-8 space-y-2 fade-in-up text-center md:text-left">
        <h1 className="font-headline text-3xl md:text-4xl font-bold flex items-center justify-center md:justify-start gap-3">
          <ShieldCheck className="h-8 w-8 text-primary" />
          Admin Dashboard
        </h1>
        <p className="text-muted-foreground md:text-lg max-w-2xl mx-auto md:mx-0">
          Review and manage all pending material uploads from students.
        </p>
      </div>

      <div className="fade-in-up" style={{ animationDelay: '200ms' }}>
        <AdminDashboardClient initialMaterials={materials} />
      </div>
    </div>
  );
}
