import { gsap } from "gsap/dist/gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { useEffect } from "react";
import "./App.css";

gsap.registerPlugin(MotionPathPlugin);

function App() {
  useEffect(() => {
    var total = 40,
      container = document.getElementById("container"),
      w = window.innerWidth,
      h = window.innerHeight,
      Tweens = [],
      SPs = 1;

    for (var i = total; i--; ) {
      var Div = document.createElement("div");
      gsap.set(Div, { attr: { class: "dot" }, x: R(w), y: R(h), opacity: 0 });
      container.appendChild(Div);
      Anim(Div);
      Tweens.push(Div);
    }

    for (var j = total; j--; ) {
      Tweens[j].Tween.play();
    }

    function Anim(elm) {
      elm.Tween = gsap.to(elm, R(20) + 10, {
        motionPath: [
          { x: R(w), y: R(h) },
          { x: R(w), y: R(h) },
        ],
        opacity: R(1),
        scale: R(1) + 0.5,
        delay: R(2),
        onComplete: Anim,
        onCompleteParams: [elm],
      });
    }

    window.addEventListener("resize", resize);

    function R(max) {
      return Math.random() * max;
    }

    function resize() {
      w = window.innerWidth;
      h = window.innerHeight;

      for (var i = 0; i < total; i++) {
        var fireFly = Tweens[i];

        gsap.killTweensOf(fireFly);
      }
    }
  });

  return <div id="container"></div>;
}

export default App;
