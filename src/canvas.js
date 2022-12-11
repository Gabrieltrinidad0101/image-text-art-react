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
        let breakLine = 1;
        let res = "";
        for(let i = 0; i < image.length; i += 4){
            const color = (image[i] + image[i+1] + image[i+2] + image[i+3]) / 4;
            res += this.#getCharacterOfPixel(color);
            if(breakLine == this.canvas.width){res += "\n";breakLine = 0; };
            ++breakLine;
        }
        return res
    }

    #getCharacterOfPixel(g){
        if(g == 255) return "$"
        if(g >= 250) return "@"
        if(g >= 220) return "*"
        if(g >= 200) return "+"
        if(g >= 180) return "#"
        if(g >= 160) return "&"
        if(g >= 140) return "%"
        if(g >= 120) return "∈"
        if(g >= 110) return "∇"
        if(g >= 100) return ":"
        if(g >= 80) return "£"
        if(g >= 60) return "/"
        if(g >= 40) return "("
        if(g >= 20) return "!"
        if(g >= 10) return "∀"
        return " "
    }
}

export default Canvas
