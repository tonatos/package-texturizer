# Пакет для CSS-текстурирования мешков со штукатуркой

## Запуск в режиме разработки
```
npm i
npm run dev
``` 

## Как использовать

Пример использования находится в папке `./example`. Коротко, сценарий такой.

Подключаем скрипт:
```
<script src="/path/to/package/dist/package-texturizer.min.js"></script>
```

Создаем объект:
```
<div
    class="package-object" 
    data-package 
    data-package-image="./package-texture-1.png"
    data-package-width="400" 
    data-package-height="500">
</div>
```

Где:

* `data-package` - маркер, указыващий, что это контейнер с объектом
* `data-package-image` - путь до изображения текстуры
* `data-package-width` - ширина контейнера
* `data-package-height` - высота котейнера

В случае, если нужно текстурировать какой-то отдельный элемент (скажем, который рендерится в попапе), это можно сделать вручную:
```
PackageTexturizer.texturize( document.getElementById('custom-element') );
```

Profit.