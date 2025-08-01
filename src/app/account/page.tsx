
"use client";

import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Loader2, User, Mail, Phone, Book, GraduationCap, Calendar, Hash, Shield } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function AccountPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="container flex min-h-[calc(100vh-8rem)] items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  const InfoField = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string | number | undefined }) => (
    <div className="flex items-center gap-4">
      <div className="text-muted-foreground">{icon}</div>
      <div className="flex-grow">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="font-medium text-foreground">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="container py-12 md:py-24">
      <div className="max-w-3xl mx-auto fade-in-up">
        <Card className="bg-card border shadow-lg">
          <CardHeader className="flex flex-col items-center text-center space-y-4">
            <Avatar className="h-24 w-24 border-4 border-primary">
              <AvatarFallback className="text-3xl bg-secondary">
                <User className="h-12 w-12 text-primary" />
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
                <CardTitle className="text-3xl font-bold font-headline">{user.fullName}</CardTitle>
                <CardDescription className="text-lg text-muted-foreground">{user.email}</CardDescription>
                {user.role === 'admin' && <Badge><Shield className="h-3 w-3 mr-1"/>Admin</Badge>}
            </div>
          </CardHeader>
          <CardContent className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <InfoField icon={<User className="h-5 w-5"/>} label="Full Name" value={user.fullName} />
                <InfoField icon={<Mail className="h-5 w-5"/>} label="Email" value={user.email} />
                <InfoField icon={<Phone className="h-5 w-5"/>} label="Contact Number" value={user.contactNumber} />
                <InfoField icon={<GraduationCap className="h-5 w-5"/>} label="Department" value={user.department} />
                <InfoField icon={<Book className="h-5 w-5"/>} label="Semester" value={`Semester ${user.semester}`} />
                <InfoField icon={<Calendar className="h-5 w-5"/>} label="Batch" value={user.batch} />
                <InfoField icon={<Hash className="h-5 w-5"/>} label="Roll Number" value={user.rollNo} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
