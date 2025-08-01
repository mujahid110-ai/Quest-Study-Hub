
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from './ui/button';
import type { Material } from '@/lib/types';
import { FileText, BookOpen, FlaskConical, Download, Calendar, User, Landmark, Tag } from 'lucide-react';
import { Badge } from './ui/badge';

interface MaterialCardProps {
  material: Material;
}

const typeInfo: { [key in Material['type']]: { icon: React.ReactNode, label: string } } = {
  'past-paper': { icon: <FileText className="h-5 w-5 text-primary" />, label: 'Past Paper' },
  'note': { icon: <BookOpen className="h-5 w-5 text-primary" />, label: 'Note' },
  'lab-manual': { icon: <FlaskConical className="h-5 w-5 text-primary" />, label: 'Lab Manual' },
};

export default function MaterialCard({ material }: MaterialCardProps) {
  const { icon, label } = typeInfo[material.type];

  return (
    <Card className="flex flex-col h-full bg-card border hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-300 group">
      <CardHeader>
        <div className="flex justify-between items-start gap-4 mb-2">
            <Badge variant="secondary" className="capitalize flex items-center gap-1.5 py-1 px-2.5">
                {icon}
                <span className="font-medium text-primary">{label}</span>
            </Badge>
        </div>
        <CardTitle className="font-headline text-lg text-foreground group-hover:text-primary transition-colors leading-snug">{material.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-between">
        <div className="text-sm text-muted-foreground space-y-3">
            <div className="flex items-center gap-2">
                <Landmark className="h-4 w-4 flex-shrink-0" />
                <span className="truncate">{material.department}</span>
            </div>
            <div className="flex items-center gap-2">
                 <Tag className="h-4 w-4 flex-shrink-0" />
                 <span className="truncate">{material.subject} (Sem {material.semester})</span>
            </div>
            <div className="flex items-center gap-2 pt-2">
                <User className="h-4 w-4 flex-shrink-0" />
                <span className="truncate text-xs">By {material.uploaderName}</span>
                <span className="text-xs text-muted-foreground/80">·</span>
                 <Calendar className="h-4 w-4 flex-shrink-0" />
                <span className="text-xs">{material.createdAt.toLocaleDateString()}</span>
            </div>
        </div>
      </CardContent>
       <div className="p-6 pt-4 mt-auto">
        <Button asChild className="w-full group/button">
          <a href={material.fileURL} target="_blank" rel="noopener noreferrer">
            Download <Download className="ml-2 h-4 w-4 transition-transform group-hover/button:animate-bounce" />
          </a>
        </Button>
      </div>
    </Card>
  );
}
