export interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  createdDate: string;
  lastUpdated: string;
  pmDashboardUrl?: string;
  designGoals: string[];
  designPrinciples: DesignPrinciple[];
  deliverables: Deliverable[];
  keyInsights: string[];
}

export type ProjectStatus = 'research' | 'concepts' | 'production' | 'qa' | 'complete';

export interface DesignPrinciple {
  title: string;
  description: string;
  rationale: string;
}

export interface Deliverable {
  id: string;
  type: string;
  skill: string;
  title: string;
  summary: string;
  filePath: string;
  createdDate: string;
  visible: boolean;
  visualAssets?: VisualAssets;
}

export interface VisualAssets {
  colorPalette?: string[];
  images?: string[];
  preview?: string;
}

export interface ProjectsData {
  projects: Project[];
}
