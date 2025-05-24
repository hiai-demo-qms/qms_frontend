
export interface Document {
  id: string;
  title: string;
  category: string;
  description: string;
  standard: string;
  lastUpdated: string;
  version: string;
  filePath?: string;
  authorId: string;
  authorName: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  createdAt: string;
}

export const users: User[] = [
  {
    id: "user-1",
    name: "Nguyễn Văn A",
    email: "admin@company.com",
    role: "admin",
    createdAt: "2023-01-15"
  },
  {
    id: "user-2", 
    name: "Trần Thị B",
    email: "user1@company.com",
    role: "user",
    createdAt: "2023-02-20"
  },
  {
    id: "user-3",
    name: "Lê Văn C", 
    email: "user2@company.com",
    role: "user",
    createdAt: "2023-03-10"
  }
];

export const documents: Document[] = [
  {
    id: "doc-1",
    title: "Quality Manual",
    category: "Quality Management",
    description: "Main quality management system documentation",
    standard: "ISO 9001:2015",
    lastUpdated: "2023-05-15",
    version: "3.2",
    filePath: "/documents/quality-manual.pdf",
    authorId: "user-1",
    authorName: "Nguyễn Văn A"
  },
  {
    id: "doc-2",
    title: "Risk Assessment Procedure",
    category: "Risk Management",
    description: "Procedure for identifying and assessing risks",
    standard: "ISO 9001:2015",
    lastUpdated: "2023-04-22",
    version: "2.1",
    filePath: "/documents/risk-assessment.pdf",
    authorId: "user-2",
    authorName: "Trần Thị B"
  },
  {
    id: "doc-3",
    title: "Internal Audit Procedure",
    category: "Auditing",
    description: "Procedure for conducting internal audits",
    standard: "ISO 9001:2015",
    lastUpdated: "2023-06-10",
    version: "1.5",
    filePath: "/documents/internal-audit.pdf",
    authorId: "user-1",
    authorName: "Nguyễn Văn A"
  },
  {
    id: "doc-4",
    title: "Document Control Procedure",
    category: "Documentation",
    description: "Procedure for controlling documents and records",
    standard: "ISO 9001:2015",
    lastUpdated: "2023-03-18",
    version: "2.3",
    filePath: "/documents/document-control.pdf",
    authorId: "user-3",
    authorName: "Lê Văn C"
  },
  {
    id: "doc-5",
    title: "Management Review Procedure",
    category: "Management",
    description: "Procedure for conducting management reviews",
    standard: "ISO 9001:2015",
    lastUpdated: "2023-02-05",
    version: "1.2",
    filePath: "/documents/management-review.pdf",
    authorId: "user-2",
    authorName: "Trần Thị B"
  },
  {
    id: "doc-6",
    title: "Corrective Action Procedure",
    category: "Improvement",
    description: "Procedure for addressing nonconformities",
    standard: "ISO 9001:2015",
    lastUpdated: "2023-01-30",
    version: "2.0",
    filePath: "/documents/corrective-action.pdf",
    authorId: "user-1",
    authorName: "Nguyễn Văn A"
  },
  {
    id: "doc-7",
    title: "Environmental Management Plan",
    category: "Environmental",
    description: "Plan for environmental aspects management",
    standard: "ISO 14001:2015",
    lastUpdated: "2023-05-20",
    version: "1.1",
    filePath: "/documents/environmental-plan.pdf",
    authorId: "user-3",
    authorName: "Lê Văn C"
  },
  {
    id: "doc-8",
    title: "Information Security Policy",
    category: "Security",
    description: "Policy for information security management",
    standard: "ISO 27001:2013",
    lastUpdated: "2023-04-12",
    version: "3.0",
    filePath: "/documents/security-policy.pdf",
    authorId: "user-2",
    authorName: "Trần Thị B"
  },
];

export const categories = [
  "All Documents",
  "Quality Management",
  "Risk Management",
  "Auditing",
  "Documentation",
  "Management",
  "Improvement",
  "Environmental",
  "Security",
];

export const standards = ["ISO 9001:2015", "ISO 14001:2015", "ISO 27001:2013"];
