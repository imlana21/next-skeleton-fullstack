# Dengan menggunakan globals css

globals css merupakan css yang di import kedalam next project melalui file `pages/_app.js`

# Import from node_module

Sejak versi 9.5.4 styling dari node_module dapat diimport di component manapun

# Membuat Styling khusus untuk suatu component

Untuk membuat styling khusus component, format nama file yang digunakan adalah `[name-component].module.css`. CSS Modules locally scope CSS by automatically creating a unique class name. This allows you to use the same CSS class name in different files without worrying about collisions.

# Add SASS

## Install SASS

`npm install sass`

## Config next.js

```js
  // next.config.js
  const path = require('path')

  module.exports = {
    ...,
    sassOptions: {
      includePaths: [path.join(__dirname, 'styles')],
    },
    ...
  }
```

# Inline Style in JSX

Example :

```js
  function HiThere() {
    return <p style={{ color: 'red' }}>hi there</p>
  }

  export default HiThere
```

Selain cara diatas, Next menyertakan styled-jsx untuk dukungan isolated css pada suatu component. Konsep styled-jsx sama seperti Shadow pada Web Component.

Example :

```jsx
function HelloWorld() {
  return (
    <div>
      Hello world
      <p>scoped!</p>
      <style jsx>{`
        p {
          color: blue;
        }
        div {
          background: red;
        }
        @media (max-width: 600px) {
          div {
            background: blue;
          }
        }
      `}</style>
      <style global jsx>{`
        body {
          background: black;
        }
      `}</style>
    </div>
  )
}

export default HelloWorld
```



