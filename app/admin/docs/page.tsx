'use client'

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { RequireLogin } from '@/components/auth/RequireLogin';
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
      alert('璇疯緭鍏ユ枃浠跺悕 / Please enter a file name');
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
      alert('淇濆瓨鎴愬姛锛? Saved successfully!');
      setIsEditing(false);
      setNewFileName('');
      loadFiles(selectedCategory);
      if (!selectedFile) {
        setSelectedFile(slug);
      }
    } else {
      alert('淇濆瓨澶辫触 / Save failed');
    }
  };

  const deleteDocument = async () => {
    if (!confirm('纭畾瑕佸垹闄よ繖涓枃妗ｅ悧锛? Are you sure you want to delete this document?')) {
      return;
    }

    const res = await fetch(`/api/docs?category=${selectedCategory}&slug=${selectedFile}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      alert('鍒犻櫎鎴愬姛锛? Deleted successfully!');
      setSelectedFile('');
      setContent('');
      loadFiles(selectedCategory);
    } else {
      alert('鍒犻櫎澶辫触 / Delete failed');
    }
  };

  const createNewDocument = () => {
    setSelectedFile('');
    setContent('# 鏂版枃妗n\n## 绔犺妭1\n\n鍐呭...');
    setIsEditing(true);
  };

  return (
    <RequireLogin>
      <div className="min-h-screen">
        <div className="container mx-auto p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground">鏂囨。绠＄悊鍚庡彴</h1>
            <p className="mt-2 text-muted">Document Management Dashboard</p>
          </div>

          <div className="grid grid-cols-12 gap-6">
            {/* 宸︿晶锛氬垎绫诲拰鏂囦欢鍒楄〃 */}
            <div className="col-span-3 rounded-md glass-surface p-4 shadow-sm">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <FolderOpen className="h-5 w-5" />
                鍒嗙被 / Categories
              </h2>
              <div className="space-y-2">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full rounded px-3 py-2 text-left transition-colors ${selectedCategory === cat
                        ? 'bg-secondary text-foreground font-medium'
                        : 'text-muted hover:bg-secondary hover:text-foreground'
                      }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {selectedCategory && (
                <>
                  <hr className="my-4 border-border" />
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      鏂囨。 / Documents
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
                        className={`w-full rounded px-2 py-1.5 text-left text-sm transition-colors ${selectedFile === file
                            ? 'bg-secondary text-foreground font-medium'
                            : 'text-muted hover:bg-secondary hover:text-foreground'
                          }`}
                      >
                        {file}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* 鍙充晶锛氱紪杈戝櫒 */}
            <div className="col-span-9 rounded-md glass-surface p-6 shadow-sm">
              {selectedCategory ? (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      {!selectedFile && isEditing ? (
                        <input
                          type="text"
                          placeholder="杈撳叆鏂囦欢鍚?/ Enter file name"
                          value={newFileName}
                          onChange={(e) => setNewFileName(e.target.value)}
                          className="rounded border border-border bg-card px-3 py-2 text-foreground outline-none focus:border-foreground"
                        />
                      ) : (
                        <h2 className="text-xl font-semibold">
                          {selectedFile || '鏂版枃妗?/ New Document'}
                        </h2>
                      )}
                    </div>
                    <div className="flex gap-2">
                      {!isEditing ? (
                        <Button onClick={() => setIsEditing(true)}>
                          缂栬緫 / Edit
                        </Button>
                      ) : (
                        <>
                          <Button onClick={saveDocument}>
                            <Save className="h-4 w-4 mr-2" />
                            淇濆瓨 / Save
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
                            variant="secondary"
                          >
                            鍙栨秷 / Cancel
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
                      className="h-[600px] w-full rounded border border-border bg-card p-4 font-mono text-sm text-foreground outline-none focus:border-foreground"
                      placeholder="鍦ㄨ繖閲岀紪鍐橫arkdown鍐呭... / Write Markdown content here..."
                    />
                  ) : (
                    <div className="prose prose-mm min-h-[600px] max-w-none rounded border border-border bg-card p-4">
                      <pre className="whitespace-pre-wrap font-mono text-sm">
                        {content || '璇烽€夋嫨涓€涓枃妗ｆ垨鍒涘缓鏂版枃妗?/ Please select a document or create a new one'}
                      </pre>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex h-[600px] items-center justify-center text-muted">
                  璇峰厛閫夋嫨涓€涓垎绫?/ Please select a category first
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </RequireLogin>
  );
}


