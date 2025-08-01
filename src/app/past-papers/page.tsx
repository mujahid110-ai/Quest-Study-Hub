
"use client";

import MaterialCard from '@/components/material-card';
import MaterialFilters from '@/components/material-filters';
import type { Material } from '@/lib/types';
import { FileText, Frown, Loader2 } from 'lucide-react';
import { db } from '@/lib/firebase/config';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { useAuth } from '@/hooks/use-auth';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, useMemo, Suspense } from 'react';


function PastPapersContent() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();

    const [allPapers, setAllPapers] = useState<Material[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/login');
        }
    }, [user, authLoading, router]);
    
    useEffect(() => {
        const getPastPapers = async () => {
            setLoading(true);
            const materialsRef = collection(db, 'materials');
            const q = query(
                materialsRef, 
                where('type', '==', 'past-paper'),
                orderBy('createdAt', 'desc')
            );
            const querySnapshot = await getDocs(q);
            const papers = querySnapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    id: doc.id,
                    ...data,
                    createdAt: data.createdAt.toDate(),
                } as Material;
            }).filter(p => p.status === 'approved');
            setAllPapers(papers);
            setLoading(false);
        };

        if(user) {
            getPastPapers();
        }
    }, [user]);

  const filteredPapers = useMemo(() => {
    const search = searchParams.get('search') || '';
    const department = searchParams.get('department') || '';
    const semester = searchParams.get('semester') || '';
    const subject = searchParams.get('subject') || '';
    
    return allPapers.filter(material => {
        return (
            (material.title.toLowerCase().includes(search.toLowerCase())) &&
            (!department || department === 'all' || material.department === department) &&
            (!semester || semester === 'all' || material.semester.toString() === semester) &&
            (!subject || subject === 'all' || material.subject === subject)
        )
    });
  }, [allPapers, searchParams]);

  if (authLoading || !user) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <>
      <div className="fade-in-up" style={{ animationDelay: '200ms' }}>
        <MaterialFilters 
          searchParams={{
              search: searchParams.get('search') || undefined,
              department: searchParams.get('department') || undefined,
              semester: searchParams.get('semester') || undefined,
              subject: searchParams.get('subject') || undefined,
          }}
        />
      </div>
      
      <div className="fade-in-up" style={{ animationDelay: '400ms' }}>
        {loading ? (
          <div className="text-center py-16">
              <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
          </div>
        ) : filteredPapers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPapers.map((paper: Material) => (
              <MaterialCard key={paper.id} material={paper} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 border-2 border-dashed border-border rounded-lg mt-8 bg-card">
              <Frown className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold">No Papers Found</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                  We couldn&apos;t find any past papers matching your criteria. Try adjusting your filters.
              </p>
          </div>
        )}
      </div>
    </>
  );
}


export default function PastPapersPage() {
  return (
    <div className="container py-12 bg-background text-foreground">
      <div className="mb-8 space-y-2 fade-in-up">
        <h1 className="font-headline text-3xl md:text-4xl font-bold flex items-center gap-3">
          <FileText className="h-8 w-8 text-primary" />
          Past Papers
        </h1>
        <p className="text-muted-foreground text-lg">
          Find and download previous years' exam papers to sharpen your skills.
        </p>
      </div>
      <Suspense fallback={
         <div className="flex min-h-[40vh] items-center justify-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      }>
        <PastPapersContent />
      </Suspense>
    </div>
  );
}

