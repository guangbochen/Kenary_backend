r.js -o build/app.build.js

echo '--- Start to trash dependency files ---'

trash dist/.git/
trash dist/build/
trash dist/css/r*
trash dist/js/collections/
trash dist/js/models/
trash dist/js/templates/
trash dist/js/views/
trash dist/js/app.js
trash dist/js/common.js
trash dist/js/router.js

trash dist/js/vendor/a*
trash dist/js/vendor/b*
trash dist/js/vendor/f*
trash dist/js/vendor/j*
trash dist/js/vendor/l*
trash dist/js/vendor/p*
trash dist/js/vendor/requirejs-plugins/
trash dist/js/vendor/requirejs-text/
trash dist/js/vendor/s*
trash dist/js/vendor/t*
trash dist/js/vendor/u*

trash dist/.*
trash dist/a*
trash dist/b*
trash dist/m*

trash-empty

# echo '--- Finished empty files & start Copy files into desktop ---'
# tar -cvzf dist.tar.gz dist/
# cp -i dist.tar.gz ~/Desktop/

echo '--- DONE ---'
