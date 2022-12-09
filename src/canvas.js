class Canvas{
    
    set set(canvas){
        this.canvas = canvas;
        this.context =  this.canvas.getContext("2d")
    }

    setImage(image){
        this.canvas.width = image.width;
        this.canvas.height= image.height;
        this.context.drawImage(image,0,0);
    }

    convertToText(){
        const image = this.context.getImageData(0,0,this.canvas.width,this.canvas.height).data;  
        let breakLine = 0;
        let res = "";
        for(let i = 0; i < image.length; i += 4){
            const color = image[i] + image[i+1] + image[i+2] + image[i+3] / 4 / 255;
            res += color >= 1 ? "0" : "-";
            if(breakLine == this.canvas.width){res += "\n";breakLine = 0; };
            ++breakLine;
        }
        return res
    }
}

export default Canvas
