interface ProjectDetail {
  label: string;
  value: string;
  color?: string;
}

interface ProjectDetailsProps {
  details: ProjectDetail[];
}

export function ProjectDetails({ details }: ProjectDetailsProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-5 shadow-sm">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        {details.map((detail, index) => (
          <div key={index} className="space-y-1.5">
            <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider">
              {detail.label} :
            </div>
            <div 
              className="font-semibold text-base text-card-foreground"
              style={{ 
                color: detail.color || undefined
              }}
            >
              {detail.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}