/*!
 * Tiles Slider jQuery plugin
 * Author: Andrey Matin
 * Date: 11.14.2018
 * Licensed under the MIT license
 */

((($, window, document, undefined) => {
  $(() => {

    /**
     * Check if namespace has already been initialized
     */
    if (!$.tilesSlider) {
      $.tilesSlider = {};
    }

    /**
     * Tiles Slider jQuery Plugin
     */
    $.fn.tilesSlider = function (options) {

      /**
       * Defaults
       */
      let defaults = {
        delay: 400, // Timer Delay
        tiles: 16, // Tiles in the shape
        effect: 'stairway'
      };

      /**
       * Settings
       */
      let opt = $.extend({}, defaults, options);

      // To avoid scope issues, use 'base' instead of 'this' to reference this class from internal events and functions.
      const base = this;

      /**
       * Properties
       */
      base.imgs = base.find('img');
      base.imgsLength = base.imgs.length;

      /**
       * Init
       */
      base.init = () => {
        let shapes = []; // Shape Elements

        /**
         * Create List of the shapes
         */
        for (let i = 0; i < base.imgsLength; i++) {
          for (let j = 0; j < opt.tiles; j++) {
            let imgSrc = base.imgs[i].src;
            let imgClass = 'o-' + j;
            let imgTile = '<img src="' + imgSrc + '" alt="" class="o ' + imgClass + '" style="z-index:' + i + '" data-index="' + i + '">';
            shapes.push(imgTile);
          }
        }

        /**
         * Add shapes to DOM
         */
        base.append(shapes.reverse().join(''));

        /**
         * Launch Slider
         */
        if (opt.effect == 'stairway') {
          stairway();
        } else {
          chaotic();
        }
      };

      base.init();

      /**
       * Stairway effect
       */
      function stairway() {
        let list = $(base.find('.o')); // Tiles List
        let len = list.length; // Tiles Count
        let i = 0; // Tales Index
        let dip = base.imgsLength;

        // Stairs slider
        let interval = setInterval(function () {
          let listItem = $(list[i]);
          listItem.fadeOut('slow', function () {
            let obj = $(this);
            let z = obj.css("z-index");
            z = z - dip;
            obj.attr('style', 'z-index: ' + z).show();

            // Reset z-index
            if (i == 0) {
              for (let j = 0; j < len; j++) {
                let listJItem = $(list[j]);
                let dataIndex = listJItem.data('index');
                listJItem.attr('style', 'z-index: ' + dataIndex);
              }
            }
          });

          // Reset recursion
          i++;
          if (i > len - 1) {
            i = 0;
            clearInterval(interval);
            stairway();
          }
        }, opt.delay);
      }

      /**
       * Chaotic effect
       */
      function chaotic() {
        let list = $(base.find('.o')); // Tiles List
        let len = list.length; // Tiles Count
        let i = 0; // Tales Index
        let dip = base.imgsLength;
        let src = list;
        let data = [];
        let step = opt.tiles;
        let start = 0 - step;
        let end = step;
        let img = '';

        let interval = setInterval(function () {
          if (data.length) {
            img = data.splice(data.length * Math.random() | 0, 1)[0];
            let listItem = $(img);

            listItem.fadeOut('slow', function () {
              let obj = $(this);
              let z = obj.css("z-index");
              z = z - dip;
              obj.attr('style', 'z-index: ' + z).show();

              // Reset z-index
              if (i == 0) {
                for (let j = 0; j < len; j++) {
                  let listJItem = $(list[j]);
                  let dataIndex = listJItem.data('index');
                  listJItem.attr('style', 'z-index: ' + dataIndex);
                }
              }
            });

            i++;
          } else {
            start += step;
            end = start + step;
            data = src.slice(start, end);
          }

          if (end == (len + step)) {
            i = 0;
            clearInterval(interval);
            chaotic();
          }
        }, opt.delay);
      }


      return this;
    };

  });
}))(jQuery, window, document);