
export interface Document {
  id: string;
  title: string;
  category: string;
  description: string;
  standard: string;
  lastUpdated: string;
  version: string;
  filePath?: string; // Đường dẫn đến file PDF
}

export const documents: Document[] = [
  {
    id: "doc-1",
    title: "Quality Manual",
    category: "Quality Management",
    description: "Main quality management system documentation",
    standard: "ISO 9001:2015",
    lastUpdated: "2023-05-15",
    version: "3.2",
    filePath: "/documents/quality-manual.pdf", // Ví dụ đường dẫn
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
