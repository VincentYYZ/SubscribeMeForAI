import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const CONTENT_DIR = path.join(process.cwd(), 'content');

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const slug = searchParams.get('slug');

  try {
    if (category && slug) {
      const filePath = path.join(CONTENT_DIR, category, `${slug}.md`);
      const content = fs.readFileSync(filePath, 'utf-8');
      return NextResponse.json({ content });
    }

    if (category) {
      const categoryPath = path.join(CONTENT_DIR, category);
      if (!fs.existsSync(categoryPath)) {
        return NextResponse.json({ files: [] });
      }
      const files = fs.readdirSync(categoryPath)
        .filter(f => f.endsWith('.md'))
        .map(f => f.replace('.md', ''));
      return NextResponse.json({ files });
    }

    const categories = fs.readdirSync(CONTENT_DIR)
      .filter(f => fs.statSync(path.join(CONTENT_DIR, f)).isDirectory());
    return NextResponse.json({ categories });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read files' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { category, slug, content } = await request.json();

    if (!category || !slug || content === undefined) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const categoryPath = path.join(CONTENT_DIR, category);
    if (!fs.existsSync(categoryPath)) {
      fs.mkdirSync(categoryPath, { recursive: true });
    }

    const filePath = path.join(categoryPath, `${slug}.md`);
    fs.writeFileSync(filePath, content, 'utf-8');

    return NextResponse.json({ success: true, message: 'Document saved successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save document' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const slug = searchParams.get('slug');

    if (!category || !slug) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const filePath = path.join(CONTENT_DIR, category, `${slug}.md`);
    
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return NextResponse.json({ success: true, message: 'Document deleted successfully' });
    } else {
      return NextResponse.json({ error: 'Document not found' }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete document' }, { status: 500 });
  }
}
