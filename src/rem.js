(function(doc, win) {
  var docEl = doc.documentElement,
      resizeEvt =
          "orientationchange" in window
              ? "orientationchange"
              : "resize",
      recalc = function() {
          var clientWidth =
              docEl.clientWidth ||
              win.innerWidth ||
              doc.documentElement.clientWidth;
          if (!clientWidth) return;
          if (clientWidth >= 750) {
              docEl.style.fontSize = "100px";
          } else {
              docEl.style.fontSize =
                  100 * (clientWidth / 750) + "px";
          }
          var html = document.getElementsByTagName("html")[0];
          var settedFs = (settingFs = parseInt(
              100 * (clientWidth / 750)
          ));
          var whileCount = 0;
          while (true) {
              var realFs = parseInt(
                  window.getComputedStyle(html).fontSize
              );
              var delta = realFs - settedFs;
              if (Math.abs(delta) >= 1) {
                  if (delta > 0) settingFs--;
                  else settingFs++;
                  html.setAttribute(
                      "style",
                      "font-size:" + settingFs + "px!important"
                  );
              } else break;
              if (whileCount++ > 100) break;
          }
      };
  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener("DOMContentLoaded", recalc, false);
})(document, window);