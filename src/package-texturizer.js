const PackageTexturizer = (function () {
  /**
   * Private methods
   */
  const _camelCaseToCSSRule = (rule) => {
    return rule.replace(/[A-Z]+/g, ($1) => '-' + $1.toLowerCase());
  };

  const _generateGradient = (sidesShadows, side) => {
    try {
      return `linear-gradient(90deg, ${sidesShadows[side].h}), 
              linear-gradient(0deg, ${sidesShadows[side].v})`;
    } catch (e) {
      return ``;
    }
  };

  const _createCssTable = () => {
    let packageTextureStyleObject = document.getElementById('packageTextureStyle');

    if (packageTextureStyleObject != undefined) {
      return false;
    }

    let style = document.createElement('style');
    style.id = 'packageTextureStyle';
    style.type = 'text/css';
    
    document.getElementsByTagName('head')[0].appendChild(style);

    Object.values(styles).forEach((cssClass, k) => {
      let rule = `.${cssClass.className} {
          ${Object.entries(cssClass.rules).reduce( (acc, current) => {
            return acc + `${_camelCaseToCSSRule(current[0])}: ${current[1]};`
          }, '')}
        }\n\r`;
      style.sheet.insertRule(rule, style.sheet.cssRules.length);
    });

    return style.sheet;
  }

  /**
   * Properties
   */
  let containers = [];

  const tpl = `
    <div class="package-object">
      <div class="package-object__wrapper">
        <div class="package-object__side package-object__side--front"></div>
        <div class="package-object__side package-object__side--back"></div> 
        <div class="package-object__side package-object__side--left"></div>
        <div class="package-object__side package-object__side--right"></div>
        <div class="package-object__side package-object__side--top"></div>
        <div class="package-object__side package-object__side--bottom"></div>
      </div>
    </div>
  `;

  const sidesShadows = {
    'front': {
      h: 'rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 15%, rgba(255,255,255,0) 90%, rgba(255,255,255,0.4) 100%',
      v: 'rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 5%, rgba(255,255,255,0) 90%, rgba(255,255,255,0.4) 100%'
    },
    'top': {
      h: 'rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 20%, rgba(255,255,255,0) 80%, rgba(255,255,255,0.4) 100%',
      v: 'rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 40%, rgba(255,255,255,0) 60%, rgba(255,255,255,0.4) 100%'
    },
    'left': {
      h: 'rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 40%, rgba(0,0,0,0) 65%, rgba(0,0,0,0.5) 100%',
      v: 'rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 4%, rgba(255,255,255,0) 94%, rgba(255,255,255,0.4) 100%'
    }
  }

  const sizes = {
    shiftConstance: 70,
    texture: {
      width: 2000,
      height: 1005
    },
    package: {
      width: 453,
      height: 687,
      thickness: 140,
    },
    offset: {
      back: {x: 126, y: 184, width: 453, height: 687},
      left: {x: 541, y: 184, width: 140, height: 687},
      front: {x: 681, y: 184, width: 453, height: 687},
      right: {x: 1135, y: 184, width: 140, height: 687},
      top: {x: 1451, y: 199, width: 453, height: 140},
      bottom: {x: 1451, y: 332, width: 453, height: 140},
    }
  };

  const styles = {
    object: {
      className: 'package-object',
      rules: {
        width: '100%',
        height: '100%',
        transform: 'translateX(-30%) translateY(-25%) scale(.2)',
        transformOrigin: '0 0'
      }
    },
    objectWrapper: {
      className: 'package-object__wrapper',
      rules: {
        position: 'relative',
        width: `${sizes.package.width}px`,
        height: `${sizes.package.height}px`,
        transform: 'perspective(1500px) rotateX(0deg) rotateY(-30deg) translateY(40px) translateX(50px) translateZ(-50px)',
        transformStyle: 'preserve-3d',
      }
    },
    side: {
      className: 'package-object__side',
      rules: {
        overflow: 'hidden',
        position: 'absolute',
        background: '#eee',
        opacity: 1,
        backgroundSize: `${sizes.texture.width}px ${sizes.texture.height}px`,
      }
    },
    maskPreset: {
      className: 'package-object__side:before',
      rules: {
        content: '""',
        display: 'block',
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: 1,
      }
    },
    front: {
      className: 'package-object__side--front',
      rules: {
        width: `${sizes.offset.front.width}px`,
        height: `${sizes.offset.front.height}px`,
        transform: `translate3d(0, 0, ${sizes.package.thickness / 2}px)`,
        backgroundPosition: `-${sizes.offset.front.x}px -${sizes.offset.front.y}px`,
      }
    },
    top: {
      className: 'package-object__side--top',
      rules: {
        width: `${sizes.offset.top.width}px`,
        height: `${sizes.offset.top.height}px`,
        transform: `rotateX(-90deg) translate3d(0, 0, -${sizes.package.thickness / 2}px)`,
        backgroundPosition: `-${sizes.offset.top.x}px -${sizes.offset.top.y}px`,
      }
    },
    bottom: {
      className: 'package-object__side--bottom',
      rules: {
        width: `${sizes.offset.bottom.width}px`,
        height: `${sizes.offset.bottom.height}px`,
        transform: `rotateX(-90deg) translate3d(0, 0, ${sizes.package.height - sizes.shiftConstance}px)`,
        backgroundPosition: `-${sizes.offset.bottom.x}px -${sizes.offset.bottom.y}px`,
        boxShadow: `0px 0px 50px #000`,
      }
    },
    left: {
      className: 'package-object__side--left',
      rules: {
        width: `${sizes.offset.left.width}px`,
        height: `${sizes.offset.left.height}px`,
        transform: `rotateY(90deg) translate3d(0, 0, ${sizes.package.width - sizes.shiftConstance}px)`,
        backgroundPosition: `-${sizes.offset.left.x}px -${sizes.offset.left.y}px`,
      }
    },
    right: {
      className: 'package-object__side--right',
      rules: {
        width: `${sizes.offset.right.width}px`,
        height: `${sizes.offset.right.height}px`,
        transform: `rotateY(-90deg) translate3d(0, 0, ${sizes.shiftConstance}px)`,
        backgroundPosition: `-${sizes.offset.right.x}px -${sizes.offset.right.y}px`,
      }
    },
    back: {
      className: 'package-object__side--back',
      rules: {
        width: `${sizes.offset.back.width}px`,
        height: `${sizes.offset.back.height}px`,
        transform: `translate3d(0, 0, -${sizes.package.thickness / 2}px)`,
        backgroundPosition: `-${sizes.offset.back.x}px -${sizes.offset.back.y}px`,
      }
    },
    frontMask: {
      className: 'package-object__side--front:before',
      rules: {
        background: _generateGradient(sidesShadows, 'front'),
      }
    },
    topMask: {
      className: 'package-object__side--top:before',
      rules: {
        background: _generateGradient(sidesShadows, 'top'),
      }
    },
    bottomMask: {
      className: 'package-object__side--bottom:before',
      rules: {
        background: ``,
      }
    },
    leftMask: {
      className: 'package-object__side--left:before',
      rules: {
        background: _generateGradient(sidesShadows, 'left'),
      }
    },
    rightMask: {
      className: 'package-object__side--right:before',
      rules: {
        background: ``,
      }
    },
    backMask: {
      className: 'package-object__side--back:before',
      rules: {
        background: ``,
      }
    }
  };

  const publicMethods = {
    texturize: (object) => {
      object.insertAdjacentHTML('beforeend', tpl);

      object.style.height = object.dataset.packageHeight;
      object.style.width = object.dataset.packageWidth;
      object.style.overflow = 'hidden';
      object.style.position = 'relative';

      object.querySelectorAll('.package-object .package-object__side').forEach( (side) => {
        side.style.backgroundImage = `url(${object.dataset.packageImage})`;
      });


      let scaleKoef = object.dataset.packageHeight / (sizes.package.height + 200);
      object.querySelector('.package-object')
            .style
            .transform = `translateX(5%) translateY(8%) scale(${scaleKoef})`;
    },
    
    init: () => {
      _createCssTable();

      containers = document.querySelectorAll(`[data-package]`);

      containers.forEach((object, i) => 
        publicMethods.texturize(object)
      );
    },
  };

  return publicMethods;

})();

document.addEventListener('DOMContentLoaded', PackageTexturizer.init);