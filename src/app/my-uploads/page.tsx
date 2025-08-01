
"use client";

import MaterialCard from '@/components/material-card';
import type { Material } from '@/lib/types';
import { FileCheck, Frown, Loader2 } from 'lucide-react';
import { db } from '@/lib/firebase/config';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

// Small utility to combine class names, which we'll need for the badge
function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}

const StatusBadge = ({ status }: { status: Material['status'] }) => {
    const statusStyles = {
        pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
        approved: 'bg-green-100 text-green-800 border-green-300',
        rejected: 'bg-red-100 text-red-800 border-red-300',
    }
    return <Badge className={cn('capitalize', statusStyles[status])}>{status}</Badge>;
}

export default function MyUploadsPage() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();

    const [myUploads, setMyUploads] = useState<Material[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/login');
        }
    }, [user, authLoading, router]);

    useEffect(() => {
        const getMyUploads = async () => {
            if (!user) return;
            setLoading(true);
            const materialsRef = collection(db, 'materials');
            const q = query(
                materialsRef,
                where('uploaderId', '==', user.uid),
                orderBy('createdAt', 'desc')
            );
            const querySnapshot = await getDocs(q);
            const uploads = querySnapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    id: doc.id,
                    ...data,
                    createdAt: data.createdAt.toDate(),
                } as Material;
            });
            setMyUploads(uploads);
            setLoading(false);
        };

        if (user) {
            getMyUploads();
        }
    }, [user]);

    if (authLoading || !user) {
        return (
            <div className="container flex min-h-[calc(100vh-8rem)] items-center justify-center">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="container py-12 md:py-24 bg-background text-foreground">
            <div className="mb-12 space-y-2 fade-in-up text-center">
                <h1 className="font-headline text-3xl md:text-4xl font-bold flex items-center justify-center gap-3">
                    <FileCheck className="h-8 w-8 text-primary" />
                    My Uploads
                </h1>
                <p className="text-muted-foreground md:text-lg max-w-2xl mx-auto">
                    Track the status of all the materials you have contributed to the community.
                </p>
            </div>

            <div className="fade-in-up" style={{ animationDelay: '200ms' }}>
                {loading ? (
                    <div className="text-center py-16">
                        <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
                    </div>
                ) : myUploads.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {myUploads.map((material: Material) => (
                           <div key={material.id} className="relative">
                             <MaterialCard material={material} />
                             <div className="absolute top-8 right-8 z-10">
                                <StatusBadge status={material.status}/>
                             </div>
                           </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16 border-2 border-dashed border-border rounded-lg mt-8 bg-card">
                        <Frown className="mx-auto h-12 w-12 text-muted-foreground" />
                        <h3 className="mt-4 text-lg font-semibold">You Haven't Uploaded Anything Yet</h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Contribute to the community by sharing your study materials!
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
