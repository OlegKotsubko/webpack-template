import gsap from 'gsap'

const lerp = (current, target, factor) =>
  current * (1 - factor) + target * factor;

const calculateDistance = (x1, y1, x2, y2) => {
  return Math.hypot(x1 - x2, y1 - y2);
};



function magnet(domElement, triggerArea, mousePosition = { x: 0, y: 0 }) {
  let boundingClientRect = domElement.getBoundingClientRect();
  const interpolationFactor = 0.8;

  const lerpingData = {
    x: { current: 0, target: 0 },
    y: { current: 0, target: 0 },
  };
  window.addEventListener("resize", () => {
    boundingClientRect = domElement.getBoundingClientRect();
  });

  const distanceFromMouseToCenter = calculateDistance(
    mousePosition.x,
    mousePosition.y,
    boundingClientRect.left + boundingClientRect.width / 2,
    boundingClientRect.top + boundingClientRect.height / 2
  );

  let targetHolder = { x: 0, y: 0 };

  if (distanceFromMouseToCenter < triggerArea) {
    targetHolder.x = (mousePosition.x - (boundingClientRect.left + boundingClientRect.width / 2)) * 0.2;
    targetHolder.y = (mousePosition.y - (boundingClientRect.top + boundingClientRect.height / 2)) * 0.2;
  }

  lerpingData["x"].target = targetHolder.x;
  lerpingData["y"].target = targetHolder.y;

  for (const item in lerpingData) {
    lerpingData[item].current = lerp(lerpingData[item].current, lerpingData[item].target, interpolationFactor);
  }


  gsap.to(domElement, {
    x: lerpingData.x.current,
    y: lerpingData.y.current
  })

  return lerpingData
}

export default magnet
