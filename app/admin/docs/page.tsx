'use client'

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { FileText, Plus, Save, Trash2, FolderOpen } from 'lucide-react';

export default function AdminDocsPage() {
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [files, setFiles] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [isEditing, setIsEditing] = useState(false);
  const [newFileName, setNewFileName] = useState('');

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      loadFiles(selectedCategory);
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (selectedCategory && selectedFile) {
      loadContent(selectedCategory, selectedFile);
    }
  }, [selectedCategory, selectedFile]);

  const loadCategories = async () => {
    const res = await fetch('/api/docs');
    const data = await res.json();
    setCategories(data.categories || []);
  };

  const loadFiles = async (category: string) => {
    const res = await fetch(`/api/docs?category=${category}`);
    const data = await res.json();
    setFiles(data.files || []);
  };

  const loadContent = async (category: string, slug: string) => {
    const res = await fetch(`/api/docs?category=${category}&slug=${slug}`);
    const data = await res.json();
    setContent(data.content || '');
    setIsEditing(false);
  };

  const saveDocument = async () => {
    const slug = selectedFile || newFileName;
    if (!slug) {
      alert('请输入文件名 / Please enter a file name');
      return;
    }

    const res = await fetch('/api/docs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        category: selectedCategory,
        slug,
        content,
      }),
    });

    if (res.ok) {
      alert('保存成功！/ Saved successfully!');
      setIsEditing(false);
      setNewFileName('');
      loadFiles(selectedCategory);
      if (!selectedFile) {
        setSelectedFile(slug);
      }
    } else {
      alert('保存失败 / Save failed');
    }
  };

  const deleteDocument = async () => {
    if (!confirm('确定要删除这个文档吗？/ Are you sure you want to delete this document?')) {
      return;
    }

    const res = await fetch(`/api/docs?category=${selectedCategory}&slug=${selectedFile}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      alert('删除成功！/ Deleted successfully!');
      setSelectedFile('');
      setContent('');
      loadFiles(selectedCategory);
    } else {
      alert('删除失败 / Delete failed');
    }
  };

  const createNewDocument = () => {
    setSelectedFile('');
    setContent('# 新文档\n\n## 章节1\n\n内容...');
    setIsEditing(true);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-900">文档管理后台</h1>
          <p className="text-slate-600 mt-2">Document Management Dashboard</p>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* 左侧：分类和文件列表 */}
          <div className="col-span-3 bg-white rounded-lg shadow p-4">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <FolderOpen className="h-5 w-5" />
              分类 / Categories
            </h2>
            <div className="space-y-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`w-full text-left px-3 py-2 rounded transition-colors ${
                    selectedCategory === cat
                      ? 'bg-blue-100 text-blue-700 font-medium'
                      : 'hover:bg-slate-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {selectedCategory && (
              <>
                <hr className="my-4" />
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    文档 / Documents
                  </h3>
                  <Button
                    size="sm"
                    onClick={createNewDocument}
                    className="h-7 px-2"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-1">
                  {files.map(file => (
                    <button
                      key={file}
                      onClick={() => setSelectedFile(file)}
                      className={`w-full text-left px-2 py-1.5 rounded text-sm transition-colors ${
                        selectedFile === file
                          ? 'bg-slate-200 font-medium'
                          : 'hover:bg-slate-100'
                      }`}
                    >
                      {file}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* 右侧：编辑器 */}
          <div className="col-span-9 bg-white rounded-lg shadow p-6">
            {selectedCategory ? (
              <>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    {!selectedFile && isEditing ? (
                      <input
                        type="text"
                        placeholder="输入文件名 / Enter file name"
                        value={newFileName}
                        onChange={(e) => setNewFileName(e.target.value)}
                        className="px-3 py-2 border rounded"
                      />
                    ) : (
                      <h2 className="text-xl font-semibold">
                        {selectedFile || '新文档 / New Document'}
                      </h2>
                    )}
                  </div>
                  <div className="flex gap-2">
                    {!isEditing ? (
                      <Button onClick={() => setIsEditing(true)}>
                        编辑 / Edit
                      </Button>
                    ) : (
                      <>
                        <Button onClick={saveDocument} className="bg-green-600 hover:bg-green-700">
                          <Save className="h-4 w-4 mr-2" />
                          保存 / Save
                        </Button>
                        <Button
                          onClick={() => {
                            setIsEditing(false);
                            if (selectedFile) {
                              loadContent(selectedCategory, selectedFile);
                            } else {
                              setContent('');
                            }
                          }}
                          className="bg-slate-600 hover:bg-slate-700"
                        >
                          取消 / Cancel
                        </Button>
                      </>
                    )}
                    {selectedFile && (
                      <Button
                        onClick={deleteDocument}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>

                {isEditing ? (
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full h-[600px] p-4 border rounded font-mono text-sm"
                    placeholder="在这里编写Markdown内容... / Write Markdown content here..."
                  />
                ) : (
                  <div className="prose max-w-none p-4 border rounded min-h-[600px]">
                    <pre className="whitespace-pre-wrap font-mono text-sm">
                      {content || '请选择一个文档或创建新文档 / Please select a document or create a new one'}
                    </pre>
                  </div>
                )}
              </>
            ) : (
              <div className="flex items-center justify-center h-[600px] text-slate-500">
                请先选择一个分类 / Please select a category first
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
