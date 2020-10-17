// function slide(data){

//     function* idMaker() {

//         var index = 0;
//         while(true){
//             if(index==data.length) index=0;
//             yield data[index++];
//         }
//     }

//     return idMaker()
    
// }
// export default slide

class GenerateSlide {

    constructor(data) {
        this.data = data
        this.index = -1
    }

    getNextSlide = () => {
        let list = this.data;
        this.index = this.index + 1
        if(this.index >=0 && this.index <=list.length-1) return list[this.index]
        
        if(this.index>list.length-1) return
    }
    getPrevSlide = () => {
        let list = this.data;
        this.index = this.index - 1
        if(this.index >=0 && this.index <=list.length-1) {

            return list[this.index]
        }
        
     
    }
}
 
export default GenerateSlide
