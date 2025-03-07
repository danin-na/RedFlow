/*
 *
 * RedFlow – Official Webflow Library by RedKet
 * Copyright © 2025 RedKet. All rights reserved.
 * Unauthorized copying, modification, or distribution is prohibited.
 * Visit: www.RedKet.com | www.Red.Ket
 *
 * Component: Marquee 01
 * Version: 1.0.0
 * Date: 03/06/2025
 * Authur: Danin Na
 *
 */

const initRFMarquee01 = (el) => {
  const direction = el.getAttribute("data-direction") || "rtl";
  const ease = el.getAttribute("data-ease") || "none";
  const duration = parseFloat(el.getAttribute("data-duration")) || 10;
  const delay = parseFloat(el.getAttribute("data-delay")) || 50;

  if (typeof gsap === "undefined") {
    console.error("RedFlow", "Marquee 01 : GSAP missing");
    return;
  }

  if (!el) {
    console.error("RedFlow", "Marquee 01 : invalid element.");
    return;
  }

  el.append(el.firstElementChild.cloneNode(true));
  let anim;
  const runAnim = () => {
    const prog = anim ? anim.progress() : 0;
    if (anim) anim.progress(0).kill();
    const w = parseInt(getComputedStyle(el.firstElementChild).width, 10);
    const [xFrom, xTo] = direction === "rtl" ? [0, -w] : [-w, 0];
    anim = gsap.fromTo(
      el.children,
      { x: xFrom },
      { x: xTo, duration, ease, repeat: -1 }
    );
    anim.progress(prog);
  };
  runAnim();
  let resizeTimeout;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(runAnim, delay);
  });
};

document.addEventListener("DOMContentLoaded", () => {
  document
    .querySelectorAll('[data-rf-component="marquee-01"]')
    .forEach(initRFMarquee01);
});
