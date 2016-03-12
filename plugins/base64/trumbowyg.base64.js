/* ===========================================================
 * trumbowyg.base64.js v1.0
 * Base64 plugin for Trumbowyg
 * http://alex-d.github.com/Trumbowyg
 * ===========================================================
 * Author : Cyril Biencourt (lizardK)
 */

(function ($) {
    'use strict';

    $.extend(true, $.trumbowyg, {
        langs: {
            // jshint camelcase:false
            en: {
                base64: 'Image as base64',
                file: 'File',
                errFileReaderNotSupported: 'FileReader is not supported by your browser.'
            },
            fr: {
                base64: 'Image en base64',
                file: 'Fichier'
            },
            cs: {
                base64: 'Vložit obrázek',
                file: 'Soubor'
            },
            zh_cn: {
              base64: '图片（Base64编码）',
              file: '文件'
            }
        },
        // jshint camelcase:true

        opts: {
            btnsDef: {
                base64: {
                    isSupported: function () {
                        return typeof FileReader !== 'undefined';
                    },
                    fn: function (params, tbw) {
                        var file;
                        tbw.openModalInsert(
                            // Title
                            tbw.lang.base64,

                            // Fields
                            {
                                file: {
                                    type: 'file',
                                    required: true
                                },
                                alt: {
                                    label: 'description'
                                }
                            },

                            // Callback
                            function (values) {
                                var fReader = new FileReader();

                                fReader.onloadend = function () {
                                    tbw.execCmd('insertImage', fReader.result);
                                    $(['img[src="', fReader.result, '"]:not([alt])'].join(''), tbw.$box).attr('alt', values.alt);
                                    tbw.closeModal();
                                };

                                fReader.readAsDataURL(file);
                            }
                        );

                        $('input[type=file]').on('change', function (e) {
                            file = e.target.files[0];
                        });
                    }
                }
            }
        }
    });
})(jQuery);
