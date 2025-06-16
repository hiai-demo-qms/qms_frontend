import { useEffect, useState } from "react";
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
import { Plus, Edit, Trash2, FileText, Upload, View } from "lucide-react";
import Navbar from "@/components/Navbar";
import DocumentAnalysis from "@/components/DocumentAnalysis";
import SaveButton from "@/components/SaveButton";
// import { standards, type Document } from "@/data/documents";
import { useCategories } from "@/hooks/useCategories";
import { useDocuments, type Document  } from "@/hooks/useDocuments";
import  dayjs  from "dayjs";

const MyDocuments = () => {
  const { user } = useAuth();
  const accessToken = localStorage.getItem("accessToken") || "";
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const { documents, uploadDocument, updateDocument, deleteDocument, getDocumentUrl, fetchDocumentsByUser } = useDocuments();

  useEffect(() => {
    fetchDocumentsByUser(); // hoặc fetchDocumentsByCategory(2)
  }, []);

  const { categories } = useCategories();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingDocument, setEditingDocument] = useState<Document | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [editUploadedFile, setEditUploadedFile] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    code: "",
    title: "",
    category: "",
    description: "",
    version: "",
    filePath: ""
  });

  const resetForm = () => {
    setFormData({
      code: "",
      title: "",
      category: "",
      description: "",
      version: "",
      filePath: ""
    });
    setUploadedFile(null);
    setEditUploadedFile(null);
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleSaveDraft = async () => {
    if (!formData.title) {
      toast({
        title: "Error",
        description: "Please enter a document title to save as draft",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);

    // Simulate save delay
    setTimeout(() => {

      setIsSaving(false);
      
      toast({
        title: "Success",
        description: "Document saved as draft successfully",
      });
    }, 1000);
  };

  const handleSaveEditDraft = async () => {
    if (!editingDocument || !formData.title) {
      toast({
        title: "Error",
        description: "Please enter a document title to save changes",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);

    setTimeout(() => {
      let filePath = editingDocument.filePath;
      if (editUploadedFile) {
        filePath = `/documents/${editUploadedFile.name}`;
      }

      setIsSaving(false);
      
      toast({
        title: "Success",
        description: "Document changes saved as draft",
      });
    }, 1000);
  };

  const handleAddDocument = async () => {
    if (!uploadedFile || !formData.title || !formData.category || !formData.description) {
      alert("Vui lòng nhập đầy đủ thông tin bắt buộc.");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("Code", formData.code);
    formDataToSend.append("Title", formData.title);
    formDataToSend.append("Category", formData.category);
    formDataToSend.append("Description", formData.description);
    formDataToSend.append("Version", formData.version);
    formDataToSend.append("FileUpload", uploadedFile);

    const res = await uploadDocument(formDataToSend); // Assuming category ID 2 for "All Documents"
    if (res.ok) {
      setIsAddDialogOpen(false);
      fetchDocumentsByUser();
      resetForm();
      setUploadedFile(null);
    }
  };

  const handleEditDocument = async () => {
    if (!formData.title || !formData.category || !formData.description) {
      alert("Vui lòng nhập đầy đủ thông tin bắt buộc.");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("Code", formData.code);
    formDataToSend.append("Title", formData.title);
    formDataToSend.append("Category", formData.category);
    formDataToSend.append("Description", formData.description);
    formDataToSend.append("Version", formData.version);
    formDataToSend.append("FileUpload", editUploadedFile);

    for (const [key, value] of formDataToSend.entries()) {
      console.log(`${key}:`, value);
    }

    const res = await updateDocument(editingDocument.id, formDataToSend);

    if (res.ok) {
      fetchDocumentsByUser();
      setIsEditDialogOpen(false);
      setEditingDocument(null);
      resetForm();
      toast({
        title: "Success",
        description: "Document updated successfully",
      });
      setEditUploadedFile(null);
    }
  };

  const handleDeleteDocument = (documentId: number) => {
    if (confirm("Bạn có chắc chắn muốn xóa tài liệu này?")) {
      deleteDocument(documentId)
        .then(() => {
          fetchDocumentsByUser();
          toast({
            title: "Success",
            description: "Document deleted successfully",
          });
        })
        .catch((error) => {
          console.error("Error deleting document:", error);
          toast({
            title: "Error",
            description: "Failed to delete document",
            variant: "destructive",
          });
        });
    }
  };

  const openDocument = async (document: Document) => {
    getDocumentUrl(document.id);
  };

  const openEditDialog = (document: Document) => {
    setEditingDocument(document);
    setFormData({
      code: document.code,
      title: document.title,
      category: document.category.categoryName,
      description: document.description,
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
            <h1 className="text-3xl font-bold text-gray-900">Tài liệu của tôi</h1>
            <p className="text-gray-600 mt-2">Quản lý tài liệu cá nhân</p>
          </div>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-qms-blue hover:bg-qms-lightBlue">
                <Plus className="mr-2 h-4 w-4" />
                Thêm tài liệu
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Tải lên tài liệu mới</DialogTitle>
                <DialogDescription>
                  Create a new document
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="code">Mã tài liệu *</Label>
                  <Input
                    id="code"
                    value={formData.code}
                    onChange={(e) => setFormData({...formData, code: e.target.value})}
                    placeholder="Mã tài liệu"
                  />
                </div>
                <div>
                  <Label htmlFor="title">Tiêu đề *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="Tiêu đề tài liệu"
                  />
                </div>
                <div>
                  <Label htmlFor="category">Danh mục *</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn danh mục" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.filter(cat => cat.categoryName !== "All Documents").map((category) => (
                        <SelectItem key={category.id} value={category.categoryName}>
                          {category.categoryName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="description">Mô tả *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Mô tả tài liệu"
                  />
                </div>
                <div>
                  <Label htmlFor="version">Phiên bản</Label>
                  <Input
                    id="version"
                    value={formData.version}
                    onChange={(e) => setFormData({...formData, version: e.target.value})}
                    placeholder="1.0"
                  />
                </div>
                <div>
                  <Label htmlFor="file-upload">Tải lên tệp PDF *</Label>
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
              <DialogFooter className="flex gap-2">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Hủy
                </Button>
                <SaveButton 
                  onSave={handleSaveDraft}
                  isLoading={isSaving}
                  disabled={!formData.title}
                />
                <Button onClick={handleAddDocument}>Tải lên</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="mr-2 h-5 w-5" />
              Tài liệu của tôi
            </CardTitle>
            <CardDescription>
              Tổng số tài liệu: {documents.length}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mã tài liệu</TableHead>
                  <TableHead>Tiêu đề</TableHead>
                  <TableHead>Danh mục</TableHead>
                  <TableHead>Phiên bản</TableHead>
                  <TableHead>Cập nhật lần cuối</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {documents.map((document) => (
                  <TableRow key={document.id}>
                    <TableCell className="font-mono">
                      {document.code}
                    </TableCell>
                    <TableCell className="font-medium">
                      {document.title}
                      {document.title.startsWith("[DRAFT]") && (
                        <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                          Draft
                        </span>
                      )}
                    </TableCell>
                    <TableCell>{document.category.categoryName}</TableCell>
                    <TableCell>{document.version}</TableCell>
                    <TableCell>{dayjs(document.updatedAt).format("DD/MM/YYYY HH:mm")}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openDocument(document)}
                        >
                          <View className="h-4 w-4" />
                        </Button>
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
              <DialogTitle>Chỉnh sửa tài liệu</DialogTitle>
              <DialogDescription>
                Chỉnh sửa thông tin tài liệu
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-code">Mã tài liệu *</Label>
                <Input
                  id="edit-code"
                  value={formData.code}
                  onChange={(e) => setFormData({...formData, code: e.target.value})}
                  placeholder="Mã tài liệu"
                />
              </div>
              <div>
                <Label htmlFor="edit-title">Tiêu đề *</Label>
                <Input
                  id="edit-title"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="Tiêu đề tài liệu"
                />
              </div>
              <div>
                <Label htmlFor="edit-category">Danh mục *</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn danh mục" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.filter(cat => cat.categoryName !== "All Documents").map((category) => (
                      <SelectItem key={category.id} value={category.categoryName}>
                        {category.categoryName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit-description">Mô tả *</Label>
                <Textarea
                  id="edit-description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Mô tả tài liệu"
                />
              </div>
              <div>
                <Label htmlFor="edit-version">Phiên bản</Label>
                <Input
                  id="edit-version"
                  value={formData.version}
                  onChange={(e) => setFormData({...formData, version: e.target.value})}
                  placeholder="1.0"
                />
              </div>
              <div>
                <Label htmlFor="edit-file-upload">Tải lên tệp PDF (Tùy chọn)</Label>
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
                  Tệp hiện tại: {formData.filePath ? formData.filePath.split('/').pop() : 'No file'}
                </p>
              </div>

              {/* Document Analysis Component for Edit Dialog */}
              <DocumentAnalysis 
                uploadedFile={editUploadedFile}
                onAnalyze={handleAnalyzeEditDocument}
              />
            </div>
            <DialogFooter className="flex gap-2">
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Hủy
              </Button>
              <SaveButton 
                onSave={handleSaveEditDraft}
                isLoading={isSaving}
                disabled={!formData.title}
              />
              <Button onClick={handleEditDocument}>Cập nhật</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default MyDocuments;
