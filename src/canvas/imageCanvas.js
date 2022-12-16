class ImageCanvas{

    set set(canvas) {
        this.canvas = canvas;
        this.context = this.canvas.getContext("2d")
    }
    
    clear(){
        this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
    }
    
    changeResolution(resolution){
        this.clear();
        this.canvas.width /= resolution;
        this.canvas.height /= resolution;
        this.context.drawImage(this.image ?? this.canvas, 0, 0,this.canvas.width, this.canvas.height);
    }
    
    setImage(image ) {
        this.clear();
        this.image = image ?? this.image;
        if(this.image == undefined) return;
        this.canvas.width = this.image.width;
        this.canvas.height = this.image.height;
        this.context.drawImage(this.image, 0, 0,this.canvas.width, this.canvas.height);
    }

    convertToText(resolution) {
        const {width,height} = this.canvas;
        this.changeResolution(resolution / 5 || .3)
        this.context.drawImage(this.canvas2, 0, 0,this.canvas.width, this.canvas.height);
        const image = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height).data;
        let breakLine = 1;
        let res = "";
        for (let i = 0; i < image.length; i += 4) {
            const color = (image[i] + image[i + 1] + image[i + 2] + image[i + 3]) / 4;
            res += this.#getCharacterOfPixel(color);
            if (breakLine == this.canvas.width) { res += "\n"; breakLine = 0; };
            ++breakLine;
        }
        this.canvas.width = width;
        this.canvas.height = height;
        this.setImage();
        return res
    }

    #getCharacterOfPixel(g) {
        const arrayListCharater = [" ",
            " ","♥","M","*","+","#","&",
            "%","∈","∇",":","=","£","+","∅","∏","/","∉","(","W","!",            
            "∀","ñ","}","∋"," ","™","0"," "]
        for(const i in arrayListCharater){
            if(g >= i * 10) continue
            return arrayListCharater[i];
        }
        return " ";
    }

    insertImage(canvas2){
        this.canvas2 = canvas2;
    }
}

export default ImageCanvas
