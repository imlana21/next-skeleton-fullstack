# Apa itu path alias?

Path alias merupakan alias dari suatu path yang digunakan untuk memperpendek jalan pemanggilan path pada suatu project. Path alias diawali dengan @, misalnya: `@component` untuk mengakses folder `src/component` dimanapun.

Semakin besar suatu project maka semakin terlihat jelas manfaat alias. Karena terkadang akan ditemui dalam project path seperti `./../../../../component/file`, semakin dalam letak file maka `../` akan semakin panjang.

Pengaturan path alias dilokasi yang sama dengan mengatur baseUrl, yaitu di `jsconfig.json` dan `tsconfig.json`. NextJS mendukung `jsconfig.json` dan `tsconfig.json` untuk versi 9.4 keatas.

# Contoh Konfigurasi

```json
  {
    "compilerOptions": {
      "baseUrl": ".",
      "paths": {
        "@components/*": ["components/*"]
      }
    }
  }
```

1. `baseUrl` : digunakan untuk mengatur base url pada javascript project
2. `paths` : tempat dimana kita membuat path alias
3. `@components/*` : adalah contoh path alias untuk mengakses seluruh file yang ada di `src/components/`