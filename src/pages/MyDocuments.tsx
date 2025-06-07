import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { Plus, Edit, Trash2, FileText, Upload } from "lucide-react";
import Navbar from "@/components/Navbar";
import DocumentAnalysis from "@/components/DocumentAnalysis";
import { documents, categories, standards, type Document } from "@/data/documents";

const MyDocuments = () => {
  const { user } = useAuth();
  const [userDocuments, setUserDocuments] = useState<Document[]>(
    documents.filter(doc => doc.authorId === user?.id)
  );
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingDocument, setEditingDocument] = useState<Document | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [editUploadedFile, setEditUploadedFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    standard: "",
    version: "",
    filePath: ""
  });

  const resetForm = () => {
    setFormData({
      title: "",
      category: "",
      description: "",
      standard: "",
      version: "",
      filePath: ""
    });
    setUploadedFile(null);
    setEditUploadedFile(null);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type !== "application/pdf") {
        toast({
          title: "Error",
          description: "Please upload a PDF file only",
          variant: "destructive",
        });
        return;
      }
      setUploadedFile(file);
      console.log("File uploaded:", file.name);
    }
  };

  const handleEditFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type !== "application/pdf") {
        toast({
          title: "Error",
          description: "Please upload a PDF file only",
          variant: "destructive",
        });
        return;
      }
      setEditUploadedFile(file);
      console.log("Edit file uploaded:", file.name);
    }
  };

  const handleAnalyzeDocument = () => {
    console.log("Analyzing document:", uploadedFile?.name);
  };

  const handleAnalyzeEditDocument = () => {
    console.log("Analyzing edit document:", editUploadedFile?.name);
  };

  const handleAddDocument = () => {
    if (!formData.title || !formData.category || !formData.description) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (!uploadedFile) {
      toast({
        title: "Error",
        description: "Please upload a PDF file",
        variant: "destructive",
      });
      return;
    }

    // Simulate file upload - in a real app, you'd upload to a server
    const filePath = `/documents/${uploadedFile.name}`;

    const newDocument: Document = {
      id: `doc-${Date.now()}`,
      title: formData.title,
      category: formData.category,
      description: formData.description,
      standard: formData.standard || "ISO 9001:2015",
      lastUpdated: new Date().toISOString().split('T')[0],
      version: formData.version || "1.0",
      filePath: filePath,
      authorId: user?.id || "",
      authorName: user?.name || ""
    };

    setUserDocuments([...userDocuments, newDocument]);
    setIsAddDialogOpen(false);
    resetForm();
    toast({
      title: "Success",
      description: "Document added successfully",
    });
  };

  const handleEditDocument = () => {
    if (!editingDocument || !formData.title || !formData.category || !formData.description) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    // Use new uploaded file path if a file was uploaded, otherwise keep existing path
    let filePath = editingDocument.filePath;
    if (editUploadedFile) {
      filePath = `/documents/${editUploadedFile.name}`;
    }

    const updatedDocument: Document = {
      ...editingDocument,
      title: formData.title,
      category: formData.category,
      description: formData.description,
      standard: formData.standard,
      version: formData.version,
      filePath: filePath,
      lastUpdated: new Date().toISOString().split('T')[0]
    };

    setUserDocuments(userDocuments.map(doc => 
      doc.id === editingDocument.id ? updatedDocument : doc
    ));
    setIsEditDialogOpen(false);
    setEditingDocument(null);
    resetForm();
    toast({
      title: "Success",
      description: "Document updated successfully",
    });
  };

  const handleDeleteDocument = (documentId: string) => {
    setUserDocuments(userDocuments.filter(doc => doc.id !== documentId));
    toast({
      title: "Success",
      description: "Document deleted successfully",
    });
  };

  const openEditDialog = (document: Document) => {
    setEditingDocument(document);
    setFormData({
      title: document.title,
      category: document.category,
      description: document.description,
      standard: document.standard,
      version: document.version,
      filePath: document.filePath || ""
    });
    setEditUploadedFile(null);
    setIsEditDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Documents</h1>
            <p className="text-gray-600 mt-2">Manage your personal documents</p>
          </div>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-qms-blue hover:bg-qms-lightBlue">
                <Plus className="mr-2 h-4 w-4" />
                Add Document
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Document</DialogTitle>
                <DialogDescription>
                  Create a new document
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="Document title"
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.filter(cat => cat !== "All Documents").map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Document description"
                  />
                </div>
                <div>
                  <Label htmlFor="standard">Standard</Label>
                  <Select value={formData.standard} onValueChange={(value) => setFormData({...formData, standard: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select standard" />
                    </SelectTrigger>
                    <SelectContent>
                      {standards.map((standard) => (
                        <SelectItem key={standard} value={standard}>
                          {standard}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="version">Version</Label>
                  <Input
                    id="version"
                    value={formData.version}
                    onChange={(e) => setFormData({...formData, version: e.target.value})}
                    placeholder="1.0"
                  />
                </div>
                <div>
                  <Label htmlFor="file-upload">Upload PDF File *</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="file-upload"
                      type="file"
                      accept=".pdf"
                      onChange={handleFileUpload}
                      className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-qms-blue file:text-white hover:file:bg-qms-lightBlue"
                    />
                    <Upload className="h-4 w-4 text-gray-400" />
                  </div>
                  {uploadedFile && (
                    <p className="text-sm text-green-600 mt-1">
                      ✓ {uploadedFile.name}
                    </p>
                  )}
                </div>

                {/* Document Analysis Component */}
                <DocumentAnalysis 
                  uploadedFile={uploadedFile}
                  onAnalyze={handleAnalyzeDocument}
                />
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddDocument}>Add Document</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="mr-2 h-5 w-5" />
              My Documents
            </CardTitle>
            <CardDescription>
              Total documents: {userDocuments.length}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Standard</TableHead>
                  <TableHead>Version</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {userDocuments.map((document) => (
                  <TableRow key={document.id}>
                    <TableCell className="font-medium">{document.title}</TableCell>
                    <TableCell>{document.category}</TableCell>
                    <TableCell>{document.standard}</TableCell>
                    <TableCell>{document.version}</TableCell>
                    <TableCell>{document.lastUpdated}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openEditDialog(document)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteDocument(document.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Document</DialogTitle>
              <DialogDescription>
                Update document information
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-title">Title *</Label>
                <Input
                  id="edit-title"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="Document title"
                />
              </div>
              <div>
                <Label htmlFor="edit-category">Category *</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.filter(cat => cat !== "All Documents").map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit-description">Description *</Label>
                <Textarea
                  id="edit-description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Document description"
                />
              </div>
              <div>
                <Label htmlFor="edit-standard">Standard</Label>
                <Select value={formData.standard} onValueChange={(value) => setFormData({...formData, standard: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select standard" />
                  </SelectTrigger>
                  <SelectContent>
                    {standards.map((standard) => (
                      <SelectItem key={standard} value={standard}>
                        {standard}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit-version">Version</Label>
                <Input
                  id="edit-version"
                  value={formData.version}
                  onChange={(e) => setFormData({...formData, version: e.target.value})}
                  placeholder="1.0"
                />
              </div>
              <div>
                <Label htmlFor="edit-file-upload">Upload New PDF File (Optional)</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="edit-file-upload"
                    type="file"
                    accept=".pdf"
                    onChange={handleEditFileUpload}
                    className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-qms-blue file:text-white hover:file:bg-qms-lightBlue"
                  />
                  <Upload className="h-4 w-4 text-gray-400" />
                </div>
                {editUploadedFile && (
                  <p className="text-sm text-green-600 mt-1">
                    ✓ {editUploadedFile.name}
                  </p>
                )}
                <p className="text-xs text-gray-500 mt-1">
                  Current file: {formData.filePath ? formData.filePath.split('/').pop() : 'No file'}
                </p>
              </div>

              {/* Document Analysis Component for Edit Dialog */}
              <DocumentAnalysis 
                uploadedFile={editUploadedFile}
                onAnalyze={handleAnalyzeEditDocument}
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleEditDocument}>Update Document</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default MyDocuments;
