# Function

Function merupakan bagian dari code yang terorganisir dan bersifat reusable. Function dapat digunakan berulang kali ketika sudah dibuat.

## Mendefiniskan function
1. Dimulai dengan `def` keyword, diikuti oleh nama function kemudian (), lalu diakhiri dengan titik 2. Misal : `def namefunction():`
2. Statement didalam function dibedakan indetasinya degan nama function. Contohnya :

```py
  def namefunction():
    print('Hello World')
```

3. Didalam function kita bisa menggunakan document string (`'''`) untuk menjelaskan function. Example :

```py
  def namefunction():
    '''
      Ini adalah dokumentasi dari function
    '''
```
4. Function ada 2 macam funtion yang memiliki return value dan tidak. Contoh :

```py
    # Function non return value (procedural function)
    def printname(name):
      print(name)

    # Function with return value (return function)
    def jumlah(a, b):
      return a + b
```

5. Untuk pemanggilan function pada main program menggunakan format `namefunction()` atau `namefunction('nilai data')` 

## Argument

Penulisan argument, yaitu : `def namefunction(argument)`. 

### Types of Argument
1. Essential Argument

  Argument yang harus benar benar ditulis secara urut ketika pemanggilan. Example : `def namefunction(a, b)`. Pemanggilannya : `namefunction(1, 2)`

2. Keyword Argument 

  Argument yang tak harus urut ketika dipanggil, karena dipanggil berdasar nama keynya. Exampe : `def namefunction(a, b)`. Pemanggilannya : `namefunction(b = 1, a = 2)`

3. Default Argument

  Function yang nilai argumentnya telah ditentukan sebelum pemanggilan. Example : `def namefunction(a, b=2)`. Pemanggilannya : `namefunction(2)` atau `namefunction(2, 3)`

4. Indifinete Lenght Argument
  Function yang bisa memiliki argument dengan jumlah yang tak terbatas. Function ini akan memanfaatkan keyword `args` dan `kwargs` sebagai argumentnya. Example: `def namefunction(*args, *kwargs)`, Pemanggilannya : `namefunction(1, 2, 3, 4, 5)`


## Anonymous FUnction

1. Dengan menggunakan keyword lambda 
2. Ditulis dalam 1 baris
  
Contoh Penulisan : 

`namefunction = lambda a, b, c : a + b + c`

## Variables Global dan Local

Variable global adalah variable yang bisa diakses oleh semua program, baik dari dalam function ataupun luar function. Variable global ditulis diluar function atau block code

Variable Local adalah variable yang hanya bisa diakses didalam function, dimana variable itu berada. Variable local ditulis didalm function ataupun block code.

Example :

```py
    # global
    a = 2

    def namefunction():
      # local
      b = 4
      print(a + b)
```

## System Package

System package merupakan package python yang dapat berkomunikasi langsung dengan systemnya. Untuk dapat menggunakan system package kita perlu `import sys` terlebih dahulu.

Example :

```py
    import sys

    sys.version
```

## OS Package

OS package merupakan package python yang digunakan untuk berkomunikasi dengan System Operasi.


# OOP

Pengertian apa?
Tujuan Apa?


