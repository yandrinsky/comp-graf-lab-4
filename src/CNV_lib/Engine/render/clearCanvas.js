//props: context, canvas, backgroundColor
function clearCanvas({ canvas, context, backgroundColor }) {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

export default clearCanvas;
