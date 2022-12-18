class ImageCanvas{

    set set(canvas) {
        this.canvas = canvas;
        this.context = this.canvas.getContext("2d")
    }
    
    clear(){
        this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
    }
    
    setImage(image) {
        this.clear();
        this.image = image ?? this.image;
        if(this.image == undefined) return;
        this.canvas.width = this.image.width;
        this.canvas.height = this.image.height;
        this.context.drawImage(this.image, 0, 0,this.canvas.width, this.canvas.height);
    }

    convertToText(resolution) {
        this.context.drawImage(this.canvas2,0,0,this.canvas.width, this.canvas.height);
        const widthOfInputRange = 16; 
        const revertResolution = widthOfInputRange - resolution;
        const image = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height)
        const imageData = image.data;
        const {width,height} = image;
        let res = "";
        for(let j = 0; j < height; j += revertResolution) {
            for(let i = 0; i < width; i += revertResolution) {
                const posX = i * 4;
                const posY = j * 4;
                const pos = (posY * width) + posX;
                const color = (imageData[pos] + imageData[pos+ 1] + imageData[pos+ 2] + imageData[pos+ 3]) / 4;
                res += this.#getCharacterOfPixel(color);
                if (i >= width - revertResolution) res += "\n"
            }
        }
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
