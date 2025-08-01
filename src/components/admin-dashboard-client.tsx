
"use client";

import { useState } from 'react';
import type { Material } from '@/lib/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, MoreVertical, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { db } from '@/lib/firebase/config';
import { doc, updateDoc } from 'firebase/firestore';

interface AdminDashboardClientProps {
  initialMaterials: Material[];
}

export default function AdminDashboardClient({ initialMaterials }: AdminDashboardClientProps) {
  const [materials, setMaterials] = useState<Material[]>(initialMaterials);
  const { toast } = useToast();

  const handleAction = async (id: string, newStatus: 'approved' | 'rejected') => {
    // Optimistically update the UI
    const originalMaterials = [...materials];
    setMaterials(materials.filter(m => m.id !== id));
    
    try {
      const materialRef = doc(db, 'materials', id);
      await updateDoc(materialRef, { status: newStatus });

      toast({
        title: `Material ${newStatus}`,
        description: `The material has been successfully ${newStatus}.`,
        variant: newStatus === 'approved' ? 'default' : 'destructive',
      });
    } catch (error) {
        console.error("Error updating material status: ", error);
        toast({
            title: 'Action Failed',
            description: 'Could not update the material status. Please try again.',
            variant: 'destructive',
        });
        // Revert UI if the update fails
        setMaterials(originalMaterials);
    }
  };
  
  const handleDownload = (e: React.MouseEvent, fileURL: string) => {
    e.preventDefault();
    window.open(fileURL, '_blank');
  }

  return (
    <div className="rounded-lg border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead className="hidden md:table-cell">Type</TableHead>
            <TableHead className="hidden lg:table-cell">Department</TableHead>
            <TableHead className="hidden md:table-cell">Uploader</TableHead>
            <TableHead className="hidden lg:table-cell">Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {materials.length > 0 ? (
            materials.map(material => (
              <TableRow key={material.id}>
                <TableCell className="font-medium">{material.title}</TableCell>
                <TableCell className="hidden md:table-cell">
                    <Badge variant="secondary" className="capitalize">{material.type.replace('-', ' ')}</Badge>
                </TableCell>
                <TableCell className="hidden lg:table-cell">{material.department}</TableCell>
                <TableCell className="hidden md:table-cell">{material.uploaderName}</TableCell>
                <TableCell className="hidden lg:table-cell">{material.createdAt.toLocaleDateString()}</TableCell>
                <TableCell className="text-right">
                   <div className="hidden md:flex items-center justify-end gap-2">
                     <Button variant="outline" size="sm" className="bg-green-50 text-green-700 hover:bg-green-100" onClick={() => handleAction(material.id, 'approved')}>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Approve
                     </Button>
                     <Button variant="destructive" size="sm" onClick={() => handleAction(material.id, 'rejected')}>
                        <XCircle className="h-4 w-4 mr-2" />
                        Reject
                     </Button>
                      <Button variant="ghost" size="icon" onClick={(e) => handleDownload(e, material.fileURL)}>
                         <Download className="h-4 w-4" />
                         <span className="sr-only">Download</span>
                      </Button>
                   </div>
                   <div className="md:hidden">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <MoreVertical className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem onClick={() => handleAction(material.id, 'approved')}>
                                    <CheckCircle className="mr-2 h-4 w-4" /> Approve
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleAction(material.id, 'rejected')} className="text-red-600">
                                    <XCircle className="mr-2 h-4 w-4" /> Reject
                                </DropdownMenuItem>
                                 <DropdownMenuItem onClick={(e) => handleDownload(e, material.fileURL)}>
                                     <Download className="mr-2 h-4 w-4" /> Download
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                   </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                No pending materials. Great job!
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
