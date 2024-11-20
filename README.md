# GitHub Markdown Renderer

Aplikasi web untuk mengkonversi dan menampilkan file markdown dari GitHub dengan tampilan yang menarik. Dibangun menggunakan Next.js 14, TypeScript, dan Tailwind CSS.

## Fitur

- Konversi URL GitHub ke raw URL
- Render markdown dengan dukungan GitHub Flavored Markdown (GFM)
- Tampilan gambar dan GIF yang responsif
- Navigasi anchor links yang smooth
- Server-side rendering untuk performa optimal
- Tombol "Back to Top" untuk navigasi mudah
- Tampilan responsif untuk semua ukuran layar

## Teknologi yang Digunakan

- [Next.js 14](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - JavaScript dengan type system
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Remark](https://github.com/remarkjs/remark) - Markdown processor
- [@tailwindcss/typography](https://tailwindcss.com/docs/typography-plugin) - Plugin untuk styling konten markdown

## Cara Penggunaan

1. Clone repository ini
```bash
git clone [url-repository]
cd markdown-render
```

2. Install dependensi
```bash
npm install
```

3. Jalankan development server
```bash
npm run dev
```

4. Buka [http://localhost:3000](http://localhost:3000) di browser

5. Masukkan URL GitHub markdown (contoh: https://github.com/user/repo/blob/main/README.md)

## Fitur Markdown yang Didukung

- Heading dan subheading
- Link dan anchor navigation
- Gambar dan GIF animasi
- Tabel (GitHub Flavored Markdown)
- List (ordered dan unordered)
- Code blocks
- Dan semua fitur markdown standar lainnya

## Struktur Proyek

```
markdown-render/
├── app/
│   ├── page.tsx                    # Halaman utama dengan form input
│   └── render/
│       ├── page.tsx                # Server component untuk render markdown
│       └── markdown-renderer.tsx   # Client component untuk tampilan
├── public/
└── ...
```