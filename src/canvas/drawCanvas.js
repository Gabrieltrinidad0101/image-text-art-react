class DrawCanvas {
    constructor(){
        this.is_drawing = false;
    }

    set set(canvas) {
        this.clientCanvasWidth = canvas.clientWidth
        this.clientCanvasHeight = canvas.clientHeight
        this.canvas = canvas;

        this.context = this.canvas.getContext("2d")
        
        this.canvas.addEventListener("touchstart",e=>this.start(e),false)
        this.canvas.addEventListener("mousedown",e=>this.start(e),false)

        this.canvas.addEventListener("touchmove",e=>this.draw(e),false)
        this.canvas.addEventListener("mousemove",e=>this.draw(e),false)

        this.canvas.addEventListener("touchend",e=>this.stop(e),false)
        this.canvas.addEventListener("mouseup",e=>this.stop(e),false)
        this.canvas.addEventListener("mouseout",e=>this.stop(e),false)
    }   

    start(e){
        e.preventDefault();
        this.is_drawing = true;
        this.context.beginPath();
        this.context.moveTo(e.clientX - this.canvas.offsetLeft,e.clientY - this.canvas.offsetTop);
    }
    
    draw(e){
        e.preventDefault();
        if(!this.is_drawing) return;
        this.context.lineTo(e.clientX - this.canvas.offsetLeft,e.clientY - this.canvas.offsetTop)
        this.context.strokeStyle = "#00";
        this.context.lineWidth = 30;
        this.context.lineCap = "round"
        this.context.lineJoin = "round"
        this.context.stroke();
    }
    
    stop(e){
        e.preventDefault();
        if(!this.is_drawing) return
        this.context.stroke();
        this.is_drawing = false;	
        this.context.closePath();
    }
}

export default DrawCanvas
