const track = document.getElementById("image");

window.onmousedown = e => {
    track.dataset.mouseDownAt = e.clientX;
}
window.onmouseup = () => {
    track.dataset.mouseDownAt="0";
    track.dataset.prevPercentage = track.dataset.percentage;
}
window.onmousemove = e => {
   if(track.dataset.mouseDownAt ==="0") return;
    
    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
        maxDelta = window.innerWidth / 2;
    
    const percentage = (mouseDelta / maxDelta) * -100, 
        nextPercentage = parseFloat(track.dataset.prevPercentage) + percentage;
    
    track.dataset.percentage = nextPercentage;
    
    track.animate({
        transform: `translate(${nextPercentage}%, -50%)`
    }, { duration: 1200, fill: "forwards" });
    Math.min(nextPercentage, 0);
    Math.max(nextPercentage, -100);

    for(const image of track.getElementsByClassName("pic")) {
        image.animate({
            objectPosition: `${nextPercentage +100}% center`},{ duration: 1200, fill:"forwards" });
        }
}